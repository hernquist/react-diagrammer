import React from 'react';

const Display = ({ visible, children }) => {
  let styles;

  if (!visible) {
    styles = { display: "none" }
  }

  return <div style={styles}>{children}</div>
}

export default Display;