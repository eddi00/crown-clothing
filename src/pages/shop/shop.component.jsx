import React from "react";
//import { Route, useMatch } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

const ShopPage = (/* { match } */) => (
  <div className="shop-page">
    {/* <Route exact path="shop" element={<CollectionsOverview />} /> */}
    {/* <Route
        path={`${match.path}/:collectionId`}
        element={<CollectionPage />}
      /> */}
    <CollectionsOverview />
  </div>
);

export default ShopPage;
