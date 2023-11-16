import {View} from 'react-native';
import React, {useEffect} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Settings, LoginButton, AccessToken} from 'react-native-fbsdk-next';

const App = () => {
  Settings.setAppID('APP_ID');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'WEB_CLIENT_ID'
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      console.log(userInfo);
    } catch (error: any) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing in');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available');
      } else {
        console.log('Some other error happened');
        console.log(error.message);
        console.log(error.code);
      }
    }
  };

  return (
    <View>
      <GoogleSigninButton
        style={{width: 192, height: 48, marginTop: 30}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />

      <LoginButton
        onLoginFinished={(error, result: any) => {
          if (error) {
            console.log('login has error: ' + result.error);
            console.log({error});
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then((data: any) => {
              console.log(data.accessToken.toString());
            });
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      />
    </View>
  );
};

export default App;
