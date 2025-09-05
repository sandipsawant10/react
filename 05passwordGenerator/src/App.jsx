import { useState, useCallback, useEffect, useRef } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
    alert("Password copied to clipboard");
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-2xl rounded-2xl px-8 py-10 my-12 text-orange-500 bg-gray-900">
        <h1 className="text-3xl font-extrabold text-white text-center mb-8 tracking-wide">
          Password Generator
        </h1>

        <div className="flex shadow-inner rounded-xl overflow-hidden mb-6 border border-gray-700">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-5 bg-gray-800 text-white placeholder-gray-400 transition-colors duration-200 focus:bg-gray-700"
            placeholder="Your Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 font-semibold transition-all duration-200"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <label className="text-white font-medium">Length: {length}</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer w-3/4 accent-orange-500"
              onChange={(e) => setLength(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={numberAllowed}
                id="numberInput"
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="accent-orange-500 w-5 h-5"
              />
              <label
                htmlFor="numberInput"
                className="text-white font-medium select-none"
              >
                Numbers
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={charAllowed}
                id="charInput"
                onChange={() => setCharAllowed((prev) => !prev)}
                className="accent-orange-500 w-5 h-5"
              />
              <label
                htmlFor="charInput"
                className="text-white font-medium select-none"
              >
                Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
