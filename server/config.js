const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/soen341',
  port: process.env.PORT || 8000,
  secret: 'soen341secret',
};

export default config;
