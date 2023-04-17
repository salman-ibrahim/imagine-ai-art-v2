import { Image, StyleSheet, View } from 'react-native'
import { Text } from '@ui-kitten/components'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import TermsModal from '../../modals/TermsModal'
import Toast from 'react-native-toast-message'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { toastError, toastInfo } from '../../helpers/toasts'
import { storeData } from '../../helpers/secureStore'
import { useNavigation } from '@react-navigation/native'
import store from '../../store'
import { setOnboardingStatusAction } from '../../store/actions/userActions'

const OnboardingScreen = () => {

  const navigator = useNavigation()

  const [termsAgreed, setTermsAgreed] = React.useState(false)

  const handleAgreement = (agreed) => {
    setTermsAgreed(agreed)
  }

  const handleOnboardingDone = () => {
    if (!termsAgreed) {
      toastInfo('You must agree to Terms and Conditions.');
    } else {
      storeData('onboarded', 'TRUE')
      store.dispatch(setOnboardingStatusAction(true))
    }
  }

  return (
    <Onboarding
    onDone={handleOnboardingDone}
    showSkip={false}
    DoneButtonComponent={() => <TouchableOpacity onPress={handleOnboardingDone} style={{paddingHorizontal:16}}><Text style={{fontWeight:'bold'}}>Get Started</Text></TouchableOpacity>}
    pages={[
      {
        backgroundColor: '#fff',
        image:<></>,
        title: <View style={{ marginHorizontal:20}}>
                <Image source={require('../../assets/GenerateArt.png')} style={{width: "50%", maxHeight:300, aspectRatio:1, alignSelf:'center'}}/>
                <Text category='h1'>Generate AI Art</Text>
                <Text>Genarte art from text in less than 10 seconds using <Text style={{fontWeight:'bold'}}>Imagine - AI Art</Text></Text>
              </View>,
        subtitle:''
      },
      {
        backgroundColor: '#fff',
        image:<></>,
        title: <View style={{ marginHorizontal:20}}>
                <Image source={require('../../assets/SaveArt.png')} style={{width: "50%", maxHeight:300, aspectRatio:1}}/>
                <Text category='h1'>Save, Download and Share</Text>
                <Text>With <Text style={{fontWeight:'bold'}}>Imagine - AI Art</Text>, You can save your generated art for later use, download to your device and even share directly with your friends.</Text>
              </View>,
            subtitle:''
      },
      {
        backgroundColor: '#fff',
        image:<></>,
        title: <View style={{ marginHorizontal:20}}>
                <Image source={require('../../assets/NoSignup.png')} style={{width: "50%", maxHeight:300, aspectRatio:1}}/>
                <Text category='h1'>No Authentication Required</Text>
                <Text>We require absolutely no personal data to use our app. You can start generting art right away wihtout signup.</Text>
                <TermsModal handleAgreement={handleAgreement} agreement />
              </View>,
        subtitle:''
      },
    ]}
  />
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({})