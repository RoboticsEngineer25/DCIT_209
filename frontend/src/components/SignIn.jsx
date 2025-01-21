import React from 'react';
import {Link} from "react-router";
import Context from '../context/context';
import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
const SignIn = () => {
    const {email,setEmail,password,setPassword} = useContext(Context);
    const navigate=useNavigate();
    console.log(email,password)
    
    const mutation = useMutation({
      mutationFn: async (data) => {
        const response = await fetch("http://localhost:5000/api/auth/login", {
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
        console.log("SignIn error:", error.message);
      },
      onSuccess: (data) => {
        console.log("SignIn successful:", data);
        navigate("/home")
      },
    });
    return (
        <div>
            <form  onSubmit={e => e.preventDefault()}>
                <table className="form" align="center">
                    <tbody>
                    <tr>
                        <th colSpan="2">
                            <img className="logo" src="images/logo.jpg" alt="sphinx logo" />
                        </th>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <br />
                            <br />
                            <br />
                        </td>
                    </tr>
                    <tr>
                        <td width="50%" className="hide">
                            <label htmlFor="email">Email</label>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <input
                                type="email"
                                id="email"
                                style={{ width: '100%' }}
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br />
                        </td>
                    </tr>
                    <tr>
                        <td className="hide">
                            <label htmlFor="password">Password</label>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <input
                                type="password"
                                id="password"
                                style={{ width: '100%' }}
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <center>
                                <a><Link to="/reset-password">Forgot Password?</Link></a>
                            </center>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <br />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <button
                                type="button"
                                value="Continue"
                                style={{ width: '100%', height: '30px' }}
                                onClick={() => mutation.mutate({ email, password })}
                            >Sign Up</button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <center>
                                Don't have an account? <a><Link to="/signup">Sign Up</Link></a>
                            </center>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default SignIn;
