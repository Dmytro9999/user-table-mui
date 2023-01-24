import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/Router/AppRouter';
import NotificationBox from './components/Notification/NotificationBox';

function App() {
  return (
      <BrowserRouter>
          <NotificationBox/>
          <AppRouter />
      </BrowserRouter>
  );
}

export default App;
