import { Client, Account } from "appwrite"

const config = useRuntimeConfig()

const client = new Client()
client
  .setEndpoint(config.public.appwrite.APPWRITE_ENDPOINT)
  .setProject(config.public.appwrite.APPWRITE_PROJECT_ID);

const account = new Account(client);

export const getSessionFromServer = async (cookies: Record<string, string>): Promise<boolean | undefined> => {
  try {
    const sessionCookiesNames = [
      `a_session_${config.public.appwrite.APPWRITE_PROJECT_ID.toLowerCase()}`,
      `a_session_${config.public.appwrite.APPWRITE_PROJECT_ID.toLowerCase()}_legacy`,
    ];

    let hash = cookies[sessionCookiesNames[0]] ?? cookies[sessionCookiesNames[1]] ?? '';

    const authCookies: any = new Map();
    authCookies[`a_session_${config.public.appwrite.APPWRITE_PROJECT_ID.toLowerCase()}`] = hash;

    client.headers['X-Fallback-Cookies'] = JSON.stringify(authCookies);

    await account.get()
    
    return true
  } catch (e) {
    return undefined
  }
}
