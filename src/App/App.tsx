import { Gallery } from '../components/Gallery';
import { Timer } from '../components/Timer';

import './App.css';

export const App = () => {
  return (
    <div className="App">
      <Timer />
      <Gallery />
    </div>
  );
};
