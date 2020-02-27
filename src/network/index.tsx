import { createInstance } from "@mashreq-digital/network";

export const BASE_URL = "http://dummy.restapiexample.com/api/v1/";

export const API = createInstance({ BASE_URL, TIMEOUT: 2000 });
