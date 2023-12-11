// UserPosts.tsx
import React, { useEffect, useState } from "react";
import { getPostsByUserId } from "../../api/postsAPI";
import "./UserPosts.scss";
import { getUser } from "../../api/usersAPI";
import UserPost from "./UserPost/UserPost";

interface UserPostsProps {
  userId: number;
  setIsposts: (isposts: boolean) => void;
}

const UserPosts: React.FC<UserPostsProps> = ({ userId, setIsposts }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User>();


  const fetchPosts = async () => {
    try {
      const userPosts = await getPostsByUserId(userId);
      if (!userPosts) {
        console.log("user posts not found");
        return;
      }
      setPosts(userPosts);
      const user: User = await getUser(userId);
      if (!user) {
        console.log("user not found");
        return;
      }
      setUser(user);
    } catch (error) {
      console.error(error);

    }
  };

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  const hendelBack = () => {
    setIsposts(false);
  };

  return (
    <div className="user-posts">
      <h3> {user?.firstName} posts </h3>
      <ul>
        {posts.map((post) => (
          <UserPost post={post} />
          // <li key={post.id} className='post'>
          //   <div className='post-header'>
          //     <span className='post-title'>{post.title}</span>
          //   </div>
          //   <div className='post-body'>
          //     <p>{post.body}</p>
          //   </div>
          //   <div className='post-footer'>
          //     <span className='reactions'>{post.reactions} reactions</span>
          //   </div>
          // </li>
        ))}
      </ul>

      <button onClick={hendelBack}>Back</button>
    </div>
  );
};

export default UserPosts;
