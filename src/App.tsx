import "./App.css";
import { MemoList } from "./components/MemoList";
import { store } from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <MemoList />
    </Provider>
  );
}

export default App;