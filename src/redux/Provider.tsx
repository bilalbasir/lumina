'use client';
import { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {/* <QueryProvider> */}
                    {children}
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            // Default options for all toasts
                            duration: 4000,
                            className: '',
                            style: {
                                background: 'white',
                                color: '#374151',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                                border: '1px solid rgba(229, 231, 235, 0.8)',
                                borderRadius: '16px',
                                padding: '16px 20px',
                                fontSize: '14px',
                                fontWeight: '500',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                maxWidth: '420px',
                            },
                            // Success toasts
                            success: {
                                duration: 4000,
                                style: {
                                    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                                    color: '#166534',
                                    border: '1px solid rgba(34, 197, 94, 0.3)',
                                    boxShadow: '0 25px 50px -12px rgba(34, 197, 94, 0.25), 0 0 0 1px rgba(34, 197, 94, 0.1)',
                                },
                                iconTheme: {
                                    primary: '#22c55e',
                                    secondary: '#f0fdf4',
                                },
                            },
                            // Error toasts
                            error: {
                                duration: 5000,
                                style: {
                                    background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                                    color: '#dc2626',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    boxShadow: '0 25px 50px -12px rgba(239, 68, 68, 0.25), 0 0 0 1px rgba(239, 68, 68, 0.1)',
                                },
                                iconTheme: {
                                    primary: '#ef4444',
                                    secondary: '#fef2f2',
                                },
                            },
                            // Loading toasts
                            loading: {
                                duration: Infinity,
                                style: {
                                    background: 'linear-gradient(135deg, #fefbec 0%, #fef3c7 100%)',
                                    color: '#d97706',
                                    border: '1px solid rgba(245, 158, 11, 0.3)',
                                    boxShadow: '0 25px 50px -12px rgba(245, 158, 11, 0.25), 0 0 0 1px rgba(245, 158, 11, 0.1)',
                                },
                                iconTheme: {
                                    primary: '#f59e0b',
                                    secondary: '#fefbec',
                                },
                            },
                        }}
                    />
                    {/* </QueryProvider> */}
                </PersistGate>
            </Provider>
        </QueryClientProvider>
    );
}
