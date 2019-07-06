import React from 'react';
import { StyleSheet, Text, View, FlatList, Button  } from 'react-native';
import { ListItem } from 'react-native-elements';
import { SafeAreaView } from 'react-native';
import PersistentList from '../utils/PersistentList'
import {MasterListId} from './Settings'

import dailyUpdate from '../utils/dailyUpdate'

var priority_matrix = require('../../scripts/output.json')

export default class AddScreen extends React.Component {
    constructor(params) {
        super(params)
        this.state = { que: [] }
        this.persistenList = new PersistentList(MasterListId, this._onLoadComplete.bind(this));
    }

    _onLoadComplete() {
        this.setState({
            que: this.persistenList.getList()
        });
    }

    _displayItemOrder(a,b) {
        return b.daysSince/b.frequency-a.daysSince/a.frequency;
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
                            leftAvatar={{source: (item.imageAvailable? {uri: item.image.uri} : undefined)}}
                            title={item.name}
                            subtitle={ (item.daysSince).toString() + " " + item.frequency.toString()}
                            />
                        )}
                        keyExtractor={item => item.id}
                        // ItemSeparatorComponent={this.renderSeparator}
                        // ListHeaderComponent={this.renderHeader}
                        />
                <Button title="REMOVE ALL" onPress={() => this.persistenList.removeAll(this._onLoadComplete.bind(this))}/>
                <Button title="USE TEST DATA" onPress={() => {
                    this.persistenList.removeAll(function() {
                        this._onLoadComplete();
                        this.persistenList.cachedList = require('../../assets/data/test_people.json');
                        this.persistenList.save(this._onLoadComplete.bind(this));
                    }.bind(this));
                }}/>
                <Button title="DAILY UPDATE" onPress={() => {dailyUpdate(() => this.persistenList.load(this._onLoadComplete.bind(this)));}}/>
                </View>
            </SafeAreaView>
        );
    }
}
