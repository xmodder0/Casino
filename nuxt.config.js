import tailwindConfig from './tailwind.config'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  server: {
    host: '127.0.0.1',
    port: '3000',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'casino',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no',
      },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap',
      },
    ],
  },

  loading: '~/components/LoadingBar.vue',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/root.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/gsap.js',
    '~/plugins/power2.js',
    '~/plugins/timeline.js',
    '~/plugins/vue-tailwind.client.js',
    { src: '~/plugins/v-tooltip.client.js', mode: 'client' },
    { src: '~/plugins/vt-notification.client.js', mode: 'client' },
    { src: '~/plugins/axios-handler.client.js', mode: 'client' },
    { src: '~/plugins/anime.js', mode: 'client' },
    { src: '~/plugins/pixi.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/svg',
    '@nuxtjs/auth-next',
    'nuxt-socket-io',
    'nuxt-i18n',
    'cookie-universal-nuxt',
  ],

  io: {
    // module options
    sockets: [
      {
        name: 'main',
        url: process.env.BASE_URL + '/' || 'http://127.0.0.1:3333',
      },
    ],
  },

  tailwindcss: {
    exposeConfig: true,
    jit: true,
  },

  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en-US.js',
        icon: '/img/icon/en.svg',
      },
      {
        code: 'ru',
        iso: 'ru-RU',
        name: 'Русский',
        file: 'ru-RU.js',
        icon: '/img/icon/ru.svg',
      },
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'lang/',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      alwaysRedirect: true,
      fallbackLocale: '',
      onlyOnRoot: false,
      useCookie: true,
      cookieCrossOrigin: false,
      cookieDomain: null,
      cookieKey: 'i18n_redirected',
      cookieSecure: false,
    },
  },

  auth: {
    localStorage: false,
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
        expires: 365,
      },
    },
    strategies: {
      local: {
        user: {
          property: 'data.user',
          // autoFetch: true
        },
        token: {
          property: 'data.token',
          maxAge: 60 * 60 * 24 * 365,
        },
        refreshToken: false,
        autoLogout: true,
        endpoints: {
          login: {
            url: '/api/v1/auth/login',
            method: 'post',
          },
          user: {
            url: '/api/v1/auth/user',
            method: 'get',
          },
          logout: false,
        },
        // tokenRequired: true,
        // tokenType: 'bearer',
        // globalToken: true,
        // autoFetchUser: true
      },
      vkontakte: {
        scheme: 'oauth2',
        token: {
          property: 'data.token',
          maxAge: 60 * 60 * 24 * 365,
        },
        user: {
          property: 'data.user',
          autoFetch: true,
        },
        endpoints: {
          authorization: 'https://oauth.vk.com/authorize',
          userInfo: process.env.BASE_URL + '/api/v1/auth/user',
        },
        scope: ['email', 'first_name', 'last_name', 'photo_100'],
        clientId: process.env.VK_CLIENTID,
        responseType: 'token',
        codeChallengeMethod: '',
        redirectUri: process.env.CLIENT_URL + '/user/social/vk',
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:3333',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      vue: {
        transformAssetUrls: {
          audio: 'src',
        },
      },
    },
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      })
    },
    transpile: ['vt-notifications'],
  },
}
