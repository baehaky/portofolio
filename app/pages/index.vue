<script setup lang="ts">
interface skill {
  icon: string;
  title: string;
  description: string;
}

const skills: skill[] = [
  {
    icon: "material-symbols:code-rounded",
    title: "Web Development",
    description: "Building scalable web applications",
  },
  {
    icon: "material-symbols:design-services-rounded",
    title: "Design",
    description: "Creating visually appealing and user-friendly interfaces",
  },
  {
    icon: "material-symbols:lightbulb-rounded",
    title: "Innovation",
    description: "Creating innovative solutions that solve real-world problems",
  },
];
</script>

<template>
  <section class="min-h-screen">
    <div class="container mx-auto lg:px-10 sm:px-7 px-4 py-20 md:py-32">
      <div class="grid place-items-center text-center gap-12 items-center">
        <div class="max-w-4xl">
          <p
            class="text-sm inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 dark:text-gray-200 rounded-full mb-6"
            style="font-family: &quot;Winky Sans&quot;"
          >
            👋 Welcome to my portofolio
          </p>
          <h1 class="text-4xl md:text-5xl lg:text-6xl mb-6">
            Hello, I'm <br />
            <span
              class="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-bold"
              >Muhamad Baehaky</span
            >
          </h1>
          <p class="text-xl mb-8 max-w-2xl mx-auto text-gray-500 dark:text-gray-400">
            Full Stack Developer & AI Enthusiast who passionate in creating
            digital experiences that are memorable and impactful.
          </p>
          <div class="flex justify-center gap-x-4">
            <button
              class="inline-flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md transition-colors hover:bg-gray-800 dark:hover:bg-gray-200 font-semibold"
            >
              View Project
              <Icon name="mdi:arrow-right" />
            </button>
            <button
              class="bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-bold hover:scale-105 transition-all duration-300 px-4 py-2 rounded-md"
            >
              <NuxtLink to="/contact">Contact Me</NuxtLink>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-100 dark:bg-gray-900/70 py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl mb-4 font-bold">My Skills</h2>
          <p class="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Combining creativity and technology to create innovative solutions
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(skill, index) in skills"
            :key="index"
            class="p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <div>
              <div
                class="w-16 h-16 rounded-xl bg-gray-200 dark:bg-gray-700 flex justify-center items-center mb-6"
              >
                <Icon :name="skill.icon" size="40" />
              </div>
              <h3 class="mb-3 text-xl font-semibold">{{ skill.title }}</h3>
              <p class="text-gray-500 dark:text-gray-400">{{ skill.description }}</p>
            </div>
          </div>
        </div>
      </div> 
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div
        class="bg-gradient-to-r from-blue-500 animate-gradient to-purple-600 rounded-2xl p-12 text-center text-white"
      >
        <h2 class="text-3xl md:text-4xl mb-4 font-semibold">Get In Touch</h2>
        <p class="text-lg text-gray-300 max-w-xl mx-auto mb-8">
          If you have any questions or would like to work together, please feel
          free to contact me.
        </p>
        <NuxtLink to="contact">
          <button
            class="bg-gray-100 text-black font-bold hover:scale-105 transition-all duration-300 px-4 py-2 rounded-md"
          >
            Contact Me
          </button>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
