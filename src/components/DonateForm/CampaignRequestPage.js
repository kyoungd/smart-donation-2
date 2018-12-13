/* eslint jsx-a11y/label-has-for:0 */

import React, { Component } from 'react';
import update from 'immutability-helper';
import styled from 'styled-components';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import { media } from '../../utils/media';
import config from 'config/SiteConfig';
import { ListSupplier } from '../../models/api-customer-campaignrequest';
import { getResourceId } from '../../models/api';
import ReduxRoot from 'hoc/ReduxRoot';
import RenderLoading from 'components/RenderLoading';

const uuidv1 = require('uuid/v1');

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
  form {
    textarea {
      resize: vertical;
      min-width: 30em;
      min-height: 5em;
      width: 100%;
      margin-top: 0.5rem;
    }
    input {
      min-width: 30em;
      width: 100%;
      margin-left: 2em;
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

const SupplierDiv = styled.div`
  margin-top: 0.5em;
  margin-bottom: 1em;
  div {
    min-width: 20em;
  }
`;

const SButton = styled.div `
  margin-left: 1.5em;
`;

class CampaignRequestPage extends Component {

  constructor(props) {
    super(props);

    const { request } = this.props;

    this.state = {
      dataOk : true,
      request,
    };
  }

  // console.log('CampaignRequestPage ', request);

  changeHandler = type => event => {
    this.setState({
      request: update(this.state.request, { [type]: {$set: event.target.value} })
    })
  }

  nameid = (id, name) => `${id}#${name}`;

  handlerSupplier = event => {
    console.log('======== changeSupplierHandler', event.target);
    
    const item = event.target.value.split('#');
    this.setState({
      request: update(this.state.request, { supplier: {$set: item[0]}, supplierName: {$set: item[1]} })
    })
  }

  closeWindow = () => {
    this.props.onReturnToSublevelList();
  }

  saveNew = (request) => {
    this.setState({dataOk: false});
    this.props.saveNewRequest(request, this.closeWindow);
  }

  saveEdit = (request) => {
    this.setState({dataOk: false});
    this.props.saveExistingRequest(request, this.closeWindow);
  }

  submitHandler = event => {
    event.preventDefault();
    const { request } = this.state;
    console.log('Request submitHandler --------', request);
    if (request.id === 'new') this.saveNew(request);
    else this.saveEdit(request);
  }

  renderForm() {
    const { request } = this.state;
    return (
      <form name="contact-form" method="post" onSubmit={this.submitHandler}>
        <div>
          <div>
            <TextField 
              variant="outlined"
              id="name"
              label="name"
              value={request.name}
              margin="normal"
              onChange={this.changeHandler('name')}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              id="description"
              label="description"
              multiline
              rowsMax="3"
              value={request.description}
              onChange={this.changeHandler('description')}
              margin="normal"
            />
          </div>
          <SupplierDiv>
            <FormControl variant="outlined">
              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="outlined-age-simple"
              >
                Choose Supplier
              </InputLabel>
              <Select
                onChange={this.handlerSupplier}
                value={ this.nameid(getResourceId(request.supplier), request.supplierName) }
                input={<OutlinedInput labelWidth={100} name="age" id="outlined-age-simple" />}
              >
                { 
                  ListSupplier(this.props.dashboard.data, this.props.dashboard.allSupplier, request).map(s =>
                    <MenuItem disabled={s.checked} value={this.nameid(s.id, s.name)} key={uuidv1()}><em>{s.name}</em></MenuItem>) 
                }
              </Select>
            </FormControl>
          </SupplierDiv>
          <SupplierDiv>
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
              value={request.rfp}
              onChange={this.changeHandler('rfp')}
              input={<OutlinedInput labelWidth={100} name="rfp" id="outlined-rfp-simple" />}
            >
              {config.siteStatus.map(s => <MenuItem value={s} key={uuidv1()}><em>{s}</em></MenuItem>)}
            </Select>
          </FormControl>
          </SupplierDiv>
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
      </form>
    )
  }

  render() {
    const { dataOk } = this.state;
    return (
      <Content>
        <p>Request for Proposal</p>
        { dataOk && this.renderForm() }
        { !dataOk && <RenderLoading /> }
      </Content>
    )
  }
}

export default ReduxRoot(CampaignRequestPage);
