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
