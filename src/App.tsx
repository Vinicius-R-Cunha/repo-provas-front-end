import GlobalStyles from './styles/GlobalStyles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import UserContext from './contexts/UserContext';
import SearchContext from './contexts/SearchContext';
import { useState } from 'react';

export default function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [searchInput, setSearchInput] = useState('');

  return (
    <UserContext.Provider value={{ token, setToken }}>
      <SearchContext.Provider value={{ searchInput, setSearchInput }}>
        <BrowserRouter>
          <Routes>
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/' element={<HomePage />} />
          </Routes>
          <GlobalStyles />
        </BrowserRouter>
      </SearchContext.Provider>
    </UserContext.Provider>
  );
}
