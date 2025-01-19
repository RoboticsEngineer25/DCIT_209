import React from 'react';

const ResetPassword = () => {
    return (
        <div>
            <form action="#">
                <table className="form" align="center">
                    <tbody>
                    <tr>
                        <th>
                            <img src="images/logo.jpg" alt="sphinx logo" className="logo" />
                        </th>
                    </tr>
                    <tr>
                        <td>
                            <br />
                            <br />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="1pword">New Password</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                type="password"
                                id="1pword"
                                placeholder="Enter new password"
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
                        <td>
                            <label htmlFor="2pword">Confirm Password</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                type="password"
                                id="2pword"
                                placeholder="Confirm password"
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br />
                            <br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                type="submit"
                                value="Reset Password"
                                style={{ width: '100%', height: '30px' }}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default ResetPassword;
