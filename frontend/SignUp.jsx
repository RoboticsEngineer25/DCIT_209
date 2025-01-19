import React from 'react';
import {Link} from "react-router";

const SignUp = () => {
    return (
        <div>
            <form action="index.html">
                <table className="form" align="center">
                    <tbody>
                    <tr>
                        <th colSpan="2">
                            <img src="images/logo.jpg" alt="sphinx logo" className="logo" />
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
                            <input type="text" id="telno" required />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="gender">Gender</label>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <select name="gender" id="gender" style={{ width: '100%' }}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
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
                                style={{ width: '100%' }}
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <input
                                type="submit"
                                value="Sign Up"
                                style={{ width: '100%', height: '30px' }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2" align="center">
                            <input type="checkbox" id="tnc" />
                            <label htmlFor="tnc">
                                {' '}
                                I agree to all <a href="#">Terms and Conditions</a>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2" align="center">
                            Already have an account? <a ><Link to="/">Sign In</Link></a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default SignUp;
