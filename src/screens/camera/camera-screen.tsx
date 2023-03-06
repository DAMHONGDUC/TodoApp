import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {StyleSheet, View} from 'react-native';

export default function CameraScreen() {
  const devices = useCameraDevices();
  const device = devices.back;

  return (
    <View style={styles.container}>
      {device && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device!}
          isActive={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
