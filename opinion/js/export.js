// document.addEventListener("DOMContentLoaded", function() {
//     const table = document.getElementById("opinionTable");

//     // Lấy tham chiếu đến các nút xuất file
//     const exportButtons = document.querySelectorAll(".export-btn");

//     // Thêm sự kiện click cho mỗi nút xuất file
//     exportButtons.forEach(function(button) {
//         button.addEventListener("click", function() {
//             // Lấy loại file từ thuộc tính data-type của nút
//             const fileType = button.getAttribute("data-type");

//             // Sử dụng Highcharts để xuất dữ liệu từ bảng
//             Highcharts.exportData({
//                 table: table
//             }, {
//                 type: `application/vnd.ms-excel;charset=UTF-8;base64`, // Định dạng tệp: Excel
//                 filename: `opinion_table.${fileType}` // Tên tệp
//             });
//         });
//     });
// });