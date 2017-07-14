import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

module.exports = function(sequelize, Sequelize) {
  var User = sequelize.define('user', {
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      },
      unique: true,
      allowNull: false
    },
    passwordHash: {
      type: Sequelize.STRING,
      allowNull: false 
    }
  },
  {
    timestamps: true,
  });
  User.encryptPasswordPromise = function(plain_password) {
    return bcrypt.hash(plain_password, 10);
  };
  User.authorization = function (email, password) {
    var user;
    return User.findOne({
      where: { email: email }
    }).then((userFound) => {
      if (!userFound) {
        return Promise.reject('User not found');
      }
      user = userFound;
      console.dir(password);
      return bcrypt.compare(password, userFound.get('passwordHash'));
    }).then((res) => {
      console.dir(res);
      if (!res) {
        return Promise.reject('Incorrect password');
      } else {
        // if user is found and password is right
        // create a token
        var token = jwt.sign({
          userId: user.get('id')
        }, 'SECRET CAT KEY', {
          expiresIn: 1440
        });
        return {
          user: user,
          token: token
        };
      }
    });
  };
  return User;
};