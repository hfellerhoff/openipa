module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/transcription",
        destination: "/transcription/french",
        permanent: false,
      },
    ];
  },
};
