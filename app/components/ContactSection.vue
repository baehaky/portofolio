<script setup lang="ts">
import { ref } from "vue";
import { useFormStore } from "../../stores/form";

useHead({ title: "Contact — Muhamad Baehaky" });

const config = useRuntimeConfig();

const formStore = useFormStore();
const turnstileToken = ref("");
const sectionRef = ref<HTMLElement | null>(null);

useGsapReveal(sectionRef);

const status = ref<"idle" | "sending" | "success" | "error">("idle");

async function sendEmail() {
  if (!formStore.name || !formStore.email || !formStore.message) return;
  status.value = "sending";

  if (!turnstileToken.value) {
    alert("Please wait for the security check to complete.");
    return;
  }

  try {
    const emailjs = await import("@emailjs/browser");

    await emailjs.send(
      config.public.emailjsServiceId,
      config.public.emailjsTemplateId,
      {
        from_name: formStore.name,
        from_email: formStore.email,
        subject: formStore.subject || "(no subject)",
        message: formStore.message,
        to_email: "baehaky1504@gmail.com",
        reply_to: formStore.email,
      },
      config.public.emailjsPublicKey,
    );

    status.value = "success";

    formStore.resetForm();
    turnstileToken.value = "";

    setTimeout(() => {
      status.value = "idle";
    }, 5000);
  } catch (error) {
    console.error("Gagal mengirim email:", error);
    status.value = "error";
  }
}
</script>

