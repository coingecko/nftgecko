import { Notify } from "quasar";
import { i18n } from "src/boot/i18n";

/** show successful notification
 * @export
 * @param {string} message
 * @param {boolean} [i18nString=true]
 */
export function successNotification(message, i18nString = true) {
  Notify.create({
    color: "green",
    message: i18nString ? i18n.t(message) : message
  });
}

/** show error notification
 * @export
 * @param {string} message
 * @param {boolean} [i18nString=true]
 */
export function errorNotification(message, i18nString = true) {
  Notify.create({
    color: "red",
    message: i18nString ? i18n.t(message) : message
  });
}
