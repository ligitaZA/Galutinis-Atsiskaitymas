import { useContext, useState } from "react";
import QuestionContext from "../../context/QuestionContext";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";

const Question = ({ data }) => {
  const { users, loggedInUser } = useContext(UserContext);
  const { deleteQuestion, likeQuestion, dislikeQuestion } = useContext(QuestionContext);
  const [, setSelectedQuestion] = useState(null);
  const [userLikes, setUserLikes] = useState([]);
  const [userDislikes, setUserDislikes] = useState([]);
  const questionOwner = users.find(user => user.id === data.userId) || {};



  const handleQuestionSelection = (question, title) => {
    setSelectedQuestion({
      question,
      title
    });
  };

  const handleLike = id => {
    if (userLikes.includes(loggedInUser.id)) return;
    setUserLikes([...userLikes, loggedInUser.id]);
    likeQuestion(id);
  };

  const handleDislike = id => {
    if (userDislikes.includes(loggedInUser.id)) return;
    setUserDislikes([...userDislikes, loggedInUser.id]);
    dislikeQuestion(id);
  };

  return (
    <>
      <div className="question-container">



        <div className="right">
          <div className="questionOwner">

            <div className="question-user">
              {questionOwner.avatar && (
                <img src={questionOwner.avatar} alt="avatar" />
              )}
              {questionOwner.userName && <span>{questionOwner.userName}</span>}
            </div>


            {loggedInUser && loggedInUser.id === questionOwner.id && (
              <div className="delete-edit">
                <button><Link to={`/editQuestion/${data.id}`}>Edit Question</Link>
                </button>
                <button onClick={() => deleteQuestion(data.id)}>Delete Question</button>
              </div>
            )}

          </div>
          <div className="question">
            <div className="title">
              <h3>{data.title}</h3>
              <p>{data.sortByTime}</p>
            </div>
            <div className="post-question">{data.question}</div>

            {data.isEdited && <p className="edited-message">Edited</p>}
          </div>


          <div className="answers">
<div className="likedislike-container">
              <div className="like">
                {loggedInUser && (
                  <div className="like-dislike">
                    <i className="fa fa-thumbs-o-up" onClick={() => handleLike(data.id)} />
                  </div>
                )}
                <span className="like">{data.likes} likes</span>
              </div>
              <div className="dislike">
                {loggedInUser && (
                  <div className="like-dislike">
                    <i className="fa fa-thumbs-o-down" onClick={() => handleDislike(data.id)} />
                  </div>
                )}
                <span className="dislike">{data.dislikes} dislikes</span>
              </div>
            </div>
            <Link to={`/questions/${data.id}`
            }>
              <button onClick={() => handleQuestionSelection(data.question, data.title)}>
                See answers
              </button>
            </Link>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Question;