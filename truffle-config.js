// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      host: "localhost", // Connect to geth on the specified
      port: 8545,
      from: "0x53f1e224cd1936e2d2c5e8269a2972f88f60640e", // default address to use for any transaction Truffle makes during migrations
      network_id: 4,
      gas: 4612388 // Gas limit used for deploys
    },
    rinkebyRemote: {
      host: "162.255.119.203:8545", // Connect to geth on the specified
      port: 8545,
      from: "0x53f1e224cd1936e2d2c5e8269a2972f88f60640e", // default address to use for any transaction Truffle makes during migrations
      network_id: 4,
      gas: 4612388 // Gas limit used for deploys
    }
  }
}