import crypto from 'crypto';
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
  User.encryptPassword = function(plain_password) {
    return crypto.createHash('sha256').update(plain_password).digest('base64');
  };
  User.authorization = function (email, password) {
    return User.findOne({
      where: {
        email: email
      }
    }).then((userFound) => {
      if (!userFound) {
        return Promise.reject('User not found');
      } else if (userFound.get('passwordHash') !== User.encryptPassword(password)) {
        return Promise.reject('Incorrect password');
      } else {
        // if user is found and password is right
        // create a token
        var token = jwt.sign({
          userId: userFound.get('id')
        }, 'SECRET CAT KEY', {
          expiresIn: 1440
        });
        return {
          user: userFound,
          token: token
        };
      }
    });
  };
  return User;
};