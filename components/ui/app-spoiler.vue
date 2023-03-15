<template>
  <div class="spoiler">
    <div class="spoiler__header" @click="active = !active">
      <img src="/img/icon/question.svg" class="mr-4" alt="Вопрос" />
      <slot name="title">Что это за сайт?</slot>
      <div class="spoiler__toggler">
        <img
          class="spoiler__arrow"
          :class="{ 'spoiler__arrow--active': active }"
          src="/img/icon/arrow.svg"
          alt="Открыть"
        />
      </div>
    </div>
    <div ref="body" class="spoiler__body" :style="{ height: bodyHeight }">
      <p class="pb-4">
        <slot name="text"
          >EZCASH – финансовые игры с выводом реальных средств. На данный момент
          на сайте представлены 5 самых популярных денежных игр. EZCASH
          зарегистрирована в Великобритании, и ведет свою деятельность в
          соответствии со всеми установленными правовыми нормами.
        </slot>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
    }
  },
  computed: {
    bodyHeight() {
      return `${this.active ? this.$refs.body.scrollHeight : 0}px`
    },
  },
}
</script>

<style lang="scss">
.spoiler {
  &__header {
    font-weight: 600;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    cursor: pointer;
    user-select: none;
    flex: 1 1 0%;
    align-items: center;
  }

  &__arrow {
    width: 100%;
    height: auto;
    transition-property: color, background-color, border-color,
      text-decoration-color, fill, stroke, opacity, box-shadow, transform,
      filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
    transition-timing-function: linear;
    transform: rotateX(0deg);

    &--active {
      transform: rotateX(180deg);
    }
  }

  &__toggler {
    padding: 0.5rem;
    margin-left: auto;
    background: var(--bg-white);
    border-radius: 0.25rem;
    width: 1.75rem;
    height: 1.75rem;
    transition-property: color, background-color, border-color,
      text-decoration-color, fill, stroke, opacity, box-shadow, transform,
      filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
  }

  &:hover &__toggler {
    background: var(--primary-color);
  }

  &__body {
    height: 0;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    overflow: hidden;
    transition: all 0.5s;
    transition-property: color, background-color, border-color,
      text-decoration-color, fill, stroke, opacity, box-shadow, transform,
      filter, backdrop-filter;
    transition-timing-function: linear;
    transition-duration: 200ms;
  }
}

.slide-enter-active,
.slide-leave-enter {
  opacity: 0;
  transform: translateY(0);
  transition: transform 0.3s ease-in;
}
.slide-enter,
.slide-leave-to {
  opacity: 1;
  transform: translateY(100%);
  transition: transform 0.3s ease-in;
}
</style>
