// import { useState } from "react";
// import { useAuth } from "../hooks/useauth";
// import "./styles/SignUp.css"
// import "./styles/Login.css"

// export default function SignUp() {
//   const { signup } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       await signup(email, password, name);
//       alert("User signed up successfully!");
//     } catch (err) {
//       alert(err.message);
//     }
//   }

//   return (
//     <div className="login-container container">
//       <form onSubmit={handleSubmit} className="login-form">
//         <h2 className="login-title">Signup</h2>
//         <input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Name"
//           className="form-input"
//         />
//         <input
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           className="form-input"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           className="form-input"
//         />
//         <button type="submit" className="submit-button">Sign Up</button>
//       </form>
//     </div>
//   );
// }