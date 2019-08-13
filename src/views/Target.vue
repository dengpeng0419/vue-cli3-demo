<template>
  <div class="about">
    <div class="text">经营指标</div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: 'home',
  mounted() {
    this.getHomeData();
  },
  methods: {
    getHomeData() {
      axios.post("/purchase/init").then(() => {
        // ...
      });
    }
  }
}
</script>

<style lang="scss">
  .about {
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

