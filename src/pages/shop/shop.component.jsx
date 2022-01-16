import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";

class ShopPage extends Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    return (
      <div className="shop-page">
        <CollectionsOverviewContainer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