<template>
  <div
    ref="sectionRef"
    class="min-h-screen bg-white dark:bg-[#06060a] relative z-20 transition-colors duration-300"
  >
    <div
      class="fixed inset-0 pointer-events-none hidden dark:block opacity-40"
      style="
        background-image:
          linear-gradient(rgba(255, 255, 255, 0.018) 1px, transparent 1px),
          linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.018) 1px,
            transparent 1px
          );
        background-size: 64px 64px;
      "
    />
    <div
      class="fixed top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
      style="
        background: radial-gradient(
          circle,
          rgba(99, 102, 241, 0.08) 0%,
          transparent 70%
        );
      "
    />
    <div
      class="fixed bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
      style="
        background: radial-gradient(
          circle,
          rgba(139, 92, 246, 0.06) 0%,
          transparent 70%
        );
      "
    />

    <div
      class="relative z-10 container mx-auto px-6 sm:px-10 lg:px-20 py-24 md:py-32 max-w-5xl"
    >
      <div class="mb-16" data-reveal>
        <p
          class="text-[11px] tracking-[0.2em] uppercase font-medium text-neutral-400 dark:text-white/25 mb-4"
        >
          Contact
        </p>
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white leading-tight mb-4"
          style="letter-spacing: -1.5px"
        >
          Let's build something<br />
          <span
            style="
              background: linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            "
            >together.</span
          >
        </h1>
        <p
          class="text-[15px] text-neutral-500 dark:text-white/35 max-w-sm leading-relaxed"
        >
          I'll get back to you within 24 hours.
        </p>
      </div>

      <div class="grid lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24">
        <div class="space-y-10" data-reveal>
          <div
            v-for="item in [
              {
                icon: 'mdi:email-outline',
                label: 'Email',
                value: 'baehaky1504@gmail.com',
                href: 'mailto:baehaky1504@gmail.com',
              },
              {
                icon: 'mdi:map-marker-outline',
                label: 'Location',
                value: 'Indonesia',
                href: null,
              },
            ]"
            :key="item.label"
            class="flex items-start gap-4"
          >
            <div
              class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-neutral-100 dark:bg-[#0f0f18] border border-neutral-200 dark:border-[#1e1e2e]"
            >
              <Icon
                :name="item.icon"
                size="16"
                class="text-neutral-500 dark:text-white/40"
              />
            </div>
            <div>
              <p
                class="text-[11px] tracking-wide uppercase text-neutral-400 dark:text-white/25 mb-0.5"
              >
                {{ item.label }}
              </p>
              <a
                v-if="item.href"
                :href="item.href"
                class="text-[13px] text-neutral-700 dark:text-white/60 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >{{ item.value }}</a
              >
              <p v-else class="text-[13px] text-neutral-700 dark:text-white/60">
                {{ item.value }}
              </p>
            </div>
          </div>
          <div class="h-px bg-neutral-100 dark:bg-white/5" />
          <div>
            <p
              class="text-[11px] tracking-[0.15em] uppercase text-neutral-400 dark:text-white/25 mb-4"
            >
              Find me on
            </p>
            <div class="flex gap-3">
              <a
                v-for="social in [
                  {
                    icon: 'mdi:github',
                    href: 'https://github.com/baehaky',
                    label: 'GitHub',
                  },
                  {
                    icon: 'mdi:linkedin',
                    href: 'https://linkedin.com/in/muhamad-baehaky-86860b214/',
                    label: 'LinkedIn',
                  },
                ]"
                :key="social.label"
                :href="social.href"
                target="_blank"
                rel="noopener"
                :aria-label="social.label"
                class="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 bg-neutral-100 dark:bg-[#0f0f18] border border-neutral-200 dark:border-[#1e1e2e] text-neutral-500 dark:text-white/40 hover:border-indigo-400 hover:text-indigo-500 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
              >
                <Icon :name="social.icon" size="16" />
              </a>
            </div>
          </div>
        </div>

        <div data-reveal>
          <form @submit.prevent="sendEmail" class="space-y-4" novalidate>
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  class="block text-[11px] tracking-[0.1em] uppercase font-medium mb-2 text-neutral-500 dark:text-white/35"
                  >Name <span class="text-red-400">*</span></label
                >
                <input
                  v-model="formStore.name"
                  type="text"
                  placeholder="Your name"
                  required
                  class="w-full px-4 py-2.5 rounded-lg text-[13px] outline-none transition-colors duration-200 bg-neutral-50 dark:bg-[#0f0f18] border border-neutral-200 dark:border-[#1e1e2e] text-neutral-900 dark:text-white/80 placeholder:text-neutral-400 dark:placeholder:text-white/20 focus:border-indigo-400 dark:focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  class="block text-[11px] tracking-[0.1em] uppercase font-medium mb-2 text-neutral-500 dark:text-white/35"
                  >Email <span class="text-red-400">*</span></label
                >
                <input
                  v-model="formStore.email"
                  type="email"
                  placeholder="you@email.com"
                  required
                  class="w-full px-4 py-2.5 rounded-lg text-[13px] outline-none transition-colors duration-200 bg-neutral-50 dark:bg-[#0f0f18] border border-neutral-200 dark:border-[#1e1e2e] text-neutral-900 dark:text-white/80 placeholder:text-neutral-400 dark:placeholder:text-white/20 focus:border-indigo-400 dark:focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label
                class="block text-[11px] tracking-[0.1em] uppercase font-medium mb-2 text-neutral-500 dark:text-white/35"
                >Subject</label
              >
              <input
                v-model="formStore.subject"
                type="text"
                placeholder="What's this about?"
                class="w-full px-4 py-2.5 rounded-lg text-[13px] outline-none transition-colors duration-200 bg-neutral-50 dark:bg-[#0f0f18] border border-neutral-200 dark:border-[#1e1e2e] text-neutral-900 dark:text-white/80 placeholder:text-neutral-400 dark:placeholder:text-white/20 focus:border-indigo-400 dark:focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                class="block text-[11px] tracking-[0.1em] uppercase font-medium mb-2 text-neutral-500 dark:text-white/35"
                >Message <span class="text-red-400">*</span></label
              >
              <textarea
                v-model="formStore.message"
                rows="5"
                placeholder="Tell me about your project, idea, or just say hi..."
                required
                class="w-full px-4 py-2.5 rounded-lg text-[13px] outline-none transition-colors duration-200 resize-none bg-neutral-50 dark:bg-[#0f0f18] border border-neutral-200 dark:border-[#1e1e2e] text-neutral-900 dark:text-white/80 placeholder:text-neutral-400 dark:placeholder:text-white/20 focus:border-indigo-400 dark:focus:border-indigo-500"
              />
            </div>

            <div class="flex justify-center my-4">
              <NuxtTurnstile
                v-model="turnstileToken"
                :options="{ theme: 'auto' }"
              />
            </div>

            <button
              type="submit"
              :disabled="status === 'sending'"
              class="group w-full flex items-center justify-center gap-2.5 py-3 rounded-lg text-[13px] font-semibold transition-all duration-200 bg-neutral-900 dark:bg-white text-white dark:text-[#06060a] hover:bg-neutral-700 dark:hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="status === 'sending'">Sending...</span>
              <span v-else class="inline-flex items-center gap-2">
                Send message
                <Icon
                  name="mdi:arrow-right"
                  size="15"
                  class="transition-transform duration-200 group-hover:translate-x-1"
                />
              </span>
            </button>

            <Transition name="fade">
              <div
                v-if="status === 'success'"
                class="flex items-center gap-3 p-4 rounded-lg text-[13px] bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400"
              >
                <Icon name="mdi:check-circle-outline" size="16" />
                Message sent! I'll get back to you soon.
              </div>
              <div
                v-else-if="status === 'error'"
                class="flex items-center gap-3 p-4 rounded-lg text-[13px] bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400"
              >
                <Icon name="mdi:alert-circle-outline" size="16" />
                Something went wrong. Please try again or email me directly.
              </div>
            </Transition>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
