# Install the deps

First you need to get muon into your project.This can be done using the following method:

    npm i https://github.com/muon-protocol/muon-client-js

# Run this code in nodeJs

adding muon using

    const Muon = require('muon')

Create a muon instance and set a provider and count muon signature

    let muon = new Muon(provider, nSign)

provider: muon node address

nSign: number of signatures you need as a default is 2

    const muonResponse = await muon
          .app('nameOfApp')
          .method('nameOfMethod', {
            ...params that method needs
          })
          .call()

# Example

    let muon = new Muon('https://node1.muon.net/v1/')

    const muonResponse = await muon
          .app('eth')
          .method('addBridgeToken', {
            mainTokenAddress: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6',
            mainNetwork: 'bsctest',
            targetNetwork: 'rinkeby'
          })
          .call()

how to use this signatures and \_reqId

    const Contract = new web3.eth.Contract(contractAbi, contractAddress)

    Contract.methods
        .[methodName](...params,muonResponse.signatures,muonResponse._reqId)
        .send({ from: account })

# Start server

npm run start
