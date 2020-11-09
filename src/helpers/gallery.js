// import {PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const imagePicker = (callback) => {
  return ImagePicker.launchImageLibrary(options, (response) => {
    // console.log('Response = ', response);

    // if (response.didCancel) {
    //   console.log('User cancelled image picker');
    // } else if (response.error) {
    //   console.log('ImagePicker Error: ', response.error);
    // } else if (response.customButton) {
    //   console.log('User tapped custom button: ', response.customButton);
    // } else {

    // }
    callback(response);
  });
};

export {imagePicker};
