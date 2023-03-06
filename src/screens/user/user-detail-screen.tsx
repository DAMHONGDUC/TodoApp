import {COLORS} from 'constant/theme';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {logoutAction} from 'redux/slices/auth-slice';
import {useAppDispatch} from 'redux/store';
import Modal from 'react-native-modal';
import {useState} from 'react';
import ModalRow from 'components/modal-row';
import SeparateLine from 'components/separate-line';

export default function UserDetailScreen() {
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useAppDispatch();
  const handleSignOut = () => {
    dispatch(logoutAction());
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const toggleModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal style={{margin: 0}} isVisible={isModalVisible}>
        <View style={styles.modal}>
          <ModalRow onPress={toggleModal} text="Open Camera"></ModalRow>
          <SeparateLine></SeparateLine>
          <ModalRow onPress={toggleModal} text="Close"></ModalRow>
        </View>
      </Modal>

      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleOpenModal}
        style={[styles.button, {backgroundColor: COLORS.blueOcean}]}>
        <Text style={styles.buttonText}>Open Modal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    height: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: COLORS.white,
  },
  modal: {
    height: '20%',
    marginTop: 'auto',
    backgroundColor: COLORS.white,
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
