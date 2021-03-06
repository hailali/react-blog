import React from "react";
import TagClient, {TagReceivedInterface} from "../client/TagClient";

interface TagListStateInterface {
    tags: TagReceivedInterface[],
    loaded: boolean
}

export default class TagList extends React.Component<any, TagListStateInterface> {
    constructor() {
        super({});

        this.state = {
            tags: [],
            loaded: false
        }
    }

    componentDidMount() {
        TagClient.findAll().then((tags) => {
            this.setState({
                tags: tags,
                loaded: true
            })
        })
    }

    render() {
        let {tags, loaded} = this.state;

        return (
            <div>
                <h1>Tag list</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tags.map(tag => {
                        return (
                            <tr key={tag.id}>
                                <th scope="row">{tag.id}</th>
                                <td>{tag.name}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                {!loaded ? <div>Loading....</div> : ''}
            </div>
        )
    }
}

