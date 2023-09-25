import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/NewPost.css';

const PostDetails = () => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/api/v1/posts/${id}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data);
        } else {
          console.error('Error fetching post');
        }
      } catch (error) {
        console.error('Error:', error);
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setPost({ ...post, image: imageFile });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData();
    formData.append('post[title]', post.title);
    formData.append('post[body]', post.body);
    formData.append('post[image]', post.image);

    try {
      const response = await fetch(`http://localhost:3000/api/v1/posts/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        navigate(`/posts/${id}`);
      } else {
        console.error('Error updating post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <h2 className='loading'>Loading please wait...</h2>;

  return (
    <div>
      <div className='title'>
        <h1>Edit<span>Post Details</span></h1>
      </div>
      <form className='form' onSubmit={handleSubmit}>
        <input type='text' value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} />
        <input type='text' value={post.body} onChange={(e) => setPost({ ...post, body: e.target.value })} />
        <input type='file' onChange={handleImageChange} />
        <div className='center'>
          <button type='submit' className='editButton'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PostDetails;
