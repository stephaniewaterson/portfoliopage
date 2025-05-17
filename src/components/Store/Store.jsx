import { proxy } from "valtio";
import { useProxy } from "valtio/utils";

const store = proxy({ openOverlay: false });
export const useStore = () => useProxy(store);
