import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const QuestionContext = createContext();

const QuestionProvider = ({children}) => {
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
    try {
      const res = await fetch('http://localhost:5000/questions', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json' },
        body: JSON.stringify(question)
      });
      const data = await res.json();
      setQuestions([...questions, data]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteQuestion = async (id) => {
    console.log("deleteQuestion called with id: ", id);
    try {
      await fetch(`http://localhost:5000/questions/${id}`, {
        method: 'DELETE', 
      });
      setQuestions(questions.filter(question => question.id !== id))
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const editQuestion = async (id, updatedQuestion) => {
    try {
      const res = await fetch(`http://localhost:5000/questions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedQuestion),
      });
      const data = await res.json();
      setQuestions(
        questions.map((question) =>
          question.id === id ? { ...question, ...data } : question
        )
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <QuestionContext.Provider
      value={{
        questions,
        addQuestion,
        deleteQuestion,
        editQuestion
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
export { QuestionProvider };
export default QuestionContext;