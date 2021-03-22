export default 
    {
        name: "review",
        path: "/review",
        component: () => import("@/pages/ReportReview.vue"),
        children:[
            {
                path:"/addreport",
                name:"addreport",
                component:() => import("@/components/reportReview/AddReportCom.vue")
            },
            {
                path:"/addmeterial",
                name:"addmeterial",
                component:() => import("@/components/reportReview/AddMaterialCom.vue")
            },
            {
                path:"/reviewing",
                name:"reviewing",
                component:() => import("@/components/reportReview/RepReviewingCom.vue")
            },
            {
                path:"/hasReview",
                name:"hasReview",
                component:() => import("@/components/reportReview/HasReviewCom.vue")
            },
        ]
    }
