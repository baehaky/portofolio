import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    isDark: false,
  }),
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark;
      this.updateDOM();
      localStorage.setItem("theme", this.isDark ? "dark" : "light");
    },

    initTheme() {
      const storedTheme = localStorage.getItem("theme");
      if (
        storedTheme === "dark" ||
        (!storedTheme &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        this.isDark = true;
      } else {
        this.isDark = false;
      }
      this.updateDOM();
    },

    updateDOM() {
      if (this.isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
});
