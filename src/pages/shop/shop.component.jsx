import { collection, getDocs } from "firebase/firestore";
import React, { Component } from "react";
//import { Route, useMatch } from "react-router-dom";
import { connect } from "react-redux";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { db } from "../../firebase/firebase.utils";
import { updateCollections } from "../../redux/shop/shop.actions";
import CollectionPage from "../collection/collection.component";

class ShopPage extends Component {
  unsubscribeFromSnapshot = null;

  async componentDidMount() {
    const { updateCollections } = this.props;

    const collectionRef = collection(db, "collections");
    const querySnapshot = await getDocs(collectionRef);

    const transformedCollection = [];

    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());

      const { title, items } = doc.data();

      transformedCollection.push({
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items,
      });
    });

    //console.log(transformedCollection);

    const collectionsMap = transformedCollection.reduce(
      (accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
      },
      {}
    );

    console.log(collectionsMap);
    updateCollections(collectionsMap);
  }

  render() {
    return (
      <div className="shop-page">
        {/* <Route exact path="shop" element={<CollectionsOverview />} /> */}
        {/* <Route
            path={`${match.path}/:collectionId`}
            element={<CollectionPage />}
          /> */}
        <CollectionsOverview />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
