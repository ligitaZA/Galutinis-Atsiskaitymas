import { useContext, useState } from "react";
import QuestionContext from "../../context/QuestionContext";
import Question from './Question'

const Questions = () => {
  const { questions } = useContext(QuestionContext);

  const [questionContent] = useState("all");
  const [questionSort, setQuestionSort] = useState("asc");

  

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
  return (
    <>

      <div className="filter-container">
        
        <label>Sort:</label>
        <select
          id="post-sort"
          value={questionSort} onChange={handleSortChange}>
          <option value="asc">Oldest</option>
          <option value="desc">Newest</option>
        </select>
      </div>
      <div className="questions-container">
        {sortQuestions.map(question => (
          <Question
            key={question.id}
            data={question}
            questionContent={questionContent} />
        ))}
      </div>
    </>
  );
}

export default Questions;