<template>
    <div class="home">
        <layout>
            <template #header>
                <a-menu
                    v-model:selectedKeys="state.current"
                    mode="horizontal"
                    @select="select"
                >
                    <a-sub-menu>
                        <template v-slot:title>
                            <span class="submenu-title-wrapper">
                                <setting-outlined />
                                home
                            </span>
                        </template>
                        <a-menu-item-group title="investment">
                            <a-menu-item key="bit"> bit </a-menu-item>
                        </a-menu-item-group>
                        <a-menu-item-group title="learning">
                            <a-menu-item key="download">
                                download
                            </a-menu-item>
                            <a-menu-item key="video">
                                video
                            </a-menu-item>
                        </a-menu-item-group>
                    </a-sub-menu>

                    <a-menu-item key="test">
                        <mail-outlined />test
                    </a-menu-item>
                    <a-menu-item key="about" disabled>
                        <appstore-outlined />about
                    </a-menu-item>
                    <!-- <a-menu-item key="alipay">
                        <a
                            href="https://antdv.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Navigation Four - Link
                        </a>
                    </a-menu-item> -->
                </a-menu>
            </template>
            <template #content>
                <router-view />
            </template>
            <template #footer>
                <a-layout-footer :style="{ textAlign: 'center' }">
                    tools by @bylh
                </a-layout-footer>
            </template>
        </layout>
    </div>
</template>

<script>
// @ is an alias to /src
import { defineComponent, reactive } from 'vue'
import Layout from '@/components/custom/layout/Layout'
import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
} from '@ant-design/icons-vue'
import router from '../router/index'
export default defineComponent({
    name: 'Home',
    components: {
        Layout,
        MailOutlined,
        AppstoreOutlined,
        SettingOutlined,
    },
    model: {
        prop: 'checked',
        event: 'change',
    },
    props: {
        checked: Boolean,
    },
    setup() {
        const state = reactive({
            current: ['download'],
            routes: [{
                name: 'download',
                path: '/download'
            }, {
                name: 'video',
                path: '/video'
            }, {
                name: 'bit',
                path: '/bit'
            }, {
                name: 'test',
                path: '/test'
            }, {
                name: 'about',
                path: '/about'
            }]
        })
    
        const select = (item) => {
            console.log(item)
            const routeItem = state.routes.find(route => route.name === item.key)
            if (!routeItem) {
                return
            }
            router.push(routeItem.path)

        }
        // 暴露给模板
        return {
            state,
            select,
        }
    },
})
</script>
<style scoped lang="scss">
.home {
    height: 100%;
}
</style>
