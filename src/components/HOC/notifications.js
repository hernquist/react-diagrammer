import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import messageBuilder from '../../helpers/messages';


export default WrappedComponent => {
  class Notifications extends Component {
    createNotification = (type, _message, _title, details, _time, _cb) => () => {
      const { 
        message, 
        title, 
        time, 
        cb,
        priority 
      } = messageBuilder(type, _message, _title, details, _time, _cb)
      
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
        default:
          console.log(type);
          break;
      };
    }

    render() {
      return (
        <div>
          <WrappedComponent {...this.props} createNotification={this.createNotification}/>
          <NotificationContainer />
        </div>
      );
    }
  }

  return Notifications
};
