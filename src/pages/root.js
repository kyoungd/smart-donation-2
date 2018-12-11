import React, { Component } from 'react'
import styled from 'styled-components';
import { Layout, Wrapper } from 'components';
import { media } from '../utils/media';
import CampaignCard from '../components/Dashboard/CampaignCard';
import CampaignAddButton from '../components/Dashboard/CampaignAddButton';
import config from 'config/SiteConfig';
import DonationPage from '../components/DonateForm/DonationPage';
import CampaignPage from '../components/DonateForm/CampaignPage';
import ProductPage from '../components/DonateForm/ProductPage';
import SupplierRequestProductCard from '../components/Dashboard/SupplierRequestProductCard';
import DashPostCardRoot from '../components/Dashboard/DashPostCardRoot';
import ReduxRoot from 'hoc/ReduxRoot';

const Content = styled.div`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 3rem 6rem;
  @media ${media.tablet} {
    padding: 3rem 2rem;
  }
  @media ${media.phone} {
    padding: 2rem 1.5rem;
  }
  overflow: hidden;
`;

const TitleArea = styled.div`
  grid-column: 2;
  border-radius: 1rem;
  padding: 1rem 6rem;
  @media ${media.tablet} {
    padding: 1rem 2rem;
  }
  @media ${media.phone} {
    padding: 1rem 1.5rem;
  }
  overflow: hidden;
`;

class ListDonation extends Component {

  onReturnToRootList = () => {
    this.setState({
      pageState: config.pageState[config.siteState].rootList,
      pageEntityId: '',
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      dataRootOk: false,
      dataRootHelperOk: false,
      pageState: config.pageState[config.siteState].rootList,
      pageEntityId: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps', nextProps);
    return null;
  }

  dataCallback = dataItem => () => {
    // do nothing for now
    this.setState(dataItem);
  }

  async componentDidMount() {
    this.props.getRoot(this.dataCallback({dataRootOk: true}));
    this.props.getRootHelper(this.dataCallback({dataRootHelperOk: true}));
    console.log('componentDidMout -----------------------');
  }

  PageRootEdit = (entityId) => {
    switch (config.siteState) {
      case config.siteStateDonor:
        return <DonationPage donationId={entityId} onReturnToRootList={this.onReturnToRootList} />;
      case config.siteStateCustomer:
        return <CampaignPage campaignId={entityId} onReturnToRootList={this.onReturnToRootList} />;
      case config.siteStateSupplier:
        return <ProductPage productId={entityId} onReturnToRootList={this.onReturnToRootList} />;
      default:
        return undefined;
    }
  }

  PageRootAdd = () => {
    switch (config.siteState) {
      case config.siteStateDonor:
        return <DonationPage donationId='new' onReturnToRootList={this.onReturnToRootList} />;
      case config.siteStateCustomer:
        return <CampaignPage campaignId='new' onReturnToRootList={this.onReturnToRootList} />;
      default:
        return undefined;
    }
  }

  PageRootList = () => {
    switch (config.siteState) {
      case config.siteStateDonor:
        return CampaignCard;
      case config.siteStateCustomer:
        return CampaignCard;
      case config.siteStateSupplier:
        return SupplierRequestProductCard;
      default:
        console.log('PageRootList exception: ', config.siteState, config.siteStateCustomer, CampaignCard);
        return undefined;
    }
  }

  mainRenderer = (pageState, data, pageEntityId) => {
    switch (pageState) {
      case config.pageState[config.siteState].rootAdd:
        return this.PageRootAdd();
      case config.pageState[config.siteState].rootList:
        return data.map(item => item.id !== 'new' && item.id !== 'blank' ? this.PageRootList().call(this, item) : '');
      case config.pageState[config.siteState].rootEdit:
        return data.map(item => pageEntityId === item.id ? this.PageRootEdit(item.id) : '');
      case config.pageState[config.siteState].post:
        const oneData = data.find(item => pageEntityId === item.id);
        console.log('calling root-post', oneData);
        return <div>{DashPostCardRoot.call(this, oneData, true)}</div>;
      default:
        console.log('main-renderer ', pageState);
        return '';
    }
  }

  renderOk() {
    const { data } = this.props;
    const { pageState, pageEntityId } = this.state;

    console.log('--------------------------------------------------------------------root-render: ', data);
    return (
      <div>{ this.mainRenderer(pageState, data, pageEntityId) }</div>
    )
  }

  renderLoading() {
    return <div>LOADING...</div>
  }

  render() {
    const { dataRootOk, dataRootHelperOk } = this.state;

    return (
      <Layout>
        <Wrapper>
          <TitleArea>
            { config.pageState[config.siteState].rootAdd !== '' && CampaignAddButton.call(this, 'root') }
          </TitleArea>
          <Content>
            { dataRootOk && dataRootHelperOk ? this.renderOk() : this.renderLoading() }
          </Content>
        </Wrapper>
      </Layout>
    );
  }
}

export default ReduxRoot(ListDonation);