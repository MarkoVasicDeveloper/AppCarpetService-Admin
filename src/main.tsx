import ReactDOM from 'react-dom/client'
import './index.scss'
import LogIn from './components/LogIn/LogIn.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { setupStore } from './redux/store.ts';
import Home from './components/home/home.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={setupStore(undefined)}>
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Provider>
  </BrowserRouter>
)
