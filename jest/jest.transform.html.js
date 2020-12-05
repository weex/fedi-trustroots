/*
 * This is a bit of a hack, using webpack loaders to transform templates in jest.
 */

const templateLoader = require('../config/webpack/templateloader');
const htmlLoader = require('html-loader');

module.exports = {
  process(src, filename) {
    return templateLoader.call(
      {
        resourcePath: filename,
      },
      htmlLoader.call(
        {
          resourcePath: filename,
          options: {
            // ['img:src', ':ng-include'],
            attributes: {
              list: [
                // All default supported tags and attributes
                '...',
                {
                  tag: 'div',
                  attribute: 'ng-include',
                  // Type of processing, can be `src` or `scrset`
                  type: 'src',
                },
              ],
            },
          },
        },
        src,
      ),
    );
  },
};
