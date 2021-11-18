import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WikipediaSearch } from "./components/WikipediaSearch";

function App() {
  return (
    <>
      <ToastContainer />
      <WikipediaSearch />
    </>
  );
}

export default App;
