import React from "react";
import HeaderContainer from "../Header/HeaderContainer";
import LoginForm from "../Auth/LoginForm";
import SignupForm from "../Auth/SignupForm";
import LogoutForm from "../Auth/LogoutForm";
import Polling from "../Polling/Polling";
import notifications from "../HOC/notifications";
import { Layout } from "styles";

const NotLoggedIn = props => {
  const { url } = props.match;
  const renderAuth =
    url === "/logout" ? (
      <LogoutForm {...props} />
    ) : url === "/signup" ? (
      <SignupForm {...props} />
    ) : (
      <LoginForm {...props} />
    );
  const visible = url !== "/logout";

  return (
    <Layout>
      <div className="logged-out">
        <div className="header">
          <HeaderContainer {...props} />
        </div>
        <div className="diagram">
          <Polling visible={visible} />
        </div>
        <div className="right-dashboard">{renderAuth}</div>
      </div>
    </Layout>
  );
};

export default notifications(NotLoggedIn);
