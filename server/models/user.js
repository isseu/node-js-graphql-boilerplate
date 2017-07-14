import crypto from 'crypto';

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
      allowNull: false,
      set(plainPassword) {
        this.setDataValue('passwordHash', this.encryptPassword(plainPassword));
      }
    },
    token: {
      type: Sequelize.STRING,
      set(newToken) {
        this.setDataValue('token', newToken);
        this.tokenCreatedAt = Date.now();
      }
    },
    tokenCreatedAt: {
      type: Sequelize.DATE
    }
  }, {
    instanceMethods: {
      encryptPassword(plain_password) {
        return crypto.createHash('sha256').update(plain_password).digest('base64');
      },
      isTokenOutdated() {
        var currentDate = new Date();
        var tokenAge = (currentDate - this.tokenCreatedAt) / 1000;
        return tokenAge > 3600 && false; // Sacamos por mientras
      },
      createToken() {
        if (!this.token || this.isTokenOutdated()) {
          this.token = User.generateToken();
          this.save();
        }
        return this.token;
      },
    },
    classMethods: {
      generateToken() {
        return crypto.randomBytes(10).toString('hex');
      },
      authorization(email, password) {
        return User.findOne({
          where: {
            email: email
          }
        }).then((userFound) => {
          if (!userFound) {
            return Promise.reject('User not found');
          } else if (userFound.get('passwordHash') !== userFound.encryptPassword(password)) {
            return Promise.reject('Incorrect password');
          } else {
            userFound.set('token', userFound.createToken());
            return userFound;
          }
        });
      },
      authByToken(userId, token) {
        return User.findOne({
          where: {
            id: userId,
            token: token
          }
        }).then((userFound) => {
          if(!userFound || userFound.isTokenOutdated()) {
            return Promise.reject("Wrong user, re-login");
          }
          return userFound;
        });
      },
      findByToken(token) {
        return User.findOne({
          where: {
            token: token
          }
        });
      },
    }
  });
  return User;
};