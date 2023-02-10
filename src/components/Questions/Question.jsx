import { useContext, useState } from "react";
import QuestionContext from "../../context/QuestionContext";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";

const Question = ({ data }) => {
  const { users, loggedInUser } = useContext(UserContext);
  const { deleteQuestion, likeQuestion, dislikeQuestion } = useContext(QuestionContext);
   const [, setSelectedQuestion] = useState(null);
  const questionOwner = users.find(user => user.id === data.userId) || {};

  const handleQuestionSelection = (question, title) => {
    setSelectedQuestion({
      question,
      title
    });
  };

  return (
    <>
      <div className="question-container">

        <div className="likedislike-container">
          <div className="like">
            {loggedInUser && (
              <div className="like-dislike">
                <i className="fa fa-thumbs-o-up" onClick={() => likeQuestion(data.id)} />
              </div>)}
            <span className="like">{data.likes} likes</span>
          </div>
          <div className="dislike">
            {loggedInUser && (
              <div className="like-dislike">
                <i className="fa fa-thumbs-o-down" onClick={() => dislikeQuestion(data.id)} />
              </div>
            )}
            <span className="dislike">{data.dislikes} dislikes</span>
          </div>
        </div>

        <div className="right">
          <div className="questionOwner">

            <div className="question-user">
              {questionOwner.avatar && (
                <img src={questionOwner.avatar} alt="avatar" />
              )}
              {questionOwner.userName && <span>{questionOwner.userName}</span>}
            </div>

            <div className="time">
              <p>{data.sortByTime}</p>
            </div>
            {loggedInUser && loggedInUser.id === questionOwner.id && (

              <div className="delete-edit">

                <button onClick={() => deleteQuestion(data.id)}>Delete Question</button>
                <button>

                  <Link to={`/editQuestion/${data.id}`}>Edit Question</Link>
                </button>
              </div>

            )}

          </div>
          <div className="question">
            <h2>{data.title}</h2>
            <div>{data.question}</div>

            {data.isEdited && <p className="edited-message">Edited</p>}
          </div>


          <div className="answers">
          
            <Link to={`/questions/${data.id}`
            }>
              <button onClick={() => handleQuestionSelection(data.question, data.title)}>
                Answers
              </button>
             
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question;