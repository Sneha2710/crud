import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Home } from './component/home';
import { Add } from './component/add';
import { Update } from './component/update';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/addemp' element={<Add/>}/>
        <Route path='/Edit/:id' element={<Update/>}/>


      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
