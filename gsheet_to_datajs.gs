/**
 * HMS Document Portal — Google Sheet ➜ data.js generator
 *
 * Sheets:
 *  - Departments: deptKey | name | desc | icon
 *  - Documents:   deptKey | type(sop/form) | code | title | url | version | updated
 *
 * Deploy as Web App:
 *  - Execute as: Me
 *  - Who has access: Anyone (หรือ within org)
 *
 * Usage:
 *  - .../exec?format=js    -> returns JS: window.DOCUMENTS = {...}
 *  - .../exec?format=json  -> returns JSON only
 */
function doGet(e) {
  var format = (e && e.parameter && e.parameter.format) ? String(e.parameter.format) : "js";

  var ss = SpreadsheetApp.getActive();
  var deptSheet = ss.getSheetByName("Departments");
  var docSheet  = ss.getSheetByName("Documents");

  if (!deptSheet || !docSheet) {
    return ContentService
      .createTextOutput("Missing sheet: Departments / Documents")
      .setMimeType(ContentService.MimeType.TEXT);
  }

  var depts = readTable_(deptSheet);
  var docs  = readTable_(docSheet);

  // Build DOCUMENTS structure
  var DOCUMENTS = {};

  // preload departments
  depts.rows.forEach(function(r){
    var deptKey = safe_(r.deptKey);
    if (!deptKey) return;

    DOCUMENTS[deptKey] = {
      name: safe_(r.name) || deptKey,
      desc: safe_(r.desc) || "",
      icon: safe_(r.icon) || "📁",
      sop: [],
      form: []
    };
  });

  // populate documents
  docs.rows.forEach(function(r){
    var deptKey = safe_(r.deptKey);
    var type = safe_(r.type).toLowerCase(); // sop|form
    if (!deptKey || !type) return;

    if (!DOCUMENTS[deptKey]) {
      // fallback: create dept if missing
      DOCUMENTS[deptKey] = { name: deptKey, desc:"", icon:"📁", sop:[], form:[] };
    }

    var item = {
      code: safe_(r.code),
      title: safe_(r.title),
      url: safe_(r.url),
    };

    var ver = safe_(r.version);
    var upd = safe_(r.updated);

    if (ver) item.version = ver;
    if (upd) item.updated = upd;

    if (type === "sop") DOCUMENTS[deptKey].sop.push(item);
    else if (type === "form") DOCUMENTS[deptKey].form.push(item);
  });

  // optional: ensure Formที่ใช้บ่อย exists first (ถ้าคุณใช้แนวนี้)
  if (!DOCUMENTS["Formที่ใช้บ่อย"]) {
    DOCUMENTS["Formที่ใช้บ่อย"] = { name:"Formที่ใช้บ่อย", desc:"Form ที่ใช้บ่อย", icon:"⭐", sop:[], form:[] };
  }

  if (format === "json") {
    return ContentService
      .createTextOutput(JSON.stringify(DOCUMENTS))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var js = "window.DOCUMENTS = " + JSON.stringify(DOCUMENTS, null, 2) + ";";
  return ContentService
    .createTextOutput(js)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

// ===== helpers =====

function readTable_(sheet){
  var values = sheet.getDataRange().getValues();
  if (values.length < 2) return { header: [], rows: [] };

  var header = values[0].map(function(h){ return String(h).trim(); });
  var rows = [];

  for (var i=1; i<values.length; i++){
    var row = values[i];
    var obj = {};
    var empty = true;

    for (var c=0; c<header.length; c++){
      var key = header[c];
      if (!key) continue;
      obj[key] = row[c];
      if (String(row[c] || "").trim() !== "") empty = false;
    }
    if (!empty) rows.push(obj);
  }
  return { header: header, rows: rows };
}

function safe_(v){
  if (v === null || v === undefined) return "";
  return String(v).trim();
}
