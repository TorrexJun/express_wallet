<template>
  <div class="uploader">
    <input class="upload__input" type="file" ref="inputfile" name="file" @change="onUploadChange" accept=".jpeg, .jpg, .png" />
    <img class="img" :src="imageUrl" v-if="imageUrl" />
    <span class="plus" v-else>+</span>
  </div>
</template>

<script>
/**
@author huangzelin
@descirpt 
*/
export default {
  data () {
    return {
    };
  },

  methods: {}
}

</script>
<style lang='scss' scoped>
</style>