import React, { Component } from 'react';
import update from 'immutability-helper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import { Subline } from 'components';
import { EntityStateDdl } from '../../models/api-data-status';
import ReduxRoot from 'hoc/ReduxRoot';
import RenderLoading from 'components/RenderLoading';

const uuidv1 = require('uuid/v1');

const RootPage = styled.div`
  padding-top: 0.5em;
  padding-bottom: 2em;
  margin-bottom: 1em;
  max-width: 60em;
  form {
    input {
      min-width: 36em;
      margin-left: 2em;
      margin-top: 0.5rem;
    }
    textarea {
      resize: vertical;
      min-width: 36em;
      margin-left: 2em;
      min-height: 5em;
      width: 100%;
      margin-top: 0.5rem;
    }EntityStateDdl
    EntityStateDdl
    select {
      min-width: 20em;
    }
  }
`;

const EntityStatusDiv = styled.div`
  margin-top: 0.5em;
  div {
    min-width: 15em;
  }
`;

const SIconButtons = styled.div`
  display: flex;
  padding: 0.5em;
  flex-direction: row;
  justify-content: flex-end;
`;

const SButton = styled.div `
  margin-left: 1.5em;
`;

class ProductPage extends Component {
  constructor(props) {
    super(props);
    const { data, productId } = this.props;
    const productIx = data.findIndex(d => d.id === productId);
    const product = data[productIx];
 
    this.state = {
      dataOk : true,
      productIx,
      product,
    };
  }

  closeWindow = () => {
    this.props.onReturnToRootList();
  }

  // const changeHandler = type => event => {
  //   this.setState({
  //     data: update(this.state.data, { [productIx]: { [type]: { $set: event.target.value } } })
  //   });
  // }
  changeHandler = type => event => {
    this.setState({
      product: update(this.state.product, { [type]: { $set: event.target.value } })
    });
  }

  submitHandler = event => {
    event.preventDefault();
    console.log('Product submitHandler --------', this.state.product);
    this.setState({dataOk: false});
    this.props.saveExistingProduct(this.state.product, this.closeWindow);
  }

  renderForm = () => {
    const subline = `STATUS: ${this.state.product.rfp} - - - - - APPROVAL: ${this.state.product.status} `;
    return (
      <form name="contact-form" method="post" onSubmit={this.submitHandler}>
        <Subline sectionTitle>
          {subline} - - -
      </Subline>
        <TextField
          variant="outlined"
          id="name"
          label="name"
          value={this.state.product.name}
          margin="normal"
          onChange={this.changeHandler('name')}
        />
        <TextField
          variant="outlined"
          id="video"
          label="video"
          value={this.state.product.video}
          margin="normal"
          onChange={this.changeHandler('video')}
        />
        <TextField
          variant="outlined"
          id="excerpt"
          label="excerpt"
          multiline
          rowsMax="2"
          value={this.state.product.excerpt}
          margin="normal"
          onChange={this.changeHandler('excerpt')}
        />
        <TextField
          variant="outlined"
          id="html"
          label="html"
          multiline
          rowsMax="4"
          value={this.state.product.html}
          margin="normal"
          onChange={this.changeHandler('html')}
        />
        <EntityStatusDiv>
          <FormControl variant="outlined">
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="outlined-age-simple"
            >
              Product Status
          </InputLabel>
            <Select
              value={this.state.product.rfp}
              onChange={this.changeHandler('rfp')}
              input={<OutlinedInput labelWidth={100} name="rfp" id="outlined-rfp-simple" />}
            >
              {EntityStateDdl(this.state.product.rfp).map(s => <MenuItem value={s.value} key={uuidv1()}><em>{s.name}</em></MenuItem>)}
            </Select>
          </FormControl>
        </EntityStatusDiv>
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
    )
  }

  render() {
    const { dataOk } = this.state;
    // console.log('ProductPage  ---', product);
    return (
      <RootPage>
        { dataOk && this.renderForm() }
        { !dataOk && <RenderLoading /> }
      </RootPage>
    );
  }

}

export default ReduxRoot(ProductPage);
