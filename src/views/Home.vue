<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <price-list></price-list>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import PriceList from '@/views/bit/PriceList'
export default {
    name: 'Home',
    components: {
        HelloWorld,
        PriceList
    }
}
</script>
