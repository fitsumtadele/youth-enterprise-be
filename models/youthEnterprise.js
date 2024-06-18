module.exports = (sequelize, DataTypes) => {
    const YouthEnterprise = sequelize.define('YouthEnterprise', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DOUBLE, 
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DOUBLE, 
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users', 
          key: 'id',
        },
      },
    });
  
    YouthEnterprise.associate = (models) => {
      YouthEnterprise.belongsTo(models.User, { foreignKey: 'userId' });
      YouthEnterprise.hasMany(models.Request, { foreignKey: 'enterpriseId' });
    };
  
    return YouthEnterprise;
  };
  