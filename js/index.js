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

//get value sinh viên
function getValueSinhVien() {
    // sử dụng querySelectorAll
    let arrField = document.querySelectorAll(
        "#formQLSV input, #formQLSV select"
    );
    // khởi tạo một đối tượng từ lớp đối tượng SinhVien
    let sinhVien = new SinhVien();
    let isValid = true;
    // Phép toán nhị phân true (1), false(0)
    // true & false ==> 1 & 0 ==> 0(false)
    // true & true ==> 1 & 1 ==> 1 (true)

    for (let field of arrField) {
        // destructuring
        let { value, id } = field; // txtMaSV // txtTenSV
        // thực hiện lấy data-attribute của input
        let dataValidation = field.getAttribute("data-validation");
        console.log(dataValidation);
        sinhVien[id] = value;

        // Thực hiện validation dữ liệu người dùng
        // Thực hiện từ lệnh DOM đang có tới các input và select, sẽ sử dụng phương thức parentElement để DOM tới thẻ cha gần nhất
        let theCha = field.parentElement;
        let theSpanThongBao = theCha.querySelector("span");
        // console.log(theCha.querySelector("span"));

        let isEmpty = checkEmptyValue(value, theSpanThongBao); // true false
        isValid &= isEmpty;
        // xử lí nếu dữ liệu rỗng thì sẽ không xử lí bất kỳ hành động nào bên dưới
        if (!isEmpty) {
            continue;
        }
        // if (id == "txtTenSV") {
        //   isValid &= checkMinMaxValue(value, theSpanThongBao, 6, 10);
        // }
        // if (id == "txtEmail") {
        //   isValid &= checkEmailValue(value, theSpanThongBao);
        // }
        if (dataValidation == "doDai") {
            isValid &= checkMinMaxValue(value, theSpanThongBao, 6, 10);
        } else if (dataValidation == "email") {
            isValid &= checkEmailValue(value, theSpanThongBao);
        }
    }

    // thực hiện kiểm tra nếu isValid mang giá trị false thì return và không trả về sinhVien
    if (!isValid) {
        return;
    }
    return sinhVien;
}
//đồng bộ dữ liệu
function syncData() {
    renderSinhVien();
    saveLocalStorage();
}
//thêm sinh viên
let formQLSV = document.getElementById("formQLSV");

formQLSV.onsubmit = function (e) {
    e.preventDefault();
    console.log("Tôi ấn submit");
    //thực hiện chạy getValueSinhVien để lấy dữ liệu từ form
    let sv = getValueSinhVien();
    arrSinhVien.push(sv);
    console.log(sv);
    //lưu dữ liệu vào localStorage
    saveLocalStorage();

    //hiển thị dữ liệu ra bảng render
    renderSinhVien();
    //reset form
    formQLSV.reset();
    hienThiThongBao("Thêm sinh viên thành công", 2000, "bg-success");
};

