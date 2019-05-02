
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button} from 'react-native';
import ImagePicker from 'react-native-image-picker'

export default class Photo extends Component {

  choosePhoto = () => {
    console.log('here')
    const options = {}
    ImagePicker.launchImageLibrary(options, response => {
      console.log("response", response)
    })
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button 
          title='Choose Photo'
          onPress={this.choosePhoto}/>
      </View>
    )
  }
}