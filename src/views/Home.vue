<template>
  <div class="home">
    <div class='text'>首页</div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: 'home',
  data() {
    return {
    }
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
      margin-top: 200px;
      margin-left: 100px;
      font-size: 60px;
      display: flex;
      color: #fff;
      justify-content: center;
    }
  }
</style>
