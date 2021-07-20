import React from 'react';
import Search from './Components/Search';
import Navigation from './Navigation/Navigation';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'


import { StyleSheet, Text, View } from 'react-native';
// import Navigation from './Navigation/Navigation';

//  #F26627
//  #F9A26C
//  #EFEEEE
//  #9BD7D1
//  #325D79
// https://github.com/vhpoet/react-native-styling-cheat-sheet#flexbox
// https://digitalsynopsis.com/wp-content/uploads/2018/06/flat-color-palettes-6.png
// https://reactnative.dev/docs/text.html#props

export default function App() {
  return (
    <View style={styles.container}>

      <Provider store={Store}>
        <Navigation/>
      </Provider>      
      {/* <Text style={styles.text}>La formation commence</Text> */}
      {/* <Search/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#325D79',
    // padding: 15,
    // justifyContent: 'center',
  },
  text:{
    padding: 15,
    justifyContent: 'center',
    textAlign: 'center',
    fontSize : 25
  }
});
