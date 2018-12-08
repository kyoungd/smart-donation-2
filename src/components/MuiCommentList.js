import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import noauth from 'hoc/noauth.js'

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  }
});

class MuiCommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dense: false,
      secondary: false
    };
  }  

  generate() {
    return this.props.comments.map(comment => (
      <ListItem key={comment}>
        <ListItemText
          primary={comment}
          secondary={null}
        />
      </ListItem>
    ));
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
              Text only
            </Typography>
            <div className={classes.demo}>
              <List>
                { this.generate() }
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

MuiCommentList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(noauth(MuiCommentList));
