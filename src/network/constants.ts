export const BASE_URL = '/api';
// Remove the below code in deployment To test api
let getCifg = sessionStorage.getItem('cif');
export const CIF = getCifg ? getCifg : '010424124';
// 010424124 => shabhaz
// 967156204 =>  hasneeth
// 010424127 => postman
// 012344355 => local
//011111111
export const HEADERS = {
  'X-CIF-ID': CIF,
  'Content-Type' : 'application/json'
};