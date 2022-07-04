var db = require("../db/connectDB");

var Auth = {
  find: function (result) {
    db.query("SELECT * FROM auth", function (err, data) {
      if (err || data.length == 0) {
        return result(null);
      } else {
        return result(data);
      }
    });
  },
  findById: function (id, result) {
    db.query("select * from auth where id=?", [id], function (err, data) {
      if (err || data.length == 0) {
        return result(null);
      } else {
        return result(data);
      }
    });
  },
  insert: function (auth, result) {
    db.query("Insert into auth SET ?", auth, function (err, data) {
      if (err || data.length == 0) {
        return result(null);
      } else {
        return result({ id: data.insertId, ...auth });
      }
    });
  },
  deleteById: function (id, callback) {
    return db.query(
      "update auth set isDelete=true where Id=?",
      [id],
      callback
    );
  },
  update: function (id, auth, result) {
    db.query(
      "update auth set name=?,place=?,url_image=? where Id=?",
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
