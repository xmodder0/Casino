<template>
  <section class="container">
    <h1 class="flex items-center mb-6 text-2xl font-black uppercase">
      <span class="flex-1">MINES</span>
      <t-button variant="white" @click="$modal.show('crash-instruction')">
        <svg class="w-4 h-6">
          <use xlink:href="/img/icon/free/sprite.svg#info-i"></use>
        </svg>
      </t-button>
    </h1>
    <div class="grid grid-cols-1 gap-8">
      <div
        class="col-span-8 p-2 x lg:col-span-3 rounded-xl justify-center flex flex-col"
      >
        <div
          class="minesweeper flex justify-center py-5"
          :class="{ disabled: betting }"
        >
          <div
            class="minesweeper-grid"
            :class="{ minesDisabledTouch: mineDisabledTouch }"
            :style="getGridStyle()"
          >
            <minesweeper-cell
              v-for="(cell, i) in grid"
              :key="i"
              :cell="cell"
              @click.native="clickCell(cell, i)"
              @contextmenu.native.prevent
            >
            </minesweeper-cell>
          </div>
        </div>
        <vue-horizontal
          class="horizontal"
          ref="horizontal"
          :displacement="1"
          snap="center"
        >
          <div
            v-for="(item, index1) in selectedArray.items"
            :key="index1"
            class="x_option"
            :class="{ selectedActive: index1 === selectedIndexActive }"
          >
            {{ item }}
          </div>
        </vue-horizontal>
        <div class="flex flex-row relative h-30 w-full px-10 pt-5 pb-2">
          <div class="w-1/2 flex flex-row justify-center">
            <label class="absolute text-dark z-10 text-sm font-semibold"
              >MINES</label
            >
            <select
              class="x_select"
              v-model="selected"
              @change="updateBombs"
              :disabled="playing"
            >
              <option
                v-for="(option, index) in options"
                :key="index"
                :value="index"
              >
                {{ option.name }}
              </option>
            </select>
          </div>
          <div class="w-1/2 flex flex-row justify-center">
            <label class="absolute text-dark z-10 text-sm font-semibold"
              >PLACE AMOUNT</label
            >
            <t-input
              class="x_placeAmount"
              :value="bet.placeAmount"
              disabled
            ></t-input>
          </div>
        </div>
        <div class="flex flex-col px-10 pb-10">
          <form @submit.prevent="betPlace">
            <label class="mb-3 font-semibold text-md" for="amount">{{
              $t('bet-amount')
            }}</label>
            <div class="mb-3 relative">
              <t-input
                id="amount"
                v-model="bet.amount"
                :disabled="playing"
              ></t-input>
              <div
                class="absolute top-1/2 right-3 transform -translate-y-1/2 space-x-2 flex items-center"
              >
                <t-button
                  type="button"
                  variant="outline"
                  class="bg-gray-100 border-none w-10"
                  @click="bet.amount *= 2"
                  :disabled="playing"
                  >X2</t-button
                >
                <t-button
                  type="button"
                  variant="outline"
                  class="bg-gray-100 border-none w-10"
                  @click="bet.amount /= 2"
                  :disabled="playing"
                  >1/2</t-button
                >
              </div>
            </div>
            <div class="grid grid-cols-3 gap-2 mb-4 sm:grid-cols-6">
              <t-button
                type="button"
                variant="outline"
                @click="bet.amount += 1"
                :disabled="playing"
                >+1</t-button
              >
              <t-button
                type="button"
                variant="outline"
                @click="bet.amount += 5"
                :disabled="playing"
                >+5</t-button
              >
              <t-button
                type="button"
                variant="outline"
                @click="bet.amount += 10"
                :disabled="playing"
                >+10</t-button
              >
              <t-button
                type="button"
                variant="outline"
                @click="bet.amount += 100"
                :disabled="playing"
                >+100</t-button
              >
              <t-button
                type="button"
                variant="outline"
                @click="bet.amount += 500"
                :disabled="playing"
                >+500</t-button
              >
              <t-button
                type="button"
                variant="outline"
                @click="bet.amount += 100000"
                :disabled="playing"
                >Все</t-button
              >
            </div>
            <t-button
              v-if="betting"
              type="submit"
              class="!py-4 w-full hover:x_button"
              variant="primary"
              :disabled="betDisabled"
              >BET</t-button
            >
          </form>
          <t-button
            v-if="playing"
            @click="cashout"
            class="!py-4 transition-all"
            variant="primary"
            :disabled="cashoutDisabled"
            >CASHOUT</t-button
          >
        </div>
      </div>
    </div>
    <transition name="pop" appear>
      <div class="modal-overlay" role="dialog" v-if="showModal1">
        <div class="modal">
          <h1>CAAAASSSHHHOUUTTTT</h1>
          <h2 class="font-black text-xl">
            {{ bet.amount }} x {{ selectedArray.items[selectedIndex] }} =
            {{ bet.placeAmount }}
          </h2>
        </div>
      </div>
    </transition>
  </section>
