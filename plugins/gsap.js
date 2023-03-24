import Vue from 'vue'
import { TweenMax } from 'gsap'

// Define a global $gsap property on the Vue prototype
Vue.prototype.$gsap = TweenMax
