# bluessky

## HƯỚNG DẪN SỬ DỤNG

Cài đặt mongodb

- Bước 1: Cài đặt mongodb
- Bước 2: Mình cài trong ổ D:/, và tạo trong ổ D:/ 2 thư mục là mongodb (cài đặt mongodb ở thư mục này), mongodb_data (thư mục quản lý data)
- Bước 3: Tạo file mongodb.txt và điền vào lệnh: D:\mongodb\mongodb\bin\mongod.exe --dbpath=D:\mongodb_data
- Bước 4: chuyển đuôi file mongodb.txt thành mongodb.bat, rồi thực thi file đó

---

Sử dụng

- Bước 1: Tải file, mở file bằng môi trường code.

- Bước 2: Mở Termial hoặc cmd, cd đến thư mục weather_app

- Bước 3: Gõ lần lượt các lệnh (Đợi chạy xong mới gõ lệnh tiếp theo)

* npm i
* npm run build
* npm run server

- Bước 4: Mở trình duyệt web, truy cập: http://localhost:5000/

---

Sử dụng postman

- Import file Bluessky.postman_collection.json trong thư mục weather_app để sử dụng postman

---

Sơ đồ quan hệ

- Truy cập https://app.diagrams.net/
- Chọn Open Exists Diagram
- Chọn file RelationshipComponent.drawio trong thư mục weather_app

- Thinking in react: Bluessky_Relationship_Thinking_In_React.drawio

---

Hiệu ứng CSS thuần trước khi chuyển sang Material - UI

- Mở thư mục testEffectCSS trong thư mục weather_app bằng IDE (Trình code)
- Mở live server file test.html

---

Tất cả các dependencies đều nằm trong package.json - dùng chung cả frontend và backend

- Nếu bạn muốn code giao diện thì gõ lệnh: npm start, source code ở thư mục src
- Nếu bạn muốn code server thì gõ lệnh: npm run build trước rồi npm run server, source code ở thư mục server

---

Một số link liên quan

- https://bluessky.herokuapp.com/
- https://www.youtube.com/playlist?list=PL0-FzENhrcBSP88eGRNwnrsWCHbVr6P-V
