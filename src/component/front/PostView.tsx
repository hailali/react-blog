import React from "react";
import PostClient from "../../client/PostClient";
import {useParams} from "react-router-dom";

export class PostView extends React.Component<any, any> {
    private postId: number;

    constructor(props) {
        super(props);

        this.state = {
            post: null,
            loaded: false
        }
    }

    componentDidMount() {
        const {postId} = this.props.match.params

        PostClient.getPost(postId).then((post) => {
            this.setState({
                post: post,
                loaded: true
            })
        })
    }

    render() {
        let {post, loaded} = this.state

        return (
            <div className="container">
                { loaded ? <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <div className="post-heading">
                            <h1>{post.title}</h1>
                            <h2 className="subheading">{post.sub_title}</h2>
                            <span className="meta">Posted by
              <a href="#"> {post.user} </a>
                                {post.created_at} </span>
                        </div>
                    </div>
                </div> : <div>Loading....</div> }

            </div>
        )
    }
}


