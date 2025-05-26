<template>
  <section>
    <dialog id="my_modal_1" class="modal" ref="modalRef">
      <div class="modal-box">
        <SpinnerComponent v-if="loading" class="fixed inset-0 flex items-center justify-center" />
        <div>
          <div class="flex justify-between items-center">
            <div class="font-medium text-lg">
              <!-- {{
                product.value?.id ? `Update product: ${product.value.title}` : 'Create new Product'
              }} -->
              Create new Product
            </div>
            <button class="btn btn-ghost btn-circle btn-sm" @click="closeModal()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="size-7"
              >
                <path
                  d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z"
                />
              </svg>
            </button>
          </div>

          <form class="flex flex-col gap-3 mt-10" @submit.prevent="onSubmit">
            <input type="text" placeholder="Title" class="input w-full" />

            <input
              type="file"
              class="file-input w-full"
              @change="(e) => (product.value.image = e.target.files[0])"
            />

            <textarea
              rows="4"
              placeholder="Description"
              class="textarea textarea-bordered w-full"
            ></textarea>

            <label class="input w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <input type="number" required placeholder="Price" />
            </label>

            <div class="flex justify-end gap-2 mt-5">
              <div class="btn" @click="closeModal()">Cancel</div>
              <input type="submit" value="Submit" class="btn btn-primary text-white" />
            </div>
          </form>
        </div>
      </div>
    </dialog>
  </section>
</template>

<script setup>
import SpinnerComponent from '@/components/core/SpinnerComponent.vue'
import { ref, onUpdated } from 'vue'
import { useProductStore } from '@/stores/productStore'

// Create and Update Product
const modalRef = ref(null)
function openModal() {
  modalRef.value?.showModal()
}
function closeModal() {
  modalRef.value?.close()
}
defineExpose({ openModal, closeModal })

const loading = ref(false)
// const props = defineProps({
//   product: {
//     required: true,
//     type: Object,
//   },
// })

// const product = ref({ ...props.product })

// onUpdated(() => {
//   product.value = { ...props.product }
// })

// const productStore = useProductStore()

// async function onSubmit() {
//   try {
//     loading.value = true

//     if (product.value.id) {
//       await productStore.updateProduct(product.value.id, product.value)
//     } else {
//       await productStore.createProduct(product.value)
//     }

//     await productStore.getProducts()
//     modalRef.value.close()
//     resetForm()
//   } catch (error) {
//     console.error('Submit failed:', error)
//   } finally {
//     loading.value = false
//   }
// }

// function resetForm() {
//   product.value = {
//     id: null,
//     title: '',
//     image: '',
//     description: '',
//     price: '',
//   }
// }
</script>
