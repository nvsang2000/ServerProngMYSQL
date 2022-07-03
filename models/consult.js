var db = require("../db/connectDB");

var Consult = {
  find: function (result) {
    db.query("SELECT * FROM consult", function (err, data) {
      if (err || data.length == 0) {
        return result(null);
      } else {
        return result(data);
      }
    });
  },
  findById: function (id, result) {
    db.query("select * from consult where id=?", [id], function (err, data) {
      if (err || data.length == 0) {
        return result(null);
      } else {
        return result(data);
      }
    });
  },
  insert: function (consult, callback) {
    return db.query(
      "Insert into consult(name,place,url_image) values(?,?,?)",
      [consult.name, consult.place, consult.url_image],
      callback
    );
  },
  deleteById: function (id, callback) {
    return db.query("delete from consult where Id=?", [id], callback);
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
