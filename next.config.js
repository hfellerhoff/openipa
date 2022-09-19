module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/transcription',
        destination: '/transcription/french',
        permanent: false,
      },
    ];
  },
};
