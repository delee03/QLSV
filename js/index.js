/** Các chức năng có trong dự án quản lí sinh viên
 * Thêm Sinh Viên
 * Đưa dữ liệu các sinh viên hiển thị lên bảng
 * Xoá Sinh Viên
 * Chỉnh sửa thông tin sinh viên
 * Reset dữ liệu sinh viên trên form
 * Lưu và lấy dữ liệu được lưu trữ ở localStorage
 * Validation dữ liệu người dùng nhập (Ràng buộc)
 * Tìm kiếm sinh viên
 *
 */
let arrSinhVien = getLocalStorage();
renderSinhVien();

//thêm sinh viên
let formQLSV = document.getElementById("formQLSV");

formQLSV.onsubmit = function (e) {
    e.preventDefault();
    console.log("Tôi ấn submit");
    //lấy ra tất cả input select trong form
    let arrField = document.querySelectorAll(
        "#formQLSV input, #formQLSV select"
    );
    //khởi tạo 1 đối tượng sv
    let sv = new SinhVien();

    for (let tag of arrField) {
        //destructoring
        let { value, id } = tag;
        sv[id] = value;
    }
    arrSinhVien.push(sv);
    console.log(sv);
    //lưu dữ liệu vào localStorage
    saveLocalStorage();

    //hiển thị dữ liệu ra bảng render
    renderSinhVien();
    //reset form
    formQLSV.reset();
    document.getElementById("btnReset").onclick = function () {
        document.getElementById("formQLSV").reset();
    };
};

//Hiển thị dữ liệu trong manngr lên giao diện
//default Parameter
function renderSinhVien(arr = arrSinhVien) {
    let content = "";
    for (let sv in arr) {
        let newSv = new SinhVien();
        Object.assign(newSv, sv);
        let { txtMaSV, txtEmail, txtTenSV, txtPass, txtNgaySinh, khSV } = newSv;
        let diemTB = newSv.tinhDiemTrungBinh();
        console.log(newSv);
        console.log(sv);
        content += `
        <tr>
                <td>${txtMaSV}</td>
                <td>${txtTenSV}</td>
                <td>${txtEmail}</td>
                <td>${txtPass}</td>
                 <td>${txtNgaySinh}</td>
                <td>${khSV}</td>
                <td>${diemTB.toFixed(2)}</td>
                <td><button class="btn btn-warning">Sửa</button></td>
                 <td><button class="btn btn-danger">Xóa</button></td>
            </tr>
        `;
    }
    document.getElementById("tbodySinhVien").innerHTML = content;
}

//thực hiện hàm lưu trữ local storage
function saveLocalStorage(key = "arrSinhVien", value = arrSinhVien) {
    localStorage.setItem(key, JSON.stringify(value));
}
//lấy dữ liệu từ local Storage
function getLocalStorage(key = "arrSinhVien") {
    let dataLocal = localStorage.getItem(key);
    let newDataLocal = localStorage.getItem(dataLocal);
    // console.log(newDataLocal);
    // if (newDataLocal) {
    //     arrSinhVien = newDataLocal;
    // }
    return newDataLocal ? newDataLocal : []; //nếu có dữ liệu trả về dữ liệu, nếu không trả về mảng rỗng
}

//ví dụ về local Storage
{
    // // Lưu chuỗi vào localStorage
    // localStorage.setItem("hoTen", "Quang Khải");
    // // Đối tượng cần chuyển đổi về JSON trước khi lưu trữ
    // let svLam = {
    //     hoTen: "Lâm",
    //     tuoi: 20,
    // };
    // let sinhVienLam = JSON.stringify(svLam);
    // localStorage.setItem("sinhVienLam", sinhVienLam); // Thay đổi key để không chứa dấu hai chấm
    // // Mảng cũng cần chuyển đổi về JSON trước khi lưu trữ
    // let arrNumber = [1, 5, 7, 8];
    // let jsonArrNumber = JSON.stringify(arrNumber);
    // localStorage.setItem("arrNumber", jsonArrNumber);
    // // Kiểm tra việc lấy dữ liệu từ localStorage và hiển thị
    // let hoTen = localStorage.getItem("hoTen");
    // console.log(hoTen); // "Quang Khải"
    // let sinhVienLamRetrieved = localStorage.getItem("sinhVienLam");
    // let svLamObject = JSON.parse(sinhVienLamRetrieved); // Chuyển đổi lại thành đối tượng
    // console.log(svLamObject); // { hoTen: "Lâm", tuoi: 20 }
    // let arrNumberRetrieved = localStorage.getItem("arrNumber");
    // let arrNumberArray = JSON.parse(arrNumberRetrieved); // Chuyển đổi lại thành mảng
    // console.log(arrNumberArray); // [1, 5, 7, 8]
}
