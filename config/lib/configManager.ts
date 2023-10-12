import {COUNTRY_TYPES, ENV_TYPES} from "../environment";
import baseURLValues, { baseURL } from './baseURL';

interface Configs {
    country: COUNTRY_TYPES;
    env: ENV_TYPES;
    baseURL: baseURL;
    defaultPassword: string;
}

class ConfigManager {
    private _country = 'AU';
    private _env = process.env.hmyENV || 'preprod';

    get config(): Configs {
        return {
            country: this.country.toUpperCase() as COUNTRY_TYPES,
            env: this.env.toUpperCase() as ENV_TYPES,
            baseURL: this.resolveConfig<baseURL>(this.country, this.env, baseURLValues),
            defaultPassword: 'Stellare123.',
        };
    }

    get country(): string {
        return this._country;
    }

    set country(value: string) {
        this._country = value;
    }

    get env(): string {
        return this._env;
    }

    private resolveConfig<T>(country: string, env: string, config: any): T {
        const envKey = env.toLowerCase();
        const { nz, au, ...shared } = config[envKey] || {};

        return {
            ...shared,
            ...(country.toUpperCase() === COUNTRY_TYPES.NZ ? nz : au),
        };
    }
}

export default new ConfigManager();
