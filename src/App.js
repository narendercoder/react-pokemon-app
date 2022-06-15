import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Header from './components/Header/Header';
import "./App.css"
import Homepage from "./pages/HomePage/HomePage";
import Search from './pages/Search/Search';
import { Container } from '@material-ui/core';
import Footer from './components/Footer/Footer';
import SimpleBottomNavigation from './components/BottomNavigation/BottomNavigation';
function App() {
  return (
    <>
    <div className='pokemon_app' >
    <BrowserRouter>
        <Header/>
        <div className='app'>
        <Container>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="*" element={<Homepage/>}/>
        </Routes>
        </Container>
        </div>
        <Footer/>
        <SimpleBottomNavigation/>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App;
