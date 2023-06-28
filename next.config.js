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

const nextConfig = {
  reactStrictMode: true,
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
};

module.exports = withImages({
  ...redirects,
  ...nextConfig,
});
