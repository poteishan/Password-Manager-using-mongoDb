import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
// import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <>
      <Navbar />
      {/* Soft green background with a faint grid, like the design */}
      <div className="relative min-h-[calc(100vh-48px)] bg-green-50">
        <div
          className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#d1fae533_1px,transparent_1px),linear-gradient(to_bottom,#d1fae533_1px,transparent_1px)] bg-size-[24px_24px]"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-0 h-100 w-150 -translate-x-1/2 rounded-full bg-green-200/40 blur-3xl" />
        </div>
        <div className="relative z-10">
          <Manager />
        </div>
      </div>
    </>
  );
}

export default App;