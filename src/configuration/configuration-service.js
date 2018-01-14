class ConfigurationService {

  getConfiguration() {
    return this.config || {}
  }

  setConfiguration(config = {}) {
    this.config = config
  }
}

export default new ConfigurationService()
