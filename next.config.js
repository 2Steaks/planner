/** @format */

const withPWA = require('next-pwa');
const R = require('ramda');

const config = {
  pwa: {
    dest: 'public',
    importScripts: ['sw-push.js']
  }
}

module.exports = R.compose(withPWA)(config);
