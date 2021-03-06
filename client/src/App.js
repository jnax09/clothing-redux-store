import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { GlobalStyle } from './global.styles';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

const HomePage = lazy(() => import('./pages/homepage/homepage.component'))
const ShopPage = lazy(() => import('./pages/shop/shop.component'))
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'))
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'))
const Header = lazy(() => import('./components/header/header.component'))

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <GlobalStyle />
      <Router>
          <ErrorBoundary>
              <Suspense fallback={<Spinner />}>
                  <Header />
                  <Switch>
                      <Route exact path='/' component={HomePage} />
                      <Route path='/shop' component={ShopPage} />
                      <Route exact path='/checkout' component={CheckoutPage} />
                      <Route
                          exact
                          path='/signin'
                          render={() =>
                              currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />
                          }
                      />
                  </Switch>
              </Suspense>
          </ErrorBoundary>
      </Router>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
