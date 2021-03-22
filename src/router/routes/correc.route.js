export default 
    {
        name: "correct",
        path: "/correct",
        component: () => import("@/pages/Correct.vue"),
        // children:[
        //     {
        //         path:"/correct/addreport",
        //         name:"addreport",
        //         component:() => import("@/components/correctModify/CorrectAddRep.vue")
        //     },
        //     {
        //         path:"/correct/addmeterial",
        //         name:"addmeterial",
        //         component:() => import("@/components/correctModify/CorrectAddMat.vue")
        //     },
        // ]
    }
