// BlogPost.tsx
import React, { useState } from 'react';
import './BlogPost.scss';

interface BlogPostProps {
  title: string;
  body: string;
  onDelete: () => void;
  onEdit: (newBody: string) => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, body, onDelete, onEdit }) => {
  const [newBody, setNewBody] = useState('');

  const handleEdit = () => {
    const updatedBody = prompt('Enter new body:', body);
    if (updatedBody !== null) {
      setNewBody(updatedBody);
      onEdit(updatedBody);
    }
  };

  return (
    <div className="blogPost">
      <h2>{title}</h2>
      <p>{newBody || body}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default BlogPost;
