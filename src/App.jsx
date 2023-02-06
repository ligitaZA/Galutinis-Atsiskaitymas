
import './App.css';
import Header from './components/Menu/Header';
import LogIn from './components/Menu/Login';
import Register from './components/Menu/Register';
import { Route, Routes } from 'react-router-dom';
import NewQuestions from './components/Questions/NewQuestions';

function App() {
  return (
    <>
    <Routes>
      <Route element={<Header />}>
        <Route path='/questions' element={<NewQuestions />}/>
      </Route> 
      <Route path='/login' element={<LogIn />} />
      <Route path='/register' element={<Register />} />
    </Routes>
    </>
  );
}

export default App;
