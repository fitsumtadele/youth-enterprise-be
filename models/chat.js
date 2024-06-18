module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define('Chat', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      senderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      receiverId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      requestId: {
        type: DataTypes.UUID,
        references: {
          model: 'Requests',
          key: 'id',
        },
      },
    });
  
    Chat.associate = (models) => {
      Chat.belongsTo(models.User, { as: 'Sender', foreignKey: 'senderId' });
      Chat.belongsTo(models.User, { as: 'Receiver', foreignKey: 'receiverId' });
      Chat.belongsTo(models.Request, { foreignKey: 'requestId' });
      Chat.hasOne(models.Offer, { foreignKey: 'chatId' });
    };
  
    return Chat;
  };
  