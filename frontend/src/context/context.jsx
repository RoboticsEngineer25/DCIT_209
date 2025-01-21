import { createContext, useState } from "react";

const Context = createContext();

export const GlobalState = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber,setPhoneNumber]=useState("")
  const [gender,setGender]=useState("")
  const [birthDate,setBirthDate]=useState("")
  return (
    <Context.Provider
      value={{
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
        setBirthDate
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
