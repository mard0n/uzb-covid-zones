import { createInstance } from "@mashreq-digital/network";
import * as Config from './constants';

export const API = createInstance({ BASE_URL: Config.BASE_URL,  TIMEOUT: 10000, headers: Config.HEADERS});
