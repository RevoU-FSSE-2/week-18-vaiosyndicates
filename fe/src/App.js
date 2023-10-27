import { useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { PrivateRoutes, PublicRoutes } from './route';

const App = () => {
  const [status, setStatus] = useState(false)
  const tokenizer = useSelector(state => state.tokenReducer.tokenizer);



  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('token'));
    if(items !== null) {
      setStatus(true) 
    }
  }, [tokenizer])
  
  return (
    <>
     <Routes>
      {
        status
              ? <Route path="/*" element={<PrivateRoutes />} />
              : <Route path="/*" element={<PublicRoutes />} />
      }
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  )  
}

export default App
