var db = require("../db/connectDB");

var Magazine = {
  find: function (result) {
    db.query("SELECT * FROM magazine", function (err, data) {
      if (err || data.length == 0) {
        return result(null);
      } else {
        return result(data);
      }
    });
  },
  findById: function (id, result) {
    db.query("select * from magazine where id=?", [id], function (err, data) {
      if (err || data.length == 0) {
        return result(null);
      } else {
        return result(data);
      }
    });
  },
  insert: function (magazine, result) {
    db.query("Insert into magazine SET ?", magazine, function (err, data) {
      if (err || data.length == 0) {
        return result(null);
      } else {
        return result({ id: data.insertId, ...magazine });
      }
    });
  },
  deleteById: function (id, callback) {
    return db.query("delete from magazine where Id=?", [id], callback);
  },
  update: function (id, magazine, result) {
    db.query(
      "update magazine set name=?,place=?,area=? where Id=?",
      [magazine.name, magazine.place, magazine.area, id],
      function (err, data) {
        if (err || data.length == 0) {
          return result(null);
        } else {
          return result({ id: data.insertId, ...magazine });
        }
      }
    );
  },
};
module.exports = Magazine;
