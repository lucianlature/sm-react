'use strict';

var Joi = require('joi');

module.exports = function (sequelize, DataTypes) {
  var PageAsset = sequelize.define('PageAsset', {
    updated_at: DataTypes.DATE,
    created_at: DataTypes.DATE
  }, {
    timestamps: false,
    tableName: 'page_asset',
    classMethods: {
      associate: function (models) {
        // PageAsset.belongsTo(models.Page, {foreignKey: 'page_id', as: 'page'});
        // PageAsset.belongsTo(models.Asset, {foreignKey: 'asset_id', as: 'asset'});
      },
      expose: function () {
        return {
          id: Joi.number().required(),
          asset_id: Joi.number().required()
        }
      },
      findAllForPublication(models, publicationId) {
        return models.PageAsset.all({
          include: [
            {
              model: models.Page,
              as: 'page',
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
  return PageAsset;
};
