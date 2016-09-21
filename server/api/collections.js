/**
 * Created by Lucian on 16/09/2016.
 */

require('isomorphic-fetch');
import { Router } from 'express';
import config from '../config';

const router = new Router();

router.get('/', (req, res) => {
  const page = req.query.page;
  const url = `${config.API_ROOT}/api/v1/scm/collections?page=${page}`;

  return fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Cache-Control': 'no-cache',
        'Cookie': `${config.COOKIE_NAME}=${config.TOKEN}`
      }
    })
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error(`Bad response from ${config.API_ROOT}: ${response.statusText}`);
      }
      return response.json();
    });
});

router.get('/:id', (req, res) => {
  const obj = data.getObjectAt(req.params.id);
  if (req.params.id < 0) {
    res.status(404).json({
      error: 'Collection does not exist in db'
    })
  }

  setTimeout(() => {
    res.status(200).json(obj)
  }, 1000);
});

module.exports = router;
