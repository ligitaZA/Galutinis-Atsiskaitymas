
import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import QuestionContext from "../../context/QuestionContext";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";

const Question = () => {
  const [questionInput, setQuestionInput] = useState({
    title: '',
    question: '',
    isLiked: '',
    isEdited: false
  })
  const [chatInputs, setChatInputs] = useState({
    title: '',
    question: '',
    isLiked: '',
    isEdited: false
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const { questions, addQuestion, deleteQuestion, editQuestion } = useContext(QuestionContext);
  const { loggedInUser, users } = useContext(UserContext);
  const chatNavigation = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    const newMessage = {
      title: questionInput.title,
      question: questionInput.question,
      isLiked: questionInput.isLiked,
      isEdited: questionInput.isEdited,
      id: Date.now(),
      userId: loggedInUser ? loggedInUser.id : null
    };
    addQuestion(newMessage);
    setQuestionInput({ title: "", question: "" });
    chatNavigation();
  }

  const handleEdit = (question) => {
    setSelectedQuestionId(question.id);
    setEditMode(true);
    setChatInputs({ title: question.title, question: question.question });
  };

  const handleUpdate = e => {
    e.preventDefault();
    const updatedQuestion = {
      ...chatInputs,
      id: selectedQuestionId,
      isEdited: true,
      userId: loggedInUser ? loggedInUser.id : null
    };
    editQuestion(selectedQuestionId, updatedQuestion);
    setEditMode(false);
    setChatInputs({ title: "", question: "" });
    setSelectedQuestionId(null);
  }


  const renderMessages = () => {
    return questions.map(question => {
      const messageOwner = users.find(user => user.id === question.userId) || {};

      return (
        <div className="user" key={question.id}>
          {messageOwner && (
            <img
              className="avatar"
              src={messageOwner.avatar}
              alt="user avatar"
            />
          )}
          {messageOwner && <span>{messageOwner.userName}</span>}
          {!editMode || question.id !== selectedQuestionId ? (
            <>
              <Link to="/answers">
                <div className="question-text">{question.title}</div>
              </Link>
              <div className="question-text">{question.question}</div>


              {question.isEdited && loggedInUser && loggedInUser.id === question.userId && (
                <div className="question-edited">Edited</div>
              )}


              {loggedInUser && loggedInUser.id === question.userId && (
                <button
                  onClick={() => deleteQuestion(question.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              )}
              {loggedInUser && loggedInUser.id === question.userId && (
                <button onClick={() => handleEdit(question)}>Edit</button>
              )}
            </>
          ) : (
            <form onSubmit={handleUpdate}>
              <label>
                <input
                  type="text"
                  className="input"
                  name="title"
                  value={chatInputs.title}
                  onChange={e =>
                    setChatInputs({ ...chatInputs, title: e.target.value })
                  }
                />
              </label>
              <label>
                <input
                  type="text"
                  className="input"
                  name="question"
                  value={chatInputs.question}
                  onChange={e =>
                    setChatInputs({ ...chatInputs, question: e.target.value })
                  }
                />
              </label>
              <button type="submit">Update</button>
            </form>
          )}
        </div>
      );
    });
  };

  return (
    <>{
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
      {renderMessages()}
    </>
  );
};

export default Question;