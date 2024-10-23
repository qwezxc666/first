import {ReactNode} from 'react'
import { QueryClient ,QueryClientProvider } from '@tanstack/react-query'

const queryClient =new QueryClient();


//自定义的 React 组件,用于将 React Query 的功能注入到子组件树中。
export const QueryProvider = ({children}:{children:ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>

    </QueryClientProvider>
  )
}

export default QueryProvider