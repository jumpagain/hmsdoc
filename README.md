# HMS Document Portal (Static) — Enhancements Pack

ไฟล์ชุดนี้เพิ่มความสามารถให้ Portal เดิม (ยังเป็น Static เหมือนเดิม) ดังนี้:
- 🔎 Search ทั้งระบบ (หน้าแรก)
- 📊 สรุปจำนวน SOP / Form ทั้งบริษัท (หน้าแรก)
- 🏷 แสดง Version / Updated ต่อรายการเอกสาร (รองรับในทุกหน้า)
- 🔐 แนวทางใส่ Basic Auth ผ่าน Cloudflare (กันคนนอก)
- 📦 Auto-generate data.js จาก Google Sheet (ไม่ต้องแก้โค้ดมือ)

---

## 1) Search ทั้งระบบ + สรุปจำนวน (หน้าแรก)
แก้ใน `index.html` แล้ว
- Search จะค้นหาใน: แผนก / ประเภท / code / title
- กรองได้: ทั้งหมด / SOP / Form
- แสดงผลสูงสุด 50 รายการ (กันยาวเกิน)

---

## 2) แสดง Version / Updated ต่อเอกสาร
ระบบรองรับ field ต่อรายการเอกสาร:

```js
{ code: "SOP-CS-01", title: "...", url: "...", version: "1.2", updated: "2026-02-20" }
```

- `version` หรือ `ver` ใช้ได้
- `updated` หรือ `last_updated` ใช้ได้
- ถ้าไม่ใส่ จะไม่แสดง badge

แสดงผลใน:
- หน้า Search (index)
- หน้า docs.html (รายการเอกสารของแผนก)

---

## 3) 🔐 Basic Auth ผ่าน Cloudflare (กันคนนอก)
ดูไฟล์ `cloudflare_basic_auth.md`

---

## 4) 📦 Auto-generate data.js จาก Google Sheet
ดูไฟล์ `gsheet_auto_generate.md`

สรุปแนวคิด:
- เก็บข้อมูลเอกสารใน Google Sheet
- ใช้ Google Apps Script สร้าง endpoint ที่ปล่อย **data.js (JavaScript)** ออกมาให้เว็บโหลดแบบ `<script src="..."></script>`
- จากนั้นคุณไม่ต้องแก้ `data.js` ใน repo อีกเลย แค่อัปเดตใน Sheet

