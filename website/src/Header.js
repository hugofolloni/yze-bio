import { useState } from 'react';

const Header = (props) => {

  const handleLogout = () => {
      new Promise((resolve, reject) => {    
          window.localStorage.removeItem('username')
          window.localStorage.removeItem('password')
          resolve()
      })
      .then(() => {
          window.location.href = "/"
      })
  }


  const [search, setSearch] = useState("");

  return ( 
    <div className="header-wrapper">
      <div className="header">
        <div className="nav">
          <span onClick={() => {window.location.href = '/'}}>yze.bio</span>
        </div>
        <div className="search-bar-div">
          <input type="text" value={search} placeholder='Search for a bio' onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => { if(e.key === "Enter"){ window.location.href=`/${search}` }}}/>
        </div>
        {props.logged && (
          <div className="logged-section">
            {/* <h3>Hi, {props.username}</h3> */}
            <div onClick={() => handleLogout()}>Logout</div>
          </div>
        )}
      </div>
    </div>

  );
}
 
 
export default Header;