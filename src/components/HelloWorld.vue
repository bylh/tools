<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    reactive,
    onMounted,
    onUpdated,
    onUnmounted,
} from 'vue'
export default defineComponent({
    name: 'hello world',
    props: {
        msg: String,
    },
    setup(props) {
        console.log(props.msg)
        const count = ref(0)
        const object = reactive({ foo: 'bar' })
        const increase = (): void => {
            count.value++
        }
      
        onMounted(() => {
            console.log('mounted vue3 typescript')
        })
        onUpdated(() => {
            console.log('updated vue3 typescript')
        })
        onUnmounted(() => {
            console.log('onUnmounted vue3 typescript')
        })
        // 暴露给模板
        return {
            count,
            increase,
            object,
        }
    },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>