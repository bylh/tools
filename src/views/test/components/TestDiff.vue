<template>
    <div class="test-diff">
        <div>依赖注入的值</div>
       <div>{{ testTheme }}</div>
       <div>{{ testLanguage }}</div>
        <a-button @click="test">{{ props.msg }}</a-button>
        <a-row>
            <a-col :span="12">
                <div v-html="state.diff.left"></div>
            </a-col>
            <a-col :span="12">
                <div v-html="state.diff.right"></div>
            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts">
import diffHtml from '@/utils/diffHtml'
import {
    defineComponent,
    reactive,
    onMounted,
    onUpdated,
    onUnmounted,
    inject
} from 'vue'
// import axios from '@/services/axios'
export default defineComponent({
    name: 'hello world',
    components: {},
    props: {
        msg: String,
    },
    setup(props) {
        console.log(props.msg)
        const testTheme = inject('theme', '')
        const testLanguage = inject('language', '')
        const state = reactive({
            left: '<span>123</span>',
            right: '1234',
            diff: {
                left: '',
                right: ''
            },
        })
        onMounted(async () => {
            // const data = await axios.request({
            //     url: '/news/types',
            // })
            // console.log(data)
            state.diff = diffHtml(state.left, state.right, {}, () => {console.log('对比结束')})
            console.log('diff', state.diff)
        })
        onUpdated(() => {
            console.log('updated vue3 typescript')
        })
        onUnmounted(() => {
            console.log('onUnmounted vue3 typescript')
        })
        const test = async () => {
            console.log('test')
        }
        // 暴露给模板
        return {
            testTheme,
            testLanguage,
            props,
            state,
            test,
        }
    },
})
</script>

<style scoped lang="scss">
</style>