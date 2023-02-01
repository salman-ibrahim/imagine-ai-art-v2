import React, { useEffect } from 'react';
import { Button, Card, Divider, Icon, Input, Layout, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { ThemeContext } from '../../Theme/theme-context';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
// import SocialAuth from '../../components/SocialAuth';
import { loginWithEmailAndPassword } from '../../helpers/firebaseAuth';
import ErrorModal from '../../modals/ErrorModal';
import InfoModal from '../../modals/InfoModal';
import { strings } from '../../values/strings';
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';
import { setAuthenticationStatusAction } from '../../store/actions/userActions';
import { connect } from 'react-redux';
import {default as axios} from '../../config/axiosConfig';

const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline'/>
);

const Login = (props) => {

    const { navigation, setAuthenticationStatusAction } = props;

    const styles = useStyleSheet(themedStyles)
    const navigator = useNavigation();

    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [errorVisible, setErrorVisible] = React.useState(false);
    const [infoVisible, setInfoVisible] = React.useState(false);
    const [infoMessage, setInfoMessage] = React.useState('');

    const themeContext = React.useContext(ThemeContext);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: '',
        }
      });

    const navigateSignup = () => {
        navigation.navigate('Signup');
    };

    const navigateReset = () => {
        navigation.navigate('Reset');
    };

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderEyeIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
          <Icon {...props} name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}/>
        </TouchableWithoutFeedback>
    );
    
    const renderEmailIcon = (props) => (
        <Icon {...props} name='email-outline'/>
    );
    
    const renderPasswordIcon = (props) => (
        <Icon {...props} name='lock-outline'/>
    );

    const renderUnlockIcon = (props) => (
        <Icon {...props} name='unlock-outline'/>
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

    const handleLogin = (data) => {
        console.log('Login', data);

        let email = data.email;
        let password = data.password;

        loginWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential?.user;

            if (user.emailVerified) {
                setAuthenticationStatusAction(true);
            }
            else if (user.emailVerified === false){
                setInfoMessage(strings.accountNotVerified);
                setInfoVisible(true);
            }
            else {
                setErrorMessage(strings.somethingWentWrong);
                setErrorVisible(true);
            }
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            if(errorCode === 'auth/wrong-password'){
                setErrorMessage(strings.wrongPassword);
                setErrorVisible(true);
            }
            else if(errorCode === 'auth/user-not-found'){
                setErrorMessage(strings.userNotFound);
                setErrorVisible(true);
            }
            else if(errorCode === 'auth/invalid-email'){
                setErrorMessage(strings.invalidEmail);
                setErrorVisible(true);
            }
            else if(errorCode === 'auth/user-disabled'){
                setErrorMessage(strings.accountDisabled);
                setErrorVisible(true);
            }
            else if(errorCode === 'auth/too-many-requests'){
                setErrorMessage(strings.tooManyRequests);
                setErrorVisible(true);
            }
            else {
                setErrorMessage(strings.somethingWentWrong+" "+errorMessage);
                setErrorVisible(true);
            }
        })
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
                    <Text category='h1' style={styles.title}>Login</Text>
                    
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

                    {/* Password Controller */}
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                            minLength: {
                                value: 8,
                                message: 'Password must have at least 8 characters'
                            }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input 
                                style={styles.input} 
                                value={value}
                                placeholder='Password'
                                // caption={renderCaption}
                                accessoryLeft={renderPasswordIcon}
                                accessoryRight={renderEyeIcon}
                                secureTextEntry={secureTextEntry}
                                onChangeText={value => onChange(value)}
                                onBlur={onBlur}
                            />
                        )}
                        name="password"
                    />
                    {errors.password && <Text>{errors.password.message.length ? errors.password.message : "Password must not be empty"}</Text>}

                    <Text onPress={navigateReset} style={styles.resetLink}>Forgot Password?</Text>
                    <Button style={styles.button} appearance='outline' status='control' accessoryLeft={renderUnlockIcon} onPress={handleSubmit(handleLogin)}>Login</Button>
                    <Text style={styles.formText}>Don't have an account? <Text style={styles.link} onPress={navigateSignup}>Signup</Text></Text>
                <ErrorModal message={errorMessage} visible={errorVisible} toggle={toggleErrorModal} />
                <InfoModal message={infoMessage} visible={infoVisible} toggle={toggleInfoModal} />
                </View>
        </Layout>
    );
};

const mapDispatchToProps = {setAuthenticationStatusAction}
export default connect(null, mapDispatchToProps)(Login);

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
        marginVertical: 10
    },
    link: {
        marginVertical: 10,
        color: 'color-basic-100',
        textDecorationLine: 'underline',
    },
    resetLink: {
        marginVertical: 10,
        color: 'color-basic-100',
        textDecorationLine: 'underline',
        alignSelf: 'flex-end'
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
