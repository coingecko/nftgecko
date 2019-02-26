import { Notify } from "quasar";
import { i18n } from "src/boot/i18n";

/** show successful notification
 * @export
 * @param {string} message
 * @param {boolean} [i18nString=true]
 */
export function successNotification(message: string, i18nString = true) {
  Notify.create({
    color: "green",
    message: i18nString ? i18n.t(message) : message,
    position: "top-right"
  });
}

/** show error notification
 * @export
 * @param {string} message
 * @param {boolean} [i18nString=true]
 */
export function errorNotification(message: string, i18nString = true) {
  Notify.create({
    color: "red",
    message: i18nString ? i18n.t(message) : message,
    position: "top-right"
  });
}

/** show info notification
 * @export
 * @param {string} message
 * @param {boolean} [i18nString=true]
 */
export function infoNotification(message: string, i18nString = true) {
  Notify.create({
    color: "blue",
    message: i18nString ? i18n.t(message) : message,
    position: "top-right"
  });
}
