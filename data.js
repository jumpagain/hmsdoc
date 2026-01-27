// data.js
// โครงสร้างข้อมูลเอกสาร แยกตามแผนก / SOP / Form
// อ้างอิงจากไฟล์ SOP&Form.xlsx

const DOCUMENTS = {

  new_customer: {
    name: "New Customer",
    desc: "กระบวนการลูกค้าใหม่",
    icon: "🆕",
    sop: [
      { code: "SOP-SE-01", title: "กระบวนการขาย Size XS", url: "#" },
      { code: "SOP-SE-02", title: "กระบวนการ Demo", url: "#" },
      { code: "SOP-SE-03", title: "กระบวนการนัดหมาย POC", url: "#" },
      { code: "SOP-SE-04", title: "กระบวนการจัดทำใบเสนอราคา", url: "#" },
      { code: "SOP-SE-05", title: "กระบวนการเรียกเก็บเงินจากลูกค้าและการทำสัญญา", url: "#" },
      { code: "SOP-SE-06", title: "Manual การสร้าง Bill Payment สำหรับ Sales และ Renewal", url: "#" },
      { code: "SOP-SE-07", title: "การจัดทำการ Up Sell ของฝ่าย Sale", url: "#" },
      { code: "SOP-SC-01", title: "กระบวนการติดต่อลูกค้า", url: "#" },
      { code: "SOP-SC-02", title: "การนัด Demo", url: "#" },
      { code: "SOP-TC-01", title: "การ Proof of Concept (POC)", url: "#" }
    ],
    form: [
      { code: "FM-SE-01", title: "ใบเสนอราคา", url: "#" },
      { code: "FM-SE-02", title: "สัญญาการใช้บริการโปรแกรม Humansoft", url: "#" },
      { code: "FM-SE-03", title: "Summary Report", url: "#" }
    ]
  },

  first_year: {
    name: "First Year",
    desc: "กระบวนการลูกค้าปีแรก",
    icon: "📘",
    sop: [
      { code: "SOP-IM-01", title: "การรับลูกค้าและการตั้งค่าระบบ (Get requirement / Set Up)", url: "#" },
      { code: "SOP-IM-02", title: "การ Training และการสนับสนุนหลังเริ่มใช้งาน", url: "#" },
      { code: "SOP-RN-01", title: "กระบวนการติดตามลูกค้าเพื่อต่ออายุสัญญา", url: "#" }
    ],
    form: [
      { code: "FM-IM-01", title: "One Page", url: "#" },
      { code: "FM-IM-02", title: "เอกสารขอเปลี่ยน Admin-Owner", url: "#" },
      { code: "FM-IM-03", title: "ฟอร์มตรวจรับงานและลงนามรับรอง", url: "#" }
    ]
  },

  old_customer: {
    name: "Old Customer",
    desc: "กระบวนการดูแลลูกค้าเดิม",
    icon: "🔁",
    sop: [
      { code: "SOP-CS-01", title: "กระบวนการตอบกลับลูกค้า", url: "#" },
      { code: "SOP-CS-02", title: "กระบวนการเปิด Ticket", url: "#" },
      { code: "SOP-CS-03", title: "วิธีการเปิด Incident", url: "#" },
      { code: "SOP-CS-04", title: "การจัดการและตรวจสอบ Incident", url: "#" },
      { code: "SOP-CS-05", title: "กระบวนการรับ Requirement จากลูกค้า", url: "#" },
      { code: "SOP-CS-06", title: "การจัดการข้อร้องเรียน (Complaint Management)", url: "#" },
      { code: "SOP-CS-07", title: "กระบวนการดูแลลูกค้าต่อจากทีม Implementor", url: "#" },
      { code: "SOP-CS-08", title: "การส่งข้อมูลระหว่าง Customer Service กับแผนกอื่น", url: "#" },
      { code: "SOP-RN-02", title: "กระบวนการติดตามลูกค้าเพื่อต่ออายุสัญญา", url: "#" },
      { code: "SOP-RN-03", title: "การจัดทำใบเสนอราคาและการทำสัญญา (Renewal)", url: "#" },
      { code: "SOP-RN-04", title: "กระบวนการ Up Sell ของ Renewal", url: "#" }
    ],
    form: []
  },

  operator: {
    name: "Operator",
    desc: "กระบวนการทำงาน Operator",
    icon: "🎧",
    sop: [
      { code: "SOP-OP-01", title: "กระบวนการรับลูกค้า", url: "#" },
      { code: "SOP-OP-02", title: "กระบวนการเปิด Ticket", url: "#" },
      { code: "SOP-OP-03", title: "การจัดการข้อร้องเรียนของทีม Operator", url: "#" },
      { code: "SOP-OP-04", title: "การส่งข้อมูลระหว่าง Operator กับแผนกอื่น", url: "#" }
    ],
    form: []
  },

  product: {
    name: "Product",
    desc: "เอกสารฝ่ายพัฒนาผลิตภัณฑ์",
    icon: "🧩",
    sop: [
      { code: "SOP-PD-01", title: "Product Development", url: "#" }
    ],
    form: [
      { code: "FM-PD-01", title: "Open API Form", url: "#" },
      { code: "FM-PD-02", title: "แบบลงนามรับทราบความเสี่ยง", url: "#" },
      { code: "FM-PD-03", title: "หนังสือมอบสิทธิ์การทำงานร่วมกับระบบ HumanSoft", url: "#" }
    ]
  },

  hr: {
    name: "HR",
    desc: "ฝ่ายทรัพยากรบุคคล",
    icon: "👥",
    sop: [
      { code: "SOP-HR-01", title: "การฝึกอบรม", url: "#" },
      { code: "SOP-HR-02", title: "การสรรหาบุคคล (Recruitment)", url: "#" },
      { code: "SOP-HR-03", title: "การจ่ายเงินเดือนพนักงาน (Payroll)", url: "#" },
      { code: "SOP-HR-04", title: "การพ้นสภาพพนักงาน", url: "#" }
    ],
    form: [
      { code: "FM-HR-01", title: "ใบขออนุมัติอัตรา", url: "#" },
      { code: "FM-HR-02", title: "ใบสมัครงาน", url: "#" },
      { code: "FM-HR-03", title: "แบบฟอร์มการทำลายสื่อบันทึกข้อมูล", url: "#" },
      { code: "FM-HR-04", title: "แบบประเมินผลทดลองปฏิบัติงาน", url: "#" },
      { code: "FM-HR-05", title: "Job Description", url: "#" },
      { code: "FM-HR-06", title: "เปลี่ยนตำแหน่งและโอนย้ายแผนก", url: "#" },
      { code: "FM-HR-07", title: "แจ้งการปรับเงินเดือน", url: "#" },
      { code: "FM-HR-08", title: "แบบประเมินการสอบสัมภาษณ์", url: "#" },
      { code: "FM-HR-09", title: "แบบขอเปลี่ยนแปลงข้อมูลประวัติ", url: "#" },
      { code: "FM-HR-10", title: "แบบฟอร์มลาออก", url: "#" }
    ]
  },

  it: {
    name: "IT",
    desc: "ฝ่ายเทคโนโลยีสารสนเทศ",
    icon: "💻",
    sop: [
      { code: "SOP-IT-01", title: "งาน IT Support", url: "#" }
    ],
    form: []
  },

  document: {
    name: "Document Control",
    desc: "ระบบควบคุมเอกสาร",
    icon: "📄",
    sop: [
      { code: "SOP-DC-01", title: "Document Control", url: "#" }
    ],
    form: [
      { code: "FM-DC-01", title: "ใบขอดำเนินการเรื่องเอกสาร (DAR)", url: "#" },
      { code: "FM-DC-02", title: "DAR Log", url: "#" },
      { code: "FM-DC-03", title: "Distribution List", url: "#" },
      { code: "FM-DC-04", title: "ทะเบียนบันทึกคุณภาพ", url: "#" },
      { code: "FM-DC-05", title: "ใบขออนุมัติทำลายบันทึกคุณภาพ", url: "#" }
    ]
  },

  purchase: {
    name: "Purchase",
    desc: "ฝ่ายจัดซื้อ",
    icon: "🛒",
    sop: [
      { code: "SOP-PU-01", title: "Purchase", url: "#" }
    ],
    form: [
      { code: "FM-PU-01", title: "ทะเบียนรายชื่อผู้ขาย", url: "#" },
      { code: "FM-PU-02", title: "ใบคัดเลือกผู้ขาย", url: "#" },
      { code: "FM-PU-03", title: "ใบประเมินผู้ขาย", url: "#" },
      { code: "FM-PU-04", title: "ใบขออนุมัติจัดซื้อ", url: "#" },
      { code: "FM-PU-05", title: "ใบสั่งซื้อ", url: "#" }
    ]
  },

  qmr: {
    name: "QMR",
    desc: "Quality Management Representative",
    icon: "✅",
    sop: [
      { code: "SOP-MR-01", title: "Internal Audit", url: "#" },
      { code: "SOP-MR-02", title: "Customer Complaint", url: "#" },
      { code: "SOP-MR-03", title: "Corrective Action", url: "#" }
    ],
    form: [
      { code: "FM-MR-01", title: "แผนตรวจติดตามภายใน", url: "#" },
      { code: "FM-MR-02", title: "ประกาศการตรวจติดตามภายใน", url: "#" },
      { code: "FM-MR-03", title: "Checklist การตรวจติดตามภายใน", url: "#" },
      { code: "FM-MR-04", title: "รายงานผลการตรวจติดตาม", url: "#" },
      { code: "FM-MR-05", title: "CAR", url: "#" }
    ]
  },

  isms: {
    name: "ISMS",
    desc: "Information Security Management System",
    icon: "🔐",
    sop: [
      { code: "SOP-ISMS-01", title: "Web Filtering", url: "#" },
      { code: "SOP-ISMS-02", title: "Supplier Relationship Management", url: "#" },
      { code: "SOP-ISMS-03", title: "Disposal of Media", url: "#" },
      { code: "SOP-ISMS-04", title: "Mobile Device and BYOD", url: "#" },
      { code: "SOP-ISMS-05", title: "Assets Management", url: "#" },
      { code: "SOP-ISMS-06", title: "User Management", url: "#" },
      { code: "SOP-ISMS-07", title: "System Testing", url: "#" },
      { code: "SOP-ISMS-08", title: "Supply Relationship Management", url: "#" },
      { code: "SOP-ISMS-09", title: "User Management", url: "#" },
      { code: "SOP-ISMS-10", title: "User Management", url: "#" },
      { code: "SOP-ISMS-11", title: "Cloud Management", url: "#" },
      { code: "SOP-ISMS-12", title: "Software Installation", url: "#" }
    ],
    form: []
  }

};
