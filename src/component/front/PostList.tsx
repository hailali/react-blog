import React from "react";
import PostClient from "../../client/PostClient";

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
                <a href="/startbootstrap-clean-blog-jekyll/2020/01/31/man-must-explore.html">
                    <h2 className="post-title">{post.title}</h2>
                    <h3 className="post-subtitle">Problems look mighty small from 150 miles up</h3>
                </a>
                <p className="post-meta">Posted by
                    Start Bootstrap
                    on
                    January 31, 2020 · <span className="reading-time" title="Estimated read time">
   4 mins  read </span>
                </p>
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


