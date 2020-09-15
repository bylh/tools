<template>
    <div class="video-player">
        <video
            id="my-player"
            class="video-js vjs-big-play-centered vjs-fluid"
            ref="container"
        >
            <!-- <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4" /> -->
        </video>
        <!-- <video id="my-video" ref="container" class="video-js vjs-big-play-centered vjs-fluid"></video> -->
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    reactive,
    onMounted,
    onUpdated,
} from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
export default defineComponent({
    name: 'VideoPlayer',
    props: {
        msg: String,
    },
    setup(props) {
        console.log(props.msg)
        const container = ref(null)
        const state = reactive({ foo: 'bar' })
        onMounted(() => {
            console.log('mounted vue3 typescript')
            console.log('onUnmounted vue3 typescript')
            console.log('测试')
            // 配置文档 https://docs.videojs.com/tutorial-options.html
            const options = {
                // preload: 'auto',
                // src: 'vjs.zencdn.net/v/oceans.mp4',
                playbackRates: [0.5, 1, 1.5, 2],
                poster: '//', // 视频封面图地址
                controls: true, // 是否显示控制条
                preload: 'auto',
                autoplay: false,
                fluid: true, // 自适应宽高
                language: 'zh-CN', // 设置语言
                muted: false, // 是否静音
                controlBar: {
                    // 设置控制条组件
                    /* 设置控制条里面组件的相关属性及显示与否
                    'currentTimeDisplay':true,
                    'timeDivider':true,
                    'durationDisplay':true,
                    'remainingTimeDisplay':false,
                    volumePanel: {
                        inline: false,
                    }
                    */
                    /* 使用children的形式可以控制每一个控件的位置，以及显示与否 */
                    children: [
                        { name: 'playToggle' }, // 播放按钮
                        { name: 'currentTimeDisplay' }, // 当前已播放时间
                        { name: 'progressControl' }, // 播放进度条
                        { name: 'durationDisplay' }, // 总时间
                        {
                            // 倍数播放
                            name: 'playbackRateMenuButton',
                            playbackRates: [0.5, 1, 1.5, 2, 2.5],
                        },
                        {
                            name: 'volumePanel', // 音量控制
                            inline: false, // 不使用水平方式
                        },
                        { name: 'FullscreenToggle' }, // 全屏
                    ],
                },
                sources: [
                    // 视频源
                    {
                        src: 'http://yx-kbs-ks3.haofenshu.com/videos/258053ec28bbe745128b2c35597e9aef.mp4',
                        type: 'video/mp4',
                        poster: '//',
                    },
                ],
            }
            const player = videojs(
                container.value,
                options,
                function onPlayerReady() {
                    videojs.log('Your player is ready!')

                    // In this context, `this` is the player that was created by Video.js.
                    // this.play()

                    // How about an event listener?
                    this.on('ended', function () {
                        videojs.log('Awww...over so soon?!')
                    })
                }
            )
            console.log('palrer', player)
        })
        onUpdated(() => {
            console.log('updated vue3 typescript')
        })
        // 暴露给模板
        return {
            container,
            state,
        }
    },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>