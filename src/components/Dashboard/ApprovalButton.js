import React, { Component } from 'react'
import update from 'immutability-helper';
import Button from '@material-ui/core/Button';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';

import StatusForDonor from './StatusForDonor';
import ReduxRoot from 'hoc/ReduxRoot';
import RenderLoading from 'components/RenderLoading';

const _ = require('lodash');

const RootPage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  button: {
    margin-left: 4em;
  }
`;

const ButtonIcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  button {
    margin-left: 5%;
  }
`;

class YesNoButton extends Component {

  constructor(props) {
    super(props);
    const { product, readOnly } = this.props;
    this.state = {
      dataOk: true,
      readOnly,
      product,
      rejectOpen: false,
    };
  }

  callback = () => {
    console.log('---------------  YesNoButton callback exec.');
    this.props.onReturnToSublevelList();
  }

  UpdateApproval = () => {
    console.log('---------------  UpdateApproval callback exec.');
    const { product } = this.state;
    this.setState({dataOk: false});
    this.props.saveApproval(product, this.callback);
  }

  changeHandler = type => event => {
    this.setState({
      product: update(this.state.product, { status: { $set: type } })
    },
      this.UpdateApproval
    );
  }

  handleRejectOpen = () => {
    this.setState({'rejectOpen': true} );
  }

  handleRejectClose = () => {
    console.log('handleRejectClose ');
    this.setState({
      'rejectOpen': false,
      product: update(this.state.product, 
          { status: { $set: 'REJECTED' } }
      )
    },
      this.UpdateApproval
    );
  }

  handleClose = () => {
    this.setState({'rejectOpen': false} );
  }

  buttonVariant = (status) => (this.state.product.status.toLowerCase() === status ? 'outlined' : 'text');
  buttonLetter = letter => _.includes(['accepted', 'rejected'], this.state.product.status.toLowerCase()) ? letter + 'ED' : letter;

  readOnlyButtons = () => (
    <StatusForDonor status={this.state.product.status} statusType="approval" />
  )

  writeButtons = () => (
    <RootPage>
      <Dialog open={this.state.rejectOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Reason for rejection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please tell us few quick reasons for the rejection. It will help us improve so we can provide
            works more in line with your vision.
          </DialogContentText>
          <TextField 
            value={this.state.product.approvalResponse}
            onChange={this.textHandler('approvalResponse')}
            autoFocus margin="dense"
            id="reason"
            label="Reason"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleRejectClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <ButtonIcon>
        <Button 
          variant={this.buttonVariant('accepted')}
          aria-label="Accept"
          color="default"
          disableRipple
          onClick={this.changeHandler('ACCEPTED')}
        >
          <ThumbUpIcon />
          &nbsp;&nbsp;{this.buttonLetter('ACCEPT')}
        </Button>
        <Button
          variant={this.buttonVariant('rejected')}
          aria-label="Accept"
          color="default"
          disableRipple
          onClick={this.handleRejectOpen}
        >
          <ThumbDownIcon />
          &nbsp;&nbsp;{this.buttonLetter('REJECT')}
        </Button>
      </ButtonIcon>
    </RootPage>
  )

  textHandler = type => event => {
    this.setState({
      product: update(this.state.product, {approvalResponse: {$set: event.target.value}} )
    })
  }

  render() {
    const { dataOk } = this.state;
    console.log('ApprovalButton - render()', this.state);
    return (
      <div>
        { dataOk && (this.state.readOnly === true ? this.readOnlyButtons() : this.writeButtons()) }
        { !dataOk && <RenderLoading /> }
      </div>
    );
  }

}

export default ReduxRoot(YesNoButton);
