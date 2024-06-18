module.exports = (sequelize, DataTypes) => {
    const Request = sequelize.define('Request', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'accepted', 'completed'),
        defaultValue: 'pending',
      },
      requesterId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users', // use the name of the table as defined in the User model
          key: 'id',
        },
      },
      enterpriseId: {
        type: DataTypes.UUID,
        references: {
          model: 'YouthEnterprises', // use the name of the table as defined in the YouthEnterprise model
          key: 'id',
        },
      },
    });
  
    Request.associate = (models) => {
      Request.belongsTo(models.User, { foreignKey: 'requesterId' });
      Request.belongsTo(models.YouthEnterprise, { foreignKey: 'enterpriseId' });
      Request.hasMany(models.Chat, { foreignKey: 'requestId' });
    };
  
    return Request;
  };
  