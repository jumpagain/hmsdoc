// data.js
// ลิงก์ดาวน์โหลดแนะนำ: https://drive.google.com/uc?id=FILE_ID&export=download
// หมายเหตุ: ถ้า Drive ถูกจำกัดสิทธิ์ คนไม่มีสิทธิ์ก็โหลดไม่ได้ (ดีสำหรับ internal)

const DOCUMENTS = {
  hr: {
    name: "ฝ่ายทรัพยากรบุคคล",
    desc: "เอกสารเกี่ยวกับการบริหารทรัพยากรบุคคล",
    icon: "👥",
    sop: [
      {
        code: "SOP-HR-001",
        title: "ขั้นตอนการรับสมัครพนักงาน",
        updated: "2024-01-15",
        url: "https://drive.google.com/uc?id=FILE_ID_1&export=download"
      },
      {
        code: "SOP-HR-002",
        title: "ขั้นตอนการลาหยุด",
        updated: "2024-01-10",
        url: "https://drive.google.com/uc?id=FILE_ID_2&export=download"
      }
    ],
    form: [
      {
        code: "FRM-HR-001",
        title: "แบบฟอร์มขออนุมัติลา",
        updated: "2024-01-12",
        url: "https://drive.google.com/uc?id=FILE_ID_3&export=download"
      }
    ]
  },

  finance: {
    name: "ฝ่ายการเงิน",
    desc: "เอกสารเกี่ยวกับการเงินและบัญชี",
    icon: "💳",
    sop: [
      {
        code: "SOP-FIN-001",
        title: "ขั้นตอนการวางบิล",
        updated: "2024-01-08",
        url: "https://drive.google.com/uc?id=FILE_ID_4&export=download"
      }
    ],
    form: [
      {
        code: "FRM-FIN-001",
        title: "แบบฟอร์มขอเบิกค่าใช้จ่าย",
        updated: "2024-01-05",
        url: "https://drive.google.com/uc?id=FILE_ID_5&export=download"
      }
    ]
  },

  it: {
    name: "ฝ่ายเทคโนโลยีสารสนเทศ",
    desc: "เอกสารเกี่ยวกับ IT และระบบสารสนเทศ",
    icon: "🖥️",
    sop: [
      {
        code: "SOP-IT-001",
        title: "การขอสิทธิ์ใช้งานระบบ",
        updated: "2024-01-02",
        url: "https://drive.google.com/uc?id=FILE_ID_6&export=download"
      }
    ],
    form: [
      {
        code: "FRM-IT-001",
        title: "แบบฟอร์มแจ้งปัญหา IT",
        updated: "2024-01-03",
        url: "https://drive.google.com/uc?id=FILE_ID_7&export=download"
      }
    ]
  },

  qa: {
    name: "ฝ่ายประกันคุณภาพ",
    desc: "เอกสารเกี่ยวกับการควบคุมคุณภาพ",
    icon: "✅",
    sop: [
      {
        code: "SOP-QA-001",
        title: "การตรวจทบทวนเอกสาร",
        updated: "2024-01-01",
        url: "https://drive.google.com/uc?id=FILE_ID_8&export=download"
      }
    ],
    form: [
      {
        code: "FRM-QA-001",
        title: "แบบฟอร์มข้อบกพร่อง (NC)",
        updated: "2024-01-01",
        url: "https://drive.google.com/uc?id=FILE_ID_9&export=download"
      }
    ]
  }
};