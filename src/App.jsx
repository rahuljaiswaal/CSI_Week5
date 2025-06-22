import { Provider } from 'react-redux';
import { store } from './store/store';
import MainLayout from './components/Layout/MainLayout';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App bg-spotify-black min-h-screen">
        <MainLayout />
      </div>
    </Provider>
  );
}

export default App;