import { CreateUserParams, GetMenuParams, SignInParams } from "@/type"
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite"

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: "com.greylynxtech.food-app",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: "686b64ae00189c04308c",
    bucketId: '686e99cb0007f15e5ce1',
    userCollectionId: '686b64f3002f3c191189',
    categoriesCollectionId: '686e8d0a002d57b223e5',
    menuCollectionId: '686e8db20032fab164ea',
    customizationsCollectionId: '686e96be001c578672bf',
    menuCustomizationsCollectionId: '686e979b0016c9f040ba',
}

export const client = new Client()

client
.setEndpoint(appwriteConfig.endpoint)
.setProject(appwriteConfig.projectId)
.setPlatform(appwriteConfig.platform)

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
const avatars = new Avatars(client)

export const createUser = async ({ email, password, name }: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name)
        if(!newAccount) throw Error;

        await signIn({ email, password });

        const avatarUrl = avatars.getInitialsURL(name);

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            { email, name, accountId: newAccount.$id, avatar: avatarUrl }
        );
    } catch (e) {
        throw new Error(e as string);
    }
}

export const signIn = async ({ email, password }: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
    } catch (e) {
        throw new Error(e as string);
    }
}

// export const getCurrentUser = async () => {
//     try {
//         const currentAccount = await account.get()
//         if(!currentAccount) throw Error;

//         const currentuser = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.userCollectionId,
//             [Query.equal('accountId', currentAccount.$id)]
//         )

//         if(!currentuser) throw Error;

//         return currentuser.documents[0]
//     } catch (error) {
//         console.log(error)
//         throw new Error(error as string)
//     }
// }

export const getCurrentUser = async () => {
    try {
        // Check if the user is signed in
        const currentSession = await account.getSession('current'); // Get the current session
        if (!currentSession) throw new Error("User is not authenticated");

        // Fetch the authenticated account
        const currentAccount = await account.get();
        if (!currentAccount) throw new Error("Account not found");

        // Fetch the user's data from the database
        const currentuser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)] // Ensure you query by `accountId`
        );

        if (!currentuser.documents.length) throw new Error("User data not found");

        return currentuser.documents[0];
    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
}


export const getMenu = async({ category, query}: GetMenuParams) =>{
    try {
        const queries: string[] = [];

        if(category) queries.push(Query.equal('categories', category));
        if(query) queries.push(Query.search('name', query));

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCustomizationsCollectionId,
            queries,
        )

        return menus.documents;
    } catch (error) {
        throw new Error (error as string)
    }
}

export const getCategories = async() => {
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
        )
        return categories.documents;
    } catch (error) {
        throw new Error (error as string)
    }
}