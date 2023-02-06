import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const QuestionContext = createContext();

const QuestionProvider = ({children}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('http://localhost:5000/messages');
        const data = await res.json();
        console.log(data);
        setMessages(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchMessages();
  }, []);

  const addMessage = async (message) => {
    try {
      const res = await fetch('http://localhost:5000/messages', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json' },
        body: JSON.stringify(message)
      });
      const data = await res.json();
      setMessages([...messages, data]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteMessage = async (id) => {
    console.log("deleteMessage called with id: ", id);
    try {
      await fetch(`http://localhost:5000/messages/${id}`, {
        method: 'DELETE', 
      });
      setMessages(messages.filter(message => message.id !== id))
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <QuestionContext.Provider
      value={{
        messages,
        addMessage,
        deleteMessage
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
export { QuestionProvider };
export default QuestionContext;