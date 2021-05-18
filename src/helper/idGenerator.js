const idGen = (function* () {
  let id = Date.now();
  while (true) yield id++;
})();

export default idGen;
