// // import { useContext } from "react";
// // import UserContext from "../../context/UserContext";
// // import QuestionContext from "../../context/QuestionContext";
// // import Answer from "./Answer";

// // const Answers = () => {
// //   const { questions, id } = useContext(QuestionContext);
// //   const { users } = useContext(UserContext);

// //   const selectedQuestion = questions.find(question => question.id.toString() === id);
// //   const questionAnswers = selectedQuestion.answers;
  
// //   return (
// //     <>
// //       <div>
// //         <h2>{selectedQuestion.title}</h2>
// //         <p>{selectedQuestion.question}</p>
// //       </div>
// //       {questionAnswers.map(answer => {
// //         const answerOwner = users.find(user => user.id === answer.userId);
// //         return (
// //           <Answer
// //             key={answer.id}
// //             data={answer}
// //             owner={answerOwner}
// //           />
// //         );
// //       })}
// //     </>
// //   );
// // };

// // export default Answers;
// import AnswerContext from "../../context/AnswerContext";
// import { useContext } from "react";
// import Answer from "./Answer";

// const Answers = () => {

//   const { answers } = useContext(AnswerContext);
 

//   return (
//     <>
    
//     <div className="AnswersCardsWrapper">
//         {answers ?
//           answers.map((answer, index) => 
//             <Answer 
//               key={answer.id || index}
//               data={answer}
//             />  
//           )
//           :
//           <p>Loading...</p>
//         }
//       </div>
//     </>
//   );
// }
 
// export default Answers;