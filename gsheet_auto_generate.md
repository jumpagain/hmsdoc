# 📦 Auto-generate data.js จาก Google Sheet (ไม่ต้องแก้โค้ดใน repo)

แนวทางนี้ทำให้เว็บโหลดข้อมูลเอกสารจาก Google Sheet โดยตรง (ผ่าน Google Apps Script)
คุณจะอัปเดตเอกสารที่ Sheet ได้เลย เว็บจะอัปเดตตามโดยไม่ต้องแก้ `data.js` มือ

---

## โครงสร้าง Google Sheet (แนะนำ)
สร้าง Spreadsheet 1 ไฟล์ มีอย่างน้อย 2 ชีท:

### Sheet: `Departments`
| deptKey | name | desc | icon |
|---|---|---|---|
| HR | HR | เอกสารของแผนก HR | 🧑‍💼 |

### Sheet: `Documents`
| deptKey | type | code | title | url | version | updated |
|---|---|---|---|---|---|---|
| HR | sop | SOP-HR-01 | การฝึกอบรม | https://... | 1.0 | 2026-02-20 |
| HR | form | FM-HR-01 | ใบขออนุมัติอัตรา | https://... | 2.1 | 2026-02-10 |

- `type` ใช้ค่า `sop` หรือ `form`

---

## ทำ Google Apps Script ให้ปล่อย data.js
1) ไปที่ Google Sheet → Extensions → Apps Script
2) สร้างไฟล์ใหม่ วางโค้ดจาก `gsheet_to_datajs.gs`
3) Deploy → **New deployment** → Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone** (หรือ Anyone within org ถ้าต้องการ)
4) Copy URL ที่ deploy ได้

---

## วิธีใช้กับหน้าเว็บ (2 วิธี)

### วิธี A: โหลด data.js จาก Apps Script โดยตรง (แนะนำ)
เปลี่ยนใน html ทุกหน้า:
```html
<script src="data.js?v=20260128"></script>
```

เป็น:
```html
<script src="YOUR_APPS_SCRIPT_URL?format=js&v=20260223"></script>
```

> ใส่ `v=...` เป็น cache busting เวลาอยาก force refresh

### วิธี B: ให้ Apps Script “สร้างไฟล์ data.js” แล้วคุณค่อยนำไป commit
- ใช้ endpoint `?format=js` แล้ว copy output ไปทับ data.js ใน repo
- เหมาะกับคนที่ยังอยาก version control ใน git

---

## หมายเหตุเรื่องสิทธิ์
- ถ้าเป็นข้อมูลภายใน และใช้ Cloudflare Access อยู่แล้ว:
  - Apps Script ตั้งเป็น `Anyone` ได้ (เพราะหน้าเว็บถูกป้องกันอยู่)
- ถ้าต้องการปิด Apps Script ไม่ให้คนนอกเรียก:
  - ใช้ `Anyone within organization` และให้คนในล็อกอิน Google ถึงจะได้ผล
