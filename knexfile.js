// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './Data/DB.sqlite3'
    },
    pool: {
      afterCreate: (conn, done)=>{
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    migrations: {
      directory: './Data/Migrations'
    },
    seeds: {
      directory: './Data/Seeds'
    }
  }
}