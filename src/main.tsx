import ReactDOM from 'react-dom/client'
import './index.scss'
import LogIn from './components/LogIn/LogIn.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { setupStore } from './redux/store.ts';
import Home from './components/home/home.tsx';
import Traffic from './components/traffic/traffic.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/admin-interface">
    <Provider store={setupStore(undefined)}>
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/home' element={<Home />} />
        <Route path='/traffic' element={<Traffic />} />
      </Routes>
    </Provider>
  </BrowserRouter>
)
