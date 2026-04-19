import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { type PropsWithChildren } from "react"

const queryClient = new QueryClient()

export const TanStack = ({ children }: PropsWithChildren) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools theme="dark" />
        </QueryClientProvider>
    )
}
