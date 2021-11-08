import { useRef } from "../../vendor/js/bundle.js";

let uniqueId = 0;
const getUniqueId = () => `_id_${uniqueId++}`;

export function useComponentId() {
  const idRef = useRef(getUniqueId());
  return idRef.current;
}
