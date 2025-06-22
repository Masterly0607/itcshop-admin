<template>
  <BaseModal
    ref="modalRef"
    :title="coupon.id ? `Update Coupon: ${coupon.code}` : 'Create New Coupon'"
  >
    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <!-- Code -->
      <input
        type="text"
        class="input input-bordered w-full"
        placeholder="Coupon Code"
        v-model="coupon.code"
        required
      />

      <!-- Discount Type -->
      <select class="select select-bordered w-full" v-model="coupon.discount_type" required>
        <option disabled value="">-- Select Discount Type --</option>
        <option value="percent">Percent</option>
        <option value="fixed">Fixed</option>
      </select>

      <!-- Discount Value -->
      <input
        type="number"
        step="0.01"
        min="0"
        class="input input-bordered w-full"
        placeholder="Discount Value"
        v-model="coupon.discount_value"
        required
      />

      <!-- Minimum Order Amount -->
      <input
        type="number"
        step="0.01"
        min="0"
        class="input input-bordered w-full"
        placeholder="Minimum Order Amount (optional)"
        v-model="coupon.min_order_amount"
      />

      <!-- Expires At -->
      <input
        type="datetime-local"
        class="input input-bordered w-full"
        v-model="coupon.expires_at"
      />

      <!-- Buttons -->
      <div class="flex justify-end gap-2">
        <button type="button" class="btn" @click="closeModal">Cancel</button>
        <button type="submit" class="btn btn-primary text-white">
          {{ coupon.id ? 'Update' : 'Create' }}
        </button>
      </div>
    </form>
  </BaseModal>
</template>
<script setup>
import { ref, watch, nextTick } from 'vue'
import BaseModal from '@/components/core/modal/BaseModal.vue'
import { useCouponStore } from '@/stores/couponStore'

const props = defineProps({ coupon: Object })
const emit = defineEmits(['refresh'])

const modalRef = ref(null)
const store = useCouponStore()

const coupon = ref({})

// Watch and fill form when editing
watch(
  () => props.coupon,
  (val) => {
    coupon.value = { ...val }
    if (val?.expires_at) {
      coupon.value.expires_at = new Date(val.expires_at).toISOString().slice(0, 16)
    }
  },
  { immediate: true },
)

function openModal() {
  nextTick(() => modalRef.value?.openModal())
}
function closeModal() {
  modalRef.value?.closeModal()
}

async function onSubmit() {
  try {
    if (coupon.value.id) {
      await store.updateCoupon(coupon.value.id, coupon.value)
    } else {
      await store.createCoupon(coupon.value)
    }
    closeModal()
    emit('refresh')
  } catch (error) {
    alert(error.response?.data?.message || 'Something went wrong')
  }
}

defineExpose({ openModal, closeModal })
</script>
