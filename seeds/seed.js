const sequelize = require('../config/connection');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    process.exit(0);
  };
  
seedDatabase();