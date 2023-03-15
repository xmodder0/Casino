<template>
  <div class="sidebar" :class="{ 'sidebar--active': active }">
    <div class="sidebar__body">
      <div class="sidebar__header">
        <button class="sidebar__close" @click="$emit('close')">
          <svg class="w-full h-full">
            <use xlink:href="/img/icon/free/sprite.svg#close"></use>
          </svg>
        </button>
        <h1 class="sidebar__title">MENU</h1>
        <nav class="sidebar__nav">
          <nuxt-link
            :to="{ name: 'index' }"
            class="sidebar__link"
            :exact-active-class="`sidebar__link--active`"
            >Home</nuxt-link
          >
          <nuxt-link
            :to="{ name: 'games' }"
            class="sidebar__link"
            :exact-active-class="`sidebar__link--active`"
            >Games</nuxt-link
          >
          <nuxt-link
            :to="{ name: 'help' }"
            class="sidebar__link"
            :exact-active-class="`sidebar__link--active`"
            >Help</nuxt-link
          >
          <nuxt-link
            :to="{ name: 'bonus' }"
            class="sidebar__link"
            :exact-active-class="`sidebar__link--active`"
            >Spin</nuxt-link
          >
        </nav>
      </div>
      <div class="sidebar__footer">
        <app-language-switcher :short="false" />
        <hr class="my-4 divider" />
        <div class="flex items-center">
          <div class="flex items-center space-x-3">
            <a href="#">
              <TelegramIcon class="w-auto h-6" />
            </a>
            <a href="#">
              <VkIcon class="w-auto h-8" />
            </a>
          </div>
          <div class="flex items-end justify-end flex-1">
            <button>
              <DarkIcon v-if="true" class="w-auto h-8" />
              <LightIcon v-else class="w-auto h-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appLanguageSwitcher from '@/components/ui/app-language-switcher.vue'
import TelegramIcon from '@/static/img/icon/social/telegram.svg?inline'
import VkIcon from '@/static/img/icon/social/vk.svg?inline'
import DarkIcon from '@/static/img/icon/mode-dark.svg?inline'
import LightIcon from '@/static/img/icon/mode-light.svg?inline'
export default {
  components: {
    appLanguageSwitcher,
    TelegramIcon,
    VkIcon,
    DarkIcon,
    LightIcon,
  },
  props: {
    active: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss">
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  visibility: hidden;
  background: rgba(0, 0, 0, 0.3);
  z-index: 40;

  &--active {
    visibility: visible;
  }

  &__body {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 60%;
    background: var(--x_bg-primary);
    transition: all 0.3s ease-in-out;
    transform: translateX(-100%);
  }

  &--active &__body {
    transform: translateX(0);
    overflow: hidden;
  }

  &__close {
    position: absolute;
    width: 1rem;
    height: 1rem;
    color: var(--x_text-primary);
    transition-property: color, background-color, border-color,
      text-decoration-color, fill, stroke, opacity, box-shadow, transform,
      filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    top: 2rem;
    right: 2rem;
    opacity: 0.3;
  }
  &__close:hover {
    color: var(--x_text-secondary);
    opacity: 1;
  }

  &__header {
    position: relative;
    flex: 1 1 0%;
    background: var(--x_bg-secondary);
    padding: 2rem;
  }

  &__title {
    font-weight: 900;
    font-size: 20px;
    margin-bottom: 1rem;
    line-height: 1;
  }

  &__nav {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    margin-bottom: 1.5rem;
  }

  &__link {
    transition: color 0.3s;
    font-weight: 600;
    padding: 0.25rem 0;
    white-space: nowrap;
    transition: 0.3s;

    &--active,
    &:hover {
      color: var(--x_color-primary);
    }
  }

  &__footer {
    background: var(--bg-secondary);
    padding: 2rem;
    margin-top: auto;
  }
}
</style>
