import React, { Component } from 'react';
import {
    Image,
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View          // Container component
} from 'react-native';
import GenerateArt from '../../assets/icons/GenerateArt';
import Swiper from '../../helpers/Swiper';

class Onboarding extends Component {
  render() {
    return (
      <Swiper>
        {/* First screen */}
        <View style={styles.slide }>
          {/* <Icon name="ios-nutrition" {...iconStyles} /> */}
          {/* <View style={{width: "70%", aspectRatio:1, alignItems:'center', borderColor:'#000000', borderWidth:1}}>
            <GenerateArt />   
          </View> */}
            <Image source={require('../../assets/GenerateArt.png')} style={{width: "50%", maxHeight:300, aspectRatio:1}}/>
            <Text style={styles.header}>Generate AI Art</Text>
            <Text style={styles.text}>Imagine - AI Art can generate art in just 10 seconds with just a text input.</Text>
        </View>
        {/* Second screen */}
        <View style={styles.slide}>
          {/* <Icon name="ios-cloud-upload" {...iconStyles} /> */}
          <Image source={require('../../assets/SaveArt.png')} style={{width: "50%", maxHeight:300, aspectRatio:1}}/>
          <Text style={styles.header}>Save, Download and Share</Text>
          <Text style={styles.text}>With <Text style={{fontWeight:'bold'}}>Imagine - AI Art</Text> you can save your generated art, download it and even share with friends.</Text>
        </View>
        {/* Third screen */}
        <View style={styles.slide}>
          {/* <Icon name="ios-heart" {...iconStyles} /> */}
          <Image source={require('../../assets/NoSignup.png')} style={{width: "50%", maxHeight:300, aspectRatio:1}}/>
          <Text style={styles.header}>No Signup Required</Text>
          <Text style={styles.text}>You do not need to have an account with us in order to use out app. Just enter and start turning your imaginations into beautiful art.</Text>
        </View>
      </Swiper>
    );
  }
}

export default Onboarding;

const iconStyles = {
  size: 100,
};

const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1,                    // Take up all screen
    justifyContent: 'center',   // Center vertically
    alignItems: 'center',       // Center horizontally
  },
  // Header styles
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  // Text below header
  text: {
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: 'center',
  },
});