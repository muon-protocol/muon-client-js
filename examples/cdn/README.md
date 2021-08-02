# Install local deps

First you need to get muon into your project.This can be done using the following method:

    npm i https://github.com/muon-protocol/muon-client-js

# Run this code in a browser

adding muon using

    <script src="./node_modules/muon/dist/bundle.umd.js"></script>

Create a muon instance and set a provider and count muon signature

    const Muon = window.muon
    let muon = new Muon(provider, nSign)

\*\* provider: address muon node

\*\* nSign: number of signatures you need as a default is 2

    const muonResponse = await muon
          .app('nameOfApp')
          .method('nameOfMethod', {
            ...params that method needs
          })
          .call()

# Serve on localhost

npm run serve
