import React, { Component } from 'react'
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import authenticated from 'hoc/authenticated';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class MuiCommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = { comment: '' };
  }  

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  
  handleSubmit = event => {
    event.preventDefault();

    // TODO - Call an action creator
    this.props.saveComment(this.state.comment);
    this.setState({ comment: '' });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete="off">
          <TextField
            id="comment"
            ref="comment"
            label="Add Comment"
            multiline
            rowsMax="4"
            value={this.state.comment}
            onChange={this.handleChange('comment')}
            className={classes.textField}
            margin="normal"
            helperText="enter comment"
            variant="outlined"
          />
          <div>
            <Button variant="outlined" color="primary" className={classes.button} type="submit">
              Submit Comment
            </Button>          
          </div>
        </form>
        <Button id="fetchComments" variant="outlined" color="primary" className={classes.button} onClick={this.props.fetchComments}>
          Fetch Comment
        </Button>          
      </div>
    )
  }
}

MuiCommentBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(authenticated(MuiCommentBox));
