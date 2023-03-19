export const navbarDashboard = [
    {
        name: "store",
        menu: [
            {
                name: "category",
                path: "/app/categorys",
            },
            {
                name: "product",
                path: "/app/products",
            },
            // {
            //     name: "type program",
            //     path: "/app/type-program",
            // },
            // {
            //     name: "program",
            //     path: "/app/programs",
            // },
            // {
            //     name: "paypal",
            //     path: "/app/paypal",
            // },
        ],
    },
    {
        name: "user",
        menu: [
            {
                name: "list user",
                path: "/app/user",
            },
        ],
    },
    // {
    //     name: "forum",
    //     menu: [
    //         {
    //             name: "list forum",
    //             path: "/app/forums",
    //         },
    //     ],
    // },
    // {
    //     name: "finances",
    //     menu: [
    //         {
    //             name: "bills",
    //             path: "/app/bills",
    //         },
    //         // {
    //         //     name: "finances",
    //         //     path: "/app/finances",
    //         // },
    //     ],
    // },
];

export type NavbarDashboardProps = (typeof navbarDashboard)[number];
