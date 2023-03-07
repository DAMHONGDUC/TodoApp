import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from 'constant/theme';
import {useEffect, useRef, useState} from 'react';
import RNFS from 'react-native-fs';
import {IMAGE_PATH} from 'constant/values';
import {MainStackNavigationProp} from 'navigation/types';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CameraScreen() {
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef<Camera>(null);
  const [newestImage, setNewestImage] = useState(
    require('assets/default_user.png'),
  );
  const navigation = useNavigation<MainStackNavigationProp>();

  useEffect(() => {
    const getAllStorageImage = async () => {
      let files = await RNFS.readDir(IMAGE_PATH);
      const newestItem = files[files.length - 1];

      newestItem && setNewestImage({uri: 'file://' + newestItem.path});
    };
    getAllStorageImage();
  }, []);

  const navToImageView = () => {
    navigation.replace('ImageViewScreen');
  };

  const handleTakePhoto = async () => {
    const photo = await camera.current?.takePhoto({
      flash: 'on',
    });

    if (photo?.path) {
      const checkPath = await RNFS.exists(IMAGE_PATH);

      if (!checkPath) await RNFS.mkdir(IMAGE_PATH);

      const pathArr = photo.path.split('/');
      const filename = pathArr[pathArr.length - 1];

      const newPath = `${IMAGE_PATH}/${filename}`;
      await RNFS.moveFile(photo.path, newPath);

      setNewestImage({uri: 'file://' + newPath});
    }
  };

  const handleBackButton = () => {
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
          <Ionicons name="arrow-back" color={COLORS.white} size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.cameraSection}>
        {device && (
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFillObject}
            device={device!}
            isActive={true}
            photo={true}
          />
        )}
      </View>
      <View style={styles.footer}>
        <TouchableHighlight
          onPress={navToImageView}
          style={styles.imageContainer}>
          <Image style={styles.image} source={newestImage}></Image>
        </TouchableHighlight>

        <TouchableOpacity onPress={handleTakePhoto}>
          <FontAwesome
            name="camera"
            color={COLORS.white}
            size={45}></FontAwesome>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    flexDirection: 'column',
  },
  cameraSection: {
    flex: 0.7,
  },
  footer: {
    flex: 0.2,
    backgroundColor: COLORS.black,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  imageContainer: {
    position: 'absolute',
    left: 45,
  },
  header: {
    flex: 0.1,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
  },
  backButton: {
    marginLeft: 5,
  },
});
