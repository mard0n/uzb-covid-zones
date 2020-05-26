export const BASE_URL = '/api';
// Remove the below code in deployment To test api
let getCifg = sessionStorage.getItem('cif');
export const CIF = getCifg ? getCifg : '010424124';
// 010424124 => shabhaz
// 967156204 =>  hasneeth
// 010424127 => postman
// 012344355 => local
//011111111
// International Beni 012519220

export const HEADERS = {
  'X-CIF-ID': CIF,
  'Content-Type' : 'application/json'
};


// 010424124   

// 012344355               

// 010424127               

// 010879968               

// 012519220               

// 010260078               

// 010367524               

// 010092516               

// 013037068               

// 010059956               

// 010000289               

// 010052598               

// 010855954               

// 010073170