
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import{ Signup }from './component/signup'
import { Signin } from './component/signin'
import { Dashboard } from './component/dashboadr'
function App() {
  return (
  <div>
   <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
  </div>
  )
}

export default App
