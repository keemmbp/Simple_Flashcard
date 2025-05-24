# Simple Flashcard

แอปพลิเคชันแฟลชการ์ดอย่างง่ายสำหรับฝึกทบทวนความรู้ สามารถเพิ่ม ลบ และสลับดูคำถาม-คำตอบได้ รองรับการใช้งานบนมือถือและเดสก์ท็อป

## คุณสมบัติ

- แสดงแฟลชการ์ด (คำถาม/คำตอบ)
- พลิกการ์ดเพื่อดูคำตอบหรือคำถาม
- เลื่อนดูการ์ดถัดไป/ก่อนหน้า
- เพิ่มแฟลชการ์ดใหม่ (บันทึกลง Local Storage)
- ลบแฟลชการ์ดปัจจุบัน
- โหลดแฟลชการ์ดเริ่มต้นจาก `data.json`
- อินเทอร์เฟซสวยงามด้วย Semantic UI
- รองรับการใช้งานบนมือถือ (Responsive Design)

## วิธีใช้งาน

1. เปิดไฟล์ `index.html` ด้วยเว็บเบราว์เซอร์ (แนะนำ Chrome, Edge, Firefox)
2. ใช้ปุ่ม **Previous**, **Flip Card**, **Next** เพื่อเลื่อนและพลิกการ์ด
3. เพิ่มการ์ดใหม่โดยกด **Add New Card** กรอกข้อมูลแล้วกด **Add Card**
4. ลบการ์ดปัจจุบันด้วยปุ่ม **Delete Current Card**

## โครงสร้างไฟล์

- `index.html` — หน้าเว็บหลัก
- `style.css` — สไตล์และการจัดวาง
- `script.js` — ลอจิกฝั่งผู้ใช้ (JavaScript)
- `data.json` — ข้อมูลแฟลชการ์ดเริ่มต้น
- `PLAN.md` — แผนการพัฒนาและรายละเอียดฟีเจอร์

## การพัฒนา

- HTML5, CSS3, JavaScript (ES6+)
- Semantic UI สำหรับ UI Components
- ข้อมูลผู้ใช้ถูกเก็บใน Local Storage

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

