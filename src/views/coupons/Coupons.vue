<template>
  <section class="flex flex-col flex-1 overflow-hidden">
    <div class="flex items-center justify-between mb-4">
      <div class="text-3xl font-semibold">Manage Coupons</div>
      <button class="btn btn-primary text-white" @click="showAddModal">Add New Coupon</button>
    </div>

    <CouponModal ref="modalRef" :coupon="currentCoupon" @refresh="getCoupons" />

    <div class="flex-1 overflow-auto">
      <CouponsTable
        :coupons="couponStore.data || []"
        :loading="couponStore.loading"
        @edit="editCoupon"
        @delete="openDeleteModal"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCouponStore } from '@/stores/couponStore'
import CouponModal from '/src/views/coupons/CouponModal.vue'
import CouponsTable from '/src/views/coupons/CouponsTable.vue'

const modalRef = ref(null)
const couponStore = useCouponStore()
const currentCoupon = ref({})

function getCoupons() {
  couponStore.getCoupons()
}

function showAddModal() {
  currentCoupon.value = {}
  modalRef.value.openModal()
}

function editCoupon(coupon) {
  currentCoupon.value = { ...coupon }
  modalRef.value.openModal()
}

function deleteCoupon(id) {
  if (confirm('Are you sure you want to delete this coupon?')) {
    couponStore.deleteCoupon(id).then(getCoupons)
  }
}

onMounted(getCoupons)
</script>
