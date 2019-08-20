import PersistentList from './PersistentList';
import { AppConstants } from '../screens/Settings';
import { AsyncStorage } from 'react-native';

const updater = {
  async setupParam() {
    await AsyncStorage.setItem(AppConstants.LastUpdateDateID, new Date().toString(), (error) => {
      if (error) 
        console.log(error)
      else
        console.log('set LastUpdateDateID')
    });
    await AsyncStorage.setItem(AppConstants.LastUpdateRemainderID, '0', (error) => {
      if (error) 
        console.log(error)
      else
        console.log('set LastUpdateRemainderID')
    });
  },


  async checkAndUpdateList(items, force) {

    // await this.setupParam();

    var lastUpdateDate = null;
    var lastUpdateRemainder = null;
    try {
      await AsyncStorage.getItem(AppConstants.LastUpdateDateID, (error, result) => {
        if (error) 
          console.log(error)
        else {
          lastUpdateDate = result;
        }
      });
      await AsyncStorage.getItem(AppConstants.LastUpdateRemainderID, (error, result) => {
        if (error) 
          console.log(error)
        else {
          lastUpdateRemainder = result;
        }
      });
    } catch (error) {
      console.log(error);
      return items;
    }

    if (lastUpdateDate == null) 
      lastUpdateDate = new Date().toString();
    if (lastUpdateRemainder == null)
      lastUpdateRemainder = '0';

    let now = new Date();
    let then = new Date(lastUpdateDate);

    let dayInMili = 86400000;
    let minInMili = 60000;

    let toAdd = Math.floor((now - then + parseInt(lastUpdateRemainder)) / minInMili);
    let newRemainder = (now - then + parseInt(lastUpdateRemainder)) % minInMili;
    

    if (force) {
        toAdd = 1;
        newRemainder = 0;
    }
    // console.log('lastUpdateDate', lastUpdateDate)
    // console.log('lastUpdateRemainder', lastUpdateRemainder)
    // console.log('now', now)
    // console.log('then', then)
    // console.log('toAdd', toAdd)
    // console.log('newRemainder', newRemainder)

    await AsyncStorage.setItem(AppConstants.LastUpdateDateID, now.toString(), (error) => {
      if (error) 
        console.log(error)
    });
    await AsyncStorage.setItem(AppConstants.LastUpdateRemainderID, newRemainder.toString(), (error) => {
      if (error) 
        console.log(error)
    });

    items.forEach(item => {
      item.daysSince += toAdd;
    });

    return items;
  }

};

export default updater;
