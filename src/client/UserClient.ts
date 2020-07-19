import BaseClient from "./BaseClient";

interface UserSentInterface {
    username: string,
    password: string,
    last_name: string,
    first_name: string,
    email: string,
}

export interface UserReceivedInterface {
    id: number,
    username: string,
    password: string,
    last_name: string,
    first_name: string,
    email: string,
}

export default class UserClient extends BaseClient {
    static async getAll(): Promise<Array<UserReceivedInterface>>{
        let response = await super.get("http://localhost:8000/admin/users")
        return await super.getJsonFromResponse(response)
    }

    static async getByUrl(url: string) {
        let response = await fetch(url, {
            method: 'GET',
            mode: "cors",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            }
        })

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
        } catch (e) {
            console.error(e)

            return false
        }
    }
}
