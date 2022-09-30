import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

class Proceeding extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Proceeding</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default Proceeding;