<script setup lang="ts">
import GuestLayout from '@/components/GuestLayout.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <section>
    <GuestLayout title="Set New Password">
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label for="new-password" class="block text-sm/6 font-medium text-gray-900"
              >New Password</label
            >
            <div class="mt-2">
              <input
                type="password"
                name="password"
                id="new-password"
                required
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password-repeat" class="block text-sm/6 font-medium text-gray-900">
                Repeat Password</label
              >
            </div>
            <div class="mt-2">
              <input
                type="password"
                name="password_repeat"
                id="password-repeat"
                required
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="text-sm">
              <RouterLink
                :to="{ name: 'login' }"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
                >Go back to Login</RouterLink
              >
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </GuestLayout>
  </section>
</template>
