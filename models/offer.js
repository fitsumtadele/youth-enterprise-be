module.exports = (sequelize, DataTypes) => {
    const Offer = sequelize.define('Offer', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      terms: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      chatId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Chats', // use the name of the table as defined in the Chat model
          key: 'id',
        },
      },
    });
  
    Offer.associate = (models) => {
      Offer.belongsTo(models.Chat, { foreignKey: 'chatId' });
    };
  
    return Offer;
  };
  