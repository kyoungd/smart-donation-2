import React, { Component } from 'react'
import noauth from 'hoc/noauth.js'

class CommentList extends Component {
  renderComments() {
    return this.props.comments.map(comment => (<li key={comment}>{comment}</li>));
  }
  render() {
    return (
      <div>
        <h4>Comment List</h4>
        <ul>
        { this.renderComments() }
        </ul>
      </div>
    )
  }
}

export default noauth(CommentList);
