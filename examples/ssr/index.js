const express = require('express')
const Muon = require('muon')

const port = 3050
const app = express()

app.get('*', async (req, res) => {
  // const muon = new Muon('https://node1.muon.net/v1/', 3)
  const muon = new Muon('http://104.131.177.195:8081/v1', 3)

  // call method custom app

  const muonResponse = await muon
    .app('eth')
    .method('addBridgeToken', {
      mainTokenAddress: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6',
      mainNetwork: 'bsctest',
      targetNetwork: 'rinkeby'
    })
    .call()
  const dataCustomApp = JSON.stringify(muonResponse, undefined, 2)

  const output = ` <h1>Muon Response In Node :</h1>
  <h2>Use muon custom app:</h2>
  <pre id="json">${dataCustomApp}</pre>
   `
  res.send(output)
})

app.listen(port, () => console.log(`http://localhost:${port}`))
