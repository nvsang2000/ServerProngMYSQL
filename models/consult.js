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
    db.query("SELECT * FROM consult WHERE id=?", [id], function (err, data) {
      if (err || data.length == 0) {
        return result(null);
      } else {
        return result(data);
      }
    });
  },
  insert: function (consult, result) {
    db.query("INSERT INTO consult SET ?", consult, function (err, data) {
      if (err || data.length == 0) {
        return result(null);
      } else {
        return result({ id: data.insertId, ...consult });
      }
    });
  },
  deleteById: function (id, callback) {
    return db.query(
      "UPDATE consult SET isDelete=true WHERE Id=?",
      [id],
      callback
    );
  },
  update: function (id, consult, result) {
    db.query(
      "UPDATE consult SET name=?,place=?,url_image=? WHERE Id=?",
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
