import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const QuestionContext = createContext();

const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('http://localhost:5000/questions');
        const data = await res.json();
        console.log(data);
        setQuestions(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchMessages();
  }, []);


  const addQuestion = async (question) => {
      const res = await fetch('http://localhost:5000/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(question)
      });
      const data = await res.json();
      setQuestions([...questions, data]);
    } 

  const deleteQuestion = async (id) => {
    console.log("deleteQuestion called with id: ", id);
      await fetch(`http://localhost:5000/questions/${id}`, {
        method: 'DELETE',
      });
      setQuestions(questions.filter(question => question.id !== id))
    } 

  const editQuestion = async (id, updatedQuestion) => {
      const res = await fetch(`http://localhost:5000/questions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedQuestion),
      });
      const data = await res.json();
      setQuestions(
        questions.map((question) =>
          question.id.toString() === id ? { ...question, ...data } : question
        )
      );
    } 

    const likeQuestion = async (id) => {
      const question = questions.find(question => question.id === id);
      const updatedQuestion = { ...question, likes: question.likes + 1 };
      await fetch(`http://localhost:5000/questions/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedQuestion),
        headers: { 'Content-Type': 'application/json' }
      });
      setQuestions(questions.map(question => question.id === id ? { ...question, likes: question.likes + 1 } : question));
    }
  
    const dislikeQuestion = async (id) => {
      const question = questions.find(question => question.id === id);
      const updatedQuestion = { ...question, dislikes: question.dislikes + 1 };
      await fetch(`http://localhost:5000/questions/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedQuestion),
        headers: { 'Content-Type': 'application/json' }
      });
      setQuestions(questions.map(question => question.id === id ? { ...question, dislikes: question.dislikes + 1 } : question));
    }
  

  return (
    <QuestionContext.Provider
      value={{
        questions,
        addQuestion,
        deleteQuestion,
        editQuestion,
        likeQuestion,
        dislikeQuestion,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
export { QuestionProvider };
export default QuestionContext;