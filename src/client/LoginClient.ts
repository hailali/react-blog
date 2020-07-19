import BaseClient from "./BaseClient";
import jwt from "jwt-decode";

interface LoginResponseInterface {
    token: string,
    last_name: string,
    first_name: string,
    email: string,
    exp: number,
}

export default class LoginClient extends BaseClient {
    static async login(data: string) {
        try {
            let response: Response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                mode: "cors",
                cache: "no-cache",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            })

            let json = await super.getJsonFromResponse(response);

            let decode:LoginResponseInterface = jwt(json.token);

            sessionStorage.setItem("token", json.token)
            sessionStorage.setItem("last_name", decode.last_name)
            sessionStorage.setItem("first_name", decode.first_name)
            sessionStorage.setItem("email", decode.email)
            sessionStorage.setItem("exp", decode.exp.toString())

            return true
        } catch (e) {
            console.warn('Authentication failure', data)
            return false
        }
    }
}
