/**
 * Thêm sinh viên
 * hiển thị lên bảng
 * cập nhật, xóa sv
 * reset dữ liệu sv trên form
 * lưu và lấy dữ liệu được lưu trữ ở Local Strorage
 * Validation dữ liệu user nhập (ràng buộc)
 * Tìm kiếm
 *
 */

class SinhVien {
    txtMaSV = "";
    txtTenSV = "";
    txtEmail = "";
    txtPass = "";
    txtNgaySinh = "";
    khSV = "";
    txtDiemToan = "";
    txtDiemLy = "";
    txtDiemHoa = "";
    //phương thức
    tinhDiemTrungBinh = function () {
        return (
            (this.txtDiemHoa * 1 + this.txtDiemLy * 1 + this.txtDiemToan * 1) /
            3
        );
    };
}
