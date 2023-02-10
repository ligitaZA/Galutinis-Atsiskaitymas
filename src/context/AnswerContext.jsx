import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const AnswerContext = createContext();

const AnswerProvider = ({ children }) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fetchAnswers() {
        const res = await fetch("http://localhost:5000/answers");
        const data = await res.json();
        setAnswers(data);
      }
    fetchAnswers();
  }, []);

  const addAnswer = async (answer) => {
      const res = await fetch(`http://localhost:5000/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answer),
      });
      const data = await res.json();
      setAnswers([...answers, data]);
    }

  const deleteAnswer = async (id) => {
      await fetch(`http://localhost:5000/answers/${id}`, {
        method: "DELETE",
      });
      setAnswers(answers.filter((answer) => answer.id !== id));
    } 
  
    const editAnswer = async (id, updatedAnswers) => {
      const res = await fetch(`http://localhost:5000/answers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAnswers),
      });
      const data = await res.json();
      setAnswers(
        answers.map((answer) =>
          answer.id.toString() === id ? { ...answer, ...data } : answer
        )
      );
    } 

    const likeAnswer = async (id) => {
      const answer = answers.find(answer => answer.id === id);
      const updatedAnswers = { ...answer, likes: answer.likes + 1 };
      await fetch(`http://localhost:5000/answers/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedAnswers),
        headers: { 'Content-Type': 'application/json' }
      });
      setAnswers(answers.map(answer => answer.id === id ? { ...answer, likes: answer.likes + 1 } : answer));
    }
  
    const dislikeAnswer = async (id) => {
      const answer = answers.find(answer => answer.id === id);
      const updatedAnswers = { ...answer, dislikes: answer.dislikes + 1 };
      await fetch(`http://localhost:5000/answers/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedAnswers),
        headers: { 'Content-Type': 'application/json' }
      });
      setAnswers(answers.map(answer => answer.id === id ? { ...answer, dislikes: answer.dislikes + 1 } : answer));
    }

  return (
    <AnswerContext.Provider
      value={{
        answers,
        addAnswer,
        deleteAnswer,
        editAnswer,
        likeAnswer,
        dislikeAnswer
      }}
    >
      {children}
    </AnswerContext.Provider>
  );
};
export { AnswerProvider };
export default AnswerContext;