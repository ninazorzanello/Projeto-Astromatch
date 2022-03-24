import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TelaHome from './components/TelaHome'
import TelaMatches from './components/TelaMatches';



class RoutesApp extends Component {
    render() {
        return (
            <BrowserRouter>
            <Routes>
              <Route path="/" element ={<TelaHome />} />
              <Route path="/telamatches" element ={<TelaMatches />} />
            </Routes>
          </BrowserRouter> 
        );
    }
}

export default RoutesApp;