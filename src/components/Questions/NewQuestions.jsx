
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import QuestionContext from "../../context/QuestionContext";
import UserContext from "../../context/UserContext";

  const QuestionForm = () => {

    const [questionInput, setQuestionInput] = useState({
      title: '',
      question: ''
    })
    const { addQuestion } = useContext(QuestionContext);
    const { loggedInUser } = useContext(UserContext);
    
    const chatNavigation = useNavigate();
  
  
    const handleSubmit = e => {
      e.preventDefault();
      const newMessage = {
        title: questionInput.title,
        question: questionInput.question,
        isEdited: false,
        id: Date.now(),
        userId: loggedInUser ? loggedInUser.id : null,
        likes: 0,
        dislikes: 0,
        sortByTime: new Date().toLocaleString()
      };
      addQuestion(newMessage);
      chatNavigation('/');
    }
    return (
      <>
      {
        loggedInUser && (
          <div className="chatUsers">
  
            <form onSubmit={handleSubmit}>
              <label>
                <input
                  type="text"
                  className="input"
                  name="title"
                  value={questionInput.title}
                  onChange={e => setQuestionInput({ ...questionInput, title: e.target.value })}
                />
              </label>
              <label>
                <input
                  type="text"
                  className="input"
                  name="question"
                  value={questionInput.question}
                  onChange={e => setQuestionInput({ ...questionInput, question: e.target.value })}
                />
              </label>
              <button type="submit">Submit question</button>
            </form>
          </div>
        )
      }
      </>
    );
  };
  
  export default QuestionForm;