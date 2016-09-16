/**
 * Created by Lucian on 16/09/2016.
 */

export default {
  nodeEnv: process.env.NODE_ENV,
  webConcurrency: process.env.WEB_CONCURRENCY || 1,
  port: process.env.PORT || 5000,
  timeout: 29000
};
