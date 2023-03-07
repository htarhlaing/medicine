import MyLayout from "./components/MyLayout"
import {Routes,Route} from 'react-router-dom'
import User from './pages/user'
import Dashboard from "./pages/dashboard"
import MedCategory from "./pages/medicine/medCategory"
import MedList from "./pages/medicine/medList"
import ArtCategory from "./pages/article/ArtCategory"
import ArtList from "./pages/article/ArtList"
function App() {

  return (
    <MyLayout>
      <Routes>
        <Route path="user" element={<User/>}></Route>
        <Route path="dashboard" element={<Dashboard/>} ></Route>
        <Route path="medicine/category" element={<MedCategory/>}></Route>
        <Route path="medicine/information" element={<MedList/>}></Route>
        <Route path="article/category" element={<ArtCategory/>}></Route>
        <Route path="article/information" element={<ArtList/>}></Route>
      </Routes>
    </MyLayout>
  )
}

export default App
