/* import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CollectionItem from "../../components/collection-item/collection-item.component";

import { selectCollection } from "../../redux/shop/shop.selectors";

import "./collection.styles.scss";

const CollectionPage = () => {
  let { collectionId } = useParams();

  let selector = useSelector(state => state.shop);
  let collection = selector.collections[collectionId];

  if (collection) {
    const { title, items } = collection;
    return (
      <div className="collection-page">
        <h2 className="title">{title}</h2>
        <div className="items">
          {items.map(item => (
            <CollectionItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default CollectionPage;
 */

import React from "react";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CollectionItem from "../../components/collection-item/collection-item.component";

import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer,
} from "./collection.styles";

const CollectionPage = () => {
  let { collectionId } = useParams();

  let selector = useSelector(state => state.shop);
  let collection = selector.collections[collectionId];

  const { title, items } = collection;
  return (
    <CollectionPageContainer>
      <CollectionTitle>{title}</CollectionTitle>
      <CollectionItemsContainer>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </CollectionItemsContainer>
    </CollectionPageContainer>
  );
};

export default CollectionPage;
