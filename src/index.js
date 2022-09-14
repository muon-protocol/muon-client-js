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

      if (muonResponse.data.success) {
        let {
          data: { result }
        } = muonResponse
        let responseData
        if (result.confirmed) {
          let reqId = result.reqId;
          //let groupAddress = result.signatures[0]?.owner
          let signature = result.signatures[0]?.signature
          let nonceAddress = result.data?.init?.nonceAddress
          let sigs = [
            {
              signature: signature,
              //owner: groupAddress,
              nonce: nonceAddress
            }
          ]

          responseData = {
            ...result,
            reqId,
            sigs
          }
        } else {
          responseData = { ...result }
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
