import { useContext, useState, useEffect } from "react";
import AnswerContext from "../../context/AnswerContext";
import UserContext from "../../context/UserContext";
import QuestionContext from "../../context/QuestionContext";
import { useParams } from "react-router-dom";

const Answer = () => {
  const { id } = useParams();

  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState('');

  const [questionAnswers, setQuestionAnswers] = useState([]);
  const { users, loggedInUser } = useContext(UserContext);
  const { answers, setAnswers, addAnswer, deleteAnswer, likeAnswer, dislikeAnswer, editAnswer } = useContext(AnswerContext);
  const { questions } = useContext(QuestionContext)
  const [userLikes, setUserLikes] = useState([]);
   const [userDislikes, setUserDislikes] = useState([]);

  const selectedQuestion = questions.find(question => question.id.toString() === id);

  useEffect(() => {
    const questionAnswers = answers.filter(answer => answer.postId === id);
    setQuestionAnswers(questionAnswers);
  }, [answers, id]);

  useEffect(() => {
    setQuestionAnswers(answers.filter(answer => answer.postId === id));
  }, [answers, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target[0].value) return;
    const newAnswer = {
      postId: id,
      userId: loggedInUser.id,
      content: e.target[0].value,
      id: Date.now(),
      edited: false,
      likes: 0,
      dislikes: 0
    };
    addAnswer(newAnswer);
    e.target[0].value = '';
  };

  const handleEdit = (answer) => {
    setEditingAnswerId(answer.id);
    setIsEditing(true);
    setEditedAnswer(answer.content);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const answer = answers.find(answer => answer.id === editingAnswerId);
    const updatedAnswers = {
      id: editingAnswerId,
      postId: id,
      userId: loggedInUser.id,
      edited: true,
      content: editedAnswer,
      likes: answer.likes,
      dislikes: answer.dislikes
    }
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.id.toString() === editingAnswerId ? { ...answer, ...updatedAnswers } : answer
      )
    );
    setIsEditing(false);
    editAnswer(editingAnswerId, updatedAnswers);
  };
  const handleLike = id => {
    if (userLikes.includes(loggedInUser.id)) return;
    setUserLikes([...userLikes, loggedInUser.id]);
    likeAnswer(id);
  };

  const handleDislike = id => {
    if (userDislikes.includes(loggedInUser.id)) return;
    setUserDislikes([...userDislikes, loggedInUser.id]);
    dislikeAnswer(id);
  };

  return (
    <>
      <div>
        <h2>{selectedQuestion.title}</h2>
        <p>{selectedQuestion.question}</p>
      </div>
      <div className="post-answers">
        {
          questionAnswers.map(answer => {
            const answerOwner = users.find(user => user.id === answer.userId);
            return (
              <div key={answer.id} className="answer">
                <div className="answerUser">
                  {
                    answerOwner && (
                      <img src={answerOwner.avatar} alt="user avatar" />)
                  }

                  <div className="name">
                    {answerOwner && (<span>{answerOwner.userName}</span>)}
                  </div>
                  {
                    loggedInUser && loggedInUser.id === answerOwner.id &&
                    <>
                      <div className="buttons">
                        <button onClick={() => deleteAnswer(answer.id)}>Delete Answer</button>
                        <button onClick={() => handleEdit(answer)}>Edit Answer</button>
                      </div>
                    </>
                  }
                </div>
                <div className="edited">
                  {answer.edited && <p>Edited</p>}
                </div>
                {
                  isEditing && answer.id === editingAnswerId ? (
                    <form onSubmit={(e) => handleUpdate(e)}>
                      <input
                        type="text"
                        value={editedAnswer}
                        onChange={(e) => setEditedAnswer(e.target.value)} />
                      <button type="submit">Update</button>
                    </form>
                  ) : (
                    <div className="content">
                      <p>{answer.content}</p>
                    </div>
                  )}
                <div className="likeddislikedAnswers">
                  <div className="likedAnswer">
                    {
                      loggedInUser && (
                        <i className="fa fa-thumbs-o-up" onClick={() => handleLike(answer.id)}></i>
                      )
                    }
                    <span>{answer.likes} likes</span>
                  </div>

                  <div className="dislikedAnswer">
                    {
                      loggedInUser && (
                        <i className="fa fa-thumbs-o-down" onClick={() => handleDislike(answer.id)}></i>
                      )
                    }
                    <span>{answer.dislikes} dislikes</span>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      {
        loggedInUser && (

          <form className="post-answer-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Your answer" />
            <button type="submit">Submit</button>
          </form>
        )
      }

    </>
  );
};

export default Answer;