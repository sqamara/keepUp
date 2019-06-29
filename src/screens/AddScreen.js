
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SafeAreaView } from 'react-native';
import SearchableFlatList from '../SearchableList';

export default class AddScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <Button
                    title="Go to Edit"
                    onPress={() => this.props.navigation.navigate('Edit')}
                />
                <SearchableFlatList />

            </SafeAreaView>
        );
    }
}