<template>
    <div class="upload">
        <a-upload-dragger
            name="file"
            :multiple="true"
            :action="state.serverUrl"
            @change="handleChange"
        >
            <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">
                Click or drag file to this area to upload
            </p>
            <p class="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
            </p>
        </a-upload-dragger>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive,
} from 'vue'
import { message } from 'ant-design-vue'
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
            // eslint-disable-next-line no-undef
            serverUrl: feConfig.baseServerUrl + '/tools/upload'
        })

        const handleChange = (info) => {
            const status = info.file.status
            if (status !== 'uploading') {
                console.log(info.file, info.fileList)
            }
            if (status === 'done') {
                message.success(
                    `${info.file.name} file uploaded successfully.`
                )
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`)
            }
            ctx.emit('change', info)

        }

        const test = () => {
            console.log('test', props.checked)
        }
        // 暴露给模板
        return {
            state,
            handleChange,
            test,
        }
    },
})
</script>

<style scoped lang="scss">
.price-list {
    padding: 10px;
}
</style>