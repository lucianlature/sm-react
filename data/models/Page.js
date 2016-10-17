'use strict';

// const PAGE_NOT_FOUND = require('../errors/response').PAGE_NOT_FOUND;

var Joi = require('joi');
var _ = require('lodash');
var Promise = require('bluebird');

module.exports = function(sequelize, DataTypes) {
  var Page = sequelize.define('Page', {
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.TEXT,
    short_description: DataTypes.TEXT,
    active: DataTypes.BOOLEAN,
    leaderboard_enabled: DataTypes.BOOLEAN,
    dfp_tag: DataTypes.STRING,
    updated_at: DataTypes.DATE,
    created_at: DataTypes.DATE
  }, {
    timestamps: false,
    tableName: 'page',
    scopes: {
      inPublication: function(models, request) {
        return {
          where: {
            publication_id: request.auth.credentials.publicationId
          }
        };
      },/*
      includeCampaign: function(models, request) {
        return {
          include: [
            {
              model: models.Campaign,
              as: 'campaign',
              attributes: ['id'],
              foreignKey: 'page_id',
              isSingle: true,
              include: [
                {
                  model: models.CampaignAsset,
                  as: 'campaign_assets',
                  foreignKey: 'campaign_id',
                  inDelete: true
                },
                {
                  model: models.CampaignProduct,
                  as: 'campaign_products',
                  foreignKey: 'campaign_id',
                  inDelete: true
                }
              ]
            }
          ]
        };
      },
      includeCampaigns: function(models, request) {
        return {
          include: [
            {
              model: models.Campaign,
              as: 'campaigns',
              foreignKey: 'page_id',
              isManyToMany: true
            }
          ]
        };
      },
      includeModulesWithModuleItems: (models) => {
        return {
          order: sequelize.literal('"modules".position ASC,"modules.module_items".position ASC'),
          include: [
            {
              model: models.Module,
              as: 'modules',
              foreignKey: 'page_id',
              order: ['position', 'ASC'],
              include: [
                {
                  model: models.ModuleType,
                  as: 'module_type',
                  attributes: ['name', 'id']
                },
                {
                  model: models.ModuleLayout,
                  as: 'module_layout',
                  attributes: ['name', 'id']
                },
                {
                  model: models.ModuleItem,
                  as: 'module_items',
                  foreignKey: 'module_id',
                  order: ['position', 'ASC'],
                  include: [
                    {
                      model: models.ModuleItemType,
                      as: 'module_item_type',
                      attributes: ['name', 'id']
                    }
                  ]
                }
              ]
            }
          ]
        };
      },
      byIdsIncludingModuleItems: function (models, publicationId, pageIds) {
        return {
          where: {
            id: {$in: pageIds},
            publication_id: publicationId
          },
          order: sequelize.literal('"modules".position ASC,"modules.module_items".position ASC'),
          include: [
            {
              model: models.Module,
              as: 'modules',
              attributes: ['title', 'description', 'id', 'position', 'page_id'],
              include: [
                {
                  model: models.ModuleLayout,
                  as: 'module_layout',
                  attributes: ['name']
                },
                {
                  model: models.ModuleType,
                  as: 'module_type',
                  attributes: ['name', 'id']
                },
                {
                  model: models.ModuleItem,
                  as: 'module_items',
                  attributes: ['resource_id', 'position', 'collection_id'],
                  include: [
                    {
                      model: models.ModuleItemType,
                      as: 'module_item_type',
                      attributes: ['name', 'id']
                    }
                  ]
                }
              ]
            }
          ]
        };
      },
      inPublicationWithSlugIncludePublicData: function(models, publicationId, slug) {
        return {
          where: {
            slug: slug,
            publication_id: publicationId
          },
          attributes: [
            'description',
            'dfp_tag',
            'leaderboard_enabled',
            'page_type_id',
            'publication_id',
            'short_description',
            'slug',
            'title'
          ],
          order: sequelize.literal('"modules".position ASC,"modules.module_items".position ASC'),
          include: [
            {
              model: models.PageType,
              as: 'page_type',
              attributes: ['name']
            },
            {
              model: models.PageAsset,
              as: 'page_assets',
              include: {
                model: models.Asset,
                as: 'asset',
                attributes: ['asset_url'],
                include: {
                  model: models.AssetType,
                  as: 'asset_type',
                  attributes: ['name', 'width', 'height', 'mime_type']
                }
              }
            },
            {
              model: models.Module,
              attributes: ['id', 'title', 'description', 'position', 'module_type_id', 'page_id', 'mpu_enabled'],
              as: 'modules',
              include: [
                {
                  model: models.ModuleType,
                  as: 'module_type',
                  attributes: ['name', 'id']
                },
                {
                  model: models.ModuleLayout,
                  as: 'module_layout',
                  attributes: ['name', 'id']
                },
                {
                  model: models.ModuleItem,
                  as: 'module_items',
                  attributes: ['title', 'resource_id', 'position', 'collection_id', 'page_id'],
                  include: [
                    {
                      model: models.ModuleItemType,
                      as: 'module_item_type',
                      attributes: ['name', 'id']
                    }
                  ]
                }
              ]
            }
          ]
        };
      }*/
    },
    classMethods: {
      associate: function(models) {
        // Page.belongsTo(models.Publication, { foreignKey: 'publication_id', as: 'publication' });
        // Page.belongsTo(models.PageType, { foreignKey: 'page_type_id', as: 'page_type' });
        // Page.hasMany(models.Module, { foreignKey: 'page_id', as: 'modules' });
        // Page.hasMany(models.PageAsset, { foreignKey: 'page_id', as: 'page_assets' });
        // Page.hasMany(models.ModuleItem, { foreignKey: 'page_id', as: 'module_items' });
        // Page.hasOne(models.NavigationItem, { foreignKey: 'page_id', as: 'navigation_item' });
        // Page.belongsToMany(models.Campaign, {through: models.CampaignPages, foreignKey: 'page_id', as: 'campaigns'});
      },
      expose: function() {
        return {
          id: Joi.number().required(),
          title: Joi.string().required(),
          slug: Joi.string().required(),
          description: Joi.string().allow([null, '']),
          short_description: Joi.string().allow([null, '']),
          active: Joi.boolean().allow(null),
          page_type_id: Joi.number().required(),
          has_campaign: Joi.boolean(),
          belongs_to_campaigns: Joi.boolean(),
          campaign_ids: Joi.array().allow([]),
          leaderboard_enabled: Joi.boolean(),
          dfp_tag: Joi.string().allow([null,'']),
          is_default: Joi.boolean().optional(),
          pages: Joi.array().optional().allow([])
        };
      },
      sortable: function() {
        return [
          'title',
          'slug',
          'active'
        ];
      },
      defaultOrder: function () {
        return [
          ['active','DESC'],
          ['updated_at', 'DESC']
        ];
      },
      filter: function() {
        return {
          page_type_id: Joi.string(),
          active: Joi.boolean()
        };
      },
      addToRequest: function(request) {
        request.payload.publication_id = request.auth.credentials.publicationId;
      },
      getBySlugAndPublicationId(models, {slug, publicationId}) {
        return models.Page.scope({
            method: ['inPublicationWithSlugIncludePublicData', models, publicationId, slug]
          })
          .findOne()
          .tap(page => {
            if (!page) {
              throw PAGE_NOT_FOUND(slug);
            }
          });
      }
    },
    instanceMethods: {
      isDefaultCampaignPage() {
        return _.get(this, 'CampaignPages.default', false);
      },
      getCampaignsList() {
        return _.map(this.campaigns, campaign => {
          return {
            id: campaign.id,
            'default': campaign.CampaignPages.default
          };
        });
      },
      addToResponse: function() {
        return _.extend(
          {
            has_campaign: !_.isEmpty(this.campaigns),
            belongs_to_campaigns: !_.isEmpty(this.campaigns),
            campaign_ids: _.map(this.campaigns, 'id'),
          },
          this.CampaignPages ? { is_default: this.isDefaultCampaignPage() } : {}
        );
      },
      removeAssociatedResources(transaction) {
        return Promise.map(this.module_items || [], moduleItem => {
            return moduleItem.destroy({transaction});
          })
          .then(() => {
            if (this.navigation_item) {
              return Promise.all(this.navigation_item.children, child => {
                  return child.destroy({transaction});
                })
                .then(() => {
                  return this.navigation_item.destroy({transaction});
                });
            }
            return Promise.resolve();
          });
      }
    }
  });
  return Page;
};
