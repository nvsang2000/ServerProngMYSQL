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
  insert: function (consult, result) {
    db.query("Insert into consult SET ?", consult, function (err, data) {
      if (err || data.length == 0) {
        return result(null);
      } else {
        return result({ id: data.insertId, ...consult });
      }
    });
  },
  deleteById: function (id, callback) {
    return db.query("update consult set isDelete=true where Id=?", [id], callback);
  },
  update: function (id, consult, result) {
    db.query(
      "update consult set name=?,place=?,url_image=? where Id=?",
      [consult.name, consult.place, consult.url_image, id],
      function (err, data) {
        if (err || data.length == 0) {
          return result(null);
        } else {
          return result({ id: data.insertId, ...consult });
        }
      }
    );
  },
};
module.exports = Consult;
