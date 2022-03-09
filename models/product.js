module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
      name: { type: DataTypes.STRING, allowNull: false }
    });
  
    Product.associate = models => {
      Product.belongsTo(models.Track, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  
    return Product;
  };
  