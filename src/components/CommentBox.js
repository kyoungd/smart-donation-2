import React, { Component } from 'react'
import authenticated from 'hoc/authenticated';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = { comment: '', user: ''};
  }  

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  
  handleSubmit = event => {
    event.preventDefault();

    // TODO - Call an action creator
    // and save the comment
    this.props.saveComment(this.state.comment);
    
    this.setState({ comment: '', user: '', checkedB: false });
  }

  render() {
    const { comment, user } = this.state;
    return (
      <div>
        <h4>Comment Box</h4>
        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          <div>
            <textarea 
              id="commentbox" 
              value={comment}
              onChange={this.handleChange('comment')}
            />
          </div>
          <div>
            <input
              id='user'
              value={user}
              onChange={this.handleChange('user')}
            />
          </div>
          <div>
            <button 
              type="submit">
              Submit Comment
            </button>
          </div>
        </form>
        <button id='fetchComments' onClick={this.props.fetchComments}>
          Fetch Comments
        </button>
      </div>
    )
  }
}

export default authenticated(CommentBox)