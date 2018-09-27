import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import messageBuilder from '../../helpers/notifications';


export default WrappedComponent => {
  class Notifications extends Component {
    createNotification = (type, iMessage, iTitle, details, iTime, iCallback) => () => {
      const { 
        message, 
        title, 
        time, 
        cb,
        priority 
      } = messageBuilder(type, iMessage, iTitle, details, iTime, iCallback)
      switch (type) {
        case 'info':
          NotificationManager.info(message, title, time, cb, priority);
          break;
        case 'success':
          NotificationManager.success(message, title, time, cb, priority);
          break;
        case 'warning':
          NotificationManager.warning(message, title, time, cb, priority);
          break;
        case 'error':
          NotificationManager.error(message, title, time, () => {
            alert('alert');
          }, priority);
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
