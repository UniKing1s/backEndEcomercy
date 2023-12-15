import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    maHoaDon: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    ngayXuatHoaDon: {
      type: Date,
      required: false,
      default: new Date(),
    },
    tenNguoiNhan: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    diaChi: {
      type: String,
      required: true,
    },
    tongTien: {
      type: Number,
      required: true,
    },
    loaiThanhToan: {
      type: String,
      required: true,
    },
    chiTietHoaDon: {
      type: Object,
      required: true,
    },
  },
  { versionKey: false }
);
export const billModel = mongoose.model("bill", schema);
