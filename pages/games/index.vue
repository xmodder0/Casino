<template>
  <section>
    <p class="font-black p-2 text-xl">ALL GAMES</p>
    <div class="x_container md:justify-center">
      <div class="x_slide-container">
        <div class="x_parent">
          <div class="crash-content">
            <!-- Default content -->
          </div>
          <div class="play-button">
            <button @click="crash">
              <PlayIcon class="x_play" />
            </button>
          </div>
        </div>
        <div class="x_parent">
          <div class="mines-content">
            <!-- Default content -->
          </div>
          <div class="play-button">
            <button @click="mines">
              <PlayIcon class="x_play" />
            </button>
          </div>
        </div>
        <div class="x_parent">
          <div class="blackjack-content">
            <!-- Default content -->
          </div>
          <div class="play-button">
            <button @click="crash">
              <PlayIcon class="x_play" />
            </button>
          </div>
        </div>
        <div class="x_parent">
          <div class="wheel-content">
            <!-- Default content -->
          </div>
          <div class="play-button">
            <button @click="crash">
              <PlayIcon class="x_play" />
            </button>
          </div>
        </div>
        <div class="x_parent">
          <div class="crash-content">
            <!-- Default content -->
          </div>
          <div class="play-button">
            <button @click="crash">
              <PlayIcon class="x_play" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <t-button @click="playSound">click sound</t-button>
  </section>
</template>

<style>
.x_container {
  display: flex;
  align-items: center;
  width: 100%;
  overflow-x: scroll;
  overflow-y: none;
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin: 1px;
}

.x_container::-webkit-scrollbar {
  display: none;
}
.x_slide-container {
  display: inline-flex;
  padding: 5px;
  margin-left: 10px;
  margin-right: 10px;
}
.x_parent {
  position: relative;
  width: 110px;
  height: 150px;
  overflow: hidden;
  border-radius: 20px;
  margin: 8px;
  user-select: none;
}

.crash-content,
.mines-content,
.blackjack-content,
.play-button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.crash-content {
  z-index: 1;
  height: 100%;
  background-image: url('@/static/img/games/crash.jpeg');
  background-size: cover;
  background-position: center;
}
.mines-content {
  z-index: 1;
  height: 100%;
  background-image: url('@/static/img/games/mines.jpeg');
  background-size: cover;
  background-position: center;
}
.blackjack-content {
  z-index: 1;
  height: 100%;
  background-image: url('@/static/img/games/blackjack.jpeg');
  background-size: cover;
  background-position: center;
}
.wheel-content {
  z-index: 1;
  height: 100%;
  background-image: url('@/static/img/games/wheel.jpeg');
  background-size: cover;
  background-position: center;
}

.play-button {
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(3px);
}

.x_parent:hover .play-button {
  opacity: 1;
}
.x_parent:hover .play-button .x_play {
  transition: opacity 1 ease;
  position: absolute;
  opacity: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.play-button .x_play {
  transition: all 0.3s ease;
  position: absolute;
  opacity: 0;
  top: -100%;
  left: 50%;
  transform: translate(-50%, -50%);
  fill: var(--x_color-primary);
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
</style>
<script>
import PlayIcon from '@/static/img/icon/play.svg?inline'

export default {
  components: {
    PlayIcon,
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 2000)
    })
  },
  methods: {
    playSound() {
      const clickSound = require('@/assets/sounds/click.wav').default
      const audio = new Audio(clickSound)
      console.log(audio)
      audio.play()
    },
    crash() {
      this.$router.push('/games/crash')
    },
    mines() {
      this.$router.push('/games/mines')
    },
  },
}
</script>
