<template>
  <div class="price-list">
      <input v-model="state.name" ref="inputNameEl"/>
  </div>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive,
    onMounted,
    onUpdated,
    onUnmounted,
} from 'vue'
import { useAutofocus } from '../../hooks/useAutoFocus'
export default defineComponent({
    name: 'hello world',
    props: {
        msg: String,
    },
    setup(props) {
        console.log(props.msg)
        const state = reactive({ 
            name: 'nas',
        })
        const inputNameEl = useAutofocus()
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
            state,
            inputNameEl
        }
    },
})
</script>

<style scoped lang="scss">
.price-list {
    padding: 10px;
}
</style>