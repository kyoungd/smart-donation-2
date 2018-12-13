import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Layout, Wrapper, Subline } from 'components';
import { media } from '../utils/media';
import config from 'config/SiteConfig';
import DashApprovalCard from '../components/Dashboard/DashApprovalCard';
import DashPostCard from '../components/Dashboard/DashPostCard';
import CampaignAddButton from '../components/Dashboard/CampaignAddButton';
import CampaignRequestPage from '../components/DonateForm/CampaignRequestPage';
import ReduxRoot from 'hoc/ReduxRoot';
import RenderLoading from 'components/RenderLoading';

const Content = styled.div`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 2rem 4rem;
  background-color: ${props => props.theme.colors.bg};
  z-index: 1000;
  margin-top: -2rem;
  @media ${media.tablet} {
    padding: 3rem 3rem;
  }
  @media ${media.phone} {
    padding: 2rem 1.5rem;
  }
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

class ListApprovals extends Component {

  constructor(props) {
    super(props);
    const { location: { search : donationId }} = props;
    this.state = {
      dataOk: false,
      donationId: donationId.slice(1, donationId.length),
      pageState: config.pageState[config.siteState].sublevelList,
      pageEntityId: '',
    };
  }

  onReturnToSublevelList = () => {
    this.setState({
      pageState: config.pageState[config.siteState].sublevelList,
      pageEntityId: '',
    })
  }

  dataCallback = dataItem => () => {
    // do nothing for now
    this.setState(dataItem);
  }

  async componentDidMount() {
    try {
      const { donationId } = this.state;
      this.props.getSublevel(donationId, this.dataCallback({dataOk: true}));
      // console.log('root-componentDidMount: start', dashboard);
    } catch (error) {
      console.log(error);
    }
  }

  PageSublevelAdd = entityId => {
    const data = this.props.dashboard.data.find(data => data.id === entityId);
    return config.siteState === config.siteStateCustomer 
    ? <CampaignRequestPage request={data} onReturnToSublevelList={this.onReturnToSublevelList} /> 
    : '';
  }
  
  PageSublevelEdit = (entityId) => {
    switch (config.siteState) {
      case config.siteStateDonor:
        const item = this.props.dashboard.data.find(item => item.id === entityId);
        return <DashPostCard product={item} onReturnToSublevelList={this.onReturnToSublevelList} readOnly={true} />
      case config.siteStateCustomer:
        const data = this.props.dashboard.data.find(data => data.id === entityId);
        return <CampaignRequestPage request={data} onReturnToSublevelList={this.onReturnToSublevelList} />
      default:
        return '';
    }
  }

  showEditControl = () => {
    try {
      const sublevelEdit = config.pageState[config.siteState].sublevelEdit;
      console.log('showEditControl: ', (sublevelEdit !== ''));
      return sublevelEdit !== '';
    } catch {
      return false;
    }
  }

  renderSublevelList(dashboard, subline) {
    return (
      <div>
        <Subline sectionTitle>
          {subline} (See <Link to="/">all donations</Link>)
        </Subline>
        {dashboard.data.map(
          item =>
            item.id === 'new' || item.id === 'blank' ? '' : DashApprovalCard.call(this, item, this.showEditControl()
            ))}
      </div>
    )
  }

  renderPost(dashboard, pageEntityId) {
    const readOnly = config.siteState === config.siteStateCustomer;
    return (
      <div>
        {dashboard.data.map(item => (
          pageEntityId === item.id 
          ? <DashPostCard product={item} onReturnToSublevelList={this.onReturnToSublevelList} readOnly={readOnly} />
          : ''))}
      </div>
    )
  }

  renderSublevelEdit(pageEntityId) {
    return this.PageSublevelEdit(pageEntityId);
  }

  renderSublevelAdd(dashboard) {
    return this.PageSublevelAdd('new');
  }

  renderLoop() {
    const { dashboard } = this.props;
    const { pageState, pageEntityId } = this.state;
    const totalCount = dashboard.data.length;
    const subline = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${dashboard.donationName}"`;
    
    switch (pageState) {
      case config.pageState[config.siteState].sublevelList:
        return this.renderSublevelList(dashboard, subline);
      case config.pageState[config.siteState].sublevelEdit:
        return this.renderSublevelEdit(pageEntityId);
      case config.pageState[config.siteState].sublevelAdd:
        return this.renderSublevelAdd(dashboard);
      case config.pageState[config.siteState].post:
        return this.renderPost(dashboard, pageEntityId);
      default:
        return '';
    }
}

  renderOk() {
    console.log('root-sublevel - renderOK: ', this.props);

    return (
      <Layout>
        <Wrapper>
          <TitleArea> {CampaignAddButton.call(this, 'sublevel')} </TitleArea>
          <Content> {this.renderLoop()} </Content>
        </Wrapper>
      </Layout>
    );
  }

  renderLoading() {
    return (
      <Layout>
        <Wrapper>
          <Content>
            <RenderLoading />
          </Content>
        </Wrapper>
      </Layout>
    );
  }

  // const { donationId } = props;
  render() {
    const { dataOk } = this.state;
    if (dataOk)
      return this.renderOk();
    else
      return this.renderLoading();
  }
};

export default ReduxRoot(ListApprovals);
