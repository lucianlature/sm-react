'use strict';

var Joi = require('joi');

module.exports = function (sequelize, DataTypes) {
  var CollectionAsset = sequelize.define('CollectionAsset', {
    type: {
      type: new DataTypes.VIRTUAL(DataTypes.STRING),
      get() {
        return 'collectionAssetType';
      }
    },
    asset_id: DataTypes.STRING,
    collection_id: DataTypes.STRING,
    updated_at: DataTypes.DATE,
    created_at: DataTypes.DATE
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'collection_asset',
    classMethods: {
      associate: function (models) {
        // CollectionAsset.belongsTo(models.Collection, {foreignKey: 'collection_id', as: 'collection'});
        // CollectionAsset.belongsTo(models.Asset, {foreignKey: 'asset_id', as: 'asset'});
      },
      expose: function () {
        return {
          id: Joi.number().required(),
          asset_id: Joi.number().required()
        };
      },
      findAllForPublication(models, publicationId) {
        return models.CollectionAsset.all({
          include: [
            {
              model: models.Collection,
              as: 'collection',
              required: true,
              where: {
                publication_id: publicationId
              }
            }
          ]
        });
      }
    }
  });

  CollectionAsset.Collection = CollectionAsset.belongsTo(sequelize.import('./Collection'), {foreignKey: 'collection_id'});
  CollectionAsset.Asset = CollectionAsset.belongsTo(sequelize.import('./Asset'), {foreignKey: 'asset_id', as: 'asset'});

  return CollectionAsset;
};
