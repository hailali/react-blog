import React from 'react';
import PostClient, {PostReceivedInterface} from "../client/PostClient";
import {TrashIcon} from "./Bootstrap";

interface PostListStateInterface {
    posts: Array<PostReceivedInterface>,
    loaded: boolean,
    deleteError: string | null
}
export default class PostList extends React.Component<any, PostListStateInterface> {
    constructor(props: any) {
        super(props);

        this.state = {
            posts: [],
            loaded: false,
            deleteError: null
        }
    }

    componentDidMount() {
        PostClient.getAll().then((posts) => {
            this.setState({
                posts: posts
            });
        });
    }

    handleDelete(e: React.MouseEvent<HTMLButtonElement>, postId: number) {
        e.preventDefault()

        PostClient.deletePost(postId).then((isPostDeleted) => {
            if (isPostDeleted) {
                this.setState((state) => {
                    let posts = state.posts.slice().filter((post) => {
                        return post.id !== postId
                    });

                    return {
                        posts: posts
                    }
                })
            } else {
                this.setState({
                    deleteError: `An error occurred during the deleting of the post with id "${postId}"`
                })
            }
        })
    }

    render() {
        let {posts, loaded, deleteError} = this.state;

        return (
            <div>
                <h1>Posts list</h1>
                {deleteError !== null ? <div className="alert alert-dark" role="alert">
                    {deleteError}
                </div> : ''}
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">User</th>
                        <th scope="col">Title</th>
                        <th scope="col">Body</th>
                        <th scope="col">Active</th>
                        <th scope="col"/>
                    </tr>
                    </thead>
                    <tbody>
                    {posts.map(post => {
                        return (
                            <tr key={post.id}>
                                <th scope="row">{post.id}</th>
                                <td>{post.user}</td>
                                <td>{post.title}</td>
                                <td>{post.body}</td>
                                <td>{post.active ? 'Yes' : 'No'}</td>
                                <td>
                                    <button onClick={(e) => this.handleDelete(e, post.id)}><TrashIcon /></button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                {loaded ? '<div>Loading....</div>' : ''}
            </div>
        )
    }
}