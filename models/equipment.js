var db = require("../db/connectDB");

var Equipment = {
  find: function (result) {
    db.query("SELECT * FROM equipment", function (err, data) {
      if (err || data.length == 0) {
        return result(err, null);
      } else {
        return result(null, data);
      }
    });
  },
  findById: function (id, result) {
    db.query("SELECT * FROM equipment WHERE id=?", [id], function (err, data) {
      if (err || data.length == 0) {
        return result(err, null);
      } else {
        return result(null, data);
      }
    });
  },
  insert: function (equipment, result) {
    db.query("INSERT INTO equipment SET ?", equipment, function (err, data) {
      if (err || data.length == 0) {
        return result(err, null);
      } else {
        return result(null, { id: data.insertId, ...equipment });
      }
    });
  },
  deleteById: function (id, result) {
    return db.query(
      "UPDATE equipment SET isDelete=true WHERE Id=?",
      [id],
      function (err, data) {
        if (err || data.length == 0) {
          return result(err, null);
        } else {
          return result(null, data);
        }
      }
    );
  },
  update: function (id, equipment, result) {
    db.query(
      "UPDATE equipment SET name=?,place=?,url_image=? WHERE Id=?",
      [equipment.name, equipment.place, equipment.url_image, id],
      function (err, data) {
        if (err || data.length == 0) {
          return result(err,null);
        } else {
          return result(null,{ id: data.insertId, ...equipment });
        }
      }
    );
  },
};
module.exports = Equipment;
