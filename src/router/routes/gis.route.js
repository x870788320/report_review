export default {
    name: "gismap",
    path: "/gismap",
    meta: { permissions: 6 },
    component: () =>
        import ("@/pages/Home.vue")
}

// {
//     name: "home",
//     path: "/home",
//     component: () => import("@/pages/Home.vue")
// }