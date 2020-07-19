import BaseClient from "./BaseClient";

export interface TagReceivedInterface {
    id: number,
    name: string
}

export default class TagClient extends BaseClient {
    static async findAll(): Promise<Array<TagReceivedInterface>> {
        let response = await super.get('http://localhost:8000/api/tags');
        let json = await super.getJsonFromResponse(response);

        return json
    }
}
