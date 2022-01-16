import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import CollectionPage from "./pages/collection/collection.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { onSnapshot } from "firebase/firestore";

import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";
import { selectIsCollectionsLoaded } from "./redux/shop/shop.selectors";

import WithSpinner from "./components/with-spinner/with-spinner.component";
const CollectionsWithSpinner = WithSpinner(CollectionPage);

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        onSnapshot(userRef, snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
      /* addCollectionAndDocuments(
        "collections",
        collectionsArray.map(({ title, items }) => ({ title, items }))
      ); */
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { isCollectionsLoaded } = this.props;

    return (
      <>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/shop" element={<ShopPage />} />
          <Route
            path="/shop/:collectionId"
            element={
              <CollectionsWithSpinner isLoading={!isCollectionsLoaded} />
            }
          />
          <Route exact path="/checkout" element={<CheckoutPage />} />
          <Route
            exact
            path="/signin"
            element={
              this.props.currentUser ? (
                <Navigate to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Routes>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isCollectionsLoaded: selectIsCollectionsLoaded,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
