import React from 'react'
// import { GetData } from 'muon'
import Muon from 'muon'

function App() {
  const [result, setResult] = React.useState([])
  const [resultCustomApp, setResultCustomAPP] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const muon = new Muon('https://node1.muon.net/v1/', 3)

      // call method custom app

      const muonResponse = await muon
        .app('eth')
        .method('addBridgeToken', {
          mainTokenAddress: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6',
          mainNetwork: 'bsctest',
          targetNetwork: 'rinkeby'
        })
        .call()

      setResultCustomAPP(JSON.stringify(muonResponse, undefined, 2))
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      <h1>Muon Response In React :</h1>
      <h2>Use muon custom app:</h2>
      <pre id="json">{resultCustomApp}</pre>
    </div>
  )
}

export default App
