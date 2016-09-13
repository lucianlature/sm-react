/**
 * Created by Lucian on 12/09/2016.
 */

'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./AppRoutes.prod');
} else {
  module.exports = require('./AppRoutes.dev').default;
}
