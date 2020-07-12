import React from "react";
import {PostList} from "./front/PostList";

export default function Home() {
    return <div className="container">
        <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
                <PostList />
            </div>
        </div>
    </div>
}
