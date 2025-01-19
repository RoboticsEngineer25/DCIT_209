import React from 'react';
import {Link} from "react-router";

const SignIn = () => {
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
                            <input
                                type="submit"
                                value="Continue"
                                style={{ width: '100%', height: '30px' }}
                            />
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
