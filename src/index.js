import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { QuestionProvider } from './context/QuestionContext';
import { UserProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserProvider>
        <QuestionProvider>
           <App />
        </QuestionProvider>
    </UserProvider>
  </BrowserRouter>
);