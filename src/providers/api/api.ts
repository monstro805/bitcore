import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import random from 'random';
import { Observable } from 'rxjs';
import { DefaultProvider } from '../../providers/default/default';

import * as _ from 'lodash';

export interface ChainNetwork {
    chain: string;
    network: string;
}
export interface NetworkSettings {
    availableNetworks: ChainNetwork[];
    selectedNetwork: ChainNetwork;
}

const CurrentEnv = process.env.ENV || 'dev';

const EnvApiHosts: { [env: string]: { [chain: string]: string } } = {
    prod: {
        default: 'https://api.bitcore.io/api',
        ETH: 'https://api-eth.bitcore.io/api'
    },
    dev: { default: '/api' }
};

const CurrentApiHosts = EnvApiHosts[CurrentEnv];

@Injectable()
export class ApiProvider {
    public defaultNetwork = {
        chain: this.defaults.getDefault('%CHAIN%'),
        network: this.defaults.getDefault('%NETWORK%')
    };
    public networkSettings = {
        availableNetworks: [this.defaultNetwork],
        selectedNetwork: this.defaultNetwork,
        chainNetworkLookup: {}
    };

    public ratesAPI = {
        btc: 'https://bitpay.com/api/rates',
        bch: 'https://bitpay.com/api/rates/bch',
        eth: 'https://bitpay.com/api/rates/eth'
    };

    public bwsUrl = {
        urlPrefix: 'https://bws.bitpay.com/bws/api/v1/fiatrates/'
    };

    constructor(
        public httpClient: HttpClient,
        private defaults: DefaultProvider
    ) {

    }

    public getAvailableNetworks(): Observable<
        Array<{ host: string; supported: ChainNetwork[] }>
    > {
        const hosts = CurrentApiHosts;
        return Observable.fromPromise(
            Promise.all(
                Object.keys(hosts).map(async chain => {
                    const host = hosts[chain];
                    const supported = await this.httpClient
                        .get<ChainNetwork[]>(host + '/status/enabled-chains')
                        .toPromise();
                    return {
                        host,
                        supported
                    };
                })
            )
        );
    }

    getHostForChain(chain: string) {
        return CurrentApiHosts[chain] || CurrentApiHosts.default;
    }

    public getUrlPrefix(chain, network): string {
        const defaultChain = chain || this.defaultNetwork.chain;
        const defaultNetwork = network || this.defaultNetwork.network;
        const key = `${defaultChain}:${defaultNetwork}`;
        const lookupHost = this.networkSettings.chainNetworkLookup[key];
        const prefix = lookupHost || this.getHostForChain(chain);
        return prefix;
    }

