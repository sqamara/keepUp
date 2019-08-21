import React, { Component } from 'react';
import { ScrollView, SafeAreaView, View, TextInput, Text } from 'react-native';
import {NavigationEvents} from 'react-navigation';                
import {PersistentListSingleton} from '../utils/PersistentListSingleton';

export default class NoteScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { item: this.props.navigation.getParam('item', {}) }
    }
    render() {
        return (
            <ScrollView> 
                 <NavigationEvents
                    onWillBlur={() => {
                        PersistentListSingleton.set(this.state.item);
                        PersistentListSingleton.save();
                    }}
                  />
                  <TextInput
                     editable = {true}
                     multiline = {true}
                     autofocus = {true}
                     onChangeText={(text) => {
                         let update = this.state.item;
                         update.note = text;
                         this.setState({item: update});
                     }}
                     value={this.state.item.note}
                 />
            </ScrollView>
        );
    }
}

