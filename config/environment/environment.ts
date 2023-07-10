import {COUNTRY_TYPES, ENV_TYPES} from './environment.enum';
import ConfigManager from "../lib/configManager";

class Environment {
  get country() {
    return this.config.country;
  }

  get isNZ() {
    return this.config.country === COUNTRY_TYPES.NZ;
  }

  get isAU() {
    return this.config.country === COUNTRY_TYPES.AU;
  }

  get isPreProd() {
    return this.isEnv(ENV_TYPES.PREPROD);
  }

  get isProd() {
    return this.isEnv(ENV_TYPES.PROD);
  }

  get isQA() {
    return this.isEnv(ENV_TYPES.QA);
  }

  isEnv(type: ENV_TYPES) {
    return this.config.env === type;
  }

  private get config() {
    return ConfigManager.config;
  }
}

export default new Environment();
