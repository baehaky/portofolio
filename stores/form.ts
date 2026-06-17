import { defineStore } from "pinia";
import type { Forms } from "../app/types/forms";

export const useFormStore = defineStore("contact", {
  state: (): Forms => ({
    name: "",
    email: "",
    subject: "",
    message: "",
  }),
  actions: {
    // Fungsi khusus untuk mengosongkan form
    resetForm() {
      this.name = "";
      this.email = "";
      this.subject = "";
      this.message = "";
    },
  },
});
