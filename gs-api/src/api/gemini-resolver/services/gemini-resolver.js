'use strict';

/**
 * gemini-resolver service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::gemini-resolver.gemini-resolver');
