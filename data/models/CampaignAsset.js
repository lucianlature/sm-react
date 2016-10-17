'use strict';

var Joi = require('joi');

module.exports = function (sequelize, DataTypes) {
  var CampaignAsset = sequelize.define('CampaignAsset', {
    updated_at: DataTypes.DATE,
    created_at: DataTypes.DATE
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'campaign_asset',
    scopes: {
      byIdsIncludingAssetAndAssetType: function (models, ids) {
        return {
          where: {
            id: {$in: ids}
          },
          include: [
            {
              model: models.Asset,
              as: 'asset',
              include: [
                {
                  model: models.AssetType,
                  as: 'asset_type'
                }
              ]
            }
          ]
        }
      }
    },
    classMethods: {
      associate(models) {
        // CampaignAsset.belongsTo(models.Campaign, {foreignKey: 'campaign_id', as: 'campaign'});
        // CampaignAsset.belongsTo(models.Asset, {foreignKey: 'asset_id', as: 'asset'});
      },
      expose() {
        return {
          id: Joi.number().required(),
          asset_id: Joi.number().required()
        };
      },
      findAllForPublication(models, publicationId) {
        return models.CampaignAsset.all({
          include: [
            {
              model: models.Campaign,
              as: 'campaign',
              where: {
                publication_id: publicationId
              }
            }
          ]
        });
      }
    }
  });
  return CampaignAsset;
};
