import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

const siteStatus = [
  {code: 'NS', value: 'NOT_STARTED', info: 'Status: Not Started'}, 
  {code: 'AT', value: 'ACTIVE', info: 'Status: Active'}, 
  {code: 'CP', value: 'COMPLETE', info: 'Status: Complete'},
  {code: 'XX', value: 'CANCELED', info: 'Status: Canceled'}, 
  {code: 'SP', value: 'SUSPENDED', info: 'Status: Suspended'}, 
]

function getSteps() {
  return siteStatus.map(s => s.value);
}

class StatusForDonor extends React.Component {
  render() {
    const { classes, status } = this.props;
    const steps = getSteps();
    const activeStep = siteStatus.findIndex(s => s.value === status);

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = { completed: false };
            const labelProps = {};
            return (
              <Step key={label} {...props}>
                <Tooltip title={ siteStatus.find(s => s.value === label).info }>
                <StepLabel {...labelProps}>{label}</StepLabel>
                </Tooltip>
              </Step>
            );
          })}
        </Stepper>
      </div>
    );
  }
}

StatusForDonor.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(StatusForDonor);
