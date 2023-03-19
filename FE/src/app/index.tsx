import "@styles/sass/styles.scss";
import "@styles/sass/tailwind.scss";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "@material-tailwind/react";
import { NextUIProvider } from "@nextui-org/react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { ApolloClientProvider, ErrorBoundaryProvider, RoutesProvider } from "./provider";
import { ModalProvider } from "./provider/modal-provider";

function App() {
    return (
        // <PaypalProvider>
        <ErrorBoundaryProvider>
            <HelmetProvider>
                <ApolloClientProvider>
                    <BrowserRouter>
                        <NextUIProvider>
                            <ThemeProvider>
                                {/* <SnackbarProvider maxSnack={3}> */}
                                <ModalProvider>
                                    <RoutesProvider />
                                    <ToastContainer
                                        position='top-right'
                                        autoClose={5000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover
                                        theme='light'
                                    />
                                </ModalProvider>
                                {/* </SnackbarProvider> */}
                            </ThemeProvider>
                        </NextUIProvider>
                    </BrowserRouter>
                </ApolloClientProvider>
            </HelmetProvider>
        </ErrorBoundaryProvider>
        // </PaypalProvider>
    );
}

export default App;
