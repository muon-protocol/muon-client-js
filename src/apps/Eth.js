class Eth {
  constructor(muon) {
    this.muon = muon
  }
  addBridgeToken(mainTokenAddress, mainNetwork, targetNetwork) {
    let data = {
      app: 'eth',
      method: 'addBridgeToken',
      params: {
        mainTokenAddress,
        mainNetwork,
        targetNetwork
      },
      nSign: this.muon.nSign
    }
    return this.muon.request(data)
  }
  callContract(contractAddress, method, params, ABI, network) {
    let abi = [
      ABI.find(({ name, type }) => name === method && type === 'function')
    ]
    let data = {
      app: 'eth',
      method: 'call',
      params: {
        address: contractAddress,
        method,
        params,
        abi,
        outputs: ['user', 'amount', 'fromChain', 'toChain', 'tokenId', 'txId'],
        network
      },
      nSign: this.muon.nSign
    }
    return this.muon.request(data)
  }
}
export default Eth
