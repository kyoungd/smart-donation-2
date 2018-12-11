/* eslint jsx-a11y/label-has-for:0 */
import React, {Component} from 'react';
import styled from 'styled-components';
import update from 'immutability-helper';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import { media } from '../../utils/media';
import ReduxRoot from 'hoc/ReduxRoot';
import config from 'config/SiteConfig';

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
  p {
    margin-bottom: 0.1em;
  }
  form {
    #name {
      width: 30em;
    }
    #amount {
      width: 10em;
    }
    textarea {
      resize: vertical;
      min-width: 30em;
      min-height: 5em;
      width: 100%;
      margin-top: 0.5rem;
    }  
  }
`;

const SIconButtons = styled.div`
  display: flex;
  padding: 0.5em;
  flex-direction: row;
  justify-content: flex-end;
`;

const DateDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  input {
    input-width: 10em;
  }
  div {
    margin-top: 0.5rem;
    margin-right:2em;
  }
`;

const SelectDiv = styled.div`
    margin-top: 0.8em;
    margin-bottom: 1em;
    div {
      min-width: 20em;
    }
`;

const SButton = styled.div `
  margin-left: 1.5em;
`;


class CampaignPage extends Component {

  constructor(props) {
    super(props);
    const { campaignId, data} = this.props;

    const campaignIx = data.findIndex(item => item.id === campaignId);
    const campaign = data[campaignIx];
    this.state = {
      dataOk : false,
      campaignIx,
      campaign,
      helper: this.props.helper,
    };
  }

  changeHandler = type => event => {
    // this.setState({
    //   campaign: {
    //     [type] : event.target.value
    //   }
    // });
    this.setState({
      campaign: update(this.state.campaign, { [type]: { $set: event.target.value } })
    });
  }

  closeWindow = () => {
    this.props.onReturnToRootList();
  }

  saveNew = () => {
    this.props.saveNewCampaign(this.state.campaign, this.closeWindow);
  }

  saveEdit = () => {
    this.props.saveExistingCampaign(this.state.campaign, this.closeWindow);
  }

  submitHandler = event => {
    event.preventDefault();
    console.log('Donation submitHandler --------', this.state.campaign);
    this.state.campaign.id === 'new' ? this.saveNew() : this.saveEdit();
  }

  showAccount = () => {
    return (
      <DateDiv>
        <div>
        <TextField
          variant="outlined"
          id="account"
          label="account number"
          type="text"
          value={this.state.campaign.account}
          onChange={this.changeHandler('account')}
        />
        </div>
        <div>
        <TextField
          variant="outlined"
          id="routing"
          label="routing number"
          type="text"
          value={this.state.campaign.routing}
          onChange={this.changeHandler('routing')}
        />
        </div>
      </DateDiv>
    )
  }

  render() {
    return (
      <div>
        <Content>
          <p>Make Campaign</p>
          <form name="contact-form" method="post" onSubmit={this.submitHandler}>
            <div>
              <div>
                <TextField
                  variant="outlined"
                  id="name"
                  label="name"
                  value={this.state.campaign.title}
                  margin="normal"
                  onChange={this.changeHandler('title')}
                />
              </div>
              <div>
                <TextField
                  variant="outlined"
                  id="amount"
                  label="amount"
                  value={this.state.campaign.amount}
                  margin="normal"
                  onChange={this.changeHandler('amount')}
                />
              </div>
              <DateDiv>
                <div>
                  <TextField
                    variant="outlined"
                    id="availableOn"
                    label="availableOn"
                    type="date"
                    defaultValue={this.state.campaign.availableOn}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={this.changeHandler('availableOn')}
                  />
                </div>
                <div>
                  <TextField
                    variant="outlined"
                    id="expireOn"
                    label="expireOn"
                    type="date"
                    defaultValue={this.state.campaign.expireOn}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={this.changeHandler('expireOn')}
                  />
                </div>
              </DateDiv>
              {this.state.campaign.id === 'new' && this.showAccount()}
              <TextField
                variant="outlined"
                id="description"
                label="description"
                multiline
                rowsMax="3"
                value={this.state.campaign.description}
                margin="normal"
                onChange={this.changeHandler('description')}
                />
            </div>
            <SelectDiv>
                <FormControl variant="outlined">
                  <InputLabel
                    ref={ref => {
                      this.InputLabelRef = ref;
                    }}
                    htmlFor="outlined-age-simple"
                  >
                    Choose Donation
                  </InputLabel>
                  <Select
                    value={this.state.campaign.donation}
                    onChange={this.changeHandler('donation')}
                    input={<OutlinedInput labelWidth={100} name="donation" id="outlined-donation-simple" />}
                  >
                    {this.state.helper.map(s => <MenuItem value={s.id}><em>{s.name}</em></MenuItem>)}
                  </Select>
                </FormControl>
              </SelectDiv>
              <SelectDiv>
                <FormControl variant="outlined">
                  <InputLabel
                    ref={ref => {
                      this.InputLabelRef = ref;
                    }}
                    htmlFor="outlined-age-simple"
                  >
                    Choose Status
                  </InputLabel>
                  <Select
                    value={this.state.campaign.status}
                    onChange={this.changeHandler('status')}
                    input={<OutlinedInput labelWidth={100} name="status" id="outlined-status-simple" />}
                  >
                    {config.siteStatus.map(s => <MenuItem value={s}><em>{s}</em></MenuItem>)}
                  </Select>
                </FormControl>
            </SelectDiv>
            <SIconButtons>
              <SButton>
                <Button variant="outlined" color="primary" type="submit">
                  Submit
                </Button>
              </SButton>
              <SButton>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.closeWindow}
                >
                  Cancel
                </Button>
              </SButton>
            </SIconButtons>
          </form>
        </Content>
      </div>
    )
  }

}

export default ReduxRoot(CampaignPage)
