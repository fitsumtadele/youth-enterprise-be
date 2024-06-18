module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('requester', 'youthEnterprise', 'allianceAdmin'),
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Request, { foreignKey: 'requesterId' });
    User.hasOne(models.YouthEnterprise, { foreignKey: 'userId' });
    User.hasMany(models.Chat, { as: 'SentMessages', foreignKey: 'senderId' });
    User.hasMany(models.Chat, { as: 'ReceivedMessages', foreignKey: 'receiverId' });
  };

  return User;
};
