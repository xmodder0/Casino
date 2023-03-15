<template>
  <main class="layout">
    <app-header class="layout__header" />
    <Nuxt class="layout__body py-6" />
    <app-footer />
    <modal-register />
    <modal-auth />
    <app-notification />
    <appBottomBar />
  </main>
</template>

<script>
import appBottomBar from '@/components/section/app-bottombar.vue'
import appHeader from '@/components/section/app-header.vue'
import AppFooter from '~/components/section/app-footer.vue'
import ModalRegister from '~/components/modal/modal-register.vue'
import ModalAuth from '~/components/modal/modal-auth.vue'
import AppNotification from '~/components/ui/app-notification.vue'
export default {
  components: {
    appBottomBar,
    appHeader,
    AppFooter,
    ModalRegister,
    ModalAuth,
    AppNotification,
  },
}
</script>

<style lang="scss">
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__body {
    flex: 1;
    @apply py-6;
  }
}
</style>
