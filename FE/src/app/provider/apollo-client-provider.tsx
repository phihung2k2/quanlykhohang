import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";
// import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import React, { PropsWithChildren } from "react";

import { ENV } from "@/configs";
import { getStoreToken } from "@/modules/auth/func/auth-func";

export interface ApolloClientProviderProps extends PropsWithChildren {}

const { API } = ENV;

const { API_ENDPOINT } = API;

const httpLink = new HttpLink({ uri: API_ENDPOINT });

// middle

const authMiddleware = new ApolloLink((operation, forward) => {
    const token = getStoreToken();
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: token?.accessToken ? `Bearer ${token?.accessToken}` : undefined,
        },
    }));

    return forward(operation);
});

// upload
const uploadLink = createUploadLink({
    uri: API_ENDPOINT,
    // credentials: "include",
});
// const authLink = setContext((_, { headers }) => {
//     const token = getStoreToken();
//     return {
//         headers: {
//             ...headers,
//             authorization: token ? `Bearer ${token.accessToken}` : "",
//         },
//     };
// });
// Apollo Client setup
const cache = new InMemoryCache();

// client
const client = new ApolloClient({
    cache,
    // link: from([httpLink, uploadLink, authMiddleware]),
    link: ApolloLink.from([authMiddleware, uploadLink, httpLink]),
});

export const ApolloClientProvider: React.FC<ApolloClientProviderProps> = ({ children }) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
