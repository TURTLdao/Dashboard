const withImages = require('next-images');

const redirects = {
  async redirects() {
    return [
      {
        source: '/overview',
        destination: '/overview',
        permanent: true
      }
    ];
  }
};

module.exports = withImages(redirects);
