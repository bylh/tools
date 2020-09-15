<template>
    <div class="test">
        <a-button @click="test">测试props</a-button>

       <test-diff :msg="state.msg"></test-diff>
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
// import axios from '@/services/axios'
import TestDiff from '@/views/test/components/TestDiff.vue'
export default defineComponent({
    name: 'hello world',
    components: {
        TestDiff
    },
    setup() {
        const state = reactive({
            msg: 'test msg'
        })
        onMounted(async () => {
            // const data = await axios.request({
            //     url: '/news/types',
            // })
            // console.log(data)
        })
        onUpdated(() => {
            console.log('updated vue3 typescript')
        })
        onUnmounted(() => {
            console.log('onUnmounted vue3 typescript')
        })
        const test = () => {
            state.msg += '1'
        }
        // 暴露给模板
        return {
            state,
            test,
        }
    },
})
</script>

<style scoped lang="scss">
</style>