    public getRandomSapiUrl() {
        const sapis = [
            `51.75.158.4:8080`,
            `75.60.241.114:8080`,
            `85.217.171.185:8080`,
            `167.86.91.147:8080`,
            `51.75.158.25:8080`,
            `185.216.231.73:8080`,
            `167.86.89.56:8080`,
            `207.180.200.240:8080`,
            `207.180.211.105:8080`,
            `135.181.85.180:8080`,
            `135.181.85.177:8080`,
            `135.181.85.186:8080`,
            `135.181.85.188:8080`,
            `135.181.85.176:8080`,
            `135.181.85.183:8080`,
            `135.181.85.184:8080`,
            `135.181.85.187:8080`,
            `135.181.85.182:8080`,
            `135.181.85.185:8080`,
            `195.201.22.100:8080`,
            `195.201.22.122:8080`,
            `195.201.22.110:8080`,
            `195.201.22.103:8080`,
            `195.201.22.112:8080`,
            `195.201.22.113:8080`,
            `195.201.22.117:8080`,
            `195.201.22.101:8080`,
            `195.201.22.107:8080`,
            `195.201.22.116:8080`,
            `94.102.210.158:8080`,
            `94.102.210.119:8080`,
            `90.145.247.136:8080`,
            `167.86.97.16:8080`,
            `167.86.123.246:8080`,
            `173.249.6.78:8080`,
            `62.171.132.117:8080`,
            `185.141.61.112:8080`,
            `173.249.48.174:8080`,
            `167.86.124.227:8080`,
            `94.156.35.99:8080`,
            `164.68.102.153:8080`,
            `37.24.134.95:8080`,
            `5.44.105.132:8080`,
            `164.68.112.229:8080`,
            `88.198.202.140:8080`,
            `213.52.125.41:8080`,
            `173.249.31.63:8080`,
            `45.32.232.116:8080`,
            `199.247.10.156:8080`,
            `167.86.89.3:8080`,
            `164.68.112.231:8080`,
            `164.68.102.164:8080`,
            `14.161.22.94:8080`,
            `173.249.31.45:8080`,
            `173.249.50.117:8080`,
            `167.86.95.13:8080`,
            `51.77.124.25:8080`,
            `195.201.23.4:8080`,
            `195.201.22.241:8080`,
            `164.68.112.225:8080`,
            `167.86.90.125:8080`,
            `79.143.187.234:8080`,
            `167.86.97.15:8080`,
            `51.77.124.10:8080`,
            `178.238.231.201:8080`,
            `71.45.87.12:8080`,
            `164.68.112.210:8080`,
            `167.86.111.184:8080`,
            `207.180.201.182:8080`,
            `89.181.124.117:8080`,
            `95.165.156.202:8080`,
            `207.180.212.131:8080`,
            `217.160.255.46:8080`,
            `167.86.96.109:8080`,
            `90.145.247.157:8080`,
            `80.241.217.151:8080`,
            `173.82.232.13:8080`,
            `207.180.193.28:8080`,
            `45.76.250.128:8080`,
            `164.68.104.4:8080`,
            `167.86.102.234:8080`,
            `173.249.32.39:8080`,
            `52.230.4.204:8080`,
            `167.86.87.56:8080`,
            `167.86.90.127:8080`,
            `185.205.210.233:8080`,
            `82.146.49.104:8080`,
            `164.68.112.213:8080`,
            `173.249.13.217:8080`,
            `167.86.96.209:8080`,
            `207.180.210.221:8080`,
            `167.86.91.163:8080`,
            `167.86.96.251:8080`,
            `5.187.51.206:8080`,
            `167.86.110.12:8080`,
            `173.249.13.232:8080`,
            `207.180.211.41:8080`,
            `173.249.5.205:8080`,
            `207.180.193.26:8080`,
            `5.187.51.231:8080`,
            `167.86.90.143:8080`,
            `167.86.97.17:8080`,
            `167.86.102.231:8080`,
            `164.68.102.161:8080`,
            `62.171.132.111:8080`,
            `85.214.97.248:8080`,
            `167.86.97.5:8080`,
            `167.86.96.250:8080`,
            `207.180.246.171:8080`,
            `185.141.62.35:8080`,
            `167.86.111.183:8080`,
            `207.180.193.2:8080`,
            `167.86.79.44:8080`,
            `167.86.96.249:8080`,
            `167.86.97.12:8080`,
            `167.86.91.157:8080`,
            `167.86.79.45:8080`,
            `90.145.247.153:8080`,
            `168.119.57.54:8080`,
            `168.119.57.49:8080`,
            `168.119.57.48:8080`,
            `168.119.56.7:8080`,
            `168.119.57.50:8080`,
            `168.119.57.36:8080`,
            `168.119.57.42:8080`,
            `168.119.57.43:8080`,
            `168.119.53.99:8080`,
            `168.119.56.51:8080`,
            `135.181.85.190:8080`,
            `135.181.85.192:8080`,
            `135.181.85.198:8080`,
            `135.181.85.191:8080`,
            `135.181.85.196:8080`,
            `161.97.144.8:8080`,
            `54.38.150.123:8080`,
            `167.86.115.104:8080`,
            `80.241.216.205:8080`,
            `185.205.209.184:8080`,
            `51.68.138.158:8080`,
            `167.86.90.211:8080`,
            `207.180.250.179:8080`,
            `167.86.124.244:8080`,
            `167.86.79.35:8080`,
            `70.99.78.22:8080`,
            `159.203.80.139:8080`,
            `167.86.124.247:8080`,
            `3.64.66.213:8080`,
            `173.249.51.179:8080`,
            `173.249.40.165:8080`,
            `5.187.51.215:8080`,
            `167.86.89.39:8080`,
            `51.75.158.7:8080`,
            `45.76.116.26:8080`,
            `173.212.253.105:8080`,
            `164.68.102.165:8080`,
            `173.82.208.190:8080`,
            `173.249.51.154:8080`,
            `157.90.125.125:8080`,
            `173.249.20.101:8080`,
            `167.86.89.31:8080`,
            `79.143.187.62:8080`,
            `51.75.158.99:8080`,
            `172.104.77.31:8080`,
            `94.156.189.157:8080`,
            `151.252.59.37:8080`,
            `167.86.97.25:8080`,
            `173.249.54.30:8080`,
            `90.145.247.161:8080`,
            `208.64.227.88:8080`,
            `62.171.132.115:8080`,
            `167.86.97.14:8080`,
            `164.68.102.159:8080`,
            `167.86.110.24:8080`,
            `207.148.15.146:8080`,
            `135.181.45.39:8080`,
            `167.86.110.26:8080`,
            `62.171.132.109:8080`,
            `168.119.109.36:8080`,
            `173.212.223.135:8080`,
            `207.180.229.199:8080`,
            `51.77.91.2:8080`,
            `85.214.19.239:8080`,
            `167.86.110.20:8080`,
            `164.68.112.233:8080`,
            `167.86.91.129:8080`,
            `71.45.53.64:8080`,
            `51.15.121.17:8080`,
            `172.86.180.4:8080`,
            `164.68.112.222:8080`,
            `152.228.130.236:8080`,
            `94.102.211.12:8080`,
            `45.63.95.68:8080`,
            `173.249.40.106:8080`,
            `51.15.113.234:8080`,
            `185.205.209.50:8080`,
            `90.145.247.140:8080`,
            `167.86.96.252:8080`,
            `167.86.89.239:8080`,
            `51.75.158.6:8080`,
            `89.149.208.132:8080`,
            `92.222.89.160:8080`,
            `167.86.124.239:8080`,
            `135.181.85.207:8080`,
            `135.181.85.202:8080`,
            `135.181.85.205:8080`,
            `135.181.85.208:8080`,
            `135.181.85.209:8080`,
            `135.181.85.201:8080`,
            `135.181.85.200:8080`,
            `135.181.85.206:8080`,
            `195.201.22.221:8080`,
            `195.201.22.200:8080`,
            `195.201.22.207:8080`,
            `195.201.22.227:8080`,
            `195.201.22.213:8080`,
            `195.201.22.216:8080`,
            `195.201.22.205:8080`,
            `195.201.22.210:8080`,
            `195.201.22.201:8080`,
            `195.201.22.214:8080`,
            `168.119.57.83:8080`,
            `168.119.57.82:8080`,
            `168.119.57.72:8080`,
            `168.119.57.81:8080`,
            `168.119.57.77:8080`,
            `168.119.57.73:8080`,
            `168.119.57.70:8080`,
            `207.180.193.27:8080`,
            `167.86.110.13:8080`,
            `80.241.216.188:8080`,
            `173.212.217.82:8080`,
            `164.68.102.157:8080`,
            `213.52.125.44:8080`,
            `54.38.150.124:8080`,
            `173.212.214.45:8080`,
            `173.249.6.125:8080`,
            `194.132.222.219:8080`,
            `90.145.247.158:8080`,
            `80.241.213.200:8080`,
            `164.68.102.152:8080`,
            `167.86.91.104:8080`,
            `167.86.103.113:8080`,
            `167.86.97.11:8080`,
            `93.104.213.141:8080`,
            `207.180.204.151:8080`,
            `164.68.112.219:8080`,
            `193.38.33.124:8080`,
            `164.68.102.155:8080`,
            `173.249.18.163:8080`,
            `35.204.167.142:8080`,
            `173.212.202.54:8080`,
            `173.249.30.122:8080`,
            `151.252.59.35:8080`,
            `167.86.91.152:8080`,
            `62.171.132.116:8080`,
            `167.86.94.163:8080`,
            `167.86.87.55:8080`,
            `167.86.110.28:8080`,
            `167.86.79.43:8080`,
            `164.68.112.214:8080`,
            `173.212.234.230:8080`,
            `62.109.22.250:8080`,
            `167.86.93.185:8080`,
            `207.180.245.37:8080`,
            `207.180.203.197:8080`,
            `51.75.158.19:8080`,
            `185.195.25.186:8080`,
            `151.252.57.207:8080`,
            `116.203.102.87:8080`,
            `91.121.183.173:8080`,
            `153.92.208.64:8080`,
            `68.183.218.85:8080`,
            `164.68.112.227:8080`,
            `164.68.102.167:8080`,
            `207.180.211.50:8080`,
            `165.227.87.65:8080`,
            `172.107.204.217:8080`,
            `91.92.128.231:8080`,
            `117.20.64.116:8080`,
            `164.68.102.160:8080`,
            `14.161.22.95:8080`,
            `167.86.124.242:8080`,
            `167.86.90.110:8080`,
            `207.180.204.80:8080`,
            `135.181.85.199:8080`,
            `135.181.85.197:8080`,
            `135.181.85.194:8080`,
            `135.181.85.195:8080`,
            `135.181.85.193:8080`,
            `195.201.22.153:8080`,
            `195.201.22.163:8080`,
            `195.201.22.187:8080`,
            `195.201.22.192:8080`,
            `195.201.22.135:8080`,
            `195.201.22.154:8080`,
            `195.201.22.170:8080`,
            `195.201.22.178:8080`,
            `195.201.22.189:8080`,
            `195.201.22.132:8080`,
            `135.181.85.203:8080`,
            `135.181.85.204:8080`,
            `178.23.222.2:8080`,
            `167.86.90.86:8080`,
            `207.180.211.40:8080`,
            `213.52.125.42:8080`,
            `45.79.239.226:8080`,
            `207.180.206.21:8080`,
            `89.200.172.119:8080`,
            `207.180.216.178:8080`,
            `167.86.91.153:8080`,
            `167.86.112.198:8080`,
            `164.68.112.218:8080`,
            `173.249.36.55:8080`,
            `167.86.87.59:8080`,
            `167.86.124.238:8080`,
            `167.86.97.26:8080`,
            `51.77.91.4:8080`,
            `174.89.118.143:8080`,
            `173.249.15.232:8080`,
            `168.119.57.76:8080`,
            `168.119.57.78:8080`,
            `168.119.57.75:8080`,
            `135.181.85.212:8080`,
            `135.181.85.159:8080`,
            `135.181.36.193:8080`,
            `135.181.85.149:8080`,
            `95.217.19.237:8080`,
            `95.217.221.28:8080`,
            `95.216.189.91:8080`,
            `135.181.85.150:8080`,
            `135.181.85.171:8080`,
            `167.86.91.64:8080`,
            `90.145.247.148:8080`,
            `185.144.28.222:8080`,
            `173.212.223.176:8080`,
            `164.68.102.148:8080`,
            `164.68.112.220:8080`,
            `85.217.171.116:8080`,
            `90.145.247.150:8080`,
            `167.86.80.36:8080`,
            `207.180.211.144:8080`,
            `167.86.97.7:8080`,
            `99.80.82.23:8080`,
            `167.86.79.34:8080`,
            `167.86.94.165:8080`,
            `173.82.151.10:8080`,
            `51.77.124.7:8080`,
            `167.86.88.165:8080`,
            `45.140.168.218:8080`,
            `124.187.44.212:8080`,
            `207.180.251.161:8080`,
            `167.86.91.140:8080`,
            `167.86.97.4:8080`,
            `167.86.90.132:8080`,
            `167.86.88.222:8080`,
            `167.86.91.133:8080`,
            `167.86.93.226:8080`,
            `167.86.97.10:8080`,
            `45.32.126.230:8080`,
            `167.86.97.27:8080`,
            `95.179.190.8:8080`,
            `217.69.5.79:8080`,
            `167.86.90.167:8080`,
            `167.86.124.236:8080`,
            `167.86.71.165:8080`,
            `185.203.119.229:8080`,
            `178.238.235.223:8080`,
            `207.180.229.173:8080`,
            `51.158.191.187:8080`,
            `207.180.193.10:8080`,
            `213.136.88.211:8080`,
            `167.86.124.245:8080`,
            `208.64.227.82:8080`,
            `207.180.196.81:8080`,
            `173.249.15.183:8080`,
            `212.227.211.87:8080`,
            `45.80.152.12:8080`,
            `207.180.204.56:8080`,
            `167.86.90.46:8080`,
            `173.249.27.22:8080`,
            `51.15.43.204:8080`,
            `173.249.13.18:8080`,
            `172.105.60.87:8080`,
            `68.183.165.70:8080`,
            `188.166.121.129:8080`,
            `207.180.202.120:8080`,
            `51.77.124.12:8080`,
            `167.86.97.24:8080`,
            `173.82.212.62:8080`,
            `95.217.215.17:8080`,
            `195.201.23.0:8080`,
            `195.201.22.255:8080`,
            `195.201.22.238:8080`,
            `195.201.22.96:8080`,
            `195.201.23.2:8080`,
            `195.201.22.249:8080`,
            `195.201.22.233:8080`,
            `195.201.22.254:8080`,
            `167.86.79.59:8080`,
            `167.86.124.230:8080`,
            `207.180.216.124:8080`,
            `167.86.124.233:8080`,
            `207.180.206.97:8080`,
            `207.180.246.218:8080`,
            `207.180.212.197:8080`,
            `167.86.124.237:8080`,
            `164.68.102.156:8080`,
            `167.86.90.75:8080`,
            `167.86.124.251:8080`,
            `54.38.150.119:8080`,
            `207.180.207.146:8080`,
            `51.77.124.18:8080`,
            `157.230.214.214:8080`,
            `164.68.102.166:8080`,
            `213.52.125.43:8080`,
            `45.76.34.140:8080`,
            `207.180.202.230:8080`,
            `45.63.43.164:8080`,
            `51.75.158.103:8080`,
            `193.38.33.123:8080`,
            `167.86.88.157:8080`,
            `207.180.200.239:8080`,
            `173.249.51.210:8080`,
            `167.86.81.59:8080`,
            `51.75.158.111:8080`,
            `78.60.219.169:8080`,
            `173.249.16.58:8080`,
            `167.86.91.99:8080`,
            `164.68.112.216:8080`,
            `207.180.210.63:8080`,
            `167.86.124.228:8080`,
            `164.68.112.215:8080`,
            `167.86.91.98:8080`,
            `164.68.102.163:8080`,
            `173.249.24.50:8080`,
            `167.86.124.241:8080`,
            `51.77.124.22:8080`,
            `167.86.91.55:8080`,
            `173.249.28.149:8080`,
            `173.212.247.22:8080`,
            `173.212.252.120:8080`,
            `207.180.234.61:8080`,
            `90.145.247.162:8080`,
            `167.86.87.57:8080`,
            `167.86.91.12:8080`,
            `51.75.158.23:8080`,
            `173.249.15.238:8080`,
            `167.86.89.215:8080`,
            `185.141.61.179:8080`,
            `207.180.218.18:8080`,
            `167.86.89.6:8080`,
            `173.249.21.154:8080`,
            `173.249.60.78:8080`,
            `209.250.224.212:8080`,
            `167.86.103.114:8080`,
            `95.179.149.67:8080`,
            `70.52.79.114:8080`,
            `164.68.102.158:8080`,
            `164.68.102.162:8080`,
            `173.249.23.24:8080`,
            `167.86.90.25:8080`,
            `167.86.88.137:8080`,
            `95.111.235.137:8080`,
            `167.86.88.200:8080`,
            `95.179.199.47:8080`,
            `167.86.71.164:8080`,
            `167.86.85.147:8080`,
            `167.86.110.23:8080`,
            `51.210.243.4:8080`,
            `164.68.102.150:8080`,
            `89.149.208.133:8080`,
            `173.212.211.55:8080`,
            `167.86.90.88:8080`,
            `90.145.247.176:8080`,
            `207.180.227.207:8080`,
            `79.143.181.118:8080`,
            `167.86.87.54:8080`,
            `173.249.14.78:8080`,
            `173.249.46.109:8080`,
            `109.87.231.183:8080`,
            `51.38.101.172:8080`,
            `173.249.11.196:8080`,
            `167.86.112.151:8080`,
            `90.145.247.177:8080`,
            `51.77.227.47:8080`,
            `167.86.91.156:8080`,
            `95.179.219.105:8080`,
            `195.201.3.145:8080`,
            `93.188.165.193:8080`,
            `158.247.227.242:8080`,
            `45.32.183.71:8080`,
            `167.86.88.160:8080`,
            `167.86.124.232:8080`,
            `89.200.172.159:8080`,
            `51.77.124.2:8080`,
            `167.86.103.117:8080`,
            `167.86.91.2:8080`,
            `172.104.36.13:8080`,
            `45.32.236.166:8080`,
            `167.86.96.5:8080`,
            `90.145.247.168:8080`,
            `173.212.225.161:8080`,
            `51.77.227.30:8080`,
            `54.38.221.37:8080`,
            `167.86.97.21:8080`,
            `164.68.102.149:8080`,
            `80.241.213.83:8080`,
            `62.171.132.113:8080`,
            `173.249.18.165:8080`,
            `149.28.162.235:8080`,
            `91.92.136.194:8080`,
            `167.86.124.250:8080`,
            `167.86.97.8:8080`,
            `167.86.97.19:8080`,
            `164.68.102.154:8080`,
            `165.227.173.131:8080`,
        ];
        if (window.location.protocol === 'http:') {
            let electedSapi = sapis[random.int(0, sapis.length - 1)];
            let prefix = `http://${electedSapi}/v1/`;
            return prefix;
        }
        return `https://sapi.smartcash.cc/v1/`;
    }

    public getUrl(params?: { chain?: string; network?: string }): string {
        let { chain, network } = params;
        chain = chain || this.networkSettings.selectedNetwork.chain;
        network = network || this.networkSettings.selectedNetwork.network;
        const prefix: string = this.getUrlPrefix(chain, network);
        const apiPrefix = `${prefix}/${chain}/${network}`;
        return apiPrefix;
    }

    public getConfig(): ChainNetwork {
        const config = {
            chain: this.networkSettings.selectedNetwork.chain,
            network: this.networkSettings.selectedNetwork.network
        };
        return config;
    }

    public changeNetwork(network: ChainNetwork): void {
        const availableNetworks = this.networkSettings.availableNetworks;
        // Can't do the following because availableNetworks is loaded
        /*
         *const isValid = _.some(availableNetworks, network);
         *if (!isValid) {
         *  this.logger.error(
         *    'Invalid URL: missing or invalid COIN or NETWORK param'
         *  );
         *  return;
         *}
         */
        this.networkSettings = {
            availableNetworks,
            selectedNetwork: network,
            chainNetworkLookup: this.networkSettings.chainNetworkLookup || {}
        };
    }
}
