<template>
  <GuestLayout title="Admin Login" class="min-h-screen">
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <p v-if="errorMsg" class="text-red-500 text-sm mb-4 text-center">{{ errorMsg }}</p>

      <form class="space-y-6" method="POST" @submit.prevent="login">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email</label>
          <div class="mt-2">
            <input
              v-model="user.email"
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Password</label>
          <div class="mt-2">
            <input
              v-model="user.password"
              type="password"
              name="password"
              id="password"
              required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
            />
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div>
            <div class="inline-flex items-center">
              <label class="flex items-center cursor-pointer relative" for="check-2">
                <input
                  v-model="user.remember"
                  type="checkbox"
                  checked
                  class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-primary checked:border-primary"
                  id="check-2"
                />
                <span
                  class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="1"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
              <label class="cursor-pointer ml-2 text-slate-600 text-sm" for="check-2">
                Remember Me
              </label>
            </div>
          </div>
          <div class="text-sm">
            <RouterLink
              :to="{ name: 'requestPassword' }"
              class="font-semibold text-primary hover:underline"
              >Forgot password?</RouterLink
            >
          </div>
        </div>

        <div>
          <button
            :disabled="loading"
            :class="{
              'cursor-not-allowed': loading,
            }"
            type="submit"
            class="btn btn-primary w-full font-semibold text-white"
          >
            <span class="loading loading-spinner loading-xs mr-2" v-if="loading"></span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </GuestLayout>
</template>

<script setup>
import GuestLayout from '@/components/GuestLayout.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const loading = ref(false)
const errorMsg = ref('')

const user = ref({
  email: '',
  password: '',
  remember: false,
})

async function login() {
  loading.value = true
  errorMsg.value = ''

  try {
    await userStore.login(user.value)
  } catch (error) {
    if (error.response?.data?.message) {
      errorMsg.value = error.response.data.message
    } else {
      errorMsg.value = 'Login failed. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>
