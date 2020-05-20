import { StateContext } from "../context";
import { useContext } from "react";

const useKycState = () => useContext(StateContext)

export default useKycState;