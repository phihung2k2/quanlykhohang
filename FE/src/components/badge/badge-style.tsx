import { styled } from "@nextui-org/react";

// Badge component will be available as part of the core library soon
export const BadgeStyle = styled("span", {
    display: "inline-block",
    textTransform: "uppercase",
    padding: "$2 $3",
    margin: "0 2px",
    fontSize: "10px",
    fontWeight: "$bold",
    borderRadius: "14px",
    letterSpacing: "0.6px",
    lineHeight: 1,
    boxShadow: "1px 2px 5px 0px rgb(0 0 0 / 5%)",
    alignItems: "center",
    alignSelf: "center",
    color: "$white",
    variants: {
        type: {
            active: {
                bg: "$successLight",
                color: "$successLightContrast",
            },
            ACTIVE: {
                bg: "$successLight",
                color: "$successLightContrast",
            },
            INACTIVE: {
                bg: "$gray200",
                color: "$gray700",
            },
            paused: {
                bg: "$errorLight",
                color: "$errorLightContrast",
            },
            vacation: {
                bg: "$warningLight",
                color: "$warningLightContrast",
            },
            inActive: {
                bg: "$gray200",
                color: "$gray700",
            },
            USER: {
                bg: "$warningLight",
                color: "$warningLightContrast",
            },
            ADMIN: {
                bg: "$successLight",
                color: "$successLightContrast",
            },
            PAID: {
                bg: "$successLight",
                color: "$successLightContrast",
            },
        },
    },
    defaultVariants: {
        type: "active",
    },
});
