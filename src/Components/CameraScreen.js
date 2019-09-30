import React, { useEffect, useState } from "react";
import { Container, Content, Text, Button, Header, Left, Right, Body} from 'native-base';
import { View, TouchableOpacity, Image, Platform } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { Camera } from 'expo-camera';
import Icon from "react-native-vector-icons/MaterialIcons";

export default class CameraScreen extends React.Component {

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    photo: null,
    location: null,
    errorMessage: null
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };


  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async postData(data) {
    fetch('https://artsee-back-end.herokuapp.com/arts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then((response) => response.json()).then(res =>res);           
  }


  async snapPhoto() {

    let data = {
      user_id: 9,
      art_type: 'graffiti',
      location: '43.653908, -79.384293',
      title: 'ossum possum'
    }       

    console.log('Button Pressed');
    if (this.camera) {
       console.log('Taking photo');
       const options = { quality: 0.5, base64: true, fixOrientation: true, 
       exif: true, 
       autoFocus: false,
      };
       await this.camera.takePictureAsync(options).then(photo => {
          photo.exif.Orientation = 1;
            console.log(photo);
            data.file = photo.base64;

            this.postData(data);  
            
              this.setState({ photo: 'data:image/jpg;base64,' + photo.base64 })
           });     
     }
    }


  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1, width: '100%' }}>
          <Text> Here is some text! </Text>
          {this.state.photo ? <View><Image 
          style={{width: 400, height: 400 }} source={{uri: this.state.photo}}/></View> : <Camera 
          style={{ flex: 1 }}
          ratio='16:9' 
          type={this.state.type}
          ref={ref=>{
            this.camera = ref
          }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              {/* <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                >
                <Button style={{ width: 75, alignItems: 'center', flex: 0.09, backgroundColor: 'white', borderRadius: 500, marginBottom: 10 }}
                onPress={this.snapPhoto.bind(this)}>
                  <Icon name='camera' size={ 50 } color='black' style={{ marginLeft: 12.5 }} /> 
                </Button>
              </TouchableOpacity>
            </View>
          </Camera> } 
        </View>
      );
    }
  }

}