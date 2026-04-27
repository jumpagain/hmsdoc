/**
 * sheet-loader.js
 * ----------------------------------------------------------------------------
 * HMS Document Portal — Pure Client-Side Google Sheet Loader (NO Apps Script)
 *
 * Fetches CSV directly from a public Google Sheet using the gviz endpoint:
 *   https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:csv&sheet={NAME}
 *
 * Works on GitHub Pages / any static host (no backend needed).
 *
 * Sheet must be: "Anyone with the link → Viewer"
 *
 * Required Sheet structure:
 *   Tab "Departments": deptKey | name | desc | icon
 *   Tab "Documents":   deptKey | type(sop/form) | code | title | url | (version) | (updated)
 *
 * Public API:
 *   window.HMSDocLoader.load() → Promise<DOCUMENTS>
 *   window.HMSDocLoader.SHEET_ID  (config)
 *
 * Author: ปรับปรุงจาก gsheet_to_datajs.gs
 * ----------------------------------------------------------------------------
 */
(function () {
  "use strict";

  var SHEET_ID = "1JqpTsv74K2vYyBjN167iIPHsQvDgyks-VkklR_tD054";
  var BASE = "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/gviz/tq?tqx=out:csv&sheet=";

  // ----- CSV parser (RFC 4180-ish: handles "quoted, fields", embedded \n, "" escape) -----
  function parseCSV(text) {
    var rows = [];
    var row = [];
    var field = "";
    var inQuote = false;
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      var n = text[i + 1];
      if (inQuote) {
        if (c === '"' && n === '"') { field += '"'; i++; }
        else if (c === '"') { inQuote = false; }
        else { field += c; }
      } else {
        if (c === '"') { inQuote = true; }
        else if (c === ',') { row.push(field); field = ""; }
        else if (c === '\r') { /* skip */ }
        else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ""; }
        else { field += c; }
      }
    }
    if (field !== "" || row.length) { row.push(field); rows.push(row); }
    return rows;
  }

  function csvToObjects(text) {
    var rows = parseCSV(text).filter(function (r) {
      return r.some(function (c) { return c && c.trim(); });
    });
    if (rows.length < 2) return [];
    var headers = rows[0].map(function (h) { return String(h).trim(); });
    return rows.slice(1).map(function (row) {
      var obj = {};
      headers.forEach(function (h, i) { obj[h] = (row[i] || "").trim(); });
      return obj;
    });
  }

  // ----- Fetch helpers -----
  function fetchCsv(sheetName) {
    var url = BASE + encodeURIComponent(sheetName) + "&_t=" + Date.now();
    return fetch(url, { credentials: "omit" }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status + " loading sheet '" + sheetName + "'");
      return r.text();
    });
  }

  // ----- Build DOCUMENTS structure (same shape as data.js) -----
  function buildDocuments(deptRows, docRows) {
    var DOCUMENTS = {};

    // 1) Preload departments
    deptRows.forEach(function (r) {
      var key = (r.deptKey || "").trim();
      if (!key) return;
      DOCUMENTS[key] = {
        name: r.name || key,
        desc: r.desc || "",
        icon: r.icon || "📁",
        sop: [],
        form: []
      };
    });

    // 2) Populate documents
    docRows.forEach(function (r) {
      var key = (r.deptKey || "").trim();
      var type = (r.type || "").toLowerCase().trim();
      if (!key || !type) return;

      // fallback: create dept if missing in Departments tab
      if (!DOCUMENTS[key]) {
        DOCUMENTS[key] = { name: key, desc: "", icon: "📁", sop: [], form: [] };
      }

      var item = {
        code: r.code || "",
        title: r.title || "",
        url: r.url || ""
      };
      if (r.version) item.version = r.version;
      if (r.updated) item.updated = r.updated;

      if (type === "sop") DOCUMENTS[key].sop.push(item);
      else if (type === "form") DOCUMENTS[key].form.push(item);
    });

    return DOCUMENTS;
  }

  // ----- Public API -----
  function load() {
    return Promise.all([
      fetchCsv("Departments"),
      fetchCsv("Documents")
    ]).then(function (results) {
      var deptRows = csvToObjects(results[0]);
      var docRows = csvToObjects(results[1]);
      return buildDocuments(deptRows, docRows);
    });
  }

  window.HMSDocLoader = {
    SHEET_ID: SHEET_ID,
    load: load,
    _parseCSV: parseCSV,
    _csvToObjects: csvToObjects
  };
})();
