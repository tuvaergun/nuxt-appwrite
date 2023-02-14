useAimport { Client, Databases, Users, Account, Storage, Avatars, Functions, Role, Permission} from 'node-appwrite'

const config = useRuntimeConfig()

let client = new Client();

const instance = class Appwrite {
  client: Client;
  users: Users;
  databases: Databases;
  account: Account;
  storage: Storage;
  avatars: Avatars;
  functions: Functions;
  role: Role;
  permission: Permission;

  constructor(options: AppwriteOptions) {
    this.client = new Client();
    this.client
      .setEndpoint(config.public.APPWRITE_ENDPOINT) // Your API Endpoint
      .setProject(config.public.APPWRITE_PROJECT_ID) // Your project ID
      .setKey(config.appwrite.APPWRITE_API_KEY) // Your secret API key
    this.databases = new Databases(this.client);
    this.users = new Users(this.client)
    this.account = new Account(this.client);
    this.storage = new Storage(this.client);
    this.avatars = new Avatars(this.client);
    this.functions = new Functions(this.client);
    this.role = new Role();
    this.permission = new Permission();
  }
}
const useAppwriteServer = () => {
  return new instance()
}

export default useAppwriteServer