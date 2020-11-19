<template>
  <span>
    <slot :timeago="timeago"></slot>
  </span>
</template>
<script>
import timer from "../src/lib/index";
import {ref, computed, nextTick, onMounted, onUnmounted} from 'vue'

export default {
  name: "TimeAgo",
  props: {
    datetime: {
      type: [String, Date, Number],
      default: e => new Date()
    },
    locale: {
      type: String,
      default: "en"
    },
    refresh: {
      type: [Number, Boolean],
      default: false
    },
    long: {
      type: Boolean,
      default: false
    },
    todo: {
      type: Function,
      default: e => {}
    },
    tooltip: {
      type: [String, Boolean],
      default: false
    }
  },

  setup(props) {
    const timeago = ref('')
    const nowString = ref('')
    const intervalId = ref(null)

    const options = computed(() => {
      return {
        placement: typeof props.tooltip === "string" ? props.tooltip : "top",
        content: nowString.value
      }
    })

    const reloadTime = () => {
      const timer = timer(
          props.datetime,
          props.locale,
          props.long ? "long" : "short"
      );
      timeago.value = timer.timeago;
      nowString.value = timer.nowString;
      if (intervalId.value) props.todo();
    }

    onMounted(() => {
      nextTick(() => {
        reloadTime();
        if (props.refresh) {
          const refreshTime = props.refresh === true ? 60 : props.refresh;
          intervalId.value = setInterval(reloadTime, refreshTime * 1000);
        }
      })
    })

    onUnmounted(() => {
      if (intervalId.value) clearInterval(intervalId.value);
    })

    return {
      timeago
    }
  }
}
</script>
