import React, {useState} from "react";

const Post = (props) => {

    const [user, setUser] = useState("");
    const [comment,setComment] = useState("");

    const handleUserChange = (e) => {
        setUser(e.target.value);
    }

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    }

    const postComment = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://davids-blog-api.up.railway.app/api/posts/${props.post._id}/comments`, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ user: user, content: comment})
        });
        const commentPosted = await response.json();
        console.log(commentPosted);
        props.setCount(prevCount => prevCount + 1)
        setUser("");
        setComment("");
    };

    if (props.post.published !== true) {
            // This post is hidden
    } else {
    return (
        <div className="post">
            <div className="post-content">
                <h1 className="post-title">{props.post.title}</h1>
                <p className="post-text">{props.post.content}</p>
                <p className="timestamp">Posted at: {props.post.timestamp}</p>

                <div className="commentlist"> Comments:
                    {props.post.comments.length > 0 ? 
                    ( <div>{props.post.comments.map((comment, index) => 
                        <div className="comment" key={index}>
                            <p>{comment.user}: <span className="commentcontent">{comment.content}</span></p>
                        </div>
                        )}</div> ) : 
                    ( <div className="commentcontent">no comments</div>)
                    }
                </div>
                
            </div>
            <div className="commentbox">
                <h3>Add a comment to this post</h3>
                <form onSubmit={postComment}className="commentform">
                    <div className="form-comment-group">
                        <label htmlFor="user">User</label>
                        <input onChange={handleUserChange} type="text" name="user" required={true}></input>
                    </div>
                    <div className="form-comment-group">
                        <label htmlFor="content">Comment</label>
                        <input onChange={handleCommentChange} type="text" name="content" required={true}></input>
                    </div>
                    <button className="commentpostbutton"  type="submit">POST</button>
                </form>
            </div>


        </div>
    )
    }
}

export default Post;