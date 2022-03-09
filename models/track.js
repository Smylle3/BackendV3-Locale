module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define("Track", {
    code: { type: DataTypes.STRING, allowNull: false },
    local: { type: DataTypes.STRING, allowNull: false },
  });

  Track.associate = (models) => {
    Track.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    }),
    Track.hasMany(models.Product, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
  };

  return Track;
};
