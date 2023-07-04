import React from 'react'
import Productos from './modules/Productos';
import Fabricantes from './modules/Fabricantes';
//import Home from './modules/Home';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App(){
  return(
    <Router>
      <Routes>
    
        <Route path='/Productos' element={<Productos/>}/>
        <Route path='/Fabricantes' element={<Fabricantes/>}/>

      </Routes>
    </Router>
  );
}
export default App;