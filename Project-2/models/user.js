module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    illness: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "a",
      validate: {
        len: [1]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // limit length to 2 spaces
        len: [2, 2]
      }
    }
  });

  // User.sync({ force: true }).then(function() {
  //   return User.create({
  //     first_name: "Lisa",
  //     last_name: "Fortenberry-Sparos",
  //     user_name: "Kabul",
  //     illness: "smallpox",
  //     city: "Pittsburgh",
  //     st: "PA"
  //   });
  // });

  // User.sync({ force: true }).then(function() {
  //   return User.create({
  //     first_name: "Mark",
  //     last_name: "Smith",
  //     user_name: "msmith",
  //     illness: "leprosy",
  //     city: "Anchorage",
  //     st: "AK"
  //   });
  // });

  // User.sync({ force: true }).then(function() {
  //   return User.create({
  //     first_name: "Jane",
  //     last_name: "Doe",
  //     user_name: "jdoe",
  //     illness: "major depressive disorder",
  //     city: "Seattle",
  //     st: "WA"
  //   });
  // });

  return User;
};
