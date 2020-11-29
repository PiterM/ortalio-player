import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

const productsListContainer = document.getElementById('gk-1191');
if (productsListContainer) {
  const newProductsListContainer = document.createElement('div');
  newProductsListContainer.id = 'ortalio-products-list';
  productsListContainer.parentElement!.appendChild(newProductsListContainer);
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    newProductsListContainer
  );
} 
