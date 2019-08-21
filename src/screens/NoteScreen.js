import React, { Component } from 'react';
import { ScrollView, SafeAreaView, View, TextInput, Text } from 'react-native';


export default class NoteScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { item: this.props.navigation.getParam('item', {}) }
    }
    render() {
        return (
            <View>
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
            </View>
        );
    }
}

