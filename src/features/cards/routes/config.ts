import { CARDS } from "../../../router/config";

export const PIN_RESET = `${CARDS}/pin-reset`;
export const PIN_RESET_INIT = `${PIN_RESET}/init`;
export const PIN_RESET_AUTH = `${PIN_RESET}/auth`;
export const PIN_RESET_SUCCESS = `${PIN_RESET}/success`;
export const PIN_RESET_FAIL = `${PIN_RESET}/fail`;

export const CARD_ACTIVATION = `${CARDS}/card-activation`;
export const CARD_ACTIVATION_INIT = `${CARD_ACTIVATION}/init`;
export const PIN_SET_INIT = `${CARD_ACTIVATION}/pin-set/init`;
export const PIN_SET_AUTH = `${CARD_ACTIVATION}/pin-set/auth`;
export const CARD_ACTIVATION_SUCCESS = `${CARD_ACTIVATION}/success`;
export const CARD_ACTIVATION_FAIL = `${CARD_ACTIVATION}/fail`;
