var config = {
    db: {
      host: 'localhost',
      database: 'kanban',
      username: 'root',
      password: '7895123',
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    }
}

module.exports = config
