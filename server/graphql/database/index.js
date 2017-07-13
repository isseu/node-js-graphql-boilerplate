import Sequelize from 'sequelize';
import crypto from 'crypto';

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USERNAME,
  process.env.PG_PASSWORD,
  {
    host: process.env.AWS_DB_HOST,
    port: '5432',
    dialect: 'postgres'
  }
);

const User = sequelize.define('user', {
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

const Inventory = sequelize.define('inventory', {
  name: Sequelize.STRING,
});

Inventory.belongsToMany(User, { through: 'user_inventory' });
User.belongsToMany(Inventory, { through: 'user_inventory' });

const Category = sequelize.define('category', {
  name: Sequelize.STRING,
});
Category.belongsTo(Category, { as: 'parent_category' });
Category.belongsTo(Inventory);
Inventory.hasMany(Category);

const CategoryAttribute = sequelize.define('category_attribute', {
  type: Sequelize.STRING,
  required: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  valueInt: Sequelize.INTEGER,
  valueText: Sequelize.TEXT,
});
CategoryAttribute.belongsTo(Category);

const Product = sequelize.define('product', {
  name: Sequelize.STRING,
  code: Sequelize.STRING,
  description: Sequelize.STRING,
  quantity: Sequelize.INTEGER,
});
Product.belongsTo(Category);

const ProductAttribute = sequelize.define('product_attribute', {
  valueDouble: Sequelize.DOUBLE,
  valueText: Sequelize.TEXT,
});
ProductAttribute.belongsTo(CategoryAttribute);
ProductAttribute.belongsTo(Product);

const StockMove = sequelize.define('stock_move', {
  quantity: Sequelize.INTEGER,
  price: Sequelize.INTEGER,
  date: Sequelize.DATE,
});
StockMove.belongsTo(Product);

export {
  User, Inventory, Category, CategoryAttribute,
  Product, ProductAttribute, StockMove, sequelize
};
