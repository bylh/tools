<template>
    <div class="test">
        <a-page-header
            style="border: 1px solid rgb(235, 237, 240)"
            title="Title"
            sub-title="This is a subtitle"
            @back="goBack"
        >
            <template v-slot:extra>
                <a-button type="primary" @click="goHome">主页</a-button>
            </template>
        </a-page-header>
        <a-button @click="test">测试</a-button>
        <test-upload></test-upload>
        <test-diff :msg="state.msg"></test-diff>
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
    provide,
} from 'vue'
// import axios from '@/services/axios'
import TestDiff from '@/views/test/components/TestDiff.vue'
import TestUpload from '@/views/test/components/TestUpload.vue'
import router from '../../router/index'
export default defineComponent({
    name: 'hello world',
    components: {
        TestDiff,
        TestUpload,
    },
    setup() {
        const state = reactive({
            msg: 'theme1',
        })
        const languageRef = ref('zh-cn')
        // 思考，点击测试按钮的时候为什么theme不会变，而language会是响应的  （解构丢失响应性）
        provide('theme', state.msg)
        provide('language', languageRef)
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
            languageRef.value += '2'
        }
        const goHome = () => {
            router.push('/about')
        }
        const goBack = () => {
            router.go(-1)
        }
        // 暴露给模板
        return {
            state,
            test,
            goHome,
            goBack
        }
    },
})
</script>

<style scoped lang="scss">
</style>