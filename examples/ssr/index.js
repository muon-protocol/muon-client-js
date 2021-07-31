const express = require('express')
const Muon = require('muon')

const port = 3050
const app = express()

app.get('*', async (req, res) => {
  const muon = new Muon('https://node1.muon.net/v1/', 3)

  // call method custom app

  const resultCustomApp = await muon
    .app('eth')
    .method('addBridgeToken', {
      mainTokenAddress: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6',
      mainNetwork: 'bsctest',
      targetNetwork: 'rinkeby'
    })
    .call()
  const dataCustomApp = JSON.stringify(resultCustomApp, undefined, 2)

  // call method plugin eth

  const result = await muon.apps.eth.addBridgeToken(
    '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6',
    'bsctest',
    'rinkeby'
  )
  const data = JSON.stringify(result, undefined, 2)

  const output = ` <h1>Muon Response In Node :</h1>
  <h2>Use muon custom app:</h2>
  <pre id="json">${dataCustomApp}</pre>
  <h2>Use muon plugin:</h2>
  <pre id="json">${data}</pre>
   `
  res.send(output)
})

app.listen(port, () => console.log(`http://localhost:${port}`))
