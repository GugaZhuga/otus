import React from 'react';
import { Route, Routes } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import TaskCollectionView from './views/TaskCollectionView';
import UserCollectionView from './views/UserCollectionView';
import NavigationMenu from './views/NavigationMenu';
import NotFound from './views/NotFound';
import UserView from './views/UserView';
import TaskView from './views/TaskView';

// export default function App() {
//   return 
//   <div className="App">
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <p>
//         Edit <code>src/App.tsx</code> and save to reload.
//       </p>
//       <a
//         className="App-link"
//         href="https://reactjs.org"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Learn React
//       </a>
//     </header>
//   </div>
// }


export default function App() {
  return <>
    <NavigationMenu></NavigationMenu>
    <Routes>
      <Route index element={<TaskCollectionView/>}/>
      <Route path="/tasks/new" element={<TaskView/>}/>
      <Route path="/tasks/:id" element={<TaskView/>}/>
      <Route path="/users" element={<UserCollectionView/>}/>
      <Route path="/users/new" element={<UserView/>}></Route>
      <Route path="/users/:id" element={<UserView/>}></Route>
      <Route path="*" element={<NotFound/>}></Route>
    </Routes>
  </>;
}