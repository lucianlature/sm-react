'use strict';

var Joi = require('joi');

module.exports = function(sequelize, DataTypes) {
  var CollectionItem = sequelize.define('CollectionItem', {
    resource_id: DataTypes.STRING,
    position: DataTypes.INTEGER,
    updated_at: DataTypes.DATE,
    created_at: DataTypes.DATE
  }, {
    timestamps: false,
    tableName: 'collection_item',
    scopes: {
      inPublication: function(models, request) {
        return {
          include: [{
            model: models.Collection,
            as: 'collection',
            required: true,
            attributes: [],
            where: {
              publication_id: request.auth.credentials.publicationId
            }
          }]
        };
      },
      includeCollectionItemType(models) {
        return {
          include: [
            {
              model: models.CollectionItemType,
              as: 'coll_item_type'
            }
          ]
        };
      }
    },
    classMethods: {
      associate: function(models) {
        // CollectionItem.belongsTo(models.Collection, { foreignKey: 'collection_id', onDelete: 'cascade', as: 'collection' });
        // CollectionItem.belongsTo(models.CollectionItemType, { foreignKey: 'collection_item_type_id', as: 'coll_item_type' });
      },
      expose: function() {
        return {
          id: Joi.number().required(),
          collection_item_type_id: Joi.number(),
          collection_id: Joi.number().required(),
          resource_id: Joi.string().required(),
          position: Joi.number().min(1).allow(null)
        };
      },
      filter: function() {
        return {
          collection_id: Joi.number().required()
        }
      },
      restrictCreate: function(models, request) {
        // Todo: Base scope restrictions on current scope of this model
        return models.Collection.scope({
          method: [
            'inPublication',
            models,
            request
          ]
        }).findOne({
          where: {
            id: request.payload.collection_id
          }
        });
      },
      searchForOneCollectionItemInPublication(models, resource, publicationId) {
        return models.CollectionItem.findOne({
          attributes: [],
          where: {
            resource_id: resource.id
          },
          order: sequelize.literal('"collection".updated_at DESC'),
          include: [
            {
              model: models.CollectionItemType,
              as: 'coll_item_type',
              required: true,
              attributes: [],
              where: {
                name: resource.type
              }
            },
            {
              model: models.Collection,
              as: 'collection',
              attributes: ['dfp_tag'],
              required: true,
              where: {
                publication_id: publicationId,
                syndicated: true,
                dfp_tag: {
                  $ne: null,
                  $or: {
                    $ne: ''
                  }
                }
              }
            }
          ]
        });
      }
    }
  });

  CollectionItem.Collection && ( CollectionItem.Collection = CollectionItem.belongsTo(sequelize.import('./Collection'), { foreignKey: 'collection_id', onDelete: 'cascade', as: 'collection' }) );
  CollectionItem.CollectionItemType && ( CollectionItem.CollectionItemType = CollectionItem.belongsTo(sequelize.import('./CollectionItemType'), { foreignKey: 'collection_item_type_id', as: 'coll_item_type' }) );

  return CollectionItem;
};
