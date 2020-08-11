<template>
    <div class="bit">
        比特币交易中心
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
export default defineComponent({
    name: 'hello world',
    components: {
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
        }
    },
})
</script>

<style scoped lang="scss">
.bit {
    background: yellow;
    height: 1200px;
}
</style>