import { Call } from "@wailsio/runtime";
function Greet(name) {
  let $resultPromise = (
    /** @type {any} */
    Call.ByID(1411160069, name)
  );
  return $resultPromise;
}
export {
  Greet
};
