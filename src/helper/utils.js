/**
 * @export
 * @param {string} name
 * @param {Object} obj
 * @returns {*}
 */
export function nameFactory(name, obj) {
  const temp = {};
  Object.keys(obj).forEach(objName => {
    temp[objName] = `${name}/${objName}`;
  });
  return temp;
}

/** Load html script tag
 * @export
 * @param {Array<{src: string, integrity: string}>} srcAry
 * @returns
 */
export function loadScripts(srcAry) {
  // Browser supports Promises
  const promises = [];
  srcAry.forEach(srcObj => {
    promises.push(
      new Promise((resolve, reject) => {
        loadScript(srcObj, resolve, reject);
      })
    );
  });

  return Promise.all(promises);
}

export function loadScript(
  srcObj,
  resolve = () => {},
  /** @type {*} */ reject = () => {}
) {
  var js = document.createElement("script");
  js.src = srcObj.src;
  js.crossOrigin = "anonymous";
  js.integrity = srcObj.integrity;
  js.onload = resolve;
  js.onerror = function() {
    reject(new Error("Failed to load script " + srcObj.src));
  };
  document.head.appendChild(js);
}

export function range(start = 0, end = 0, step = 1) {
  if (start === end || step === 0) {
    return [];
  }

  const diff = Math.abs(end - start);
  const length = Math.ceil(diff / step);

  return start > end
    ? Array.from({ length }, (_, key) => start - key * step)
    : Array.from({ length }, (_, key) => start + key * step);
}
