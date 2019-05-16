import React, { Fragment } from "react";

const style = { fontSize: "20px" };

const About = () => (
  <Fragment>
    <h2>React Tree Maker</h2>
    <p style={style}>
      When I was an coding instructor, teaching React to aspiring developers, I
      ran into a common problem. I wanted the students to diagram their React
      App's tree diagram so they could visualize the uni-directional data flow.
      At first, I thought the problem was conceptual: they didn't understand
      that props were read-only, didn't get the syntax involved with callbacks,
      etc. But the primary problem turned out to lay in their inability to see
      the tree structure they were creating. How can a dev understand what are
      props, or what is state, if he or she can't see where in the application
      he or she is coding? How can a developer ever hope to understand that the
      problem he or she is trying to solve can be either promoted or encumbered
      by application's architetural design.
    </p>
    <p style={style}>
      No matter how many models I made for them or how hard I encouraged (or
      demanded) that they take the time to diagram their apps before coding
      them, they refused to follow my guidance. So I decided to solve this
      problem by creating the React Tree Maker to help them place state, props
      and state-changing callbacks in their applications.
    </p>
    <p style={style}>
      <b>Coming Soon...</b> React Tree Maker will have the ability to create
      react boilerplate based on the user tree diagram!
    </p>
  </Fragment>
);

export default About;
