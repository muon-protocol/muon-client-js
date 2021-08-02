# Install the deps

First you need to get muon into your project.This can be done using the following method:

    npm i https://github.com/muon-protocol/muon-client-js

# Run this code in React app

adding muon using

    import Muon from 'muon'

Create a muon instance and set a provider and count muon signature

    let muon = new Muon(provider, nSign)

** provider: address muon node
** nSign: number of signatures you need as a default is 2

    const muonResponse = await muon
          .app('nameOfApp')
          .method('nameOfMethod', {
            ...params that method needs
          })
          .call()

# Start app

npm run start
