import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../css/NewPost.css'

const PostDetails = () => {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchpost = async () => {
            setLoading(true)
            const res = await fetch(`http://localhost:3000/api/v1/posts/${id}`)
            const data = await res.json()
            setPost(data)
            setLoading(false)
        }
        fetchpost()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/api/v1/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( 
            {
                title: post.title,
                body: post.body,
            }
        )
        })
        if (response.ok){
            const json = await response.json();
            navigate(`/posts/${id}`);
        }else{
            console.log("Error")
        }
    }

    if (loading) return <h2 className='loading'>Loading please wait...</h2>;
  return (
    <div>
        <div className="title">
            <h1>Edit<span>Post Details</span></h1>
        </div>
        <form className="form" onSubmit={handleSubmit}>
            <input type="text"  value={post?.title} onChange={(e) => setPost({...post, title: e.target.value })}/>
            <input type="text"  value={post?.body}  onChange={(e) => setPost({...post, body: e.target.value })}/>
            <div className="center">
                <button type='submit' className='editButton'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default PostDetails