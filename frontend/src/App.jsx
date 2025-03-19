import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CreateProduct from './components/CreateProduct';
import UpdateProduct from './components/UpdateProduct';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create' element={<CreateProduct />} />
      <Route path='/update/:id' element={<UpdateProduct />} />
    </Routes>
    
  )
}

export default App