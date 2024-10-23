import{
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
}from '@tanstack/react-query'
import { createUserAccount, signInAccount } from '../appwrite/api'
import { INewUser } from '@/types'

//useMutation 是 React Query 提供的一个 Hook用于处理数据的修改请求
//useMutation 是在前端用来发起请求和管理状态的
export const useCreateUserAccount = ( ) => {
    //在你的代码中，useMutation 用来执行创建用户账户的请求。
    return useMutation({
        mutationFn:(user:INewUser ) => createUserAccount(user)
    })
}
export const useSignInAccount = () => {
    return useMutation({
      mutationFn: (user: { email: string; password: string }) =>
        signInAccount(user),
    });
  };
  