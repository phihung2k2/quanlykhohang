import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";

import { useMutationCature, useMutationPayment } from "../api";

export interface PaypalPageProps {}

const initialOptions = {
    "client-id": "AVQIyGQJqIKIaTw0RHwlR1c5g510XYtWz4Z-30UwSfdE4bTn-HWN4XizE_-1APuNHmUWD406M-DacT4Q",
    currency: "USD",
    intent: "capture",
};
export const PaypalPage: React.FC<PaypalPageProps> = (props) => {
    const { onPayment } = useMutationPayment();

    const { onCapture } = useMutationCature();

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
                style={{ layout: "horizontal" }}
                // createOrder={(data, actions) => {
                //     return actions.order.create({
                //         purchase_units: [
                //             {
                //                 amount: {
                //                     value: "1.99",
                //                 },
                //             },
                //         ],
                //     });
                // }}
                createOrder={(data, actions) => {
                    return onPayment([
                        { id: 1, quantity: 6 },
                        { id: 3, quantity: 1 },
                        { id: 5, quantity: 3 },
                        { id: 8, quantity: 6 },
                    ]).then((res) => res.data?.payment || "");
                }}
                onApprove={(data, actions) => {
                    return onCapture(data.orderID).then((res) => alert(res));
                }}
            />
        </PayPalScriptProvider>
    );
};
