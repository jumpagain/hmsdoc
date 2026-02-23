# 🔐 Basic Auth / Password Protection ด้วย Cloudflare (Static Site)

> เป้าหมาย: เปิดเว็บให้ “คนใน” เข้าได้ แต่คนนอกเข้าไม่ได้
> *หมายเหตุ:* Cloudflare Pages ไม่มี “Basic Auth” แบบ .htaccess ตรง ๆ แต่ทำได้ง่ายด้วย **Cloudflare Access** (แนะนำ) หรือ **Worker** (ทำ Basic Auth จริง)

---

## ทางเลือก A (แนะนำ): Cloudflare Access (Zero Trust) — ทำเร็วและปลอดภัย
เหมาะกับเว็บเอกสารภายในองค์กรที่สุด

### วิธีทำ (ภาพรวม)
1) ไปที่ Cloudflare Dashboard → **Zero Trust**
2) ไปที่ **Access → Applications → Add an application**
3) เลือก **Self-hosted**
4) ใส่โดเมนของเว็บ (เช่น `docs.yourdomain.com`)
5) สร้าง **Policy**:
   - Allow เฉพาะ Email domain บริษัท (เช่น `@humansoft.co.th`)
   - หรือ Allow เฉพาะรายชื่อ email
6) เปิดใช้งาน

ผลลัพธ์: ก่อนเข้าเว็บ จะเจอหน้าล็อกอินของ Cloudflare (Google/Microsoft/OTP)

✅ ข้อดี
- ไม่ต้องแก้โค้ดเว็บ
- ผูกกับ Google Workspace / Microsoft ได้
- Audit log ได้ว่าใครเข้าเมื่อไหร่

---

## ทางเลือก B: Worker ทำ Basic Auth (user/pass)
ถ้าต้องการ user/pass แบบคลาสสิกจริง ๆ

### 1) สร้าง Cloudflare Worker
สร้าง Worker ใหม่ แล้วใส่โค้ดนี้:

```js
export default {
  async fetch(request, env) {
    const USER = env.BASIC_USER;
    const PASS = env.BASIC_PASS;

    const auth = request.headers.get("Authorization") || "";
    const expected = "Basic " + btoa(`${USER}:${PASS}`);

    if (auth !== expected) {
      return new Response("Unauthorized", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="HMS Document Portal", charset="UTF-8"',
        },
      });
    }
    return fetch(request);
  }
}
```

### 2) ตั้งค่า Secret
ไปที่ Worker → Settings → Variables
- `BASIC_USER` = ชื่อผู้ใช้
- `BASIC_PASS` = รหัสผ่าน

### 3) ผูก Route
สร้าง Route ให้ Worker ครอบโดเมน/เส้นทางเว็บของคุณ เช่น:
- `docs.yourdomain.com/*`

✅ ข้อดี: ได้ Basic Auth จริง
⚠️ ข้อควรระวัง: user/pass เดียวแชร์กันได้ — ไม่เหมาะกับการ audit แบบรายบุคคลเท่า Access

---

## แนะนำสั้น ๆ
- ถ้าเป็น “เอกสารภายในบริษัท” → ใช้ **Cloudflare Access** ดีสุด
- ถ้าต้องการ “รหัสผ่านเดียว” → ใช้ **Worker Basic Auth**
