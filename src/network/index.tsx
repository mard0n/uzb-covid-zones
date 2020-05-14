import { createInstance } from "@mashreq-digital/network";
import * as Config from './constants';

export const API = createInstance({ baseURL: Config.BASE_URL,  timeout: 20000, headers: Config.HEADERS});
