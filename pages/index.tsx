import React, { useRef, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { loginUser } from '../store/redux/authThunks';
import { useRouter } from 'next/router';
const Index = () => {
const dispatch = useDispatch();
const { credentials, error } = useSelector((state: RootState) => state.login);
console.log(credentials,"credentialscredentialscredentials");

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSignUp = async () => {
    setIsLoading(true);
    setErrors(null);
    console.log(formData, "formData");

    try {
      // Perform input validation here if needed

      // Make API request to register the user
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(response, "responseresponse");


      if (!response.ok) {
        throw new Error('Failed to register user');
      }
      setSuccess('User registered successfully');
      setFormData({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
      })
      // Registration successful, you can navigate to another page or show a success message
      console.log('User registered successfully');
    } catch (error: any) {
      setErrors(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const router = useRouter();
  const onChangeHandler = (e:any) => {
    const { name, value } = e.target;
    setLoginFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(loginFormData);

    try {
      // Dispatch login action
      const loggedIn = await dispatch(loginUser(loginFormData)as any);
      console.log(  loggedIn.meta.requestStatus,"loggedIn");
      if(loggedIn.meta.requestStatus === "fulfilled"){
        router.push('/home');
      }else{
        console.log(error,"error");
        
      }
      
    } catch (error) {
      // Handle errors
      console.error('An error occurred while logging in:', error);
    }
  };
  
  const contFormsRef = useRef<HTMLDivElement>(null);
  const formLoginRef = useRef<HTMLDivElement>(null);
  const formSignUpRef = useRef<HTMLDivElement>(null);

  const timeToShowLogin = 400;
  const timeToHiddenLogin = 200;
  const timeToShowSignUp = 100;
  const timeToHiddenSignUp = 400;
  const timeToHiddenAll = 500;

  function changeToLogin() {
    console.log(contFormsRef, "contFormsRef");
    if (contFormsRef.current) {
      contFormsRef.current.classList.remove("cont_forms_active_sign_up");
    }
    if (contFormsRef.current) {
      contFormsRef.current.classList.add("cont_forms_active_login");
    }
    if (formLoginRef.current) {
      formLoginRef.current.style.display = "block";
    }
    if (formSignUpRef.current) {
      formSignUpRef.current.style.opacity = "0";
    }

    setTimeout(function () {
      if (formLoginRef.current) {
        formLoginRef.current.style.opacity = "1";
      }
    }, timeToShowLogin);

    setTimeout(function () {
      if (formSignUpRef.current) {
        formSignUpRef.current.style.display = "none";
      }
    }, timeToHiddenLogin);
  }

  function changeToSignUp() {
    console.log(contFormsRef, "contFormsRef");
    if (contFormsRef.current) {
      contFormsRef.current.classList.remove("cont_forms_active_login");
    }

    if (contFormsRef.current) {
      contFormsRef.current.classList.add("cont_forms_active_sign_up");
    }
    if (formSignUpRef.current) {
      formSignUpRef.current.style.display = "block";
    }
    if (formLoginRef.current) {
      formLoginRef.current.style.opacity = "0";
    }

    setTimeout(function () {
      if (formSignUpRef.current) {
        formSignUpRef.current.style.opacity = "1";
      }
    }, timeToShowSignUp);

    setTimeout(function () {
      if (formLoginRef.current) {
        formLoginRef.current.style.display = "none";
      }
    }, timeToHiddenSignUp);
  }

  function hiddenLoginAndSignUp() {
    setSuccess("");
    setErrors("");
    if (contFormsRef.current) {
      contFormsRef.current.classList.remove("cont_forms_active_login", "cont_forms_active_sign_up");
    }
    if (formSignUpRef.current) {
      formSignUpRef.current.style.opacity = "0";
    }
    if (formLoginRef.current) {
      formLoginRef.current.style.opacity = "0";
    }

    setTimeout(function () {
      if (formSignUpRef.current) {
        formSignUpRef.current.style.display = "none";
      }
      if (formLoginRef.current) {
        formLoginRef.current.style.display = "none";
      }
    }, timeToHiddenAll);
  }

  return (
    <div className="cotn_principal">

      <div className="cont_centrar">
        <div className="cont_login">
          <div className="cont_info_log_sign_up">
            <div className="col_md_login">
              <div className="cont_ba_opcitiy">
                <h2>LOGIN</h2>
                <p>Hey Whatsup !! You can login  Your Profile.</p>
                <button className="btn_login" onClick={changeToLogin}>
                  LOGIN
                </button>
              </div>
            </div>
            <div className="col_md_sign_up">
              <div className="cont_ba_opcitiy">
                <h2>SIGN UP</h2>
                <p>Register yourself and connected with us.</p>
                <button className="btn_sign_up" onClick={changeToSignUp}>
                  SIGN UP
                </button>
              </div>
            </div>
          </div>
          <div className="cont_back_info">
            <div className="cont_img_back_grey">
              <img
                src="https://images.unsplash.com/42/U7Fc1sy5SCUDIu4tlJY3_NY_by_PhilippHenzler_philmotion.de.jpg?ixlib=rb-0.3.5&q=50&fm=jpg&crop=entropy&s=7686972873678f32efaf2cd79671673d"
                alt=""
              />
            </div>
          </div>
          <div className="cont_forms" ref={contFormsRef}>

            <div ref={formLoginRef} className="cont_form_login" style={{ display: "none" }}>
              <a href="#" onClick={hiddenLoginAndSignUp}>
                <ArrowBackIcon />
              </a>
              <h2>LOGIN</h2>
              <input type="text" placeholder="Email" name="email" value={loginFormData.email} onChange={onChangeHandler} />
              <input type="password" placeholder="Password" name="password" value={loginFormData.password} onChange={onChangeHandler} />
              <button className="btn_login" onClick={handleSubmit}>
                LOGIN
              </button>
            </div>
            <div ref={formSignUpRef} className="cont_form_sign_up" style={{ display: "none" }}>
              <a href="#" onClick={hiddenLoginAndSignUp}>
                <ArrowBackIcon /></a>
              <h2>SIGN UP</h2>
              {success && <p className="success-message">{success}</p>}
              {errors && <p className="error-message">{errors}</p>}
              <input type="text" placeholder="Email" name="email" value={formData.email}
                onChange={handleChange} />
              <input type="text" placeholder="User" name="username" value={formData.username}
                onChange={handleChange} />
              <input type="password" placeholder="Password" name="password" value={formData.password}
                onChange={handleChange} />
              <input type="password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword}
                onChange={handleChange} />
              <button className="btn_sign_up" onClick={handleSignUp} disabled={isLoading}>
                {isLoading ? 'Signing up...' : 'SIGN UP'}
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
