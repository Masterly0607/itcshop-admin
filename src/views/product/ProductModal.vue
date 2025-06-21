<template>
  <section>
    <BaseModal
      ref="modalRef"
      :title="product.id ? `Update product: ${product.title}` : 'Create new Product'"
    >
      <SpinnerComponent v-if="loading" class="fixed inset-0 flex items-center justify-center" />

      <form v-else class="flex flex-col gap-3" @submit.prevent="onSubmit">
        <!-- Title -->
        <div>
          <input
            type="text"
            placeholder="Title"
            class="input input-bordered w-full"
            v-model="product.title"
          />
          <span v-if="errors.title" class="text-red-500 text-sm">{{ errors.title[0] }}</span>
        </div>

        <!-- Category -->
        <div>
          <select class="select select-bordered w-full" v-model="product.category_id">
            <option disabled value="">-- Select Category --</option>
            <option v-for="cat in categoryStore.categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
          <span v-if="errors.category_id" class="text-red-500 text-sm">{{
            errors.category_id[0]
          }}</span>
        </div>

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
        <div>
          <input
            type="file"
            class="file-input w-full"
            multiple
            accept="image/*"
            @change="handleImageUpload"
          />
          <span v-if="errors['images.0']" class="text-red-500 text-sm">{{
            errors['images.0'][0]
          }}</span>
        </div>

        <!-- Description -->
        <div>
          <textarea
            rows="4"
            placeholder="Description"
            class="textarea textarea-bordered w-full"
            v-model="product.description"
          ></textarea>
          <span v-if="errors.description" class="text-red-500 text-sm">{{
            errors.description[0]
          }}</span>
        </div>

        <!-- Price -->
        <div>
          <label class="input input-bordered w-full flex items-center gap-2">
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
          <span v-if="errors.price" class="text-red-500 text-sm">{{ errors.price[0] }}</span>
        </div>

        <!-- Flash Sale Start -->
        <div>
          <label class="label font-medium">Flash Sale Start</label>
          <input
            type="datetime-local"
            class="input input-bordered w-full"
            v-model="product.flash_sale_start"
          />
          <span v-if="errors.flash_sale_start" class="text-red-500 text-sm">{{
            errors.flash_sale_start[0]
          }}</span>
        </div>

        <!-- Flash Sale End -->
        <div>
          <label class="label font-medium">Flash Sale End</label>
          <input
            type="datetime-local"
            class="input input-bordered w-full"
            v-model="product.flash_sale_end"
          />
          <span v-if="errors.flash_sale_end" class="text-red-500 text-sm">{{
            errors.flash_sale_end[0]
          }}</span>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-2 mt-5">
          <button type="button" class="btn" @click="closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary text-white">Submit</button>
        </div>
      </form>
    </BaseModal>
  </section>
</template>

<script setup>
import SpinnerComponent from '@/components/core/SpinnerComponent.vue'
import BaseModal from '@/components/core/modal/BaseModal.vue'
import { ref, watch, onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { useCategoryStore } from '@/stores/categoryStore'

const modalRef = ref(null)
const loading = ref(false)
const errors = ref({})

const productStore = useProductStore()
const categoryStore = useCategoryStore()
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
      category_id: '',
      flash_sale_start: '',
      flash_sale_end: '',
    }),
  },
})

const product = ref({
  id: null,
  title: '',
  images: [],
  description: '',
  price: '',
  category_id: '',
  flash_sale_start: '',
  flash_sale_end: '',
})
const previewImages = ref([])

defineExpose({ openModal, closeModal })

onMounted(() => {
  categoryStore.fetchAll()
})

function openModal() {
  errors.value = {}
  modalRef.value?.openModal()
}
function closeModal() {
  modalRef.value?.closeModal()
}

watch(
  () => props.product,
  (newVal) => {
    console.log('🛠️ Editing product:', newVal)

    const cloned = JSON.parse(JSON.stringify(newVal))
    // ✅ fix reactive loss

    product.value = {
      id: cloned.id ?? null,
      title: cloned.title ?? '',
      images: Array.isArray(cloned.images) ? [...cloned.images] : [],
      description: cloned.description ?? '',
      price: cloned.price ?? '',
      category_id: cloned.category_id ? Number(cloned.category_id) : '',
      flash_sale_start: cloned.flash_sale_start
        ? new Date(cloned.flash_sale_start).toISOString().slice(0, 16)
        : '',
      flash_sale_end: cloned.flash_sale_end
        ? new Date(cloned.flash_sale_end).toISOString().slice(0, 16)
        : '',
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

  // ✅ Push ID if image is object with ID (like from DB)
  if (typeof removed === 'object' && removed.id) {
    removedImageIds.value.push(removed.id)
  }

  // ✅ OR detect if image is string URL, then extract ID if available
  if (typeof removed === 'string') {
    // Find match in original product.images
    const match = props.product.images.find((img) => img.image === removed)
    if (match && match.id) {
      removedImageIds.value.push(match.id)
    }
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
    category_id: '',
    flash_sale_start: '',
    flash_sale_end: '',
  }
  previewImages.value = []
  removedImageIds.value = []
  errors.value = {}
}

async function onSubmit() {
  try {
    loading.value = true
    errors.value = {}

    const form = new FormData()
    form.append('title', product.value.title)
    form.append('description', product.value.description)
    form.append('price', product.value.price)
    form.append('category_id', product.value.category_id)
    form.append('flash_sale_start', product.value.flash_sale_start)
    form.append('flash_sale_end', product.value.flash_sale_end)

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
    if (e.response?.status === 422) {
      errors.value = e.response.data.errors || {}
    } else {
      console.error('❌ Failed to submit:', e)
      alert('Something went wrong. Check server log or CORS settings.')
    }
  } finally {
    loading.value = false
  }
}
</script>
