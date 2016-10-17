'use strict';

var Joi = require('joi');

module.exports = function(sequelize, DataTypes) {

  const Asset = sequelize.define('Asset', {
    type: {
      type: new DataTypes.VIRTUAL(DataTypes.STRING),
      get() {
        return 'assetType';
      }
    },
    asset_url: DataTypes.TEXT,
    updated_at: DataTypes.DATE,
    created_at: DataTypes.DATE
  }, {
    timestamps: false,
    tableName: 'asset',
    underscored: true,
    classMethods: {
      associate: function(models) {
        // Asset.hasMany(models.PageAsset, { foreignKey: 'asset_id', as: 'page_assets' });
        // Asset.hasMany(models.CampaignAsset, { foreignKey: 'asset_id', as: 'campaign_assets' });
        // Asset.hasMany(models.CollectionAsset, { foreignKey: 'asset_id', as: 'collection_assets' });
        // Asset.belongsTo(models.AssetType, { foreignKey: 'asset_type_id', as: 'asset_type' });
      },
      expose: function() {
        return {
          id: Joi.number().required(),
          asset_url: Joi.string().required(),
          asset_type_id: Joi.number().required()
        };
      },
      filter: function() {
        return {
          asset_type_id: Joi.string()
        };
      }
    }
  });

  Asset.CollectionAsset && ( Asset.CollectionAsset = Asset.hasMany(sequelize.import('./CollectionAsset'), { foreignKey: 'asset_id', as: 'collection_assets' }) );

  return Asset;
};
