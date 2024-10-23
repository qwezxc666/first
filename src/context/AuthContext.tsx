import { getCurrentUser } from '@/lib/appwrite/api'
import { IContextType, IUser } from '@/types'
import {createContext,useContext,useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
//感觉这块好重要待会复盘下
export const INITIAL_USER={
    id:'',
    name:'',
    username:'',
    email:'',
    imageUrl:'',
    bio:''
}

//创建一个用户的全局状态管理
const INITIAL_STATE={
    user:INITIAL_USER,
    isLoading:false,
    isAuthenticated:false,
    setUser:()=>{},
    setIsAuthenticated:()=>{},
    checkAuthUser:async()=> false as boolean, //false 本身已经是布尔类型，但为了确保类型明确，使用了类型断言将其转换为 boolean 类型。
}

const AuthContext =createContext<IContextType>(INITIAL_STATE)

const AuthProvider = ({children}:{children:React.ReactNode}) => {
    const[user,setUser] =useState<IUser>(INITIAL_USER)
    const [isLoading,setIsLoading] =useState(false);
    const[isAuthenticated,setIsAuthenticated]=useState(false);
    
    const navigate = useNavigate();

    const checkAuthUser= async () =>{
        try {
            const currentAccount = await getCurrentUser();

            if(currentAccount){
                setUser({
                    id:currentAccount.$id,
                    name:currentAccount.name,
                    username:currentAccount.username,
                    email:currentAccount.email,
                    imageUrl:currentAccount.imageUrl,
                    bio:currentAccount.bio
                })
                setIsAuthenticated(true);

                return true;
             }
             
             return false;


        } catch (error) {
            console.log(error)
            return false
        }finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log('SignupForm mounted');
    }, []);
    // useEffect(()=>{
    //     //加了这个会一直在sign-in 界面切换不了
    //     // localStorage.getItem('cookieFallback') === null||
    //     // if(
            
    //     //     localStorage.getItem('cookieFallback') ===  '[]'
    //     // ) navigate('/sign-in')
        
    //     checkAuthUser();
    // },[])

    const value={
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
  )
}

export default AuthProvider

export const useUserContext =() => useContext(AuthContext)


//privder、context、useEffect