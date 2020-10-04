<template>
    <div class="test-upload">
        <upload></upload>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive,
} from 'vue'
// import axios from '@/services/axios'
import Upload from '@/components/custom/upload/Upload.vue'
export default defineComponent({
    name: 'hello world',
    components: {
        Upload
    },
    props: {
        msg: String,
    },
    setup(props) {
        console.log(props.msg)
        const state = reactive({
            left: '<span>123</span>',
            right: '1234',
            diff: {
                left: '',
                right: ''
            },
        })
        
        // 暴露给模板
        return {
            props,
            state,
        }
    },
})
</script>

<style scoped lang="scss">
</style>