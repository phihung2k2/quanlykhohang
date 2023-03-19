import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Outlet, RouteObject } from "react-router-dom";

import { lazyImport } from "@/utils";

const { PaypalPage } = lazyImport(() => import("@/modules/paypal/pages"), "PaypalPage");
const initialOptions = {
    "client-id": "AVQIyGQJqIKIaTw0RHwlR1c5g510XYtWz4Z-30UwSfdE4bTn-HWN4XizE_-1APuNHmUWD406M-DacT4Q",
    currency: "USD",
    intent: "capture",
    "data-client-token": "EDn1A3-tNdmCk26HLYUX07vgupsltoLzd2TbTWuk2O0j9-eg0ksCkcS-0Fvj0SbGWOagorzJK7mAyFxg",
};
export const paypalRoute = (): RouteObject => {
    return {
        path: "paypal",
        // element: (
        //     <PayPalScriptProvider options={initialOptions}>
        //         <Outlet />
        //     </PayPalScriptProvider>
        // ),

        children: [{ index: true, element: <PaypalPage /> }],
    };
};
