import { useState } from "react";
import "./App.css";
import { use } from "react";

function App() {
  const [counter, setCounter] = useState(15);
  //let counter = 15;

  const addValue = () => {
    if (counter >= 20) return;
    setCounter(counter + 1);
  };
  const removeValue = () => {
    if (counter < 1) return;
    setCounter(counter - 1);
  };
  return (
    <>
      <h1>Chai aur react</h1>
      <h2>Counter Value: {counter}</h2>

      <button onClick={addValue}>Add value</button>
      <br />
      <button onClick={removeValue}>Remove value</button>
    </>
  );
}

export default App;
