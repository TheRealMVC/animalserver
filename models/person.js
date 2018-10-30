module.exports = (sequelize, DataTypes) => {
    const Person = sequelize.define('person', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
  
    return Person;
  }