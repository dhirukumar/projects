import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/index'
import { Signin } from './pages/signin'
import { Blog } from './pages/blog'
import { Blogs } from './pages/blogs'
import { Publish } from './pages/Publish'
import { Update } from './pages/Update'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog/>} />
          <Route path="/blog" element={<Blogs/>} />
          <Route path="/publish" element={<Publish/>} />
          <Route path="/update/:id" element={<Update/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App