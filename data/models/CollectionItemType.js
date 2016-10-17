'use strict';
var Joi = require('joi');

module.exports = function(sequelize, DataTypes) {
  var CollectionItemType = sequelize.define('CollectionItemType', {
    name: DataTypes.STRING(64),
    updated_at: DataTypes.DATE,
    created_at: DataTypes.DATE
  }, {
    timestamps: false,
    tableName: 'collection_item_type',
    scopes: {
      inPublication: function(models, request) {
        return {
          include: [{
            model: models.CollectionItem,
            required: true,
            attributes: [],
            include: [{
              model: models.Collection,
              required: true,
              attributes: [],
              where: {
                publication_id: request.auth.credentials.publicationId
              }
            }]
          }]
        }
      }
    },
    classMethods: {
      associate: function(models) {
        // CollectionItemType.hasMany(models.CollectionItem, { foreignKey: 'collection_item_type_id' });
      },
      expose: function() {
        return {
          id: Joi.number().required(),
          name: Joi.string().required()
        };
      }
    }
  });

  CollectionItemType.CollectionItem && ( CollectionItemType.CollectionItem = CollectionItemType.hasMany(sequelize.import('./CollectionItem'), { foreignKey: 'collection_item_type_id' }) );

  return CollectionItemType;
};
