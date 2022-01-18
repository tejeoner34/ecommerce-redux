import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import CartPage from './pages/cart-page/cart-page';
import Home from './pages/home/home';
import {StyledMain} from "./styled-components/styled-main.js";

function App() {

  return (
    <>
      <BrowserRouter basename="/ecommerce-redux">
        <Header />
        <StyledMain>
        <Switch >
          
          <Route path='/cart'>
            <CartPage />
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
        </StyledMain>

      </BrowserRouter>
    </>
  );
}

export default App;
