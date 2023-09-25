import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/NewPost.css';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null); 
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('post[title]', title);
    formData.append('post[body]', body);
    formData.append('post[image]', image); 

    try {
      const response = await fetch('http://localhost:3000/api/v1/posts', {
        method: 'POST',
        body: formData, 
      });

      if (response.ok) {
        const { id } = await response.json();
        navigate(`/posts/${id}`);
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div>
      <div className="title">
        <h1>
          New<span>Post</span>
        </h1>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter body"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            placeholder="Choose an image"
          />
          <div className="center">
            <button type="submit" className="editButton">
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
