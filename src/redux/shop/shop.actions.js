import ShopActionTypes from "./shop.types";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = errorMsg => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMsg,
});

export const fetchCollectionsStartAsync = () => {
  return async dispatch => {
    const collectionRef = collection(db, "collections");
    dispatch(fetchCollectionsStart());

    let transformedCollection = [];
    let collectionsMap;

    await getDocs(collectionRef)
      .then(snapshot => {
        snapshot.forEach(doc => {
          const { title, items } = doc.data();

          transformedCollection.push({
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items,
          });
        });

        collectionsMap = transformedCollection.reduce(
          (accumulator, collection) => {
            accumulator[collection.title.toLowerCase()] = collection;
            return accumulator;
          },
          {}
        );

        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch(error => dispatch(fetchCollectionsFailure(error)));
  };
};
