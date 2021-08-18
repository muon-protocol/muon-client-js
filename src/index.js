import AppCall from './AppCall'
import Eth from './apps/Eth'
import Api from './services/api'

class Muon {
  constructor(url, nSign) {
    this.BASE_URL = url
    this.nSign = nSign ? nSign : 2
    this.apps = {
      eth: new Eth(this)
    }
  }

  app(app) {
    let appCall = new AppCall(this, app)
    return appCall
  }

  async request(dataInfo) {
    try {
      const apiInstance = new Api()
      const muonResponse = await apiInstance.post(this.BASE_URL, dataInfo)
      let { data } = muonResponse
      let _reqId = `0x${data.result?.cid.substr(1)}`
      let sortSignatures = data.result?.signatures?.sort((a, b) => {
        return a.owner.localeCompare(b.owner)
      })
      console.log('sortSignatures', sortSignatures)
      let signatures = sortSignatures.map((s) => s.signature)

      data = { ...data, signatures, _reqId }
      return data
    } catch (error) {
      console.log('error happend in request muon', error)
      return error.message
    }
  }
}

export default Muon
