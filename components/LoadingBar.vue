<template>
  <div v-if="loading" class="x_loading-wrapper">
    <div class="x_wrapper">
      <div class="x_loading-circle"></div>
      <div class="x_loading-circle"></div>
      <div class="x_loading-circle"></div>
      <div class="x_shadow"></div>
      <div class="x_shadow"></div>
      <div class="x_shadow"></div>
      <span>Loading</span>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>

<style>
.x_loading-wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: var(--x_bg-primary);
  z-index: 50;
}
.x_wrapper {
  user-select: none;
  pointer-events: none;
  width: 200px;
  height: 60px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.x_loading-circle {
  width: 20px;
  height: 20px;
  position: absolute;
  border-radius: 50%;
  background-color: #fff;
  left: 15%;
  transform-origin: 50%;
  animation: loading_circle 0.5s alternate infinite both;
}

@keyframes loading_circle {
  0% {
    top: 60px;
    height: 5px;
    border-radius: 50px 50px 25px 25px;
    transform: scaleX(1.7);
  }
  40% {
    height: 20px;
    border-radius: 50%;
    transform: scaleX(1);
  }
  100% {
    top: 0%;
  }
}
.x_loading-circle:nth-child(2) {
  left: 45%;
  animation-delay: 0.2s;
}
.x_loading-circle:nth-child(3) {
  left: auto;
  right: 15%;
  animation-delay: 0.3s;
}
.x_shadow {
  width: 20px;
  height: 4px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 62px;
  transform-origin: 50%;
  z-index: -1;
  left: 15%;
  filter: blur(1px);
  animation: x_shadow 0.5s alternate infinite ease;
}

@keyframes x_shadow {
  0% {
    transform: scaleX(1.5);
  }
  40% {
    transform: scaleX(1);
    opacity: 0.7;
  }
  100% {
    transform: scaleX(0.2);
    opacity: 0.4;
  }
}
.x_shadow:nth-child(4) {
  left: 45%;
  animation-delay: 0.2s;
}
.x_shadow:nth-child(5) {
  left: auto;
  right: 15%;
  animation-delay: 0.3s;
}
.x_wrapper span {
  position: absolute;
  top: 75px;
  font-family: 'Lato';
  font-size: 20px;
  letter-spacing: 12px;
  color: #fff;
  left: 15%;
}
</style>
