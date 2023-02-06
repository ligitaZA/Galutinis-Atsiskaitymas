import UserContext from "../../context/UserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const LogIn = () => {
  const [failedLogIn, setFailedLogIn] = useState(false);
  const navigate = useNavigate();
  const { users, setLoggedInUser } = useContext(UserContext);

  const handleSubmit = async (values, setSubmitting) => {
    const loggedInUser = users.find(user => user.email === values.email && user.password === values.password);
    if (loggedInUser) {
      setLoggedInUser(loggedInUser);
      navigate('/')
    } else {
      setFailedLogIn(true);
    }
    setSubmitting(false);
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Username is required'),
    password: Yup.string()
      .required('Password is required')
  });

  return (
    <>
      <div className="logIn">
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}       >

          {({ errors, touched, values, setValues, isSubmitting }) => (
            <Form>
              <div>
                <h1>Log In</h1>
                <label>Email:
                  <Field
                    name='email'
                    value={values.email}
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                  />
                  {
                    errors.email && touched.email ?
                      <span>{errors.email}</span>
                      : null
                  }
                </label>
              </div>
              <div>
                <label>Password:
                  <Field
                    name='password'
                    type='password'
                    value={values.password}
                    onChange={(e) => setValues({ ...values, password: e.target.value })}
                  />
                  {
                    errors.password && touched.password ?
                      <span>{errors.password}</span>
                      : null
                  }
                </label>
              </div>
              <button type="submit" disabled={isSubmitting}>
                Log In
              </button>
              {
                failedLogIn && <span>Wrong log in info</span>
              }
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default LogIn;