//Hiển thị dữ liệu trong manngr lên giao diện
//default Parameter
function renderSinhVien(arr = arrSinhVien) {
    let content = "";
    for (let sv of arr) {
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
                <td><button onclick="getInfoSinhVien('${txtMaSV.toString()}')" class="btn btn-warning">Sửa</button></td>
                 <td><button onclick="deleteSinhVien('${txtMaSV.toString()}')" class="btn btn-danger">Xóa</button></td>
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
    let newDataLocal = JSON.parse(dataLocal);
    // console.log(newDataLocal);
    // if (newDataLocal) {
    //     arrSinhVien = newDataLocal;
    // }
    return newDataLocal ? newDataLocal : []; //nếu có dữ liệu trả về dữ liệu, nếu không trả về mảng rỗng
}

//findIndex => index ==> -1
//find => item ==> undefinded
//xóa sinh viên
function deleteSinhVien(maSV) {
    //tìm kiếm vị trí index
    let index = arrSinhVien.findIndex((sv) => sv.txtMaSV == maSV);
    if (index != -1) {
        arrSinhVien.splice(index, 1);
        syncData();
    }
    hienThiThongBao("Xóa sinh viên thành công", 2000, "bg-danger");
    console.log("Xóa Mã SV: ", maSV);
}

//gọi sv truyền dữ liệu lên form
function getInfoSinhVien(maSV) {
    let sv = arrSinhVien.find((sv) => sv.txtMaSV == maSV);
    //trả về 1 cái object nếu tìm ra => gán về boolean nên kiểm tra là true hoặc false
    //ko phải sv != undefinded
    if (sv) {
        let arrField = document.querySelectorAll(
            "#formQLSV input, #formQLSV select"
        );
        for (let tag of arrField) {
            let { id } = tag; //txtMaSV
            tag.value = sv[id];
            //prevent action sửa MaSV
            if (id == "txtMaSV") {
                tag.readOnly = true;
            }
        }
        //  document.getElementById('txtMaSV').readOnly = true;

        /* document.getElementById("txtMaSV").value = sv.txtMaSV;
        document.getElementById("txtTenSV").value = sv.txtTenSV;
        document.getElementById("txtEmail").value = sv.txtEmail;
        document.getElementById("txtPass").value = sv.txtPass;
        document.getElementById("txtNgaySinh").value = sv.txtNgaySinh;
        document.getElementById("khSV").value = sv.khSV;*/
    }
    console.log("lấy lên Mã SV: ", maSV);
}
//update sinh viên
function updateSinhVien() {
    //lấy giá trị input maSV
    let maSV = document.getElementById("txtMaSV").value;
    let sv = arrSinhVien.find((sv) => sv.txtMaSV == maSV);
    // let sinhVien = getValueSinhVien();
    if (sv) {
        let arrField = document.querySelectorAll(
            "#formQLSV input, #formQLSV select"
        );
        for (let tag of arrField) {
            //destructoring mảng input select từ form
            let { id, value } = tag;
            sv[id] = value;
        }

        // sv.txtTenSV = document.getElementById("txtTenSV").value;
        // sv.txtEmail = document.getElementById("txtEmail").value;
        //  sv.txtPass = document.getElementById("txtPass").value;
        //sv.txtNgaySinh = document.getElementById("txtNgaySinh").value;
        //   sv.khSV = document.getElementById("khSV").value;
        saveLocalStorage();
        renderSinhVien();
        formQLSV.reset();
        document.getElementById("txtMaSV").readOnly = false;
        console.log("update thành công");
        hienThiThongBao("Cập nhật sinh viên thành công", 2000, "bg-warning");
        console.log("Cập nhật Mã SV: ", maSV);
    }
}

//truyền hàm ko cần () để ko bị tự chạy khi load trang, nếu có parameter thì bỏ vào hàm nặc danh
document.getElementById("btnUpdate").addEventListener("click", updateSinhVien);
//document.getElementById("btnUpdate").onclick = updateSinhVien;
document.getElementById("btnSearch").onclick = searchSinhVien;

//tìm kiếm sinh viên
function searchSinhVien() {
    //dom lấy giá trị tên từ ô search input
    let keyword = document.getElementById("txtSearch").value;
    let arrSearch = arrSinhVien.filter((sv) => {
        return sv.txtTenSV.toLowerCase().includes(keyword.toLowerCase());
    });
    renderSinhVien(arrSearch);
    console.log("Tìm kiếm Mã SV: ", keyword);
}

//function xử lí thông báo
function hienThiThongBao(text, duration, className) {
    Toastify({
        text,
        duration,
        className,
        // destination: "https://github.com/apvarun/toastify-js",
        // newWindow: true, //giống target = blank
        close: true,

        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            // background: "linear-gradient(to right, #00b09b, #0f0)",
            width: 300,
        },
        //  onClick: function () {}, // Callback after click
        backgroundColor: "red",
    }).showToast();
}

// Tìm kiếm sinh viên
document.getElementById("txtSearch").oninput = function (event) {
    // console.log(event.target.value); // â ==> a
    // sản phẩm = "Nồi cơm điện" ==> "Noi com dien" ==> 'noi com dien'
    // keyword = '   noi com dien   ' ==> "   noi com dien   " ==> 'noi com dien'
    let newKeyWord = removeVietnameseTones(event.target.value)
        .trim()
        .toLowerCase();
    // console.log(newKeyWord);

    // includes "noi com dien" | "dien"
    // console.log("noi com dien".includes("di")); // true | false
    // tên sản phẩm .includes(newKeyWord) ==> true | false
    let arrFilter = arrSinhVien.filter((item, index) => {
        let newTenSV = removeVietnameseTones(item.txtTenSV)
            .trim()
            .toLowerCase();
        console.log(item);
        return newTenSV.includes(newKeyWord);
    });
    console.log(arrFilter);
};

//xử lí thông báo với Toastify lib
// Toastify({
//     text: "This is a toast",

//     duration: 3000,
// }).showToast();

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
