import Vue from "vue";
import Store from "src/store";

function splitClasses(className: string) {
  return [...className.split(" ")];
}

export const darkModeClassDirectives = Vue.directive("dm-text", {
  bind(el, binding, _vnode) {
    if (Store.state.settings.darkMode) {
      el.classList.remove(...splitClasses(binding.value.light));
      el.classList.add(...splitClasses(binding.value.dark));
    } else {
      el.classList.remove(...splitClasses(binding.value.dark));
      el.classList.add(...splitClasses(binding.value.light));
    }
    const unwatch = Store.watch(
      state => state.settings.darkMode,
      darkMode => {
        if (darkMode) {
          el.classList.remove(...splitClasses(binding.value.light));
          el.classList.add(...splitClasses(binding.value.dark));
        } else {
          el.classList.remove(...splitClasses(binding.value.dark));
          el.classList.add(...splitClasses(binding.value.light));
        }
      }
    );
    // @ts-ignore
    el.__dm_unwatch__ = unwatch;
  },
  unbind(el: any) {
    if (el.__dm_unwatch__) el.__dm_unwatch__();
  }
});
