
import './App.css';
import Header from './components/Menu/Header';
import Main from './components/Main';
import LogIn from './components/Menu/Login';
import Register from './components/Menu/Register';
import { Route, Routes } from 'react-router-dom';
import NewQuestions from './components/Questions/NewQuestions';
import EditQuestionForm from './components/Questions/EditQuestionForm';
import Answer from './components/Answers/Answer';

function App() {
  return (
    <>
    <Routes>
      <Route element={<Header />}>
        <Route path='/' element={<Main />}/>
        <Route path='/addQuestions' element={<NewQuestions />}/>
        <Route path='/editQuestion/:id' element={<EditQuestionForm />} />
        <Route path='/questions/:id' element={<Answer />} /> 
      </Route> 
      <Route path='/login' element={<LogIn />} />
      <Route path='/register' element={<Register />} />
    </Routes>
    </>
  );
}

export default App;
