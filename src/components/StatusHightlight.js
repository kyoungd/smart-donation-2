import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Tooltip from '@material-ui/core/Tooltip';

const siteStatus = [
  {code: 'NS', value: 'NOT_STARTED', info: 'Status: Not Started'}, 
  {code: 'AT', value: 'ACTIVE', info: 'Status: Active'}, 
  {code: 'XX', value: 'CANCELED', info: 'Status: Canceled'}, 
  {code: 'SP', value: 'SUSPENDED', info: 'Status: Suspended'}, 
  {code: 'CP', value: 'COMPLETE', info: 'Status: Complete'}
]

const siteApprovalStatus = 
[
  {code: 'NS', value: 'NOT_SUBMITTED', info: 'Approval not submiited'}, 
  {code: 'XX', value: 'CANCELED', info: 'Approval Request Canceled'}, 
  {code: 'SB', value: 'SUBMITTED', info: 'Submited for approval'}, 
  {code: 'AC', value: 'ACCEPTED', info: 'Accepted and approved'},
  {code: 'RJ', value: 'REJECTED', info: 'Rejected. '}
];

const styles = {
  avatar: {
    margin: 10,
  },
  textAvatar: {
    marginRight:20,
    marginTop:10,
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
};

function tooltipApproval (itemApproval, approvalResponse) {
  return ('REJECTED' ? `${itemApproval.info} - ${approvalResponse}` : itemApproval.info);
}

moment.updateLocale('en', {
  relativeTime : {
      future: "in %s",
      past:   "%s ago",
      s  : 'a few seconds',
      ss : '%d seconds',
      m:  "a minute",
      mm: "%d minutes",
      h:  "an hour",
      hh: "%d hours",
      d:  "a day",
      dd: "%d days",
      M:  "a month",
      MM: "%d months",
      y:  "a year",
      yy: "%d years"
  }
});

function printDate(itemOn){
  var a = moment();
  var b = moment(itemOn);
  return a.diff(b, 'days');
//  return itemOn && itemOn.length > 10 ? itemOn.slice(0, 10) : itemOn;
}

function LetterAvatars(props) {
  const { classes, createdOn, status, approval, approvalResponse } = props;
  const itemStatus = siteStatus.find(s => s.value === status);
  const itemApproval = siteApprovalStatus.find(s => s.value === approval);
  return (
    <div className={classes.row}>
      <Tooltip title={`Created On: ${createdOn}`}>
        <Avatar className={classes.purpleAvatar}>{printDate(createdOn)}</Avatar>
      </Tooltip>
      <Tooltip title={itemStatus.info}>
        <Avatar className={classes.avatar}>{itemStatus.code}</Avatar>
      </Tooltip>
      <Tooltip title={tooltipApproval(itemApproval, approvalResponse)}>
        <Avatar className={classes.orangeAvatar}>{itemApproval.code}</Avatar>
      </Tooltip>
    </div>
  );
}

LetterAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LetterAvatars);
