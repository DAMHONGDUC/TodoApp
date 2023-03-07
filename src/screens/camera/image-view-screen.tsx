import {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import RNFS from 'react-native-fs';
import {IMAGE_PATH} from 'constant/values';
import {COLORS} from 'constant/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {converMtimeToDateTime} from 'helper';
import {MainStackNavigationProp} from 'navigation/types';
import {useNavigation} from '@react-navigation/native';

export default function ImageViewScreen() {
  const [images, setImages] = useState();
  const navigation = useNavigation<MainStackNavigationProp>();

  useEffect(() => {
    const getAllStorageImage = async () => {
      let files = await RNFS.readDir(IMAGE_PATH);

      setImages(files ? files.reverse() : []);
    };
    getAllStorageImage();
  }, []);

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.bodyContainer}>
        <Image
          style={styles.image}
          source={{uri: 'file://' + item.path}}></Image>
        <Text style={[styles.nameText, {marginTop: 30}]}>
          {converMtimeToDateTime(item.mtime)}
        </Text>
        <Text style={styles.nameText}>{item.name}</Text>
      </View>
    );
  };

  const handleBackButton = () => {
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackButton}>
          <Ionicons name="arrow-back" color={COLORS.black} size={25} />
        </TouchableOpacity>
      </View>

      <FlatList
        keyExtractor={item => item.name}
        horizontal={true}
        data={images}
        renderItem={renderItem}></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  image: {
    height: 400,
    width: 353,
  },
  header: {marginBottom: 50},
  bodyContainer: {
    flexDirection: 'column',
  },
  nameText: {
    alignSelf: 'flex-end',
    marginRight: 3,
    marginTop: 15,
  },
});
