<template>
  <section>
    <BaseModal
      ref="modalRef"
      :title="product.id ? `Update product: ${product.title}` : 'Create new Product'"
    >
      <SpinnerComponent v-if="loading" class="fixed inset-0 flex items-center justify-center" />

      <form v-else class="flex flex-col gap-3" @submit.prevent="onSubmit">
        <!-- Title -->
        <input type="text" placeholder="Title" class="input w-full" v-model="product.title" />

        <!-- Image Preview -->
        <div v-if="previewImages.length" class="mb-3">
          <div class="flex gap-2 flex-wrap">
            <div
              v-for="(img, i) in previewImages"
              :key="i"
              class="relative w-24 h-24 border rounded overflow-hidden"
            >
              <img :src="img" class="w-full h-full object-cover" />
              <button
                class="absolute top-0 right-0 text-white bg-red-600 rounded-bl px-1 text-xs"
                @click.prevent="removeImage(i)"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <!-- Upload -->
        <input
          type="file"
          class="file-input w-full"
          multiple
          accept="image/*"
          @change="handleImageUpload"
        />

        <!-- Description -->
        <textarea
          rows="4"
          placeholder="Description"
          class="textarea textarea-bordered w-full"
          v-model="product.description"
        ></textarea>

        <!-- Price -->
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
              stroke-width="1.5"
              d="M12 6v12m-3-2.818L12 18l3-2.818m0-6.364L12 6l-3 2.818"
            />
          </svg>
          <input type="number" required placeholder="Price" v-model.number="product.price" />
        </label>

        <!-- Actions -->
        <div class="flex justify-end gap-2 mt-5">
          <div class="btn" @click="closeModal()">Cancel</div>
          <input type="submit" value="Submit" class="btn btn-primary text-white" />
        </div>
      </form>
    </BaseModal>
  </section>
</template>

<script setup>
// your exact script — no change
import SpinnerComponent from '@/components/core/SpinnerComponent.vue'
import BaseModal from '@/components/core/modal/BaseModal.vue'
import { ref, watch } from 'vue'
import { useProductStore } from '@/stores/productStore'

const modalRef = ref(null)
const loading = ref(false)

const productStore = useProductStore()
const removedImageIds = ref([])

const props = defineProps({
  product: {
    type: Object,
    default: () => ({
      id: null,
      title: '',
      images: [],
      description: '',
      price: '',
    }),
  },
})

const product = ref({
  id: null,
  title: '',
  images: [],
  description: '',
  price: '',
})
const previewImages = ref([])

defineExpose({ openModal, closeModal })

function openModal() {
  modalRef.value?.openModal()
}
function closeModal() {
  modalRef.value?.closeModal()
}

watch(
  () => props.product,
  (newVal) => {
    product.value = {
      id: newVal.id ?? null,
      title: newVal.title ?? '',
      images: Array.isArray(newVal.images) ? [...newVal.images] : [],
      description: newVal.description ?? '',
      price: newVal.price ?? '',
    }
    removedImageIds.value = []
    updatePreviewImages()
  },
  { immediate: true },
)

function updatePreviewImages() {
  previewImages.value = product.value.images
    .map((img) => {
      if (typeof img === 'string') return img
      if (img instanceof File) return URL.createObjectURL(img)
      if (typeof img === 'object' && img.image) return img.image
      return ''
    })
    .filter(Boolean)
}

function handleImageUpload(e) {
  const files = Array.from(e.target.files || [])
  const existing = product.value.images.filter((img) => img instanceof File)
  const newFiles = files.filter(
    (file) => !existing.some((f) => f.name === file.name && f.size === file.size),
  )

  product.value.images = [
    ...product.value.images.filter((img) => typeof img === 'string' || img instanceof File),
    ...newFiles,
  ]
  updatePreviewImages()
}

function removeImage(index) {
  const removed = product.value.images[index]
  if (typeof removed === 'object' && removed.id) {
    removedImageIds.value.push(removed.id)
  }
  product.value.images.splice(index, 1)
  previewImages.value.splice(index, 1)
}

function resetForm() {
  product.value = {
    id: null,
    title: '',
    images: [],
    description: '',
    price: '',
  }
  previewImages.value = []
  removedImageIds.value = []
}

async function onSubmit() {
  try {
    loading.value = true
    const form = new FormData()
    form.append('title', product.value.title)
    form.append('description', product.value.description)
    form.append('price', product.value.price)

    product.value.images.forEach((img, i) => {
      if (img instanceof File) {
        form.append(`images[${i}]`, img)
      }
    })

    if (product.value.id && removedImageIds.value.length > 0) {
      form.append('removed_image_ids', JSON.stringify(removedImageIds.value))
    }

    if (product.value.id) {
      await productStore.updateProduct(product.value.id, form)
    } else {
      await productStore.createProduct(form)
    }

    await productStore.getProducts()
    closeModal()
    resetForm()
  } catch (e) {
    console.error('Failed to submit', e)
  } finally {
    loading.value = false
  }
}
</script>
