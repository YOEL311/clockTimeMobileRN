import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SignInModel from '../components/SignInModel';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {sendExitOrEnter} from '../store/action';

const App = () => {
  const user = useSelector(state => state.user);
  const statusUser = useSelector(state => state.statusUser);
  const dispatch = useDispatch();
  const iconName = statusUser === 'enter' ? 'location-exit' : 'location-enter';
  const stringButton =
    statusUser === 'enter' ? 'Press to exit' : 'Press to enter';
  statusUser === 'enter' ? 'location-exit' : 'location-enter';

  return (
    <View style={{flex: 1}}>
      <Header
        centerComponent={{
          text: user ? `Hello ${user.name}` : 'Hello Guest',
          style: {color: '#fff'},
        }}
      />
      <SignInModel />
      <View style={styles.centeredView}>
        <Icon.Button
          onPress={() => {
            dispatch(sendExitOrEnter());
          }}
          style={{alignSelf: 'center'}}
          name={iconName}
          backgroundColor="#3b5998">
          <Text style={{fontFamily: 'Arial', fontSize: 15}}>
            {stringButton}
          </Text>
        </Icon.Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
});

export default App;
