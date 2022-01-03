const mongoose = require("mongoose");
const dayjs = require("dayjs");
require("dayjs/locale/id");

const WorkSchema = new mongoose.Schema({
  tanggal: {
    type: String,
    required: true,
  },
  lokasi: {
    type: String,
    required: true,
  },
  pekerjaan: {
    type: String,
    required: true,
  },
  personil: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    immutable: true,
    default: () => dayjs().locale("id").format("dddd[,]DD/MM/YYYY[,]HH:mm:ss"),
  },
  updatedAt: {
    type: String,
  },
});

WorkSchema.pre("save", function (next) {
  this.updatedAt = dayjs().locale("id").format("dddd[,]DD/MM/YYYY[,]HH:mm:ss");
  //console.log(this.tanggal);
  this.tanggal = dayjs(this.tanggal).locale("id").format("DD MMMM YYYY");
  next();
});

module.exports = mongoose.model("Work", WorkSchema);
