import React, { useEffect, useState } from 'react'
import '../css/PostList.css'
import { Link } from 'react-router-dom'

const PostList = () => {
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchpost = async () => {
            setLoading(true)
            const res = await fetch('http://localhost:3000/api/v1/posts')
            const data = await res.json()
            setPost(data)
            setLoading(false)
        }
        fetchpost()
    }, [])


    const deletePost = async (id) => {
        const res = await fetch(`http://localhost:3000/api/v1/posts/${id}`,{
            method: "DELETE"
        })
        if(res.ok){
            setPost(post.filter((post) => post.id !== id ))
        }else{
            console.log("Something went wrong!")
        }
    }

    if (loading) return <h2 className='loading'>Loading please wait...</h2>;
    return (
        <div>
            <div className="title">
                <h1>Rails<span>React</span> CRUD <br /> with<span>Rails</span>Api</h1>
            </div>
            <div className="posts">
                {post.map((post, id) => {
                    return (
                        <div key={id} className="post-container">
                            <div className="all-posts">
                                <Link to={`/posts/${post.id}`} className='post-title'>{post.title}</Link>
                                <p>{post.body}</p>
                            </div>
                            <div className="button">
                             <button onClick={() => deletePost(post.id)} className='deleteButton'>Delete</button>
                             <Link to={`/posts/${post.id}/edit`} className='editButton'>Edit</Link>
                            </div>
                        </div>
                    );
                })}
            </div>
    </div>
  )
}

export default PostList