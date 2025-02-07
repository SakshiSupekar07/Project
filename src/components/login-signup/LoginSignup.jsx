// import React from 'react'
// import { useState } from 'react'
// import './LoginSignup.css'
// import user_icon from '/person.png'
// import email_icon from '/email.png'
// import password_icon from '/password.png'
// import phone_icon from '/phone.svg'
// import date_icon from '/dob.svg'
// // import index from './index.css'

// const LoginSignup = () => {
//     const [action,setAction]=useState("Login");


   
//   return (
//     <div className='container'>
//         <div className="header">
//             <div className="text">{action}</div>
//             <div className="underline"></div>
//         </div>
//         <div className="inputs">
//             {action==="Login"? <div></div>:  <div className="input">
//                 <img src={user_icon} alt=""/>
//                 <input type="text" placeholder='Name'/>
              
               
//             </div>}
            
            


//             <div className="input">
//                 <img src={email_icon} alt=""/>
//                 <input type="email" placeholder='Email Id'/>
//             </div>

//             <div className="input">
//                 <img src={password_icon} alt=""/>
//                 <input type="password" placeholder='Password'/>
//             </div>
//             {action==="Sign Up" &&(
//                 <>
           
           

           
//          <div className="input">
//                 <img src={password_icon} alt=""/>
//                 <input type="password" placeholder='Confirm password'/>
//             </div>
//             <div className="input">
//                 <img src={phone_icon} alt=""/>
//                 <input type="text" placeholder='Phone number'/>
//             </div>
//             <div className="input">
//                 <img src={date_icon} alt=""/>
//                 <input type="date" />
//             </div>

//             </>
//             )}
           

            
//         </div>
//         {action=="Sign Up"? <div></div>:  <div className="forget-password"> Forget Password<span>Click here</span></div> }

      
//         <div className="submit-container">
//             <div className={action==="Login" ?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>SignUp</div>
//             <div className={action==="Sign Up"?"submit gray":"submit"}onClick={()=>{setAction("Login")}}>Login</div>
//         </div>

      
//     </div>
//   );
// }

// export default LoginSignup;



import React, { useState } from 'react';
import './LoginSignup.css';
import user_icon from '/person.png';
import email_icon from '/email.png';
import password_icon from '/password.png';
import phone_icon from '/phone.svg';
import date_icon from '/dob.svg';

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Email Validation Regex
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Phone Number Validation (10 digits)
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  // Validation Logic (Combined)
  const handleAction = () => {
    if (action === "Login") {
      if (!email || !password) {
        setErrorMessage("Please fill in all fields.");
        return;
      }
      if (!validateEmail(email)) {
        setErrorMessage("Invalid email address.");
        return;
      }
      if (password.length < 6) {
        setErrorMessage("Incorrect password. Must be at least 6 characters.");
        return;
      }
      setErrorMessage(""); // Clear errors if valid
      alert("Login successful! ✅"); // Dummy success
    } else {
      if (!name || !email || !password || !confirmPassword || !phone || !dob) {
        setErrorMessage("Please fill in all fields.");
        return;
      }
      if (!validateEmail(email)) {
        setErrorMessage("Invalid email address.");
        return;
      }
      if (password.length < 6) {
        setErrorMessage("Password must be at least 6 characters.");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }
      if (!validatePhone(phone)) {
        setErrorMessage("Invalid phone number. Must be 10 digits.");
        return;
      }
      setErrorMessage(""); // Clear errors if valid
      alert("Signup successful! 🎉"); // Dummy success
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {action === "Sign Up" && (
          <div className="input">
            <img src={user_icon} alt="user icon" />
            <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="email icon" />
          <input type="email" placeholder='Email Id' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="input">
          <img src={password_icon} alt="password icon" />
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {action === "Sign Up" && (
          <>
            <div className="input">
              <img src={password_icon} alt="password icon" />
              <input type="password" placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className="input">
              <img src={phone_icon} alt="phone icon" />
              <input type="text" placeholder='Phone number' value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="input">
              <img src={date_icon} alt="date icon" />
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
            </div>
          </>
        )}
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {action === "Login" && (
        <div className="forget-password">
          Forget Password? <span>Click here</span>
        </div>
      )}

      <div className="submit-container">
        <div
          className="submit"
          onClick={() => { setAction("Sign Up"); setErrorMessage(""); }}>
          Sign Up
        </div>
        <div
          className="submit"
          onClick={() => { setAction("Login"); setErrorMessage(""); }}>
          Login
        </div>
      </div>

      {/* Removed extra button. Login and Sign Up buttons now handle validation */}
      <div className="submit" onClick={handleAction}>
        {action}
      </div>
    </div>
  );
};

export default LoginSignup;
