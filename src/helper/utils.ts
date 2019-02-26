import Identicon from "identicon.js";

/**
 * @export
 * @param {string} name
 * @param {Object} obj
 * @returns {*}
 */
export function nameFactory<T>(name: string, obj: T): T {
  const temp: any = {};
  Object.keys(obj).forEach(objName => {
    temp[objName] = `${name}/${objName}`;
  });
  return temp;
}

export function loadScript(
  srcObj: { src: string; integrity: string },
  resolve: any = () => {},
  reject: any = () => {}
) {
  const js = document.createElement("script");
  js.src = srcObj.src;
  js.crossOrigin = "anonymous";
  js.integrity = srcObj.integrity;
  js.onload = resolve;
  js.onerror = () => {
    reject(new Error("Failed to load script " + srcObj.src));
  };
  document.head.appendChild(js);
}

/** Load html script tag
 * @export
 * @param {Array<{src: string, integrity: string}>} srcAry
 * @returns
 */
export function loadScripts(srcAry: { src: string; integrity: string }[]) {
  // Browser supports Promises
  const promises: Promise<any>[] = [];
  srcAry.forEach(srcObj => {
    promises.push(
      new Promise((resolve, reject) => {
        loadScript(srcObj, resolve, reject);
      })
    );
  });
  return Promise.all(promises);
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

/**
 *
 * @param {string | number} name
 * @param {number} size
 */
export function generateImageHolder(name: string, size = 50) {
  const identicon = new Identicon(name, size).toString();
  return `data:image/png;base64,${identicon}`;
}
