import conf from '../conf/conf.js'
import { Client, Account, ID } from 'appwrite'

class AuthService {
    client = new Client()
    account

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId)
        this.account = new Account(this.client)
    }

    async createUser({ email, password, name }) {
        try {
            console.log("account succesfully created" , name)
            return await this.account.create(ID.unique(), email, password, name)
            
            // console.log("account succesfully created" , name)
        } catch (error) {
            console.log("Create user error:", error);
            throw error;
        }
    }


    async login({ email, password }) {
        try {
            // check if session already exists
            const currentUser = await this.getCurrUser();
            if (currentUser) return currentUser;

            // otherwise create a new session
            console.log("user is login in")
            await this.account.createEmailPasswordSession(email, password);
            return await this.account.get()
        } catch (error) {
            console.log("Error in login:", error);
        }
    }


    async getCurrUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.error("Error in getCurrUser:", error)
            return null
        }
    }

    async logout() {
        try {
            const user = await this.getCurrUser();
            if (user) {
                await this.account.deleteSession('current');
            }
        } catch (error) {
            console.log("Error in logout:", error);
        }
    }


    async editUserDetails({ name, email, password }) {
        try {
            const user = await this.account.get()
            if (user) {
                if (email) await this.account.updateEmail(email)
                if (name) await this.account.updateName(name)
                if (password) await this.account.updatePassword(password)
                return true
            }
            return false
        } catch (error) {
            console.error("Error in editUserDetails:", error)
            return false
        }
    }
}

export const authServe = new AuthService()
export default AuthService
