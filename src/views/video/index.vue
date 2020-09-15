<template>
    <div class="video">
        <a-button type="primary" @click="html2word">html2word</a-button>
        <video-player></video-player>
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
import axios from '@/services/axios'
import downloadBlob from '@/utils/download.ts'
import VideoPlayer from '@/components/base/VideoPlayer.vue'
export default defineComponent({
    name: 'hello world',
    components: {
        VideoPlayer
    },
    props: {
        msg: String,
    },
    setup(props) {
        console.log(props.msg)
        const state = reactive({
            name: 'nas',
            checked: true,
        })
        onMounted(async () => {
            console.log('mounted vue3 typescript')
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
        const html2word = async () => {
            const data = await axios.request({
                url: '/download/html2word',
                method: 'post',
                data: {
                    html: '<div>test</div>'
                },
                responseType: 'blob'
            })
            console.log('data', data)
            downloadBlob({
                file: data.data,
                name: 'test.docx'
            })
        }
        // 暴露给模板
        return {
            state,
            html2word
        }
    },
})
</script>

<style scoped lang="scss">

</style>