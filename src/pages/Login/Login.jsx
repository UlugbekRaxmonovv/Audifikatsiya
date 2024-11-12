import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  getAuth,
} from "firebase/auth";
import { auth as firebaseAuth, provider } from "../../components/Audifikatsiya";
import Hom from "../Home/Home";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

const SignIn = () => {
  const [userEmail, setUserEmail] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginWithGoogle = () => {
    signInWithPopup(firebaseAuth, provider)
      .then((data) => {
        setUserEmail(data.user.email);
      })
      .catch((error) => {
        console.error("Tizimga kirishda xatolik yuz berdi:", error);
      });
  };

  const handleLogin = async () => {
    if (inputEmail && password) {
      const auth = getAuth();
      try {
        await signInWithEmailAndPassword(auth, inputEmail, password);
        setUserEmail(inputEmail);
      } catch (error) {
        console.error("Login error:", error);
        alert("Tizimga kirishda xatolik yuz berdi. Iltimos, elektron pochta va parolingizni tekshiring.");
      }
    } else {
      alert("Iltimos, elektron pochta va parolingizni kiriting.");
    }
  };

  const handlePasswordReset = async () => {
    const auth = getAuth();
    if (inputEmail) {
      try {
        await sendPasswordResetEmail(auth, inputEmail);
        alert("Parolni tiklash to'g'risidagi elektron pochta pochta qutingizga yuborildi!");
      } catch (error) {
        console.error("Password reset error:", error);
        alert("Parolni tiklashda xatolik yuz berdi. Iltimos email manzilingizni tekshiring.");
      }
    } else {
      alert("Email manzilingizni kiriting.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {!userEmail ? (
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <button
            className="w-full bg-blue-500 text-white py-2 rounded mb-4 hover:bg-blue-600"
            onClick={loginWithGoogle}
          >
            Sign in with Google
          </button>

          <div className="mb-4">
            <label htmlFor="email-input" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email-input"
              type="text"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password-input" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative flex items-center justify-between w-full">
  <div className="w-full px-2 border border-gray-300 rounded flex items-center bg-white">
    <input
      id="password-input"
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full p-2 outline-none"
    />
    <IconButton
      className="text-gray-500 hover:text-gray-700"
      onClick={handleClickShowPassword}
    >
      {showPassword ? <VisibilityOff /> : <Visibility />}
    </IconButton>
  </div>
</div>

          </div>

          <button
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 mb-4"
            onClick={handleLogin}
          >
            Sign In
          </button>

          <button
            className="w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
            onClick={handlePasswordReset}
          >
            Reset Password
          </button>
        </div>
      ) : (
        <Hom userEmail={userEmail} />
      )}
    </div>
  );
};

export default SignIn;
