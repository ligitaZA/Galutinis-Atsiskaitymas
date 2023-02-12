import UserContext from "../../context/UserContext";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const [formInputs] = useState({
    userName: '',
    password: '',
    passwordRepeat: '',
    avatar: ''
  });
  const [invalidUsername, setInvalidUsername] = useState(false);

  const { users, addNewUser, setLoggedInUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (users.find(user => user.userName === values.userName)) {
        setInvalidUsername(true);
      } else {
        let newUser = {
          ...values,
          id: Date.now()
        };
        const response = await fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        });
        const data = await response.json();
        console.log(data);
        addNewUser(newUser);
        setLoggedInUser(newUser);
        navigate('/');
        setSubmitting(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const validationSchema = Yup.object({
    userName: Yup.string()
      .required('User name is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 symbols length.')
      .required('Password is required'),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password repeat is required'),
    avatar: Yup.string()
      .url('Must be a valid url')
  })
  return (
    <>
      <div className="register">
        <h2>Register</h2>
        <div className="register-form">
          {invalidUsername && <div className="error-message">This username is already taken, please choose a different one</div>}
        <Formik
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => handleSubmit(values, { setSubmitting, resetForm })}
          initialValues={formInputs}
        >
          {({ errors, touched }) => (
            <Form>
              <label>
                User name:
                <Field
                  name="userName"
                  type="text" />
                {errors.userName && touched.userName ? (
                  <div>{errors.userName}</div>
                ) : null}

              </label>
              <label>
                Password:
                <Field
                  name="password"
                  type="password" />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
              </label>
              <label>
                Repeat Password:
                <Field
                  name="passwordRepeat"
                  type="password" />
                {errors.passwordRepeat && touched.passwordRepeat ? (
                  <div>{errors.passwordRepeat}</div>
                ) : null}
              </label>
              <label>
                User picture:
                <Field
                  name="avatar"
                  type="url" />
                {errors.avatar && touched.avatar ? (
                  <div>{errors.avatar}</div>
                ) : null}
              </label>
              <button type="submit">Register</button>
            </Form>
          )}
        </Formik>
        </div>

        
      </div>

    </>
  );
}

export default Register;