import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../css/showPost.css'
const PostDetails = () => {
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    useEffect(() => {
        const fetchpost = async () => {
            setLoading(true)
            const res = await fetch(`http://localhost:3000/api/v1/posts/${id}`)
            console.log(res)
            const data = await res.json()
            setPost(data)
            setLoading(false)
        }
        fetchpost()
    }, [id])
    if (loading) return <h2 className='loading'>Loading please wait...</h2>;
  return (
    <div>
        <div className="title">
            <h1>Post<span>Details</span></h1>
        </div>
        <div className="post-container">
            <div className="all-post">
                <div className="top">
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                </div>
                <div className="bottom">
                {
                    post.image_url ? <p><img src={post.image_url} className='post-image'/></p> : <h1>No Image Attached</h1>
                }   
                </div>
            </div>
        </div>
        <Link to='/' className='backButton'>Go Back</Link>
    </div>
  )
}

export default PostDetails