import { sequelize, User, Inventory } from './schema.js';

sequelize.sync({ sync: true }).then( () => {
	console.log("Creando seeds");

	var u = User.create({
		email: '',
		passwordHash: ''
	});
  var i = Inventory.create({
    name: 'Inventory #1'
  });
  Promise.all([u, i]).then((user, inventory) => {
    user.setInventories([inventory]);
  });
});