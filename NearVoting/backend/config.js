const config = {};
config.mongodb = {};
config.mongodb.username = 'nearadmin';
config.mongodb.password = 'nearpassword';
config.mongodb.dbname = 'near_db';
config.mongodb.conn = `mongodb+srv://${config.mongodb.username}:${config.mongodb.password}@nvcluster.49xuuta.mongodb.net/${config.mongodb.dbname}?retryWrites=true&w=majority`

module.exports = config;