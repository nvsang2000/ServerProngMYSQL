var db = require("../db/connectDB");

var Auth = {
  find: function (result) {
    db.query("SELECT * FROM auth", function (err, data) {
      if (err || data.length == 0) {
        result(err, null);
      } else {
        result(null, data);
      }
    });
  },
  findById: function (email, result) {
    db.query("SELECT * FROM auth WHERE email=?", [email], function (err, data) {
      if (err || data.length == 0) {
        result(err, null);
      } else {
        result(null, data);
      }
    });
  },
  insert: function (auth, result) {
    db.query("INSERT INTO auth SET ?", auth, function (err, data) {
      if (err || data.length == 0) {
        return result(err,null);
      } else {
        return result(null,{ id: data.insertId, ...auth });
      }
    });
  },
  deleteById: function (id, callback) {
    return db.query("UPDATE auth SET isDelete=true WHERE id=?", [id], callback);
  },
  update: function (id, auth, result) {
    db.query(
      "UPDATE auth SET name=?,place=?,url_image=? WHERE id=?",
      [auth.name, auth.place, auth.url_image, id],
      function (err, data) {
        if (err || data.length == 0) {
          return result(null);
        } else {
          return result({ id: data.insertId, ...auth });
        }
      }
    );
  },
};
module.exports = Auth;
