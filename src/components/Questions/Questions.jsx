import { useContext, useState } from "react";
import AnswerContext from "../../context/AnswerContext";
import QuestionContext from "../../context/QuestionContext";
import Question from './Question'

const Questions = () => {
  const { questions } = useContext(QuestionContext);
  const [questionsToShow, setQuestionsToShow] = useState([]);
  const [questionSort, setQuestionSort] = useState("asc");
  const { answers } = useContext(AnswerContext)

  const handleSortChange = (e) => {
    setQuestionSort(e.target.value);
  };

  const sortQuestions = questions.sort((a, b) => {
    if (questionSort === "asc") {
      return new Date(a.sortByTime) - new Date(b.sortByTime);
    } else {
      return new Date(b.sortByTime) - new Date(a.sortByTime);
    }
  });

  const answeredQuestions = () => {
    const answered = questions.filter(question => {
      return answers.some(answer => answer.postId === question.id.toString());
    });
    setQuestionsToShow(answered);
  };

  const unansweredQuestions = () => {
    const unanswered = questions.filter(question => {
      return !answers.some(answer => answer.postId === question.id.toString());
    });

    setQuestionsToShow(unanswered);
  };
  const showAllQuestions = () => {
    setQuestionsToShow(sortQuestions);
  };
  return (
    <>
      <div className="filter-container">
        <p>Filter by :</p>
        <button onClick={showAllQuestions}> Show All</button>
        <button onClick={answeredQuestions}>Answered</button>
        <button onClick={unansweredQuestions}>No Answer</button>
      </div>

      <label>Sort:</label>
      <select
        id="post-sort"
        value={questionSort} onChange={handleSortChange}>
        <option value="asc">Oldest</option>
        <option value="desc">Newest</option>
      </select>
      <div className="questions-container">
        {
          questionsToShow.length ?
            questionsToShow.map(question => (
              <Question
                key={question.id}
                data={question}/>
            )) :
            questionsToShow ? <p>Filter available questions</p> : <p>Loading...</p>
        }
      </div>
    </>
  );
};


export default Questions;