</template>

<style scoped>
.x_placeAmount {
  width: 100%;
  margin: 1px;
  font-weight: 900;
  text-align: center;
}
.x_select {
  width: 100%;
  margin: 1px;
  font-size: 1.2rem;
  border-radius: 12px;
  font-weight: 900;
  text-align: center;
  color: var(--x_textd-primary);
}
.horizontal >>> .v-hl-container {
  margin-left: 10px;
  margin-right: 10px;
}
.horizontal >>> .v-hl-btn svg {
  border-radius: 0;
  margin: 0;
  padding: 8px;
  height: 100%;
  box-shadow: none;
  background: none;
  user-select: none;
  cursor: none;
  color: var(--x_text-primary);
}

.horizontal >>> .v-hl-btn-prev {
  margin-right: 10px;
  background: rgba(0, 0, 0, 0);
}

.horizontal >>> .v-hl-btn-next {
  margin-left: 10px;
  background: rgba(0, 0, 0, 0);
}

.horizontal >>> .v-hl-btn {
  top: 0;
  bottom: 0;
  transform: translateX(0);
}
.x_option {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 12px;
  margin: 2px;
  background: #eee;
  color: var(--x_textd-primary);
  border-radius: 10px;
  font-weight: 600;
  width: 55px;
}
.x_option.selectedActive {
  background: var(--x_color-primary);
  color: var(--x_textd-primary);
}
</style>

<script>
import VueHorizontal from 'vue-horizontal'
import MinesweeperCell from '~/components/games/mines/MinesweeperCell.vue'

