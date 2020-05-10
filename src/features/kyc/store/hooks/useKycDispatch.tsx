import { DispatchContext } from "../context";
import { useContext } from "react";

const useKycDispatch = () => useContext(DispatchContext)

export default useKycDispatch;