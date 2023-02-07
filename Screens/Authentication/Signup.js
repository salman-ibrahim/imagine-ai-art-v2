import React from 'react';
import { Button, Card, Datepicker, Divider, Icon, Input, Layout, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { ThemeContext } from '../../Theme/theme-context';
import { Image, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import BottomSheetAdapter from '../../adapters/BottomSheetAdapter';
import TermsModal from '../../modals/TermsModal';
// import SocialAuth from '../../components/SocialAuth';
// import { registerWithEmailAndPassword } from '../../helpers/firebaseAuth';
import ErrorModal from '../../modals/ErrorModal';
import { useForm, Controller } from "react-hook-form";
import InfoModal from '../../modals/InfoModal';
import { strings } from '../../values/strings';

const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline'/>
);

const Signup = ({ navigation }) => {

    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const [bottomSheet, setBottomSheet] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [errorVisible, setErrorVisible] = React.useState(false);
    const [infoVisible, setInfoVisible] = React.useState(false);
    const [infoMessage, setInfoMessage] = React.useState('');

    const styles = useStyleSheet(themedStyles)
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            // confirmPassword: '',
            dateOfBirth: new Date()
        }
      });

    const themeContext = React.useContext(ThemeContext);

    const navigateLogin = () => {
        navigation.navigate('Login');
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

    const renderPersonIcon = (props) => (
        <Icon {...props} name='person-outline'/>
    );

    const renderCalendarIcon = (props) => (
        <Icon {...props} name='calendar'/>
    );

    const renderRightArrowIcon = (props) => (
        <Icon {...props} name='arrow-circle-right-outline'/>
    );

    const toggleErrorModal = () => {
        setErrorVisible(!errorVisible);
    }

    const toggleInfoModal = () => {
        setInfoVisible(!infoVisible);
    }

    /**
     * Signup new user
     */
    const handleSignup = (data) => {
        console.log('Signup', data);

        let email = data.email;
        let password = data.password;
        let name = data.name;
        let dob = data.dateOfBirth;
        // registerWithEmailAndPassword(email, password, name, dob)
        // .then((userCredential) => {
        //     console.log('userCredential', userCredential);
        //     var user = userCredential?.user;

        //     if(user) {
        //         setInfoMessage(strings.verificationEmailSent);
        //         setInfoVisible(true);
        //     }
        // })
        // .catch((error) => {
        //     switch (error.code) {
        //         case 'auth/email-already-in-use':
        //             setErrorMessage(strings.emailAlreadyInUse);
        //             setErrorVisible(true);
        //             break;
        //         case 'auth/invalid-email':
        //             setErrorMessage(strings.invalidEmail);
        //             setErrorVisible(true);
        //             break;
        //         case 'auth/operation-not-allowed':
        //             // console.log(`ERROR: Error during sign up.`);
        //             setErrorMessage(strings.operationNotAllowed);
        //             setErrorVisible(true);
        //             break;
        //         case 'auth/weak-password':
        //             setErrorMessage(strings.weakPassword);
        //             setErrorVisible(true);
        //             break;
        //         default:
        //             setErrorMessage(strings.somethingWentWrong);
        //             setErrorVisible(true);
        //             break;
        //       }
        // });
    }

    const renderCaption = () => {
        return (
          <View style={styles.captionContainer}>
            {AlertIcon(styles.captionIcon)}
            <Text style={styles.captionText}>Should contain at least 8 symbols</Text>
          </View>
        )
    }

    const handleBottomSheet = () => {
        setBottomSheet(!bottomSheet);
    }

    return (
        <>
            <Layout style={styles.layout}>
                {/* <Text category={'h4'}>Login</Text>
                <Button onPress={navigateDetails}>Signup</Button>
                <Button style={{ marginVertical: 4 }} onPress={themeContext.toggleTheme}>TOGGLE THEME</Button> */}
                    <View style={styles.card}>
                        <View style={styles.logo}>
                            <Image source={require('../../assets/adaptive-icon.png')} style={styles.icon}/>
                        </View>
                        <Text category='h1' style={styles.title}>Signup</Text>

                        {/* Name Input Controller */}
                        <Controller 
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input 
                                    style={styles.input} 
                                    value={value}
                                    placeholder='Name' 
                                    accessoryLeft={renderPersonIcon}
                                    onChangeText={value => onChange(value)}
                                    onBlur={onBlur}
                                />
                            )}
                            name="name"
                        />
                        {errors.name && <Text>Name is required.</Text>}
                        
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

                        {/* Confirm Password Controller */}
                        {/* <Controller
                            control={control}
                            rules={{
                                required: true,
                                minLength: {
                                    value: 8,
                                    message: 'Password must have at least 8 characters'
                                },
                                // validate: value => value == password || 'The passwords do not match'
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input 
                                    style={styles.input}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    placeholder='Confirm Password'
                                    // caption={renderCaption}
                                    onBlur={onBlur}
                                    accessoryLeft={renderPasswordIcon}
                                    secureTextEntry={secureTextEntry}
                                />
                            )}
                            name="confirmPassword"
                        />
                        {errors.confirmPassword && <Text>{errors.confirmPassword.message}</Text>} */}

                        {/* Date of Birth Controller */}
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Datepicker
                                    style={styles.input}
                                    placeholder='Date of Birth'
                                    date={value}
                                    onSelect={value => onChange(value)}
                                    onBlur={onBlur}
                                    defaultValues
                                    accessoryLeft={renderCalendarIcon}
                                    min={new Date(1900, 1, 1)}
                                />
                            )}
                            name="dateOfBirth"
                        />
                        {errors.dateOfBirth && <Text>Date of Birth is required.</Text>}

                        <Button style={styles.button} appearance='outline' status='control' accessoryRight={renderRightArrowIcon} onPress={handleSubmit(handleSignup)}>Signup</Button>
                        
                        {/* Social Auth */}
                        {/* <SocialAuth actionType={'signup'} /> */}
                        <Text style={styles.formText}>Already have an account? <Text style={styles.link} onPress={navigateLogin}>Login</Text></Text>
                    </View>
                    {/* Terms */}
                    <TermsModal/>
                    <ErrorModal message={errorMessage} visible={errorVisible} toggle={toggleErrorModal} />
                    <InfoModal message={infoMessage} visible={infoVisible} toggle={toggleInfoModal} />
            </Layout>
        </>
    );
};

export default Signup;

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
