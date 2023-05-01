import React, { useState, useEffect } from "react";
import { compose } from "redux";
import { Link } from "react-router-dom";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import {
  required,
  maxLength20,
  minLength8,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
} from "../../helpers/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { login } from "../../slices/auth";
import { clearMessage } from "../../slices/message";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";


const SignInForm = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue) => {
    const { username, password } = formValue;
    setLoading(true);

    dispatch(login({ username, password }))
      .unwrap()
      .then((res) => {
        if (res.status === 200) {
          navigate("/");
          window.location.reload();
        } else {
          alert("Login failed!")
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field name="email" type="text" className="form-control" />
            <ErrorMessage
              name="email"
              component="div"
              className="alert alert-danger"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" className="form-control" />
            <ErrorMessage
              name="password"
              component="div"
              className="alert alert-danger"
            />
          </div>

          <div className="form-group mt-3">
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>
        </Form>
      </Formik>
      <Link className="float-start mt-2" to="/account/signup" title="Sign Up">
        Create your account
      </Link>
      {/* <Link
        className="float-end"
        to="/account/forgotpassword"
        title="Forgot Password"
      >
        Forgot password?
      </Link> */}
      <div className="clearfix"></div>
      <hr></hr>
      <div className="row">
        <div className="col- text-center">
          <p className="text-muted small">Or you can join with</p>
        </div>
        <div className="col- text-center">
          <Link to="/" className="btn btn-light text-white bg-twitter me-3">
            <FontAwesomeIcon icon={faTwitter} />
          </Link>
          <Link to="/" className="btn btn-light text-white me-3 bg-facebook">
            <FontAwesomeIcon icon={faFacebookF} className="mx-1" />
          </Link>
          <Link to="/" className="btn btn-light text-white me-3 bg-google">
            <FontAwesomeIcon icon={faGoogle} className="mx-1" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignInForm;


// import React, { useState, useEffect  } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate, useNavigate } from "react-router-dom";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";

// import { login } from "../slices/auth";
// import { clearMessage } from "../slices/message";

// const Login = () => {
//   let navigate = useNavigate();

//   const [loading, setLoading] = useState(false);

//   const { isLoggedIn } = useSelector((state) => state.auth);
//   const { message } = useSelector((state) => state.message);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(clearMessage());
//   }, [dispatch]);

//   const initialValues = {
//     username: "",
//     password: "",
//   };

//   const validationSchema = Yup.object().shape({
//     username: Yup.string().required("This field is required!"),
//     password: Yup.string().required("This field is required!"),
//   });

//   const handleLogin = (formValue) => {
//     const { username, password } = formValue;
//     setLoading(true);

//     dispatch(login({ username, password }))
//       .unwrap()
//       .then(() => {
//         navigate("/profile");
//         window.location.reload();
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   };

//   if (isLoggedIn) {
//     return <Navigate to="/profile" />;
//   }

//   return (
//     <div className="col-md-12 login-form">
//       <div className="card card-container">
//         <img
//           src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//           alt="profile-img"
//           className="profile-img-card"
//         />
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleLogin}
//         >
//           <Form>
//             <div className="form-group">
//               <label htmlFor="username">Username</label>
//               <Field name="username" type="text" className="form-control" />
//               <ErrorMessage
//                 name="username"
//                 component="div"
//                 className="alert alert-danger"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <Field name="password" type="password" className="form-control" />
//               <ErrorMessage
//                 name="password"
//                 component="div"
//                 className="alert alert-danger"
//               />
//             </div>

//             <div className="form-group">
//               <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
//                 {loading && (
//                   <span className="spinner-border spinner-border-sm"></span>
//                 )}
//                 <span>Login</span>
//               </button>
//             </div>
//           </Form>
//         </Formik>
//       </div>

//       {message && (
//         <div className="form-group">
//           <div className="alert alert-danger" role="alert">
//             {message}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;
