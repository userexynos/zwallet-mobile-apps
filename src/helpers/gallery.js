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

const optionsCamera = {
  mediaType: 'photo',
  quality: 0,
  saveToPhotos: false,
};

const imagePicker = (callback) => {
  return ImagePicker.launchImageLibrary(options, (response) => {
    callback(response);
  });
};

const imageCapture = (callback) => {
  return ImagePicker.launchCamera(optionsCamera, (response) => {
    console.log(response);
    callback(response);
  });
};

export {imagePicker, imageCapture};
