// import { useState} from "react";


// const EditAnswer = ({ data, setIsEditing, onUpdate }) => {
//   const [formInputs, setFormInputs] = useState({
//     answer: data.answer,
//   });

//   const handleSubmit = event => {
//     event.preventDefault();
//     onUpdate(data.id, { answer: formInputs.answer });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <textarea type="text" value={formInputs.answer} onChange={e => setFormInputs({ ...formInputs, answer: e.target.value })} />
//       <button type="submit">Save</button>
//       <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
//     </form>
//   );
// };
// export default EditAnswer;