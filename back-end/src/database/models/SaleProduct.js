module.exports = (sequelize, DataTypes) => {
    const SaleProduct = sequelize.define('SaleProduct', {
      saleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      quantity: DataTypes.INTEGER,
    },
      {
        timestamps: false,
        tableName: 'sales_products',
        underscored: true,
      })

    SaleProduct.associate = ({ Sale, Product }) => {
      Sale.belongsToMany(Product, {
          as: 'products',
          through: SaleProduct,
          foreignKey: 'saleId',
          otherKey: 'productId'
        })
      Product.belongsToMany(Sale, {
          as: 'sales',
          through: SaleProduct,
          foreignKey: 'productId',
          otherKey: 'saleId' 
        })
    }
  
    return SaleProduct;
  }