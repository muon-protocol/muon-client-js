import AppCall from './AppCall'
import Api from './services/api'

class Muon {
  constructor(url, nSign) {
    this.BASE_URL = url
    this.nSign = nSign ? nSign : 2
  }

  app(app) {
    let appCall = new AppCall(this, app)
    return appCall
  }

  async request(dataInfo) {
    try {
      const apiInstance = new Api()
      const muonResponse = await apiInstance.post(this.BASE_URL, dataInfo)

      console.log('sdk resposne', muonResponse.data)
      if (muonResponse.success) {
        let {
          data: { result }
        } = muonResponse
        let reqId = `0x${result.cid?.substr(1)}`
        let groupAddress = result.signatures[0]?.owner
        let signature = result.signatures[0]?.signature
        let nonceAddress = result.data?.init?.nonceAddress
        let sigs = [
          {
            signature: signature,
            owner: groupAddress,
            nonce: nonceAddress
          }
        ]

        let responseData = {
          ...result,
          reqId,
          sigs
        }
        return responseData
      } else return muonResponse.data
    } catch (error) {
      console.log('error happend in request muon', error)
      return error.message
    }
  }
}

export default Muon
