import ReactDOM from 'react-dom/client'
import './index.scss'
import LogIn from './components/LogIn/LogIn.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LogIn />} />
    </Routes>
  </BrowserRouter>
)
