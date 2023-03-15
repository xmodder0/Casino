<template>
  <div class="minesweeper-cell" :class="getClass()">
    <div v-if="cell.isOpen && cell.bombCount">
      {{ cell.bombCount }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'minesweeper-cell',
  props: {
    cell: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getClass() {
      const { cell } = this
      if (cell.isOpen && cell.hasBomb) {
        return 'minesweeper-bomb'
      }
      if (cell.isOpen) {
        return 'minesweeper-open'
      }
      return ''
    },
  },
}
</script>

<style lang="scss">
.minesweeper {
  &-cell {
    align-items: center;
    background: #7186e8;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 5px 0 rgb(113, 134, 232, 0.35);
    border-radius: 12px;
    height: 40px;
    width: 45px;
    user-select: none;
    cursor: none;
    display: flex;
    font-size: 1.3em;
    justify-content: center;
    transition: all 0.3s;
    background-repeat: no-repeat;
    background-size: 70%;
    background-image: url('@/static/img/question-mark.png');
    background-position: center;
    animation: scale 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  &-cell::after {
    content: '';
    animation: scale 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  &-bomb {
    background: var(--x_bg-primary);
    animation: card-flip-bomb-open 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)
      both;
  }

  &-open {
    background: var(--x_bg-primary);
    animation: card-flip-coin-open 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)
      both;
  }

  @keyframes card-flip-coin-open {
    0%,
    40% {
      background: #7186e8;
      background-repeat: no-repeat;
      background-size: 70%;
      background-image: url('@/static/img/question-mark.png');
      background-position: center;
      border: 1px solid rgba(0, 0, 0, 0.3);
      box-shadow: 0 5px 0 rgb(113, 134, 232, 0.35);
      transform: scale(1);
    }

    5%,
    35% {
      background: #7186e8;
      background-repeat: no-repeat;
      background-size: 70%;
      background-image: url('@/static/img/question-mark.png');
      background-position: center;
      border: 2px solid rgba(0, 0, 0, 0.3);
      box-shadow: 0 5px 0 rgb(113, 134, 232, 0.35);
      transform: scale(1);
    }

    10%,
    20%,
    30% {
      background: #7186e8;
      background-repeat: no-repeat;
      background-size: 70%;
      background-image: url('@/static/img/question-mark.png');
      background-position: center;
      border: 1px solid rgba(0, 0, 0, 0.3);
      box-shadow: 0 5px 0 rgb(113, 134, 232, 0.35);
      transform: scale(1);
    }

    25%,
    50% {
      background: #7186e8;
      background-repeat: no-repeat;
      background-size: 70%;
      background-image: url('@/static/img/question-mark.png');
      background-position: center;
      border: 1px solid rgba(0, 0, 0, 0.3);
      box-shadow: 0 5px 0 rgb(113, 134, 232, 0.35);
      transform: scale(1);
    }
    60% {
      background: #7186e8;
      background-repeat: no-repeat;
      background-size: 30%;
      background-image: url('@/static/img/question-mark.png');
      background-position: center;
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0 5px 0 rgb(113, 134, 232, 0.35);
      transform: scale(0.9);
    }
    70% {
      background: #7186e8;
      background-repeat: no-repeat;
      background-size: 20%;
      background-image: url('@/static/img/question-mark.png');
      background-position: center;
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0 5px 0 rgb(113, 134, 232, 0.35);
      transform: scale(1);
    }
    80% {
      background: #7186e8;
      background-repeat: no-repeat;
      background-size: 10%;
      background-image: url('@/static/img/question-mark.png');
      background-position: center;
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0 5px 0 rgb(113, 134, 232, 0.35);
      transform: scale(1.1);
    }
    90% {
      background: #7186e8;
      border: none;
      box-shadow: 0 5px 0 rgb(113, 134, 232, 0);
      transform: rotateY(180deg) scale(1);
    }
    100% {
      background-repeat: no-repeat;
      background-size: 70%;
      background-image: url('@/static/img/mines-coin.png');
      background-position: center;
      border: 3px solid #ffb200;
      box-shadow: 0 5px 0 rgb(255, 178, 0, 0.35);
      transform: scale(1);
    }
  }
  @keyframes card-flip-bomb-open {
    0%,
    40% {
      background: #7186e8;
      background-repeat: no-repeat;
      background-size: 70%;
      background-image: url('@/static/img/question-mark.png');
      background-position: center;
      border: 1px solid rgba(0, 0, 0, 0.3);
      box-shadow: 0 5px 0 rgb(113, 134, 232, 0.35);
      transform: scale(1);
    }

    5%,
    35% {
      background: #7186e8;
      background-repeat: no-repeat;
      background-size: 70%;
      background-image: url('@/static/img/question-mark.png');
      background-position: center;
      border: 1px solid rgba(0, 0, 0, 0.3);
      box-shadow: 0 5px 0 rgb(113, 134, 232, 0.35);
      transform: scale(1);
    }

    10%,
    20%,
    30% {
      background: #7186e8;
      background-repeat: no-repeat;
      background-size: 70%;
      background-image: url('@/static/img/question-mark.png');
      background-position: center;
      border: 1px solid rgba(0, 0, 0, 0.3);
      box-shadow: 0 5px 0 rgb(113, 134, 232, 0.35);
      transform: scale(1);
    }

    25%,
    50% {
      background: #7186e8;
      background-repeat: no-repeat;
      background-size: 70%;
      background-image: url('@/static/img/question-mark.png');
      background-position: center;
      border: 1px solid rgba(0, 0, 0, 0.3);
      box-shadow: 0 5px 0 rgb(113, 134, 232, 0.35);
      transform: scale(1);
    }
    60% {
      background: #7186e8;
      background-repeat: no-repeat;
      background-size: 30%;
      background-image: url('@/static/img/question-mark.png');
      background-position: center;
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0 5px 0 rgb(113, 134, 232, 0.35);
      transform: scale(0.9);
    }
    70% {
      background: #7186e8;
      background-repeat: no-repeat;
      background-size: 20%;
      background-image: url('@/static/img/question-mark.png');
      background-position: center;
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0 5px 0 rgb(113, 134, 232, 0.35);
      transform: scale(1);
    }
    80% {
      background: #7186e8;
      background-repeat: no-repeat;
      background-size: 10%;
      background-image: url('@/static/img/question-mark.png');
      background-position: center;
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0 5px 0 rgb(113, 134, 232, 0.35);
      transform: scale(1.1);
    }
    90% {
      background: #7186e8;
      border: none;
      box-shadow: 0 5px 0 rgb(113, 134, 232, 0);
      transform: rotateY(180deg) scale(1);
    }
    100% {
      background-repeat: no-repeat;
      background-size: 85%;
      background-image: url('@/static/img/bomb.png');
      background-position: center;
      border: 3px solid #c0392b;
      box-shadow: 0 5px 0 rgba(192, 57, 43, 0.35);
      transform: scale(1);
    }
  }
  @keyframes card-flip-shake {
    0%,
    40% {
      background: var(--x_bg-primary);
      transform: translate3d(-1px, 0, 0);
    }

    5%,
    35% {
      background: var(--x_bg-primary);
      transform: translate3d(2px, 0, 0);
    }

    10%,
    20%,
    30% {
      background: var(--x_bg-primary);
      transform: translate3d(-4px, 0, 0);
    }

    25%,
    50% {
      background: var(--x_bg-primary);
      transform: translate3d(4px, 0, 0);
    }
    60% {
      background: var(--x_bg-primary);
      transform: rotateY(0deg);
    }
    70% {
      background: var(--x_bg-primary);
    }
    80% {
      background: var(--x_bg-primary);
    }
    100% {
      transform: rotateY(180deg);
    }
  }

  @keyframes scale {
    10% {
      transform: scale(0.1);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>
