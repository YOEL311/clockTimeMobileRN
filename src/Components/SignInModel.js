import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {signIn} from '../store/action';
import {Button} from 'react-native-elements';

const SignInModel = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [numberUser, setNumberUser] = useState('');
  return (
    <Modal animationType="slide" transparent={true} visible={!user}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Please Enter Your Number</Text>
          <TextInput
            value={numberUser}
            onChangeText={value => {
              setNumberUser(value);
            }}
            style={styles.input}
            keyboardType="numeric"
            placeholder="123-456-789"
          />

          <Button
            title="SignIn"
            onPress={() => {
              numberUser.length > 4 && dispatch(signIn(numberUser));
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 100,
    margin: 12,
    borderWidth: 1,
    color: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'white',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default SignInModel;
