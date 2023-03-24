<template>
  <div class="crash">
    <div ref="crashWrapper" class="crash__wrapper">
      <ul class="crash__lines opacity-0">
        <li
          v-for="(number, idx) in numbers"
          :key="`crash-line-${idx}`"
          class="crash__line"
        >
          {{ number }}
        </li>
      </ul>
      <div v-show="rate > 1" class="crash__rate">
        <div class="crash__ticker--count text-white font-semibold">
          {{ rate }}
        </div>
      </div>
      <i
        v-show="rate > 1"
        v-for="star in stars"
        :key="star.id"
        class="star"
        :style="{
          left: star.x + 'px',
          width: '1px',
          height: star.h + 'px',
          animationDuration: star.duration + 's',
        }"
      ></i>
      <div ref="rocket" class="crash__ticker">
        <div class="crash__rocket">
          <img src="@/static/img/rocket.png" :style="rocketBoom" key="rocket" />
        </div>
        <div class="sprite_explosion" :style="rocketExplosion"></div>
      </div>
      <div ref="crashChartContainer" class="crash__chart">
        <div v-show="timeleft > 0" class="crash__countdown">
          <span class="w-full text-center crash__start-at">Starting at</span>
          <span class="flex items-center"
            ><svg class="w-6 h-5 mr-2">
              <use :xlink:href="`/img/icon/free/sprite.svg#clock`"></use></svg
            >{{ (timeleft / 1000).toFixed(1) }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    socket: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      count: 20,
      stars: [],
      rocketBoom: {},
      rocketExplosion: {},
      maxLines: 7,
      timeleft: 0,
      interval: null,
      loaded: false,
      isActive: true,
      hidden: null,
      visibilityChange: null,
    }
  },
  computed: {
    ...mapState({
      rate: (state) => state.crash.rate,
    }),
    percent() {
      const res = this.rate * 100 - 100
      return res >= 100 ? 100 : res
    },
    crashChartContainerWidth() {
      if (!this.loaded) {
        return 0
      }
      return this.$refs.crashChartContainer.clientWidth - 30
    },
    chartWrapperHeight() {
      if (!this.loaded) {
        return 0
      }
      return (this.$refs.crashWrapper.clientHeight / 3) * 2
    },
    chartWrapperWidth() {
      if (!this.loaded) {
        return 0
      }
      return this.$refs.crashWrapper.clientWidth
    },
    chartHeight() {
      const height = parseFloat(
        (this.rate * 100 - 100) * (this.chartWrapperHeight / 100)
      )
      return height < 30 || !this.isActive
        ? 30
        : height >= this.chartWrapperHeight
        ? this.chartWrapperHeight - 2
        : height - 2
    },
    endRange() {
      return this.rate * 1.5
    },
    numbers() {
      const rangeHalf = this.endRange / this.maxLines
      const result = [1]

      for (let i = 0; i < this.maxLines - 2; i++) {
        const num = parseFloat((result[i] + rangeHalf).toFixed(2))
        result.push(num)
      }

      result.push(this.endRange)

      return result
        .sort((a, b) => a + b)
        .map((number) => {
          const chanks = number.toString().split('.')
          return `${chanks[0]}.${
            chanks.length > 1 ? chanks[1].split('')[0] : 0
          }0`
        })
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.handleResize)
    this.socket
      .on('game:status', (data) => {
        if (data.timeleft > 0) {
          this.timeleft = data.timeleft
          this.startCountDown()
        } else {
          this.startRocketAnim()
        }
      })
      .on('game:new', (data) => {
        this.SET_RATE(1)
        clearInterval(this.interval)
        this.timeleft = data.timeleft
        this.resetRocketAnim()
        setInterval(() => {
          this.startRocketAnim()
        }, this.timeleft)
        this.showRocketBoom()
        this.startCountDown()
      })
      .on('game:tick', (data) => {
        if (this.isActive) this.SET_RATE(data.rate)
      })
      .on('game:final', (data) => {
        this.hideRocketBoom()
        setTimeout(() => {
          this.resetRocketAnim()
        }, 650)
      })

    if (typeof document.hidden !== 'undefined') {
      // Opera 12.10 and Firefox 18 and later support
      this.hidden = 'hidden'
      this.visibilityChange = 'visibilitychange'
    } else if (typeof document.msHidden !== 'undefined') {
      this.hidden = 'msHidden'
      this.visibilityChange = 'msvisibilitychange'
    } else if (typeof document.webkitHidden !== 'undefined') {
      this.hidden = 'webkitHidden'
      this.visibilityChange = 'webkitvisibilitychange'
    }

    this.$nextTick(() => {
      window.addEventListener(this.visibilityChange, this.setActive, false)
    })
  },
  mounted() {
    this.createStars()
    this.startRocketAnim()
    this.resetRocketAnim()
    this.loaded = true
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener(this.visibilityChange, this.setActive)

    clearInterval(this.interval)
  },
  methods: {
    ...mapMutations({
      SET_RATE: 'crash/SET_RATE',
    }),
    setActive() {
      this.isActive = !document[this.hidden]
    },
    startCountDown() {
      if (!this.isActive) {
        this.timeleft = 0
      }
      this.interval = setInterval(() => {
        if (this.timeleft < 0) {
          return clearInterval(this.interval)
        } else if (this.timeleft > 0) {
          this.resetRocketAnim()
          this.timeleft -= 100
        }
      }, 100)
    },
    handleResize() {
      this.loaded = false
      setTimeout(() => {
        this.loaded = true
      }, 1)
    },
    createStars() {
      for (let i = 1; i <= this.count; i++) {
        const x = Math.floor(Math.random() * window.innerWidth)
        const duration = Math.random() * 1
        const h = Math.random() * 100
        this.stars.push({ id: i, x, duration, h })
      }
    },
    resetRocketAnim() {
      const rocket = this.$refs.rocket

      this.$anime({
        targets: rocket,
        translateX: 0,
        translateY: 0,
        rotate: 0,
      }).restart()
    },
    startRocketAnim() {
      const rocket = this.$refs.rocket

      this.$anime({
        targets: rocket,
        translateX: [
          '0',
          'calc(10% + 110px)',
          'calc(70% + 148.5px)',
          'calc(100% + 165px)',
        ],
        translateY: [
          '0',
          'calc(40% + -40px)',
          'calc(50% + -60px)',
          'calc(60% + -80px)',
          'calc(70% + -100px)',
          'calc(80% + -140.5px)',
          'calc(90% + -200.5px)',
          'calc(100% + -255px)',
        ],
        rotate: [
          '0',
          '-10deg',
          '-15deg',
          '-20deg',
          '-25deg',
          '-50deg',
          '-60deg',
          '-70deg',
          '-75deg',
        ],
        duration: 1200,
        easing: 'linear',
      })
    },
    hideRocketBoom() {
      this.rocketBoom = {
        opacity: 0,
      }
      this.rocketExplosion = {
        opacity: 1,
      }
      setTimeout(() => {
        this.rocketExplosion = {
          opacity: 0,
        }
      }, 650)
    },
    showRocketBoom() {
      this.rocketBoom = {
        opacity: 1,
      }
      this.rocketExplosion = {
        opacity: 0,
      }
    },
  },
}
</script>

