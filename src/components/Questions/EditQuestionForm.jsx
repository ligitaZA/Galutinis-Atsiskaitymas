import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuestionContext from "../../context/QuestionContext";
import UserContext from "../../context/UserContext";


const EditQuestionForm = () => {
  const { id } = useParams();
  const { questions, editQuestion } = useContext(QuestionContext);
  const { loggedInUser} = useContext(UserContext);

  const currentQuestion = questions.find(q => q.id.toString() === id)

  const navigation = useNavigate();

  const [questionInputs, setQuestionsInputs] = useState({
    title: currentQuestion.title,
    question: currentQuestion.question,
    userId: loggedInUser.id,
    isEdited: true
  });

  const handleSubmit = e => {
    e.preventDefault();

    editQuestion(id, questionInputs);

    navigation('/');
  }

  return (
    <>
      <div className="questionForm">
      {questionInputs.isEdited && <p className="edited-message">Edited</p>}
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
            <input 
            type="text" 
            name="question"
              value={questionInputs.question}
              onChange={(e) => setQuestionsInputs({ ...questionInputs, question: e.target.value })}
            />
          </label>
          <input type="submit" value="Edit Question" />
        </form>
      </div>
    </>);
}

export default EditQuestionForm;