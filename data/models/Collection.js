'use strict';

/**
 * Collection Model
 * @see https://schema.org/Collection
 * @type {Model}
 */

module.exports = function (sequelize: Sequelize, DataTypes) {
  var Collection = sequelize.define('Collection', {
    type: {
      type: new DataTypes.VIRTUAL(DataTypes.STRING),
      get() {
        return 'collectionType';
      }
    },
    title: {
      type: DataTypes.STRING,
      description: 'The title of the collection.'
    },
    slug: DataTypes.STRING,
    description: DataTypes.TEXT,
    short_description: DataTypes.TEXT,
    syndicated: DataTypes.BOOLEAN,
    // dfp_tag: DataTypes.STRING,
    updated_at: DataTypes.DATE,
    created_at: DataTypes.DATE,
    assets: {
      type: new DataTypes.VIRTUAL(DataTypes.STRING),
      get() {
        return 'collection assets';
      }
    }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'unarchived_collection_view',
    classMethods: {
      associate(models) {
        // Collection.belongsTo(models.Publication, {foreignKey: 'publication_id'});
        // Collection.belongsTo(models.CollectionStatus, { foreignKey: 'collection_status_id', as: 'collection_status'} );
        // Collection.hasMany(models.CollectionAsset, {foreignKey: 'collection_id', as: 'collection_assets'});
        // Collection.hasMany(models.CollectionItem, {foreignKey: 'collection_id', as: 'coll_items'});
        // Collection.hasMany(models.ModuleItem, {foreignKey: 'page_id', as: 'module_items'});
        // Collection.belongsToMany(models.Campaign, {
        //  through: models.CampaignCollections,
        //  foreignKey: 'collection_id',
        //  as: 'campaigns'
        // });
      },
      sortable() {
        return [
          'id',
          'title',
          'updated_at'
        ];
      }
    }
  });


  Collection.CollectionStatus && ( Collection.CollectionStatus = Collection.belongsTo(sequelize.import('./CollectionStatus'), {foreignKey: 'collection_status_id', as: 'collection_status' }) );
  Collection.CollectionAsset && ( Collection.CollectionAsset = Collection.hasMany(sequelize.import('./CollectionAsset'), {foreignKey: 'collection_id', as: 'collection_assets'}) );
  Collection.CollectionItem && ( Collection.CollectionItem = Collection.hasMany(sequelize.import('./CollectionItem'), {foreignKey: 'collection_id', as: 'coll_items'}) );

  return Collection;
};
