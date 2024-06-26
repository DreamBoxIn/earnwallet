// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
        has: [
          {
            type: 'cookie',
            key: 'magic_auth',
          },
        ],
      },
    ];
  },
};
