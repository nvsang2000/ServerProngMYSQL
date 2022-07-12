var db = require("../db/connectDB");

var Magazine = {
  find: function (result) {
    db.query("SELECT * FROM magazine", function (err, data) {
      if (err || data.length == 0) {
        return result(err, null);
      } else {
        return result(null, data);
      }
    });
  },
  findById: function (id, result) {
    db.query("SELECT * FROM magazine WHERE id=?", [id], function (err, data) {
      if (err || data.length == 0) {
        return result(err, null);
      } else {
        return result(null, data);
      }
    });
  },
  insert: function (magazine, result) {
    db.query("INSERT INTO magazine SET ?", magazine, function (err, data) {
      if (err || data.length == 0) {
        return result(err,null);
      } else {
        return result(null,{ id: data.insertId, ...magazine });
      }
    });
  },
  deleteById: function (id, callback) {
    return db.query(
      "UPDATE magazine SET isDelete=true WHERE Id=?",[id],
      function (err, data) {
        if (err || data.length == 0) {
          return result(err, null);
        } else {
          return result(null, { id: data.insertId, ...equipment });
        }
    }
    );
  },
  update: function (id, magazine, result) {
    db.query(
      "UPDATE magazine SET name=?,place=?,area=? WHERE Id=?",
      [magazine.name, magazine.place, magazine.area, id],
      function (err, data) {
        if (err || data.length == 0) {
          return result(err,null);
        } else {
          return result(null,{ id: data.insertId, ...magazine });
        }
      }
    );
  },
};
module.exports = Magazine;
