import React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native';
import { PersistentListSingleton } from '../utils/PersistentListSingleton';
import { AppConstants } from './Settings';
import NumericInput from 'react-native-numeric-input'
import {StackActions, NavigationActions} from 'react-navigation';                


export default class AddScreen extends React.Component {
    constructor(props) {
        super(props);
        updateItem = this.props.navigation.getParam('item', {})
        if(typeof(updateItem.daysSince) === "undefined"){
            updateItem.daysSince = 0
        }
        if(typeof(updateItem.frequency) === "undefined"){
            updateItem.frequency = 7
        }
        this.state = {
            item: updateItem,
        }
    }

    _onSave() {
        PersistentListSingleton.set(this.state.item);
        PersistentListSingleton.save(() => { this._goHome() });
    }

    _onDelete() {
        PersistentListSingleton.remove(this.state.item.id);
        PersistentListSingleton.save(() => { this._goHome() });
    }

    _goHome() {
        const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({ routeName: 'Home'})
            ] })
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps='handled'>
                    <Text>Edit World!</Text>
                    <Text>{this.state.item.name}</Text>
                    <Image source={(this.state.item.imageAvailable ? {uri: this.state.item.image.uri } : require("../../assets/images/filled.png"))} style={{width: 200, height: 200, borderRadius: 200/ 2}} />
                    <Text>Primary Phone</Text>
                    <Text>Days Since </Text>
                    <NumericInput min={0} value={this.state.item.daysSince} onChange={(value) => {
                        let update = this.state.item;
                        update.daysSince = value;
                        this.setState({item: update})}
                    } />
                    <Text>Frequency</Text>
                    <NumericInput min={0} value={this.state.item.frequency} onChange={(value) => {
                        let update = this.state.item;
                        update.frequency = value;
                        this.setState({item: update})}
                    } />
                    <Text>Note</Text>
                    <TextInput
                        editable = {true}
                        multiline = {true}
                        numberOfLines = {5}
                        onChangeText={(text) => {
                            let update = this.state.item;
                            update.note = text;
                            this.setState({item: update});
                        }}
                        value={this.state.item.note}
                    />
                    <Button
                        title="Save"
                        onPress={this._onSave.bind(this)}
                    />                    
                    <Button
                    title="Delete"
                    onPress={this._onDelete.bind(this)}
                />
                </ScrollView>
            </SafeAreaView>
        );
    }
}
