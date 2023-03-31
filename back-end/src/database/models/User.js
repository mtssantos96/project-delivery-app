module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
    {
      timestamps: false,
      tableName: 'users',
      underscored: true,
    })

  User.associate = ({ Sale }) => {
    User.hasMany(Sale, {
      as: 'orders',
      foreignKey: 'user_id',
    }),

      User.hasMany(Sale, {
        as: 'sales',
        foreignKey: 'seller_id',
      })
  }

  return User;
}