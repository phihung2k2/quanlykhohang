import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { PropsWithChildren } from "react";

export interface PaypalProviderProps extends PropsWithChildren {}
const initialOptions = {
    "client-id": "AVQIyGQJqIKIaTw0RHwlR1c5g510XYtWz4Z-30UwSfdE4bTn-HWN4XizE_-1APuNHmUWD406M-DacT4Q",
    currency: "USD",
    intent: "capture",
    "data-client-token": "EDn1A3-tNdmCk26HLYUX07vgupsltoLzd2TbTWuk2O0j9-eg0ksCkcS-0Fvj0SbGWOagorzJK7mAyFxg",
};
export const PaypalProvider: React.FC<PaypalProviderProps> = ({ children }) => {
    return <PayPalScriptProvider options={initialOptions}>{children}</PayPalScriptProvider>;
};
