'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const host = 'http://ec2-13-58-76-77.us-east-2.compute.amazonaws.com:8080/collection/all';

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
