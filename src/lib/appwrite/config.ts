import {Client ,Account ,Databases, Storage,Avatars} from 'appwrite'
import { env } from 'process'
export const appwriteConfig={
    //要写个vite-env.d.ts
    projectId:import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url:import.meta.env.VITE_APPWRITE_URL,
    databaseId:import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId:import.meta.env.VITE_APPWRITE_STORAGE_ID,
    userCollectionId:import.meta.env.VITE_APPWRITE_USER_COLLCETION_ID,
    postCollectionId:import.meta.env.VITE_APPWRITE_POST_COLLCETION_ID,
    saveCollectionId:import.meta.env.VITE_APPWRITE_SAVES_COLLCETION_ID,
}

export const client =new Client();

client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.url)

export const account =new Account(client);
export const databases =new Databases(client);
export const storage =new Storage(client);
export const avatars = new Avatars(client);