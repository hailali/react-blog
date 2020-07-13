import React from "react";
import PostClient from "../../client/PostClient";
import {Link} from "react-router-dom"

export class PostList extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loaded: false
        }
    }

    renderPost(post) {
        return (
            <article className="post-preview">
                <Link to={`/posts/${post.id}`}>
                    <h2 className="post-title">{post.title}</h2>
                    <h3 className="post-subtitle">{post.sub_title}</h3>
                </Link>
                <a href="/startbootstrap-clean-blog-jekyll/2020/01/31/man-must-explore.html">

                </a>
                <p className="post-meta">Posted by {post.user}
                    on {post.created_at} · <span className="reading-time" title="Estimated read time">4 mins  read </span>
                </  p>
            </article>
        )
    }

    componentDidMount() {
        PostClient.getAll().then((posts) => {
            this.setState({
                posts: posts,
                loaded: true
            })
        })
    }

    render() {
        const {posts} = this.state

        return (
            posts.map((post) => {
                return this.renderPost(post)
            })
        )
    }
}


