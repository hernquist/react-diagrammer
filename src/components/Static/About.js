import React, { Fragment } from "react";

const About = () => (
  <Fragment>
    <h2>React Tree Maker</h2>
    <p style={{ fontSize: "20px" }}>
      When I was an coding instructor, teaching React to aspiring developers, I
      ran into a common problem: the so-called React Learning Curve. I wanted
      the students to diagram their React App's tree diagram so they could
      visualize the uni-directional data flow. At first, I thought the problem
      was conceptual: they didn't understand that props were read-only, didn't
      get the syntax involved with callbacks, etc. To me the primary problem lay
      in their inability to see the tree structure they were creating. How can a
      dev understand what is props and what is state if the dev can't see where
      in the application he or she coding. Let alone to understand that the
      problem you're trying to solve can either be promoted or encumbered by the
      architetural design of your application.
    </p>
    <p style={{ fontSize: "20px" }}>
      No matter how many models I made for them or how hard I encouraged (or
      demanded) that they take the time to diagram their apps, before coding
      them, they refused to follow my guidance. So I decided to solve this
      problem by creating the React Tree Maker to help them place state, props
      and state-changing callbacks in their applications.
    </p>
    <p style={{ fontSize: "20px" }}>
      <b>Coming Soon...</b> React Tree Maker will have the ability to create
      react boilerplate based on the user tree diagram!
    </p>
  </Fragment>
);

export default About;
