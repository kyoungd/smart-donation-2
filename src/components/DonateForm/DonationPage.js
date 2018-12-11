/* eslint jsx-a11y/label-has-for:0 */

import React, { Component } from 'react';
import update from 'immutability-helper';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

import styled from 'styled-components';
import { media } from '../../utils/media';
import ReduxRoot from 'hoc/ReduxRoot';

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

const SButton = styled.div `
  margin-left: 1.5em;
`;

class DonationPage extends Component {

  constructor(props) {
    super(props);

    const { donationId, data } = this.props;
    const donationIx = data.findIndex(item => item.id === donationId);
    const donation = data[donationIx];
  
    this.state = {
      dataOk : false,
      donationIx,
      donation,
    };
  }

  closeWindow = () => {
    this.props.onReturnToRootList();
  }

  // const changeHandler = type => event => {
  //   this.setState({
  //     data: update(this.state.data, { [donationIx]: { [type]: { $set: event.target.value } } })
  //   });
  // }
  changeHandler = type => event => {
    this.setState({
      donation: update(this.state.donation, { [type]: { $set: event.target.value } })
    });
  }

  saveNew = (donation) => {
    this.props.saveNewDonation(donation, this.closeWindow);
  }

  saveEdit = (donation) => {
    this.props.saveExistingDonation(donation, this.closeWindow);
  }

  submitHandler = event => {
    event.preventDefault();
    console.log('Donation submitHandler --------', this.state.donation);
    this.state.donation.id === 'new' ? this.saveNew(this.state.donation) : this.saveEdit(this.state.donation);
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
            value={this.state.donation.account}
            onChange={this.changeHandler('account')}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            id="routing"
            label="routing number"
            type="text"
            value={this.state.donation.routing}
            onChange={this.changeHandler('routing')}
          />
        </div>
      </DateDiv>
    )
  }

  render () {
    return (
      <Content>
        <p>Make Donation</p>
        <form name="contact-form" method="post" onSubmit={this.submitHandler}>
          <div>
            <div>
              <TextField
                variant="outlined"
                id="name"
                label="name"
                value={this.state.donation.title}
                margin="normal"
                onChange={this.changeHandler('title')}
              />
            </div>
            <div>
              <TextField
                variant="outlined"
                id="amount"
                label="amount"
                value={this.state.donation.amount}
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
                  value={this.state.donation.availableOn}
                  onChange={this.changeHandler('availableOn')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div>
                <TextField
                  variant="outlined"
                  id="expireOn"
                  label="expireOn"
                  type="date"
                  value={this.state.donation.expireOn}
                  onChange={this.changeHandler('expireOn')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </DateDiv>
            {this.state.donation.id === 'new' && this.showAccount()}
            <div>
              <TextField
                variant="outlined"
                id="rules"
                label="Rules"
                multiline
                rowsMax="3"
                value={this.state.donation.rules}
                onChange={this.changeHandler('rules')}
                margin="normal"
              />
            </div>
            <div>
              <TextField
                variant="outlined"
                id="description"
                label="description"
                multiline
                rowsMax="3"
                value={this.state.donation.description}
                onChange={this.changeHandler('description')}
                margin="normal"
              />
            </div>
            <SIconButtons>
              <SButton>
                <Button variant="outlined" color="primary" type="submit">
                  Submit
                </Button>
              </SButton>
              <SButton>
                <Button variant="outlined" color="primary" onClick={this.closeWindow}>
                  Cancel
                </Button>
              </SButton>
            </SIconButtons>
          </div>
        </form>
      </Content>
    )
  }
}

export default ReduxRoot(DonationPage)
