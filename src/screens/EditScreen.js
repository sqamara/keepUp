import React from 'react';
import { StyleSheet, Text, View, Button, Image} from 'react-native';
import { SafeAreaView } from 'react-native';
import PersistentList from '../utils/PersistentList'
import { MasterListId } from './Settings'
import NumericInput from 'react-native-numeric-input'


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
            allowSave: false,
            item: updateItem,
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
            this.persistenList.save(() => { this.props.navigation.replace('Home') });
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ flex: 1 }}>
                    <Text>Edit World!</Text>
                    <Text>{this.state.item.name}</Text>
                    <Image source={(this.state.item.imageAvailable? {uri: this.state.item.image.uri} : undefined)} style={{width: 200, height: 200, borderRadius: 200/ 2}} />
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
                    <Button
                        title="Save"
                        onPress={this._onSave.bind(this)}
                    />
                </View>
            </SafeAreaView>
        );
    }
}