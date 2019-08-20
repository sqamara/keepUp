import { Notifications} from 'expo';

let helpers = function () { };

helpers.scheduleNotification = function() {
    Notifications.cancelAllScheduledNotificationsAsync()

    const localNotification = {
      title: 'Who should you call today?',
      body: 'Check in to see'
    }
    // todo update scheduling with settings
    const schedulingOptions = {
      repeat: 'minute'
    }

    console.log('Scheduling delayed notification:', { localNotification, schedulingOptions })

    Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
      .then(id => console.info(`Delayed notification scheduled (${id})`))
      .catch(err => console.error(err))
  }

 export default helpers;