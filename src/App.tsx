import { BrowserRouter as Router} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <AppRoutes></AppRoutes>
    </Router>
  );
}

export default App;