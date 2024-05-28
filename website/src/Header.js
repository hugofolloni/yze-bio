import { useState } from 'react';

const Header = () => {

  const [search, setSearch] = useState("");

  return ( 
      <div className="header-wrapper">
      <div className="header">
        <div className="nav">
          <span onClick={() => {window.scrollTo(0, 0)}}>yze.bio</span>
        </div>
        <div className="search-bar-div">
          <input type="text" value={search} placeholder='Search for a bio' onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => { if(e.key === "Enter"){ window.location.href=`/${search}` }}}/>
        </div>
      </div>
    </div>

  );
}
 
 
export default Header;