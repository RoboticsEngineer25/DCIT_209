import React, { useContext } from 'react';
import {Link, useNavigate} from "react-router";
import Context from "../context/context.jsx"
import {useMutation} from "@tanstack/react-query"
const SignUp = () => {
 const {
   email,
   setEmail,
   password,
   setPassword,
   firstName,
   setFirstName,
   lastName,
   setLastName,
   phoneNumber,
   setPhoneNumber,
   gender,
   setGender,
   birthDate,
   setBirthDate,
 } = useContext(Context);
 console.log(email,lastName,firstName,password,phoneNumber,birthDate);
 const navigate=useNavigate();
 const mutation = useMutation({
  mutationFn: async (data) => {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Something went wrong");
    }
    return result;
  },
  onError: (error) => {
    console.error("Signup error:", error.message);
  },
  onSuccess: (data) => {
    console.log("Signup successful:", data);
    navigate("/")

  },
});

 
    return (
      <div>
        <div>
          <table className="form" align="center">
            <tbody>
              <tr>
                <th colSpan="2">
                  <img
                    src="images/logo.jpg"
                    alt="sphinx logo"
                    className="logo"
                  />
                </th>
              </tr>
              <tr>
                <td colSpan="2">Create Account</td>
              </tr>
              <tr>
                <td colSpan="2">
                  <label htmlFor="email">Email</label>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input type="checkbox" id="news" />
                  <label htmlFor="news"> Receive Newsletters?</label>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <label htmlFor="1pword">Password</label>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input
                    type="password"
                    placeholder="Create a password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <label htmlFor="2pword">Confirm Password</label>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input
                    type="password"
                    id="2pword"
                    placeholder="Confirm your password"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <br />
                </td>
              </tr>
              <tr>
                <td colSpan="2">Personal Information</td>
              </tr>
              <tr>
                <td colSpan="2">
                  <label htmlFor="fname">First Name</label>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input
                    type="text"
                    id="fname"
                    placeholder="Enter your first name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <label htmlFor="lname">Last Name (Optional)</label>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input
                    type="text"
                    id="lname"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="telpre">Prefix</label>
                </td>
                <td>
                  <label htmlFor="telno">Phone Number</label>
                </td>
              </tr>
              <tr>
                <td>
                  <select name="country" id="telpre">
                    <option value="+233">+233</option>
                    <option value="+1">+1</option>
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    id="telno"
                    max={10}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="gender">Gender</label>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <select name="gender" id="gender" style={{ width: "100%" }}>
                    <option value="Male"onClick={(e)=>{setGender("male")}}>Male</option>
                    <option value="Female" onClick={setGender("female")}>Female</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <label htmlFor="bdate">Birth Date</label>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input
                    type="date"
                    id="bdate"
                    style={{ width: "100%" }}
                    required
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button
                    type="button"
                    value="Sign Up"
                    style={{ width: "100%", height: "30px" }}
                    onClick={() => {
                      console.log({
                        email,
                        firstName,
                        lastName,
                        password,
                        phoneNumber,
                        gender,
                        birthDate,
                      });
                      mutation.mutate({
                        email,
                        firstName,
                        lastName,
                        password,
                        phoneNumber,
                        gender,
                        birthDate,
                      });
                    }}
                  >
                    Sign Up
                  </button>
                </td>
              </tr>
              <tr>
                <td colSpan="2" align="center">
                  <input type="checkbox" id="tnc" />
                  <label htmlFor="tnc">
                    {" "}
                    I agree to all <a href="#">Terms and Conditions</a>
                  </label>
                </td>
              </tr>
              <tr>
                <td colSpan="2" align="center">
                  Already have an account?{" "}
                  <a>
                    <Link to="/">Sign In</Link>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default SignUp;
