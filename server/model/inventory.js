const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const Garages = require("../model/garages");

const Inventory = sequelize.define(
  "Inventory",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    garage_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Garages,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    item_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    vehicle_type: {
      type: DataTypes.ENUM('car', 'motorcycle', 'truck'),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Detailed description of the inventory item",
    },
    cover_img: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "URL to the cover image of the inventory item",
    },
  },
  {
    tableName: "inventory",
    timestamps: true,
  }
);

// Define associations
Inventory.belongsTo(Garages, { foreignKey: 'garage_id' });
Garages.hasMany(Inventory, { foreignKey: 'garage_id' });

module.exports = Inventory;