import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import SearchableFlatList from './src/SearchableList';


export default class App extends React.Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <SearchableFlatList />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
