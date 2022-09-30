import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

class Signed extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Signed</Text>
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

export default Signed;