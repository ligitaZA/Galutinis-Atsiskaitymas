import { useContext, useState } from "react";
import AnswerContext from "../../context/AnswerContext";
import QuestionContext from "../../context/QuestionContext";
import Question from './Question';

const Questions = () => {
  const { questions, setQuestionsToShow, questionsToShow } = useContext(QuestionContext);
  const [questionSort, setQuestionSort] = useState("sort");
  const { answers } = useContext(AnswerContext)

  const sortQuestions = () => {
    const sortedQuestions = [...questions].sort((a, b) => {
      if (questionSort === "sort") {
        return new Date(a.sortByTime) - new Date(b.sortByTime);
      } else {
        return new Date(b.sortByTime) - new Date(a.sortByTime);
      }
    });
    setQuestionsToShow(sortedQuestions);
  };
  
  const handleSortChange = (e) => {
    setQuestionSort(e.target.value);
    sortQuestions();
  };


  const answeredQuestions = () => {
    const answered = questions.filter(question => {
      return answers.some(answer => parseInt(answer.postId) === question.id);
    });
    setQuestionsToShow(answered);
  };

  const unansweredQuestions = () => {
    const unanswered = questions.filter(question => {
      return !answers.some(answer => parseInt(answer.postId) === question.id);
    });
    setQuestionsToShow(unanswered);
  };

  const showAllQuestions = () => {
    setQuestionsToShow(sortQuestions);
  };

  return (
    <>
      <div className="filter-container">
        <div className="buttons">
          <p>Filter by :</p>
        <button onClick={showAllQuestions}> Show All</button>
        <button onClick={answeredQuestions}>Answered</button>
        <button onClick={unansweredQuestions}>No Answer</button>
        </div>
        <div className="sorting">
          <label>Sort:</label>
        <select
          id="post-sort"
          value={questionSort} onChange={handleSortChange}>
          <option value="sort">Oldest</option>
          <option value="desc">Newest</option>
        </select>
        </div>
        
      </div>
      <div className="questions-container">
        {
          questionsToShow.length ?
            questionsToShow.map(question => (
              <Question
                key={question.id}
                data={question}
                questionsToShow={questionsToShow} />
            )) :
            questionsToShow ? <p>Filter available questions</p> : <p>Loading...</p>
        }
      </div>
    </>
  );
};

export default Questions;