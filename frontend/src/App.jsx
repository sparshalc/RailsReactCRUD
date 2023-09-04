import './App.css'
import { Route, Routes } from "react-router-dom"
import PostList from './Components/PostList'
import Navbar from './Components/Navbar'
import PostDetails from './Components/PostDetails'
import NewPost from './Components/NewPost'
import EditPost from './Components/EditPost'
function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" exact Component={PostList}/>
        <Route path="/new" exact Component={NewPost}/>
        <Route path="/posts/:id" exact Component={PostDetails}/>
        <Route path="/posts/:id/edit" exact Component={EditPost}/>
      </Routes>
    </>
  )
}

export default App
