﻿# Flash_card
- Sử dụng postgresql hoặc phpmyadmin tạo db
- thay thế giá trị file env
+ PORT = <cổng server>
+ CLIENT_URL=<đường dẫn client vd:'http://localhost:3000'>
+ JWT_SECRET=<key giải mã jwt>
+ JWT_EXPIRES_IN=<thời gian hết hạn jwt vd:1h>
- Vào file config.json trong thư mục config của server và thay thế các giá trị tương ứng của db 
- Gõ câu lệnh npm i trong terminal của thư mục backend và frontend
- chạy câu lệnh npx sequelize-cli db:migrate trong terminal của thư backend để khởi tạo db
- chạy câu lệnh npm start trong terminal của thư mục backend và frontend để khởi chạy dự án
