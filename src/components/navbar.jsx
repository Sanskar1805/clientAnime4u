import React, { useState } from "react";
import image from './otaku.png';
import { Link } from 'react-router-dom';
import { Home, Forum, Login, AppRegistration, Search as SearchIcon } from '@mui/icons-material';
import Chat from './chat';

function NavBar({ bgCol, textCol, userName }) {
  const [isChatVisible, setChatVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const toggleChatVisibility = () => {
    setChatVisible(!isChatVisible);
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    window.location.href = `/components/xyz?search=${searchText}`;
  };

  return (
    <nav className={`navbar border-bottom border-bottom-dark ${bgCol}`} data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" style={{ color: textCol, fontFamily: "Righteous", fontSize: "30px" }}>
          <img src={image} style={{ width: "30px", height: "30px", marginRight: "10px" }} alt="" />
          <span className="navbar-title">Anime4u</span>
        </a>
        <div className="navbar-links">
          <a className="nav-link active" aria-current="page" style={{ color: "white" }} href="/"><Home /></a>
          <a className="nav-link active" aria-current="page" style={{ color: "white" }} href="/components/register"><AppRegistration /></a>
          <a className="nav-link active" aria-current="page" style={{ color: "white" }} href="/components/login"><Login /></a>
          <button onClick={toggleChatVisibility} style={{ background: "none", border: "none", color: "white" }}><Forum /></button>
          {isChatVisible && <Chat username={userName} />}
        </div>
        <form className="d-flex" role="search" style={{ display: 'flex', alignItems: 'center', gap: '5px' }} onSubmit={handleSearch}>
          <input className="form-control" type="search" value={searchText} placeholder="Search" aria-label="Search" onChange={(e) => setSearchText(e.target.value)} />
          
          {/* Conditional rendering for search button */}
          <button type="submit" className="search-btn">
            {/* This will show button text on desktop */}
            <span className="desktop-search">Search</span>
            {/* This will show icon on mobile */}
            <span className="mobile-search"><SearchIcon /></span>
          </button>
        </form>
      </div>
    </nav>
  );
}

export default NavBar;
