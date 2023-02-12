
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import QuestionContext from "../../context/QuestionContext";
import UserContext from "../../context/UserContext";

const QuestionForm = () => {

  const [errorMessage, setErrorMessage] = useState('');
  const [questionInput, setQuestionInput] = useState({
    title: '',
    question: ''
  })
  const { addQuestion } = useContext(QuestionContext);
  const { loggedInUser } = useContext(UserContext);

  const chatNavigation = useNavigate();


  const handleSubmit = e => {
    e.preventDefault();
    if (questionInput.title === "" || questionInput.question === "") {
      setErrorMessage("Title and Question fields cannot be empty");
      return;
    }
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
    setErrorMessage('');
  }
  return (
    <>
      {
        loggedInUser && (
          <div className="chatUsers">
            <h2>Add new question</h2>
            <div className="chat">

              <form onSubmit={handleSubmit}>
                <label>Title
                  <input
                    type="text"
                    className="input"
                    name="title"
                    value={questionInput.title}
                    onChange={e => setQuestionInput({ ...questionInput, title: e.target.value })}
                  />
                </label>
                <label>
                  Your question
                  <textarea
                    type="text"
                    className="textarea"
                    name="question"
                    value={questionInput.question}
                    onChange={e => setQuestionInput({ ...questionInput, question: e.target.value })}
                  />
                </label>
                {errorMessage && <p className="error">{errorMessage}</p>}
                <button type="submit">Submit question</button>
              </form>
            </div>
          </div>
        )
      }
    </>
  );
};

export default QuestionForm;