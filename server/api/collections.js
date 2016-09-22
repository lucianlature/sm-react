/**
 * Created by Lucian on 16/09/2016.
 */

import axios from 'axios';
import { Router } from 'express';
import config from '../config';

const router = new Router();
const headers = {
  'Accept': '*/*',
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json',
  'Cookie': `${config.COOKIE_NAME}=${config.TOKEN}`
};
const API = axios.create({
  baseURL: `${config.API_ROOT}/api/v1/scm/`,
  headers,
  timeout: 10000
});

router.get('/', (req, res) => {
  const page = req.query.page;
  const url = `collections?page=${page}`;

  API.get(url)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error(`Bad response from ${config.API_ROOT}: ${response.statusText}`);
      }
      res.json(response.data);
    })
    .catch(function(error) {
      res.status(500).json({
        error
      })
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  if (id < 0) {
    res.status(404).json({
      error: 'Collection does not exist in db'
    })
  }

  const url = `collections/${id}`;

  API.get(url)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error(`Bad response from ${config.API_ROOT}: ${response.statusText}`);
      }
      res.json(response.data);
    })
    .catch(function(error) {
      res.status(500).json({
        error
      })
    });
});

module.exports = router;
