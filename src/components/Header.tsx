import React from 'react';
interface HeaderProps  {
    onSearch:(text:string)=>void
}
export default function Header({onSearch}:HeaderProps){

    return (
        <div>
            <nav className="navbar navbar-expand-lg my-2 border-bottom ">
                <div className="container">
                <h3 className="navbar-brand">Book Inventory</h3>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search Books" aria-label="Search" onInput={(event)=>onSearch(event.currentTarget.value)}/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
                </div>
            </nav>
        </div>
        
    );
  
}
