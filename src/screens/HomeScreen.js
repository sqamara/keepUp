import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, Alert, Linking} from 'react-native';
import { ListItem } from 'react-native-elements';
import { SafeAreaView } from 'react-native';
import PersistentList from '../utils/PersistentList';
import { AppConstants } from './Settings';
import { Notifications} from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Scheduler from '../notifications/Scheduled';
import Updater from '../utils/Updater';

var priority_matrix = require('../../scripts/output.json');

export default class AddScreen extends React.Component {
  async componentDidMount() {
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (Constants.isDevice && result.status === 'granted') {
      console.log('Notification permissions granted.');
    }

    Notifications.addListener(this._handleNotification);
    
    //this.persistenList.removeAll(this._onLoadComplete.bind(this))
    this._update();
    
  }

  // not necessary but kinda nice for watching updates
  _handleNotification = ({ origin, data }) => {
    this._update();
  };

  _onLoadComplete() {
    this.setState({
      que: this.persistenList.getList(),
    });
  }

  _displayItemOrder(a, b) {
    return b.daysSince / b.frequency - a.daysSince / a.frequency;
  }

  _update(force) {
    // dailyUpdate(() => this.persistenList.load(this._onLoadComplete.bind(this)));
    Updater.checkAndUpdateList(this.persistenList.getList(), force).then((updatedList) => {
      updatedList.forEach((item) => {
        this.persistenList.set(item);
      });
      this.persistenList.save(this._onLoadComplete.bind(this));
    });
  }
  _promptForReset(item) {
    Alert.alert(
      item.name,
      '',
      [
        {
            text: 'Call',
            onPress: () => {
                Linking.openURL('tel:'+item.phoneNumbers[0].number);
            }
        },
        {
            text: 'Text',
            onPress: () => {
                Linking.openURL('sms:'+item.phoneNumbers[0].number);
            }
        },
        {
            text: 'Note',
            onPress: () => {
                this.props.navigation.navigate('Note', {item: item})
            }
        },
        { 
            text: 'Reset', 
            onPress: () => {
                item.daysSince = 0;
                this.persistenList.set(item);
                this.persistenList.save(this._onLoadComplete.bind(this));
            } 
        },
        {text: 'Cancel'}
      ],
      { cancelable: false }
    );
  }

  constructor(params) {
    super(params);
    this.state = { que: [] };
    this.persistenList = new PersistentList(
      AppConstants.MasterListID,
      this._update.bind(this)
    );

    // Scheduler.scheduleNotification();
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ flex: 1 }}>
          <Text>Home World!</Text>
          <Button
            title="Go to Add"
            onPress={() => this.props.navigation.navigate('Add')}
          />

          <FlatList
            data={this.state.que.sort(this._displayItemOrder)}
            renderItem={({ item }) => (
              <ListItem
                leftAvatar={{
                  source: item.imageAvailable
                    ? { uri: item.image.uri }
                    : undefined,
                }}
                title={item.name}
                subtitle={
                  item.daysSince.toString() + ' ' + item.frequency.toString()
                }
                onLongPress={() => this.props.navigation.navigate('Edit', {item: item})}
                onPress={() => {this._promptForReset(item)}}
              />
            )}
            keyExtractor={item => item.id}
            // ItemSeparatorComponent={this.renderSeparator}
            // ListHeaderComponent={this.renderHeader}
          />
          <Button
            title="REMOVE ALL"
            onPress={() =>
              this.persistenList.removeAll(this._onLoadComplete.bind(this))
            }
          />
          <Button
            title="USE TEST DATA"
            onPress={() => {
              this.persistenList.removeAll(
                function() {
                  this._onLoadComplete();
                  this.persistenList.cachedList = require('../../assets/data/test_people.json');
                  this.persistenList.save(this._onLoadComplete.bind(this));
                }.bind(this)
              );
            }}
          />
          <Button title="CHECK UPDATE" onPress={() => this._update()} />
          <Button title="FORCE UPDATE" onPress={() => this._update(true)} />
        </View>
      </SafeAreaView>
    );
  }
}
