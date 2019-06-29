import React from 'react';
import { StyleSheet, Text, View, FlatList, Button  } from 'react-native';
import { ListItem } from 'react-native-elements';
import { SafeAreaView } from 'react-native';
import PersistentList from '../utils/PersistentList'
import {MasterListId} from './Settings'

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
                        data={this.state.que.sort((a,b) => {return a.name.localeCompare(b.name)})}
                        renderItem={({ item }) => (
                            <ListItem
                            leftAvatar={{source: (item.imageAvailable? {uri: item.image.uri} : undefined)}}
                            title={item.name}
                            />
                        )}
                        keyExtractor={item => item.id}
                        // ItemSeparatorComponent={this.renderSeparator}
                        // ListHeaderComponent={this.renderHeader}
                        />
                </View>
            </SafeAreaView>
        );
    }
}