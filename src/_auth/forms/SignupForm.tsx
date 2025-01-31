import React from 'react'
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"

import { useForm } from 'react-hook-form'
import { useToast } from "@/hooks/use-toast"
import { useUserContext } from "@/context/AuthContext";

 

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { SignupValidation } from '@/lib/validation'
import { z } from 'zod'
import Loader from '@/components/shared/Loader'
import { Link ,useNavigate } from 'react-router-dom'
import { createUserAccount, signInAccount } from '@/lib/appwrite/api'
import { useCreateUserAccount, useSignInAccount } from '@/lib/react-query/queriesAndMutations'



const SignupForm =  () => {
  console.log('Debug message');

  const { toast } = useToast()
  const navigate=useNavigate();
  const {checkAuthUser, isLoading:isUserLoading} =useUserContext();

  //is fake
  // const isLoading =false;

  const {mutateAsync:createUserAccount,isPending:isCreatingUAccount}= useCreateUserAccount();
  const {mutateAsync:signInAccount,isPending:isCreatingUser}= useSignInAccount();
  
  // 1. Define your form.
   const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name:'',
      username: '',
      email:'',
      password:'',

    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //3.create the user
    
    const newUser= await createUserAccount(values);
    if (!newUser){
      return  toast({
        title: "Sign up failed . Please try again.",
      })
    }
    //409 报错说明id存在

    const session =await signInAccount({
      email: values.email,
      password:values.password
    })
    if (!session){
      return  toast({
        title: "Sign up failed . Please try again.",
      })
    }

    const isLoggedIn = await checkAuthUser();
    if(isLoggedIn){
      form.reset();
  
      navigate('/');
    }else{
      toast(    {title: "Sign up failed . Please try again."}    )
    }
  }
  return (

    <Form {...form}>
      <div className='sm:w-420 flex-center flex-col'>
        <img src='/assets/images/logo.svg'></img>
        
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Create a new account</h2>
        <p className='text-light-3 small-medium md:base-regular mt-2'>To use Snapgram, please enter your details</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col  gap-5  w-full mt-4">
        <FormField 
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type='text' className='shad-input'  {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type='text' className='shad-input'  {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' className='shad-input'  {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' className='shad-input'  {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='shad-button_primary'>
          {isCreatingUAccount?(
            <div className='flex-center gap-2'>
              <Loader></Loader>Loading...
            </div>
          ):"Sign up"}
          </Button>
          <p className='text-small-regular text-light-2 text-center mt-2'>
            Already have an account?
            <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>
          </p>
      </form>
      
      </div>
      
    </Form>
  )
}

export default SignupForm
