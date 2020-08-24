<template>
    <div class="bit">
        <div class="animate__heartBeat">
            <section class="section">
                <div class="container">
                    <h1 class="title">Section</h1>
                    <h2 class="subtitle">
                        A simple container to divide your page into
                        <strong>sections</strong>, like the one you're currently reading
                    </h2>
                </div>
            </section>
        </div>
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
export default defineComponent({
    name: 'hello world',
    components: {},
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
            const data = await axios.request({
                url: '/news/types',
            })
            console.log(data)
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
        }
    },
})
</script>

<style scoped lang="scss">
.bit {
    background: $primary;
    height: 1200px;
}
</style>