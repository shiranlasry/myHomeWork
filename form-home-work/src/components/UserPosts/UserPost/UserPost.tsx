import React, { FC } from "react";

interface PostProps {
  post: Post;
}

const UserPost: FC<PostProps> = ({ post }) => {
  return (
    <li key={post.id} className="post">
      <div className="post-header">
        <span className="post-title">{post.title}</span>
      </div>
      <div className="post-body">
        <p>{post.body}</p>
      </div>
      <div className="post-footer">
        <span className="reactions">{post.reactions} reactions</span>
      </div>
    </li>
  );
};

export default UserPost;
