import {COLORS} from 'constant/theme';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';

type Props = {
  onPress: () => void;
  text: string;
};

export default function ModalRow({onPress, text}: Props) {
  return (
    <View>
      <TouchableOpacity style={styles.modalRow} onPress={onPress}>
        <Text style={styles.modalText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
  },
  modalText: {
    color: COLORS.black,
    fontSize: 18,
    alignSelf: 'center',
  },
  line: {
    marginTop: 15,
    marginBottom: 15,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
