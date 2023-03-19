import { gql, MutationFunctionOptions, useMutation, useQuery } from "@apollo/client";

import { CartProduct } from "./../models/index";

// payment
const paymentGql = gql`
    mutation payment($products: [CartProduct!]!) {
        payment(products: $products)
    }
`;

export const useMutationPayment = (props?: Omit<MutationFunctionOptions, "variables">) => {
    const [mutate, mutation] = useMutation<{ payment: string }, { products: CartProduct[] }>(paymentGql);

    const onPayment = (products: CartProduct[]) => {
        return mutate({
            variables: {
                products,
            },

            ...props,
        });
    };

    return { onPayment, mutation };
};

// capture
const captureGql = gql`
    mutation capture($order: String!) {
        capture(order: $order)
    }
`;

export const useMutationCature = (props?: Omit<MutationFunctionOptions, "variables">) => {
    const [mutate, mutation] = useMutation<{ capture: string }, { order: string }>(captureGql);

    const onCapture = (order: string) => {
        return mutate({
            variables: {
                order,
            },

            ...props,
        });
    };

    return { onCapture, mutation };
};
