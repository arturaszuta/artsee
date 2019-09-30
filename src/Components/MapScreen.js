import React from "react";
import { Container, Content, Text, Button, Header, Left, Right, Body} from 'native-base';

const MapScreen = ({navigation}) => {
  navigationOptions = {
    title: 'Map'
  };

   return (
    <Container>
       <Header style={{backgroundColor:'dodgerblue'}}>
        <Left style={{flex:1}}/>
        <Body style={{flex:1, alignItems:'center', justifyContent: "center"}}>
          <Text style={{color:'#fdfffc', fontWeight:'bold', fontSize:18}}>Map</Text>
        </Body>
        <Right style={{flex:1}}/>
      </Header>
      <Content
        contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text>Map Screen</Text>
      </Content>
    </Container>
  );
};
export default MapScreen;