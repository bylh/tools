import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect: '/test',
        children: [
            {
                path: '/download',
                name: 'Download',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import(/* webpackChunkName: "about" */ '../views/download/index.vue')
            },
            {
                path: '/video',
                name: 'Video',
                component: () =>
                    import('../views/video/index.vue')
            },
            {
                path: '/bit',
                name: 'Bit',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import(/* webpackChunkName: "about" */ '../views/bit/index.vue')
            },
        ]
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/test',
        name: 'Test',
        component: () =>
            import('../views/test/index.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
