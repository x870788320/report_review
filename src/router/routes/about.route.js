export default 
    {
        name: "about",
        path: "/about",
        component:() => import("@/pages/About.vue"),
        children:[
            {
                path:"/person",
                name:"person",
                component:() => import("@/components/about/PersonCenter.vue")
            },
            {
                path:"/modifyPassword",
                name:"modifyPassword",
                component:() => import("@/components/about/ModifyPassword.vue")
            }
        ]
    }
