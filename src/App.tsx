
import './App.css';
import Header from './components/Header'
import Data from './components/Data'
import React, { useState } from 'react';

export default function App() {
  const [query,setQuery] = useState<string>("")

  return (
    <div className="App ">
      <Header onSearch={(text)=>setQuery(text)} />
      <div className="List container">
        <Data query={query} />
      </div>
    </div>
  );
}

