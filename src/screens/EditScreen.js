import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SafeAreaView } from 'react-native';


export default class AddScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ flex: 1 }}>
                    <Text>Edit World!</Text>
                    <Button
                        title="Go to Home"
                        onPress={() => this.props.navigation.navigate('Home')}
                    />
                </View>
            </SafeAreaView>
        );
    }
}