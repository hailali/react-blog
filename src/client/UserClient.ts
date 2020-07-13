import BaseClient from "./BaseClient";
import {getUserToken} from "../component/UserUtils";

interface UserSentInterface {
    username: string,
    password: string,
    last_name: string,
    first_name: string,
    email: string,
}

export default class UserClient extends BaseClient {
    static async getAll() {
        let response = await super.get("http://localhost:8000/admin/users")
        return await super.getJsonFromResponse(response)
    }

    static async getByUrl(url: string) {
        let response = await super.get(url)
        return await super.getJsonFromResponse(response)
    }

    static async create(user: UserSentInterface) {
        let response = await fetch("http://localhost:8000/api/users", {
            method: 'POST',
            mode: "cors",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        return response.ok
    }

    static async deleteUser(userId: number): Promise<boolean> {
        try {
            let response = await super.delete(`http://localhost:8000/admin/users/${userId}`)

            return response.ok
        } catch (e){
            console.error(e)

            return false
        }
    }
}
