import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { GlobalState } from './context/context.jsx';
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <GlobalState>
            <App/>
            </GlobalState>
        </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>,
)
