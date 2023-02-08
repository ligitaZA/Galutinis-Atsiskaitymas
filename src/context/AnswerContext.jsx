import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const AnswerContext = createContext();

const AnswerProvider = ({ children }) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const res = await fetch("http://localhost:5000/answers");
        const data = await res.json();
        setAnswers(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchAnswers();
  }, []);

  const addAnswer = async (answer) => {
    try {
      const res = await fetch(`http://localhost:5000/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answer),
      });
      const data = await res.json();
      setAnswers([...answers, data]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteAnswer = async (id) => {
    try {
      await fetch(`http://localhost:5000/answers/${id}`, {
        method: "DELETE",
      });
      setAnswers(answers.filter((answer) => answer.id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <AnswerContext.Provider
      value={{
        answers,
        addAnswer,
        deleteAnswer
      }}
    >
      {children}
    </AnswerContext.Provider>
  );
};
export { AnswerProvider };
export default AnswerContext;