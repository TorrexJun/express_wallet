<template>
  <div v-if="visible" class="el-loading-mask" @click="close">
    <div class="el-loading-spinner">
      <svg viewBox="25 25 50 50" class="circular">
        <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
      </svg>
      <p>{{ content }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    content: {
      type: String,
      default: '请稍候~'
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style scoped>
.el-loading-mask {
  position: fixed;
  z-index: 50;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
}
.el-loading-spinner {
  top: 50%;
  margin-top: -21px;
  width: 100%;
  text-align: center;
  position: absolute;
}
.el-loading-spinner p {
  margin: 10px 0 0 0;
  font-size: 22px;
  color: #fff;
}
.el-loading-spinner .path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90,150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: #01C176;
  stroke-linecap: round;
}
.el-loading-spinner .circular {
  height: 42px;
  width: 42px;
  animation: loading-rotate 2s linear infinite;
}
@keyframes loading-rotate {
  to {
    transform: rotate(1turn)
  }
}
@keyframes loading-dash {
  0% {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0
  }
  50% {
    stroke-dasharray: 90,150;
    stroke-dashoffset: -40px
  }
  to {
    stroke-dasharray: 90,150;
    stroke-dashoffset: -120px
  }
}
</style>
