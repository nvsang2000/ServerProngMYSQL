var db = require("../db/connectDB");

var Equipment = {
  find: function (result) {
    db.query("SELECT * FROM equipment", function (err, data) {
      if (err || data.length == 0) {
        return result(null);
      } else {
        return result(data);
      }
    });
  },
  findById: function (id, result) {
    db.query("select * from equipment where id=?", [id], function (err, data) {
      if (err || data.length == 0) {
        return result(null);
      } else {
        return result(data);
      }
    });
  },
  insert: function (equipment, result) {
    db.query("Insert into equipment SET ?", equipment, function (err, data) {
      if (err || data.length == 0) {
        return result(null);
      } else {
        return result({ id: data.insertId, ...equipment });
      }
    });
  },
  deleteById: function (id, callback) {
    return db.query(
      "update equipment set isDelete=true where Id=?",
      [id],
      callback
    );
  },
  update: function (id, equipment, result) {
    db.query(
      "update equipment set name=?,place=?,url_image=? where Id=?",
      [equipment.name, equipment.place, equipment.url_image, id],
      function (err, data) {
        if (err || data.length == 0) {
          return result(null);
        } else {
          return result({ id: data.insertId, ...equipment });
        }
      }
    );
  },
};
module.exports = Equipment;
