import React from "react"
import { Container, Content, Text, Button, Header, Left, Right, Body, Spinner} from "native-base";
import { View, TouchableOpacity, Image, Platform, TouchableHighlight, Modal, Dimensions } from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import Constants from "expo-constants";
import { Camera } from "expo-camera";
import Icon from "react-native-vector-icons/MaterialIcons";
import { NavigationEvents } from "react-navigation";

import { setConfigurationAsync } from "expo/build/AR";

export default class CameraScreen extends React.Component {

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    photo: null,
    location: null,
    errorMessage: null,
    view: null,
    loaded: true,
    modalVisible: false,
    data: {}
  };

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage: "Oops, this will not work on Sketch in an Android emulator. Try it on your device!",
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied",
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  async postData(data) {
    data.latitude = this.state.location.coords.latitude;
    data.longitude = this.state.location.coords.longitude;
    console.log(data);
    fetch("https://artsee-back-end.herokuapp.com/arts", {
      method: "POST",
      headers: {
        Accept: "application/json",
      "Content-Type": "application/json"},
      body: JSON.stringify(data)
    }).then((response) => response.json()).then(res => {
      this.props.setArts(user.id)
    });           
  }


  async snapPhoto() {

    const { user } = this.props;

    this.setState({ view: "takingPhoto" });

    const titleArray = [
      "those eyes, tho!",
      "bliss in an instant",
      "what's my age again?",
      "ossum possum",
      "forget Instagram, we got artsee!",
      "the difference between stupidity and genius is that genius has its limits.",
      "'I have a hunger that only hands can satisfy'...'Kaaaarl'",
      "real eyes realize real lies",
      "love this!",
      "love at first glimpse",
      "lovin' this spray life",
      "'git gud' - Abraham Lincoln",
      "life is goooood",
      "time flies when you're sprayin'",
      "git force push!",
      "artsee is life"
    ]

    let data = {
      user_id: user.id,
      art_type: "graffiti",
      title: titleArray[Math.floor(Math.random()*titleArray.length)]
    }       

    if (this.camera) {
       console.log("Taking photo");
       const options = { 
         quality: 0.5, 
         base64: true, 
         fixOrientation: true, 
         exif: true, 
         autoFocus: false,
      };
      await this.camera.takePictureAsync(options).then(photo => {
          this.setState({ view: "success" }) ;
          photo.exif.Orientation = 1;
          console.log(photo);
          data.file = photo.base64;
          this.setState({ data: data })
          this.setState({ photo: "data:image/jpg;base64," + photo.base64 })
          this.setState({ modalVisible: true }) ;
      });     
    }
  }


  render() {
    const screenHeight = Math.round(Dimensions.get("window").height);
    const screenWidth = Math.round(Dimensions.get("window").width);
    const { loaded } = this.state;
    const { view } = this.state;
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1, width: "100%" }}>
          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
            <Image source= {{ uri : this.state.photo}} style={{ width: screenWidth, height: screenHeight * 0.85 }}>
            </Image>
            <Button
            style={{ backgroundColor: "lightgreen" }} 
            onPress={() => {
              this.postData(this.state.data);
              this.setState({ modalVisible : false})}}>
              <Text>
                Looks Good!
              </Text>
            </Button>
            <Button
            style={{ backgroundColor: "pink" }} 
            onPress={() => {
              this.setState({ modalVisible : false})
              }}>
              <Text>
                Take another one!
              </Text>
            </Button>
          </Modal>
           <NavigationEvents
            onWillFocus={payload => this.setState({loaded: true})}
            onDidBlur={payload => this.setState({loaded: false})}/>
          {loaded && (
          <Camera 
          style={{ flex: 1 }}
          ratio="16:9" 
          type={this.state.type}
          ref={ref=>{
            this.camera = ref
          }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row",
              }}>
                
              {/* <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: "flex-end",
                  alignItems: "center",
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}> Flip </Text>
              </TouchableOpacity> */}
              

              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: "flex-end",
                  alignItems: "center",
                }}
                >
                <Button style={{ width: 75, alignItems: "center", flex: 0.09, backgroundColor: "white", borderRadius: 500, marginBottom: 10 }}
                onPress={this.snapPhoto.bind(this)}>
                  {view === "takingPhoto" && (
                    <Spinner color="blue" size={50} style={{marginLeft: 12.5}} />
                    )}
                    {view !== "takingPhoto" && (
                      <Icon name="camera" size={ 50 } color="black" style={{ marginLeft: 12.5 }} /> 
                    )}
                </Button>
              </TouchableOpacity>
            </View>
          </Camera> )} 
        </View>
      );
    }
  }

}