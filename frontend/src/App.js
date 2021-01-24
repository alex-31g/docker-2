import "./App.css";
import axios from "axios";

function App() {
  const makeApiRequest = () => {
    axios.get("api/testwithcurrentuser").then((response) => {
      console.log("response", response);
    });
  };
  return (
    <div className="App">
      <button onClick={makeApiRequest}>Make API request</button>
    </div>
  );
}

export default App;
