import React from 'react';
import './App.scss';
import Search from './app/component/features/search/Search';
import UserTable from './app/component/UserTable';

function App() {
  return (
    <div className='App'>
      <div className='container mx-auto px-4'>
        <h1 className='mx-auto px-4 my-4 text-4xl text-center'>Github User Search</h1>
        <Search />
        <UserTable />
      </div>
    </div>
  );
}

export default App;
