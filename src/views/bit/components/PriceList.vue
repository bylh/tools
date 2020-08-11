<template>
    <div class="price-list">
        <div class="container is-fluid">
            <input v-model="state.name" ref="inputNameEl" />
            <input-search v-model="checked"></input-search>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive,
    ref,
    onMounted,
    onUpdated,
    onUnmounted,
} from 'vue'
import { useAutofocus } from '@/hooks/useAutoFocus'
import InputSearch from '@/components/custom/input/InputSearch.vue'
export default defineComponent({
    name: 'hello world',
    components: {
        InputSearch
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
        const checked = ref(true)

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
            inputNameEl,
            checked
        }
    },
})
</script>

<style scoped lang="scss">
.price-list {
    padding: 10px;
}
</style>