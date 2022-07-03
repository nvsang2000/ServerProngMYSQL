var db = require("../db/connectDB");

var Consult = {
  find: function (callback) {
    return db.query("SELECT * FROM consult", callback);
  },
  findById: function (id, callback) {
    return db.query("select * from consult where Id=?", [id], callback);
  },
  addSV: function (sinhvien, callback) {
    return db.query(
      "Insert into sinhvien(name,class,dob) values(?,?,?)",
      [sinhvien.name, sinhvien.class, sinhvien.dob],
      callback
    );
  },
  deleteSV: function (id, callback) {
    return db.query("delete from sinhvien where Id=?", [id], callback);
  },
  updateSV: function (id, sinhvien, callback) {
    return db.query(
      "update sinhvien set name=?,class=?,dob=? where Id=?",
      [sinhvien.name, sinhvien.class, sinhvien.dob, id],
      callback
    );
  },
};
module.exports = Consult;
