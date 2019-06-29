import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SafeAreaView } from 'react-native';


export default class AddScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ flex: 1 }}>
                    <Text>Home World!</Text>
                    <Button
                        title="Go to Add"
                        onPress={() => this.props.navigation.navigate('Add')}
                    />
                </View>
            </SafeAreaView>
        );
    }
}