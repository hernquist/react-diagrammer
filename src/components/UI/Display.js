import React from 'react';

const Display = ({ visible, container, children }) => {
  if (!visible) var styles = { display: "none" };

  if (container) {
    const Container = container;
    return <Container style={styles}>{children}</Container>
  }

  return <div style={styles}>{children}</div>
}

export default Display;