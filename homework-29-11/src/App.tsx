// App.tsx
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.scss';
import { users as usersData } from './util/users';
import User from './components/User/User';
import Navbar from './components/Navbar/Navbar';
import BlogPost from './components/BlogPost/BlogPost'; // Import the new component

interface User {
  id: number;
  firstName: string;
  lastName: string;
  counter: number;
  emoji?: string;
}

function App() {
  const [usersArr, setUsersList] = useState<User[]>(usersData);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [blogPosts, setBlogPosts] = useState<{ key: number; title: string; body: string }[]>([]);

  const handleUserClick = (userId: number) => {
    const selectedUser = usersArr.find((user) => user.id === userId);
    setSelectedUser(selectedUser || null);
  };

  const addOneToCounter = (userId: number) => {
    setUsersList((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, counter: user.counter + 1 } : user
      )
    );
  };

  const removeOneFromCounter = (userId: number) => {
    setUsersList((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId && user.counter > 0
          ? { ...user, counter: user.counter - 1 }
          : user
      )
    );
  };

  const addBlogPost = () => {
    const newBody = prompt('Enter body for the new blog post:');
    const newTitle = prompt('Enter title for the new blog post:');
    if (newBody !== null && newTitle !== null) {
      setBlogPosts((prevPosts) => [
        ...prevPosts,
        { key: Date.now(), title: newTitle, body: newBody },
      ]);
    }
  };

  const editBlogPost = (key: number, newBody: string) => {
    setBlogPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.key === key ? { ...post, body: newBody } : post
      )
    );
  };

  const deleteBlogPost = (key: number) => {
    setBlogPosts((prevPosts) => prevPosts.filter((post) => post.key !== key));
  };

  return (
    <>
      <div className="container">
        <div className="navbar">
          <Navbar
            navName={
              selectedUser
                ? `${selectedUser.firstName} ${selectedUser.lastName}`
                : 'My App'
            }
          />
        </div>
        <div className="usersList">
          {usersArr.map((user) => (
            <User
              key={user.id}
              id={user.id}
              firstName={user.firstName}
              lastName={user.lastName}
              counter={user.counter}
              emoji={user.emoji}
              addOneToCounter={() => addOneToCounter(user.id)}
              removeOneFromCounter={() => removeOneFromCounter(user.id)}
              onClick={() => handleUserClick(user.id)}
            />
          ))}
        </div>
        <button onClick={addBlogPost}>Add Blog Post</button>
        <div className="blogPosts">
          {blogPosts.map((post) => (
            <BlogPost
              key={post.key}
              title={post.title}
              body={post.body}
              onDelete={() => deleteBlogPost(post.key)}
              onEdit={(newBody) => editBlogPost(post.key, newBody)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
