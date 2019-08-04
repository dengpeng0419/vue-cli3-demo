<template>
  <div class="home">
    <div class='text'>it is me</div>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import axios from "axios";

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  mounted() {
    this.getHomeData();
  },
  methods: {
    getHomeData() {
      axios.post("/purchase/init").then(res => {
        console.log(res.data);
        // ...
      });
    }
  }
}
</script>

<style lang="scss">
  .home {
    .text {
      font-size: 20px;
      display: flex;
      color: green;
      justify-content: center;
    }
  }
</style>
