"use client"
 import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
 import { WagmiProvider } from 'wagmi'
 import { config } from './wagmi';
 
 // 2. Set up a React Query client.
 const queryClient = new QueryClient()
 
 export default function Providers({children}: {children: React.ReactNode}) {
   // 3. Wrap app with Wagmi and React Query context.
   return (
     <WagmiProvider config={config}>
       <QueryClientProvider client={queryClient}> 
         {children}
       </QueryClientProvider> 
     </WagmiProvider>
   )
 }