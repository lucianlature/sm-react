'use strict';

const Joi = require('joi');

module.exports = function(sequelize:Sequelize, DataTypes) {

  const CollectionStatus = sequelize.define('CollectionStatus', {
    type: {
      type: new DataTypes.VIRTUAL(DataTypes.STRING),
      get() {
        return 'collectionStatusType';
      }
    },
    name: DataTypes.STRING,
    updated_at: DataTypes.DATE,
    created_at: DataTypes.DATE
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'collection_status',
    classMethods: {
      associate: function(models) {
        // CollectionStatus.hasMany(models.Collection, { foreignKey: 'collection_status_id'});
      },
      expose: function() {
        return {
          id: Joi.number().required(),
          name: Joi.string().required()
        }
      }
    }
  });

  /*
  CollectionStatus.Collection && ( CollectionStatus.Collection = CollectionStatus.hasMany(sequelize.import('./Collection'), {foreignKey: 'collection_status_id' }) );
  */

  return CollectionStatus;
};
