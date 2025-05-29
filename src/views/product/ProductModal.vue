<template>
  <section>
    <dialog id="my_modal_1" class="modal" ref="modalRef">
      <!-- what is ref? =>  access to this HTML or component from JavaScript.”-->
      <div class="modal-box">
        <SpinnerComponent v-if="loading" class="fixed inset-0 flex items-center justify-center" />
        <div>
          <div class="flex justify-between items-center">
            <div class="font-medium text-lg">
              {{
                product.value && product.value.id
                  ? `Update product: ${product.value.title}`
                  : 'Create new Product'
              }}
              <!-- Create new Product -->
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
            <input type="text" placeholder="Title" class="input w-full" v-model="product.title" />

            <input
              type="file"
              class="file-input w-full"
              @change="(e) => (product.image = e.target.files[0])"
            />

            <textarea
              rows="4"
              placeholder="Description"
              class="textarea textarea-bordered w-full"
              v-model="product.description"
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

              <input type="number" required placeholder="Price" v-model.number="product.price" />
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
import { ref, watch } from 'vue'
import { useProductStore } from '@/stores/productStore'

// Create Modal Component
const modalRef = ref(null)
function openModal() {
  modalRef.value?.showModal() // is a native JavaScript function for the HTML <dialog> element. because modalRef.value = dialog element
}
function closeModal() {
  modalRef.value?.close()
}
defineExpose({ openModal, closeModal })

// Create and Update Product
const loading = ref(false)
const props = defineProps({
  product: {
    type: Object,
    default: () => ({
      id: null,
      title: '',
      image: '',
      description: '',
      price: '',
    }),
  },
})

const product = ref({ ...props.product }) // We have props to receive the value from parent. But why we need this? => because props can read-only, so we need to make a copy and then use it.

// ?
watch(
  () => props.product,
  (newVal) => {
    product.value = { ...newVal }
  },
)

// ?
const productStore = useProductStore()
async function onSubmit() {
  try {
    loading.value = true

    const form = new FormData()
    form.append('title', product.value.title)
    form.append('description', product.value.description)
    form.append('price', product.value.price)

    if (product.value.image instanceof File) {
      form.append('image', product.value.image)
    }

    if (product.value.id) {
      await productStore.updateProduct(product.value.id, form)
    } else {
      await productStore.createProduct(form)
    }

    await productStore.getProducts()
    modalRef.value.close()
    resetForm()
  } catch (error) {
    console.error('Submit failed:', error)
  } finally {
    loading.value = false
  }
}

function resetForm() {
  product.value = {
    id: null,
    title: '',
    image: '',
    description: '',
    price: '',
  }
}
</script>
