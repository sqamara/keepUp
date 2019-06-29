import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SafeAreaView } from 'react-native';
import PersistentList from '../utils/PersistentList'
import {MasterListId} from './Settings'


export default class AddScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allowSave: false,
            item: this.props.navigation.getParam('item', {})
        }
        this.persistenList = new PersistentList(MasterListId, this._onLoadComplete.bind(this));
    }

    _onLoadComplete() {
        this.setState({
            allowSave: true
        });
    }

    _onSave() {
        if (this.state.allowSave == true) {
            this.persistenList.set(this.state.item);
            this.persistenList.save(() => {this.props.navigation.replace('Home')});
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ flex: 1 }}>
                <Text>Edit World!</Text>
                <Text>{this.state.item.name}</Text>
                    <Button
                        title="Save"
                        onPress={this._onSave.bind(this)}
                    />
                </View>
            </SafeAreaView>
        );
    }
}