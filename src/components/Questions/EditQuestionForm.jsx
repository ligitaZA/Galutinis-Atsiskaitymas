import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuestionContext from "../../context/QuestionContext";
import UserContext from "../../context/UserContext";


const EditQuestionForm = () => {
  const { id } = useParams();
  const { questionsToShow,editQuestion } = useContext(QuestionContext);
  const { loggedInUser} = useContext(UserContext);

  const currentQuestion = questionsToShow.find(q => q.id.toString() === id)

  const navigation = useNavigate();


  const [questionInputs, setQuestionsInputs] = useState({
    title: currentQuestion.title,
    question: currentQuestion.question,
    userId: loggedInUser.id,
    isEdited: true,
    likes: currentQuestion.likes,
    dislikes: currentQuestion.dislikes,
    sortByTime: currentQuestion.sortByTime
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    editQuestion(id, questionInputs);
    navigation('/');
  }

  return (
    <>
      <div className="questionForm">
      <div className="edit">
        <form onSubmit={handleSubmit}>
          <label>
            Heading:
            <input 
            type="text" 
            name="title"
              value={questionInputs.title}
              onChange={(e) => setQuestionsInputs({ ...questionInputs, title: e.target.value })}
            />
          </label>
          <label>
            Content:
            <textarea 
            type="text" 
            name="question"
              value={questionInputs.question}
              onChange={(e) => setQuestionsInputs({ ...questionInputs, question: e.target.value })}
            />
          </label>
          <button type="submit" className="button" value="">Edit Question</button>
        </form>
      </div>
        
      </div>
    </>);
}

export default EditQuestionForm;