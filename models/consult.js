var db = require("../db/connectDB");

var Consult = {
  find: function (callback) {
    return db.query("SELECT * FROM consult", callback);
  },
  findById: function (id, callback) {
    return db.query("select * from consult where id=?", [id], callback);
  },
  insert: function (consult, callback) {
    return db.query(
      "Insert into consult(name,place,url_image) values(?,?,?)",
      [consult.name, consult.place, consult.url_image],
      callback
    );
  },
  deleteById: function (id, callback) {
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
