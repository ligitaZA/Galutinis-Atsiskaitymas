import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const QuestionContext = createContext();

const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [questionsToShow, setQuestionsToShow] = useState([])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('http://localhost:5000/questions');
        const data = await res.json();
        setQuestions(data);
        setQuestionsToShow(data)
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
      setQuestionsToShow([...questions, data]);
    } 

    const deleteQuestion = async (id) => {
      await fetch(`http://localhost:5000/questions/${id}`, {
        method: 'DELETE',
      });
      setQuestionsToShow(questionsToShow.filter(question => question.id !== id));
      setQuestions(questions.filter(question => question.id !== id));
      
    };

  const editQuestion = async (id, updatedQuestion) => {
      const res = await fetch(`http://localhost:5000/questions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedQuestion),
      });
      const data = await res.json();
      setQuestions(
        questions.map((question) =>
          question.id=== id ? { ...question, ...data } : question
        )
      );
      setQuestionsToShow(
        questionsToShow.map((question) =>
          question.id=== id ? { ...question, ...data } : question
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
      setQuestionsToShow(questions.map(question => question.id === id ? { ...question, likes: question.likes + 1 } : question));
    }
  
    const dislikeQuestion = async (id) => {
      const question = questions.find(question => question.id === id);
      console.log(question.id)
      const updatedQuestion = { ...question, dislikes: question.dislikes + 1 };
      console.log(updatedQuestion)
      await fetch(`http://localhost:5000/questions/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedQuestion),
        headers: { 'Content-Type': 'application/json' }
      });
      setQuestions(questions.map(question => question.id === id ? { ...question, dislikes: question.dislikes + 1 } : question));
      setQuestionsToShow(questions.map(question => question.id === id ? { ...question, dislikes: question.dislikes + 1 } : question));
    }
  

  return (
    <QuestionContext.Provider
      value={{
        questions,
        addQuestion,
        deleteQuestion,
        questionsToShow,
        setQuestionsToShow,
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