import {AuthContext} from 'constant/values';
import {useContext} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {COLORS} from 'constant/theme';
import {SignIn} from 'api/authen-api';
import {setAsyncStorageData, showAlert} from 'helper';
import {USER_ID} from 'constant/values';
import {useDispatch} from 'react-redux';
import {setIsBusy, setUserInfo} from 'redux/slices/auth-slide';

const SignInSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email(),
  password: Yup.string().required('Password is required'),
});
import {useNavigation} from '@react-navigation/native';

export default function SignInPage() {
  const {handleAfterSignIn} = useContext(AuthContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSignIn = async (email: string, password: string) => {
    dispatch(setIsBusy(true));
    const userInfo = await SignIn(email, password);

    if (userInfo) {
      dispatch(setUserInfo(userInfo));
      await setAsyncStorageData(USER_ID, userInfo.id);
      handleAfterSignIn();
    } else {
      showAlert('Username or Password incorrect !');
    }

    dispatch(setIsBusy(false));
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.blueOcean} barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Sign in Now!</Text>
      </View>

      <View style={styles.footer}>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={SignInSchema}
          onSubmit={values => {
            handleSignIn(values.email, values.password);
          }}>
          {({
            handleChange,
            errors,
            touched,
            handleSubmit,
            values,
            setFieldTouched,
          }) => (
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                placeholderTextColor={COLORS.grey}
                style={styles.textInput}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.validationText}>{errors.email}</Text>
              )}

              <TextInput
                placeholder="Password"
                style={styles.textInput}
                placeholderTextColor={COLORS.grey}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                value={values.password}
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={styles.validationText}>{errors.password}</Text>
              )}

              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.continueButton}>
                <Text style={styles.text}>Sign In</Text>
              </TouchableOpacity>

              <Text style={styles.textLink}>
                'I'm a new member.
                <Text
                  style={styles.textLinkRight}
                  onPress={() => navigation.navigate('Register')}>
                  {' '}
                  Register
                </Text>
              </Text>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  footer: {
    flex: 4,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.blueOcean,
  },
  title: {
    fontWeight: '600',
    fontSize: 30,
    color: COLORS.white,
    // marginBottom: 50,
    position: 'absolute',
    top: 35,
    left: 20,
  },
  textLink: {
    color: '#000000',
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 25,
  },
  textLinkRight: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  inputContainer: {
    width: '100%',
    flex: 0.7,
  },
  textInput: {
    height: 50,
    width: '100%',
    marginTop: 20,
    backgroundColor: 'white',
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 25,
    color: COLORS.black,
    padding: 15,
  },
  validationText: {
    color: COLORS.primary,
    fontSize: 13,
    marginLeft: 5,
    marginTop: 3,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 45,
    borderRadius: 22,
    marginTop: 30,
  },
  text: {
    fontSize: 20,
    color: COLORS.white,
  },
});
