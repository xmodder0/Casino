<template>
  <nav class="bottom-nav">
    <nuxt-link to="/" class="nav-item" :exact-active-class="`active`">
      <img src="@/static/bottombar-icons/home.svg" alt />
      <span class="label">Home</span>
    </nuxt-link>
    <nuxt-link
      to="/games/crash"
      class="nav-item"
      :exact-active-class="`active`"
    >
      <img src="@/static/bottombar-icons/vip.svg" alt />
      <span class="label">VIP</span>
    </nuxt-link>
    <nuxt-link to="/bonus" class="nav-item" :exact-active-class="`active`">
      <img src="@/static/bottombar-icons/share.svg" alt />
      <span class="label">Share</span>
    </nuxt-link>
    <nuxt-link to="/help" class="nav-item" :exact-active-class="`active`">
      <img src="@/static/bottombar-icons/promotion.svg" alt />
      <span class="label">Launch</span>
    </nuxt-link>
    <nuxt-link to="/games" class="nav-item" :exact-active-class="`active`">
      <img src="@/static/bottombar-icons/download.svg" alt />
      <span class="label">Games</span>
    </nuxt-link>
  </nav>
</template>

<style lang="scss">
.bottom-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: var(--x_bg-secondary);
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #eeeeee;
  text-decoration: none;
  user-select: none;
  cursor: none;
  transition: transform 0.2s ease-in-out;
}

.nav-item.active {
  transform: scale(1.1);
  animation-name: popup;
  animation-duration: 0.2s;
  animation-timing-function: ease-out;
  color: var(--x_bj-gold);
}

.nav-item img {
  width: 28px;
  height: 28px;
  margin-bottom: 2px;
  filter: invert(98%) sepia(7%) saturate(69%) hue-rotate(191deg)
    brightness(113%) contrast(87%);
}
.nav-item.active img {
  filter: invert(62%) sepia(93%) saturate(434%) hue-rotate(4deg) brightness(95%)
    contrast(94%);
}

.nav-item .label {
  font-size: 10px;
  font-weight: 600;
}
@keyframes popup {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
