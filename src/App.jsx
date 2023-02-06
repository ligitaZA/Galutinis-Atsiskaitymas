
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Menu/Header';
import LogIn from './components/Menu/Login';
import Register from './components/Menu/Register';

function App() {
  return (
    <>
    <Routes>
      <Route element={<Header />}>
        <Route element={<LogIn />} />
        <Route element={<Register />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
