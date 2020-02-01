<template>
  <span>
    <slot :timeago="timeago"></slot>
  </span>
</template>

<script>
import timer from "../src/lib/index";

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

  data() {
    return {
      timeago: "",

      nowString: "",

      intervalId: null
    };
  },

  computed: {
    options() {
      return {
        placement: typeof this.tooltip === "string" ? this.tooltip : "top",
        content: this.nowString
      };
    }
  },

  methods: {
    reloadTime() {
      let { timeago, nowString } = timer(
        this.datetime,
        this.locale,
        this.long ? "long" : "short"
      );
      this.timeago = timeago;
      this.nowString = nowString;
      if (this.intervalId) this.todo();
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.reloadTime();
      if (this.refresh) {
        const refreshTime = this.refresh === true ? 60 : this.refresh;
        this.intervalId = setInterval(this.reloadTime, this.refresh * 1000);
      }
    });
  },

  destroyed() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
};
</script>
