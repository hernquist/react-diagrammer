import React, { Component } from "react";
// import { graphql } from "react-apollo";
// import { GET_AUTH_USER } from "../../graphql/queries";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default WrappedComponent => {
  class Notifications extends Component {
    createNotification = (type, message, info, details, time = 3000, callback) => () => {
      switch (type) {
        case 'info':
          NotificationManager.info(info, message, time );
          break;
        case 'success':
          NotificationManager.success(info, message, time);
          break;
        case 'warning':
          NotificationManager.warning(info, message, time);
          break;
        case 'error':
          NotificationManager.error(info, message, time, () => {
            alert('callback');
          });
          break;
      };
    }

    render() {
      return (
        <div>
          <WrappedComponent createNotification={this.createNotification}/>
          <NotificationContainer />
        </div>
      );
    }
  }

  return Notifications
};
