import React, { Component } from 'react';

class NoStateAllowed extends Component {
  render() {
    return (
      <div>
        NO STATE ALLOWED
        <button
          className="dashboard-button"
          onClick={this.props.exit}
        >
          DONE
        </button>
      </div>
    );
  }
}

export default NoStateAllowed;