import { Routes, Route } from 'react-router-dom';

import { PATHS } from 'constants/routes';

import Login from 'pages/Login';
import Home from 'pages/Home';

function App() {
  return (
    <Routes>
      <Route path={PATHS.LOGIN} element={<Login />} />
      <Route path={PATHS.HOME} element={<Home />} />
    </Routes>
  );
}

export default App;
