import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ConfigProvider } from 'antd'
import './index.css'
import Login from './pages/login'
import {HashRouter as Router,Routes,Route} from 'react-router-dom'
import AppProvider from './components/AppProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppProvider>
<Router>
  <ConfigProvider>
  <Routes>
    <Route path="/" element={<Login/>}></Route>
    <Route path="/admin/*" element={<App/>}></Route>
  </Routes>
  </ConfigProvider>

</Router>
</AppProvider>
   

)
