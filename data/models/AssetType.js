/**
 * Created by Lucian on 04/10/2016.
 */

'use strict';

const Joi = require('joi');

module.exports = function(sequelize, DataTypes) {
  var AssetType = sequelize.define('AssetType', {
    title: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    mandatory: DataTypes.BOOLEAN,
    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    mime_type: DataTypes.STRING(32),
    extension: DataTypes.STRING(32),
    dimensions: DataTypes.JSON,
    updated_at: DataTypes.DATE,
    created_at: DataTypes.DATE
  }, {
    timestamps: false,
    tableName: 'asset_type',
    scopes: {
      inPublication: function(models, request) {
        return {
          where: {
            publication_id: request.auth.credentials.publicationId
          }
        };
      }
    },
    classMethods: {
      associate: function(models) {
        AssetType.hasMany(models.Asset, { foreignKey: 'asset_type_id', as: 'assets' });
        // AssetType.belongsTo(models.AssetContext, { foreignKey: 'asset_context_id', as: 'asset_context' });
        // AssetType.belongsTo(models.Publication, { foreignKey: 'publication_id', as: 'publication' });
      },
      expose: function() {
        return {
          id: Joi.number().required(),
          title: Joi.string().required(),
          name: Joi.string().required(),
          description: Joi.string().allow(null),
          mandatory: Joi.boolean().required(),
          width: Joi.number().allow(null),
          height: Joi.number().allow(null),
          mime_type: Joi.string().required(),
          extension: Joi.string().required(),
          dimensions: Joi.object().allow(null),
          asset_context_id: Joi.number().required()
        };
      },
      filter: function() {
        return {
          asset_context_id: Joi.number()
        };
      }
    }
  });
  return AssetType;
};