class AppCall {
  constructor(muon, app) {
    this.muon = muon
    this.app = app
  }
  method(method, { ...params }) {
    this.data = {
      app: this.app,
      method,
      params: {
        ...params
      },
      nSign: this.muon.nSign
    }
    return this
  }

  call() {
    return this.muon.request(this.data)
  }
}
export default AppCall
