const { createConnection, getConnection } = require('typeorm')

createConnection(require('../ormconfig.json'))

setTimeout(() => {
  getConnection().close()
}, 1000)