export default {
  name: 'minesweeper-game',
  components: {
    VueHorizontal,
    MinesweeperCell,
  },
  props: {
    cols: {
      type: Number,
      default: 5,
    },
    rows: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      bet: {
        amount: 0,
        placeAmount: 0,
      },
      selected: 0,
      showModal1: false,
      options: [
        {
          name: '2',
          value: 2,
          items: [
            '1.03',
            '1.05',
            '1.09',
            '1.12',
            '1.15',
            '1.19',
            '2.01',
            '2.05',
            '2.10',
            '2.20',
            '2.65',
            '3.31',
            '4.18',
            '5.33',
            '6.91',
            '7.17',
            '8.57',
            '9',
            '10.5',
            '11.5',
            '12',
            '13',
          ],
        },
        {
          name: '3',
          value: 3,
          items: [
            '1.11',
            '1.25',
            '1.43',
            '1.68',
            '1.96',
            '2.3',
            '2.73',
            '3.28',
            '3.98',
            '4.9',
            '6.13',
            '7.8',
            '10.14',
            '13.52',
            '18.59',
            '26.56',
            '39.84',
            '63.74',
            '111.55',
            '223.1',
            '557.5',
            '2231',
          ],
        },
        {
          name: '4',
          value: 4,
          items: [
            '1.17',
            '1.39',
            '1.68',
            '2',
            '2.48',
            '3.1',
            '3.92',
            '5.04',
            '6.6',
            '8.8',
            '12',
            '16.8',
            '24.27',
            '36.41',
            '57.22',
            '95.37',
            '171.67',
            '343.35',
            '801.16',
            '2400',
            '12020',
          ],
        },
        {
          name: '5',
          value: 5,
          items: [
            '1.18',
            '1.5',
            '1.92',
            '2.48',
            '3.25',
            '4.34',
            '5.89',
            '8.15',
            '11.55',
            '39.21',
            '63.72',
            '109.25',
            '200.29',
            '400.58',
            '901.31',
            '2400',
            '8410',
            '50470',
          ],
        },
        {
          name: '6',
          value: 6,
          items: [
            '1.03',
            '1.07',
            '1.12',
            '1.17',
            '1.23',
            '1.30',
            '1.37',
            '1.45',
            '1.54',
            '1.65',
            '1.76',
            '1.90',
            '2.06',
            '2.25',
            '2.47',
            '2.75',
            '3.09',
            '3.53',
            '4.12',
            '4.95',
            '6.18',
            '8.25',
            '12.37',
            '24.75',
          ],
        },
        {
          name: '7',
          value: 7,
          items: [
            '1.03',
            '1.07',
            '1.12',
            '1.17',
            '1.23',
            '1.30',
            '1.37',
            '1.45',
            '1.54',
            '1.65',
            '1.76',
            '1.90',
            '2.06',
            '2.25',
            '2.47',
            '2.75',
            '3.09',
            '3.53',
            '4.12',
            '4.95',
            '6.18',
            '8.25',
            '12.37',
            '24.75',
          ],
        },
        {
          name: '8',
          value: 8,
          items: [
            '1.03',
            '1.07',
            '1.12',
            '1.17',
            '1.23',
            '1.30',
            '1.37',
            '1.45',
            '1.54',
            '1.65',
            '1.76',
            '1.90',
            '2.06',
            '2.25',
            '2.47',
            '2.75',
            '3.09',
            '3.53',
            '4.12',
            '4.95',
            '6.18',
            '8.25',
            '12.37',
            '24.75',
          ],
        },
        {
          name: '9',
          value: 9,
          items: [
            '1.03',
            '1.07',
            '1.12',
            '1.17',
            '1.23',
            '1.30',
            '1.37',
            '1.45',
            '1.54',
            '1.65',
            '1.76',
            '1.90',
            '2.06',
            '2.25',
            '2.47',
            '2.75',
            '3.09',
            '3.53',
            '4.12',
            '4.95',
            '6.18',
            '8.25',
            '12.37',
            '24.75',
          ],
        },
        {
          name: '10',
          value: 10,
          items: [
            '1.03',
            '1.07',
            '1.12',
            '1.17',
            '1.23',
            '1.30',
            '1.37',
            '1.45',
            '1.54',
            '1.65',
            '1.76',
            '1.90',
            '2.06',
            '2.25',
            '2.47',
            '2.75',
            '3.09',
            '3.53',
            '4.12',
            '4.95',
            '6.18',
            '8.25',
            '12.37',
            '24.75',
          ],
        },
        {
          name: '10',
          value: 10,
          items: [
            '1.03',
            '1.07',
            '1.12',
            '1.17',
            '1.23',
            '1.30',
            '1.37',
            '1.45',
            '1.54',
            '1.65',
            '1.76',
            '1.90',
            '2.06',
            '2.25',
            '2.47',
            '2.75',
            '3.09',
            '3.53',
            '4.12',
            '4.95',
            '6.18',
            '8.25',
            '12.37',
            '24.75',
          ],
        },
        {
          name: '11',
          value: 11,
          items: [
            '1.03',
            '1.07',
            '1.12',
            '1.17',
            '1.23',
            '1.30',
            '1.37',
            '1.45',
            '1.54',
            '1.65',
            '1.76',
            '1.90',
            '2.06',
            '2.25',
            '2.47',
            '2.75',
            '3.09',
            '3.53',
            '4.12',
            '4.95',
            '6.18',
            '8.25',
            '12.37',
            '24.75',
          ],
        },
        {
          name: '12',
          value: 12,
          items: [
            '1.03',
            '1.07',
            '1.12',
            '1.17',
            '1.23',
            '1.30',
            '1.37',
            '1.45',
            '1.54',
            '1.65',
            '1.76',
            '1.90',
            '2.06',
            '2.25',
            '2.47',
            '2.75',
            '3.09',
            '3.53',
            '4.12',
            '4.95',
            '6.18',
            '8.25',
            '12.37',
            '24.75',
          ],
        },
        {
          name: '13',
          value: 13,
          items: [
            '1.03',
            '1.07',
            '1.12',
            '1.17',
            '1.23',
            '1.30',
            '1.37',
            '1.45',
            '1.54',
            '1.65',
            '1.76',
            '1.90',
            '2.06',
            '2.25',
            '2.47',
            '2.75',
            '3.09',
            '3.53',
            '4.12',
            '4.95',
            '6.18',
            '8.25',
            '12.37',
            '24.75',
          ],
        },
        {
          name: '14',
          value: 14,
          items: [
            '1.03',
            '1.07',
            '1.12',
            '1.17',
            '1.23',
            '1.30',
            '1.37',
            '1.45',
            '1.54',
            '1.65',
            '1.76',
            '1.90',
            '2.06',
            '2.25',
            '2.47',
            '2.75',
            '3.09',
            '3.53',
            '4.12',
            '4.95',
            '6.18',
            '8.25',
            '12.37',
            '24.75',
          ],
        },
        {
          name: '15',
          value: 15,
          items: [
            '1.03',
            '1.07',
            '1.12',
            '1.17',
            '1.23',
            '1.30',
            '1.37',
            '1.45',
            '1.54',
            '1.65',
            '1.76',
            '1.90',
            '2.06',
            '2.25',
            '2.47',
            '2.75',
            '3.09',
            '3.53',
            '4.12',
            '4.95',
            '6.18',
            '8.25',
            '12.37',
            '24.75',
          ],
        },
        {
          name: '16',
          value: 16,
          items: [
            '1.03',
            '1.07',
            '1.12',
            '1.17',
            '1.23',
            '1.30',
            '1.37',
            '1.45',
            '1.54',
            '1.65',
            '1.76',
            '1.90',
            '2.06',
            '2.25',
            '2.47',
            '2.75',
            '3.09',
            '3.53',
            '4.12',
            '4.95',
            '6.18',
            '8.25',
            '12.37',
            '24.75',
          ],
        },
        {
          name: '17',
          value: 17,
          items: [
            '1.03',
            '1.07',
            '1.12',
            '1.17',
            '1.23',
            '1.30',
            '1.37',
            '1.45',
            '1.54',
            '1.65',
            '1.76',
            '1.90',
            '2.06',
            '2.25',
            '2.47',
            '2.75',
            '3.09',
            '3.53',
            '4.12',
            '4.95',
            '6.18',
            '8.25',
            '12.37',
            '24.75',
          ],
        },
        {
          name: '18',
          value: 18,
          items: [
            '1.03',
            '1.07',
            '1.12',
            '1.17',
            '1.23',
            '1.30',
            '1.37',
            '1.45',
            '1.54',
            '1.65',
            '1.76',
            '1.90',
            '2.06',
            '2.25',
            '2.47',
            '2.75',
            '3.09',
            '3.53',
            '4.12',
            '4.95',
            '6.18',
            '8.25',
            '12.37',
            '24.75',
          ],
        },
        {
          name: '19',
          value: 19,
          items: [
            '1.03',
            '1.07',
            '1.12',
            '1.17',
            '1.23',
            '1.30',
            '1.37',
            '1.45',
            '1.54',
            '1.65',
            '1.76',
            '1.90',
            '2.06',
            '2.25',
            '2.47',
            '2.75',
            '3.09',
            '3.53',
            '4.12',
            '4.95',
            '6.18',
            '8.25',
            '12.37',
            '24.75',
          ],
        },
        {
          name: '20',
          value: 20,
          items: [
            '1.03',
            '1.07',
            '1.12',
            '1.17',
            '1.23',
            '1.30',
            '1.37',
            '1.45',
            '1.54',
            '1.65',
            '1.76',
            '1.90',
            '2.06',
            '2.25',
            '2.47',
            '2.75',
            '3.09',
            '3.53',
            '4.12',
            '4.95',
            '6.18',
            '8.25',
            '12.37',
            '24.75',
          ],
        },
        {
          name: '21',
          value: 21,
          items: [
            '1.03',
            '1.07',
            '1.12',
            '1.17',
            '1.23',
            '1.30',
            '1.37',
            '1.45',
            '1.54',
            '1.65',
            '1.76',
            '1.90',
            '2.06',
            '2.25',
            '2.47',
            '2.75',
            '3.09',
            '3.53',
            '4.12',
            '4.95',
            '6.18',
            '8.25',
            '12.37',
            '24.75',
          ],
        },
        {
          name: '22',
          value: 22,
          items: [
            '1.03',
            '1.07',
            '1.12',
            '1.17',
            '1.23',
            '1.30',
            '1.37',
            '1.45',
            '1.54',
            '1.65',
            '1.76',
            '1.90',
            '2.06',
            '2.25',
            '2.47',
            '2.75',
            '3.09',
            '3.53',
            '4.12',
            '4.95',
            '6.18',
            '8.25',
            '12.37',
            '24.75',
          ],
        },
        {
          name: '23',
          value: 23,
          items: [
            '1.03',
            '1.07',
            '1.12',
            '1.17',
            '1.23',
            '1.30',
            '1.37',
            '1.45',
            '1.54',
            '1.65',
            '1.76',
            '1.90',
            '2.06',
            '2.25',
            '2.47',
            '2.75',
            '3.09',
            '3.53',
            '4.12',
            '4.95',
            '6.18',
            '8.25',
            '12.37',
            '24.75',
          ],
        },
        {
          name: '24',
          value: 24,
          items: [
            '1.03',
            '1.07',
            '1.12',
            '1.17',
            '1.23',
            '1.30',
            '1.37',
            '1.45',
            '1.54',
            '1.65',
            '1.76',
            '1.90',
            '2.06',
            '2.25',
            '2.47',
            '2.75',
            '3.09',
            '3.53',
            '4.12',
            '4.95',
            '6.18',
            '8.25',
            '12.37',
            '24.75',
          ],
        },
      ],
      bombs: 2,
      currentIndexArray: 0,
      socket: null,
      bombCount: 0,
      finished: false,
      won: false,
      grid: [],
      betting: true,
      playing: false,
      mineDisabled: true,
      betDisabled: false,
      selectedIndex: 0,
      currentIndexDivArray: 0,
      selectedIndexActive: -1,
      cashoutDisabled: false,
      mineDisabledTouch: false,
    }
  },
  mounted() {
    this.initGrid()
  },
  watch: {
    'bet.amount'(val) {
      if (val < 0) {
        this.bet.amount = 0
      } else if (this.$auth.loggedIn && val > this.$auth.user?.balance) {
        this.bet.amount = this.$auth.user.balance
      }
    },
    rows() {
      this.initGrid()
    },
    cols() {
      this.initGrid()
    },
    bombs() {
      this.initGrid()
    },
  },
  beforeMount() {
    this.socket = this.$nuxtSocket({
      channel: 'mines',
      extraHeaders: {
        Authorization: this.$auth.strategy.token.get(),
      },
    })
  },
  computed: {
    selectedArray() {
      return this.options[this.selected]
    },
    currentArray() {
      return this.selected[this.currentIndexArray]
    },
  },
  methods: {
    clickSound() {
      const clickSound = require('@/assets/sounds/card-click.wav').default
      const clickAudio = new Audio(clickSound)
      console.log(clickAudio)
      clickAudio.play()
    },
    bombSound() {
      const bombSound = require('@/assets/sounds/card-bomb.wav').default
      const bombAudio = new Audio(bombSound)
      console.log(bombAudio)
      bombAudio.play()
    },
    activateNextItem() {
      // Get the index of the next item to activate
      const nextIndex = this.selectedIndexActive + 1

      // If we've reached the end of the array, start over
      if (nextIndex >= this.selectedArray.items.length) {
        this.selectedIndexActive = -1
        return
      }

      // Update the selectedIndex to activate the next item
      this.selectedIndexActive = nextIndex
      if (this.selectedIndexActive === 5) {
        this.$refs.horizontal.scrollToIndex(5)
      } else if (this.selectedIndexActive === 10) {
        this.$refs.horizontal.scrollToIndex(10)
      } else if (this.selectedIndexActive === 15) {
        this.$refs.horizontal.scrollToIndex(15)
      } else if (this.selectedIndexActive === 20) {
        this.$refs.horizontal.scrollToIndex(20)
      }
    },
    updateBombs() {
      this.bombs = this.selectedArray.value
    },
    betMultiplier() {
      if (this.selectedIndex >= this.selectedArray.items.length) {
        this.selectedIndex = -1
      } else {
        this.selectedIndex++
        this.bet.placeAmount =
          this.bet.amount * this.selectedArray.items[this.selectedIndex]
        console.log(
          `${this.bet.amount} x ${
            this.selectedArray.items[this.selectedIndex]
          } = ${this.bet.placeAmount}`
        )
      }
    },
    betPlace() {
      if (!this.$auth.loggedIn) {
        return this.$modal.show('auth')
      }
      if (
        this.$auth.user.balance <= 0 ||
        this.$auth.user.balance < this.bet.amount ||
        this.bet.amount <= 0 ||
        this.$auth.user.balance === 0
      ) {
        this.$notify(
          {
            group: 'default',
            type: 'error',
            text: 'Not enough balance',
          },
          1000
        )
      } else if (this.bet.amount > 0) {
        this.$auth.fetchUser()
        this.socket.emit('mines:betPlace', this.bet)
        this.playing = true
        this.betting = false
        this.bet.placeAmount = 0
        this.initGrid()
        this.selectedIndex = -1
        this.selectedIndexActive = -1
        this.$refs.horizontal.scrollToIndex(0)
        this.cashoutDisabled = true
        this.mineDisabledTouch = false
      } else {
        console.log('Rechargee')
      }
    },
    cashout() {
      const { grid } = this
      grid.forEach((checkCell) => {
        checkCell.isOpen = true
      })
      this.showModal1 = true
      setTimeout(() => {
        this.showModal1 = false
      }, 2000)
      this.$auth.fetchUser()
      console.log(`Cashout : ${this.bet.placeAmount}`)
      this.socket.emit('mines:cashoutWin', this.bet)
      this.betDisabled = true
      setTimeout(() => {
        this.betDisabled = false
      }, 1500)
      this.betting = true
      this.playing = false
    },
    getGridStyle() {
      const { cols } = this
      return `grid-template-columns: repeat(${cols}, 50px);`
    },
    initGrid() {
      let { bombs } = this
      const { cols, rows } = this
      const size = rows * cols
      const grid = []
      if (bombs > size) {
        console.log('more bombs than space on the grid!')
        return
      }
      for (let i = 0; i < size; i += 1) {
        grid.push({
          hasBomb: false,
          isOpen: false,
          bombCount: 0,
        })
      }
      while (bombs > 0) {
        const num = Math.floor(Math.random() * size)
        if (grid[num].hasBomb === false) {
          bombs -= 1
          grid[num].hasBomb = true
        }
      }
      this.grid = grid
      this.finished = true
      this.$nextTick(() => {
        this.finished = false
      })
      this.won = false
      console.log(this.bombs)
      this.bombCount = this.bombs
    },
    haveWeWon() {
      if (this.finished) {
        return
      }
      if (this.bombCount !== 0) {
        return
      }
      const remainingGrid = this.grid.find((g) => !g.isOpen && !g.hasFlag)
      if (!remainingGrid) {
        this.finished = true
        this.won = true
      }
    },
    clickCell(cell, i) {
      if (this.finished) {
        return
      }
      if (cell.isOpen) {
        return
      }
      if (cell.hasBomb) {
        this.clickSound()
        setTimeout(() => {
          this.bombSound()
        }, 550)
        cell.isOpen = true
        this.mineDisabledTouch = true
        this.cashoutDisabled = true
        // todo bomb!
        setTimeout(() => {
          const { grid } = this
          grid.forEach((checkCell) => {
            checkCell.isOpen = true
            if (checkCell.hasBomb) {
              setTimeout(() => {
                this.betDisabled = true
                this.playing = false
                this.finished = true
                this.betting = true
                this.betDisabled = false
              }, 1500)
            }
          })
        }, 500)
        return
      }
      this.clickSound()
      this.activateNextItem()
      cell.isOpen = true
      this.betMultiplier()
      this.haveWeWon()
      this.cashoutDisabled = true
      this.mineDisabledTouch = true
      setTimeout(() => {
        this.cashoutDisabled = false
        this.mineDisabledTouch = false
      }, 500)
    },
  },
}
</script>

<style lang="scss">
.minesDisabledTouch {
  pointer-events: none;
}
.disabled {
  transition: all 0.3s;
  opacity: 0.5;
  pointer-events: none;
}
.minesweeper {
  &-status {
    display: flex;
    justify-content: space-between;
    padding: 1rem;

    > * {
      flex: 1;
      text-align: center;
    }
  }

  &-grid {
    padding-left: 8px;
    justify-content: center;
    user-select: none;
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(5, 48px);
    grid-auto-rows: 48px;

    &:before {
      content: '';
      width: 0;
      padding-bottom: 100%;
      grid-row: 1 / 1;
      grid-column: 1 / 1;
    }

    > *:first-child {
      grid-row: 1 / 1;
      grid-column: 1 / 1;
    }
  }
}
</style>