<style lang="scss">
$sm: 480px;
$md: 640px;
$lg: 768px;
$xl: 1024px;
$xxl: 1280px;

.sprite_explosion {
  opacity: 0;
  position: absolute;
  background-image: url('@/static/img/explosion1.png');
  background-repeat: no-repeat;
  background-size: cover;
  width: 70px;
  height: 70px;
  animation: play-sprite-animation 0.65s steps(7) infinite;
}

@keyframes play-sprite-animation {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -520px 0;
  }
}

.star {
  position: absolute;
  top: -250px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  animation: star-anim linear infinite;
}

@keyframes star-anim {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100vh);
  }
}

.flame_container {
  position: absolute;
  margin: 0 auto;
  width: 25px;
  height: 25px;
  bottom: 0;
  left: 30%;
  z-index: -10;
  transform-origin: center top;
  animation-name: flames;
  animation-duration: 3ms;
  animation-delay: 200ms;
  animation-timing-function: ease-in;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.flame {
  bottom: 0;
  position: absolute;
  border-bottom-right-radius: 50%;
  border-bottom-left-radius: 50%;
  border-top-left-radius: 50%;
  transform: rotate(135deg) scale(1.5, 1.5);
  -moz-transform: rotate(135deg) scale(1.5, 1.5);
  -webkit-transform: rotate(135deg) scale(1.5, 1.5);
  -o-transform: rotate(135deg) scale(1.5, 1.5);
}
.yellow {
  left: 15px;
  width: 15px;
  height: 15px;
  background: gold;
  box-shadow: 0px 0px 9px 4px gold;
}
.orange {
  left: 10px;
  width: 25px;
  height: 25px;
  background: orange;
  box-shadow: 0px 0px 9px 4px orange;
}
.red {
  left: 5px;
  top: 20px;
  width: 35px;
  height: 35px;
  background: OrangeRed;
  border: 1px solid OrangeRed;
  box-shadow: 0px 0px 5px 4px OrangeRed;
}
.white {
  left: 15px;
  top: 20px;
  width: 25px;
  height: 25px;
  background: white;
  box-shadow: 0px 0px 9px 4px white;
}
.x_circle {
  border-radius: 50%;
  position: absolute;
  width: 5px;
  height: 5px;
}
.blue {
  width: 5px;
  height: 5px;
  left: 25px;
  top: 5px;
  background: SlateBlue;
  box-shadow: 0px 0px 15px 10px #4fc1e9;
}
.black {
  width: 25px;
  height: 25px;
  left: 10px;
  top: -30px;
  background: #ddd;
  border: 1px solid #282a3a;
  box-shadow: 0px 0px 10px 10px #282a3a;
}

@keyframes flames {
  0% {
    transform: rotate(-1deg);
    -moz-transform: rotate(-1deg);
    -webkit-transform: rotate(-1deg);
  }
  20% {
    transform: rotate(1deg);
    -moz-transform: rotate(1deg);
    -webkit-transform: rotate(1deg);
  }
  40% {
    transform: rotate(-1deg);
    -moz-transform: rotate(-1deg);
    -webkit-transform: rotate(-1deg);
  }
  60% {
    transform: rotate(1deg) scaleY(1.04);
  }
  80% {
    transform: rotate(-2deg) scaleY(0.92);
    -moz-transform: rotate(-2deg) scaleY(0.92);
    -webkit-transform: rotate(-2deg) scaleY(0.92);
  }
  100% {
    transform: rotate(1deg);
    -webkit-transform: rotate(1deg);
    -moz-transform: rotate(1deg);
  }
}

.crash {
  &__wrapper {
    user-select: none;
    pointer-events: none;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    background: #000;
    border-radius: 10px;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('@/static/img/crash_bg.jpeg');
    background-position: center;
  }

  &__lines {
    display: grid;
    gap: 1.5rem;
    font-weight: 500;
    width: 0px;
    font-size: 12px;

    @media screen and (min-width: $sm) {
      gap: 2.5rem;
    }

    @media screen and (min-width: $md) {
      gap: 4.5rem;
    }

    @media screen and (min-width: $xl) {
      gap: 6.5rem;
    }
  }

  &__line {
    text-align: right;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translateY(-50%) translateX(100%);
      border-top: 1px dashed rgb(227, 226, 223);
      width: 100vw;
    }
  }

  &__countdown {
    font-weight: 700;
    font-size: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;

    @media screen and (min-width: $md) {
      font-size: 20px;
    }

    @media screen and (min-width: $lg) {
      font-size: 24px;
    }
  }

  &__start-at {
    font-size: 16px;
    font-weight: 600;

    @media screen and (min-width: $md) {
      font-size: 18px;
    }

    @media screen and (min-width: $lg) {
      font-size: 20px;
    }
  }

  &__rate {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    gap: 0.5rem;
    font-weight: 900;
    font-size: 24px;
    z-index: 30;
  }

  &__background {
    transition: all 0.3s linear;
    stroke: #ffb200;
    width: 75px;
    height: 25px;

    @media screen and (min-width: $md) {
      width: 85px;
      height: 40px;
    }
  }

  &__ticker {
    position: absolute;
    display: flex;
    bottom: 0;
    left: 0;
    font-weight: 600;
    z-index: 40;

    @media screen and (min-width: $md) {
      font-size: 14px;
    }

    &--count {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-55%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      height: 100%;
      border-radius: 8px;
    }
  }

  &__rocket {
    position: relative;
    width: 4rem;
    transform: translateY(15%) rotate(90deg);
    z-index: -10;
  }

  @keyframes animate {
    0%,
    100% {
      transform: translateY(-1px);
    }
    50% {
      transform: translateY(1px);
    }
  }

  &__chart {
    position: absolute;
    bottom: 50%;
    right: 0;
    transform: translate(0, 50%);
    width: calc(100% - 50px);
    height: 100%;
    display: flex;
    align-items: flex-end;
  }

  &__svg {
  }
}
</style>
