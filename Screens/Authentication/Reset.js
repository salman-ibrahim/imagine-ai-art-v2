import React from 'react';
import { Button, Card, Divider, Icon, Input, Layout, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { ThemeContext } from '../../Theme/theme-context';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
// import { loginWithEmailAndPassword, resetPassword } from '../../helpers/firebaseAuth';
import ErrorModal from '../../modals/ErrorModal';
import InfoModal from '../../modals/InfoModal';
import { strings } from '../../values/strings';
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';


const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline'/>
);

const Reset = (props) => {
    const { navigation, setAuthenticationStatusAction } = props;

    const [errorMessage, setErrorMessage] = React.useState('');
    const [errorVisible, setErrorVisible] = React.useState(false);
    const [infoVisible, setInfoVisible] = React.useState(false);
    const [infoMessage, setInfoMessage] = React.useState('');

    const styles = useStyleSheet(themedStyles)
    const themeContext = React.useContext(ThemeContext);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
        }
      });

    const navigateLogin = () => {
        navigation.navigate('Login');
    };
    
    const renderEmailIcon = (props) => (
        <Icon {...props} name='email-outline'/>
    );

    const renderRightArrowIcon = (props) => (
        <Icon {...props} name='arrow-circle-right-outline'/>
    );

    const renderCaption = () => {
        return (
          <View style={styles.captionContainer}>
            {AlertIcon(styles.captionIcon)}
            <Text style={styles.captionText}>Should contain at least 8 symbols</Text>
          </View>
        )
    }

    const toggleErrorModal = () => {
        setErrorVisible(!errorVisible);
    }

    const toggleInfoModal = () => {
        setInfoVisible(!infoVisible);
    }

    const handleReset = (data) => {
        console.log('Reset', data);

        let email = data.email;

        // resetPassword(email)
        //     .then((resp) => {
        //         setInfoMessage(strings.resetPasswordEmailSent);
        //         setInfoVisible(true);
        //     })
        //     .catch((error) => {
        //         var errorCode = error.code;
        //         var errorMessage = error.message;

        //         if (errorCode === 'auth/invalid-email') {
        //             setErrorMessage(strings.invalidEmail);
        //             setErrorVisible(true);
        //         } else if (errorCode === 'auth/user-not-found') {
        //             setErrorMessage(strings.userNotFound);
        //             setErrorVisible(true);
        //         }
        //         else {
        //             setErrorMessage(strings.somethingWentWrong+" "+errorMessage);
        //             setErrorVisible(true);
        //         }
        //     })
    }

    return (
        <Layout style={styles.layout}>
            {/* <Text category={'h4'}>Login</Text>
            <Button onPress={navigateDetails}>Signup</Button>
            <Button style={{ marginVertical: 4 }} onPress={themeContext.toggleTheme}>TOGGLE THEME</Button> */}
                <View style={styles.card}>
                    <View style={styles.logo}>
                        <Image source={require('../../assets/adaptive-icon.png')} style={styles.icon}/>
                    </View>
                    <Text category='h1' style={styles.title}>Reset Password</Text>
                    
                    {/* Email Controller */}
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'invalid email address'
                            }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input 
                            style={styles.input} 
                            value={value}
                            placeholder='Email' 
                            accessoryLeft={renderEmailIcon}
                            onChangeText={value => onChange(value)}
                            onBlur={onBlur}
                            autoCapitalize = 'none'
                        />
                        )}
                        name="email"
                    />
                    {errors.email && <Text>{errors.email.message.length ? errors.email.message : "Email is required"}</Text>}

                    <Button style={styles.button} appearance='filled' status='info'  accessoryRight={renderRightArrowIcon} onPress={handleSubmit(handleReset)}>Reset</Button>
                    <Text style={styles.formText}>Back to <Text style={styles.link} onPress={navigateLogin}>Login</Text></Text>
                    <ErrorModal message={errorMessage} visible={errorVisible} toggle={toggleErrorModal} />
                    <InfoModal message={infoMessage} visible={infoVisible} toggle={toggleInfoModal} />
                </View>
        </Layout>
    );
};

export default Reset;

const themedStyles = StyleService.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        margin: 20,
    },
    logo: {
        position:'absolute',
        top: -50,
        alignSelf: 'center',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'color-basic-800',
        shadowOpacity: 0.5,
        backgroundColor: 'color-basic-100',
        padding: 10,
        borderRadius:15,
        elevation: 5,
    },
    card: {
        position:'relative',
        padding: 16,
        paddingTop: 100,
        backgroundColor: 'color-primary-500',
        borderRadius:20
    },
    icon: {
        height: 100,
        aspectRatio: 1,
    },
    title: {
        fontWeight: 'bold',
        color: 'color-basic-100',
        marginVertical: 10,
    },
    input: {
        color: 'color-basic-100',
        marginVertical: 4,
    },
    button: {
        marginVertical: 3
    },
    link: {
        color: 'color-basic-100',
        textDecorationLine: 'underline',
    },
    formText: {
        color: 'color-basic-100',
        textAlign: 'center',
        marginTop: 10,
    },
    captionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
    captionIcon: {
        width: 10,
        height: 10,
        marginRight: 5
    },
    captionText: {
        fontSize: 12,
        fontWeight: "400",
        // fontFamily: "opensans-regular",
        color: "color-basic-100",
    }
});
