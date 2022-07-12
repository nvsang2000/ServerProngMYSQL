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
    db.query("SELECT * FROM equipment WHERE id=?", [id], function (err, data) {
      if (err || data.length == 0) {
        return result(null);
      } else {
        return result(data);
      }
    });
  },
  insert: function (equipment, result) {
    db.query("INSERT INTO equipment SET ?", equipment, function (err, data) {
      if (err || data.length == 0) {
        return result(null);
      } else {
        return result({ id: data.insertId, ...equipment });
      }
    });
  },
  deleteById: function (id, callback) {
    return db.query(
      "UPDATE equipment SET isDelete=true WHERE Id=?",
      [id],
      callback
    );
  },
  update: function (id, equipment, result) {
    db.query(
      "UPDATE equipment SET name=?,place=?,url_image=? WHERE Id=?",
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
