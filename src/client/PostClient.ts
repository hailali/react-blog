import UserClient from "./UserClient";
import BaseClient from "./BaseClient";

interface PostSentInterface {
    title: string,
    sub_title: string,
    body: string,
    active: boolean
}

export interface PostReceivedInterface {
    id: number,
    user: string,
    title: string,
    sub_title: string,
    body: string,
    active: boolean,
    created_at: string
}

export default class PostClient extends BaseClient {

    static async getAll(): Promise<Array<PostReceivedInterface>> {
        let response = await fetch("http://localhost:8000/api/posts", {
            method: 'GET',
            mode: "cors",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        let posts:Array<PostReceivedInterface> = await super.getJsonFromResponse(response);

        let promises = posts.map(async post => {
            let user = await UserClient.getByUrl(post.user);
            return {...post, 'user': `${user.first_name} ${user.last_name}` }
        });

        // return all posts with user information
        return await Promise.all(promises);
    }

    static async deletePost(postId: number) {
        let response = await super.delete(`http://localhost:8000/admin/posts/${postId}`)

        return response.ok
    }

    static async create(post: PostSentInterface): Promise<boolean> {
        let response = await super.post("http://localhost:8000/admin/posts", JSON.stringify(post))

        return response.ok
    }

    static async getPost(postId: number): Promise<PostReceivedInterface> {
        let response = await fetch(`http://localhost:8000/api/posts/${postId}`, {
            method: 'GET',
            mode: "cors",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        let post:PostReceivedInterface = await super.getJsonFromResponse(response);

        let user = await UserClient.getByUrl(post.user);
        // return all posts with user information
        return {...post, 'user': `${user.first_name} ${user.last_name}`}
    }
}
