import Vue from 'vue'
import { TimelineLite } from 'gsap'

// Define a global $gsap property on the Vue prototype
Vue.prototype.$timeline = TimelineLite
