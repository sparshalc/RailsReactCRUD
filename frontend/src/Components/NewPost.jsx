import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../css/NewPost.css'
const NewPost = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = { title, body }
        const response = await fetch('http://localhost:3000/api/v1/posts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( postData)
        })
        if (response.ok){
            const { id } = await response.json();
            navigate(`/posts/${id}`);
        }else{
            console.log("Error")
        }
    }
  return (
    <div>
        <div className="title">
            <h1>New<span>Post</span></h1>
        </div>
        <div className="form">
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter title' />
                <input type="text" value={body} onChange={(e) => setBody(e.target.value)} placeholder='Enter body'/>
                <div className="center">
                    <button type='submit' className='editButton'>Create Post</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default NewPost