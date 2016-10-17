'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../../config';

const basename = path.basename(module.filename);
const { database, globals: { __DEV__ } } = config;
const dbConfig = database[ __DEV__ ? 'development' : 'production' ];

let db = {};
let sequelize;

module.exports.sequelize = sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    Object.assign(dbConfig, {
      logging: console.log
    })
);

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) &&
      (file !== basename) &&
      (file.slice(-3) === '.js');
  })
  .forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports.models = db;

