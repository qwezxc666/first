import { INewUser } from "@/types"
import {ID, Query} from 'appwrite'
import {account, appwriteConfig, avatars, databases} from './config'

//createUserAccount它本质上是一个认证系统，而不是一个通用的数据库系统。
export async function createUserAccount(user: INewUser) {
    try {
      const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name
      );
  
      if (!newAccount) throw Error;
      
      //todo ： 有问题 但是视频里没问题 2024年10月23日10:37:21
      const avatarUrl = avatars.getInitials(user.name);
  
      const newUser = await saveUserToDB({
        accountId: newAccount.$id,
        name: newAccount.name,
        email: newAccount.email,
        username: user.username,
        imageUrl: avatarUrl,
      });
  
      return newUser;
    } catch (error) {
      console.log(error);
      return error;
    }
}
export async function saveUserToDB(user: {
        accountId: string;
        email: string;
        name: string;
        imageUrl: URL | string; //todo
        username?: string;
    }) {
    try {
        const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        user
        );
    
        return newUser;
    } catch (error) {
        console.log(error);
    }
}

export async function signInAccount(user:{
    email:string;password:string
    }){
    try{
        const session = await account.createEmailPasswordSession(user.email,user.password)
        //如果登录成功，将返回一个会话对象，该对象包含了用户的会话信息。
        return session;
    }catch(error){
        console.log(error);
    }
}

export async function getCurrentUser(){
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            //appwrite下的query
            [Query.equal('accountId',currentAccount.$id)]
        )
        
        if(!currentUser) throw Error;

        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
    }
}
