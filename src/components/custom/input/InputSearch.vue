<template>
    <div class="field">
        <div class="control is-loading">
            <input
                class="input"
                type="text"
                placeholder="Normal loading input"
                ref="inputNameEl"
            />
            <input
                id="test"
                type="checkbox"
                v-bind:checked="$props.checked"
                v-on:change="change"
            />
            <button @click="test">组件中</button>
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
import { useAutofocus } from '@/hooks/useAutoFocus'

export default defineComponent({
    name: 'hello world',
    model: {
        prop: 'checked',
        event: 'change',
    },
    props: {
        checked: Boolean,
    },
    setup(props, ctx) {
        console.log(props.checked)
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
        const change = ($event: any) => {
            console.log('change触发', $event,$event.target.checked)
            ctx.emit('input', $event.target.checked)
        }
        const test = () => {
            console.log('test', props.checked)
        }
        // 暴露给模板
        return {
            state,
            inputNameEl,
            change,
            test
        }
    },
})
</script>

<style scoped lang="scss">
.price-list {
    padding: 10px;
}
</style>