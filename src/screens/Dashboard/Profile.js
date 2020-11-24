/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  Image,
  ToastAndroid,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {colors, fonts} from '../../helpers/constants';
import Toolbar from '../../components/Toolbars/Toolbar';
import Icons from 'react-native-vector-icons/Feather';
import {
  RectButton,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {imageCapture, imagePicker} from '../../helpers/gallery';
import {AuthLogout} from '../../redux/actions/auth';
import {ChangePhoto} from '../../redux/actions/users';
import {patcher, SETUSERDATA} from '../../redux/constants';
import Loading from '../../components/Modals/Loading';
import Button from '../../components/Buttons/Button';

const Profile = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const {token} = useSelector((state) => state.Auth);
  const {userdata} = useSelector((state) => state.Users);
  const dispatch = useDispatch();
  const [choice, setChoice] = React.useState(false);

  const _handleUploadImage = (response) => {
    setChoice(false);
    // imagePicker((response) => {
    if (response.didCancel) {
      // console.log('User cancelled image picker');
    } else if (response.error) {
      // console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      // console.log('User tapped custom button: ', response.customButton);
    } else {
      const formData = new FormData();
      formData.append('photo', {
        uri: response.uri,
        type: response.type,
        name: response.fileName,
      });
      const data = {photo: formData, token};
      _uploadImage(data);
    }
    // });
  };

  const _uploadImage = (data) => {
    setLoading(true);
    const _callbackUploadImage = (res, err) => {
      setLoading(false);
      if (err) {
        if (res) {
          return ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        }

        return ToastAndroid.show('Connection Refused', ToastAndroid.SHORT);
      }
      dispatch(patcher(SETUSERDATA, {...userdata, photo: res.data.data.photo}));
    };
    dispatch(ChangePhoto(data, _callbackUploadImage));
  };

  const _handleLogout = () => {
    dispatch(AuthLogout());
    return navigation.replace('Auth');
  };

  return (
    <>
      <Loading show={loading} />
      <StatusBar
        translucent
        backgroundColor={colors.transparent}
        barStyle="dark-content"
      />
      <SafeAreaView>
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{height: '100%'}}
            stickyHeaderIndices={[0]}>
            <Toolbar backgroundColor={colors.vanilla} navigation={navigation} />

            <View style={styles.profileContainer}>
              <Image
                source={
                  userdata?.photo
                    ? {uri: userdata?.photo}
                    : require('../../assets/images/default.png')
                }
                style={styles.profilePhoto}
              />

              <TouchableWithoutFeedback
                onPress={() => setChoice(!choice)}
                style={styles.profileEdit}>
                <Icons name="edit-2" size={14} color={colors.grey} />
                <Text style={styles.profileEditText}>Edit</Text>
              </TouchableWithoutFeedback>

              <Text style={styles.profileName}>{userdata?.name}</Text>
              <Text style={styles.profilePhone}>
                {userdata?.phone
                  ? `+62 ${userdata?.phone}`
                  : "The phone isn't set"}
              </Text>

              <RectButton
                onPress={() => navigation.navigate('ProfileInfo')}
                rippleColor={colors.rippleDark}
                style={styles.profileCard}>
                <Text style={styles.profileCardName}>Personal Information</Text>
                <Icons name="arrow-right" size={24} color={colors.dark} />
              </RectButton>

              <RectButton
                onPress={() => navigation.navigate('ProfilePassword')}
                rippleColor={colors.rippleDark}
                style={styles.profileCard}>
                <Text style={styles.profileCardName}>Change Password</Text>
                <Icons name="arrow-right" size={24} color={colors.dark} />
              </RectButton>

              <RectButton
                onPress={() => navigation.navigate('ProfilePin')}
                rippleColor={colors.rippleDark}
                style={styles.profileCard}>
                <Text style={styles.profileCardName}>Change PIN</Text>
                <Icons name="arrow-right" size={24} color={colors.dark} />
              </RectButton>

              <RectButton
                onPress={_handleLogout}
                rippleColor={colors.rippleDark}
                style={styles.logout}>
                <Text style={styles.profileLogout}>Logout</Text>
              </RectButton>
            </View>
          </ScrollView>
        </View>

        <Modal
          hardwareAccelerated
          visible={choice}
          onRequestClose={() => setChoice(false)}
          transparent={true}
          animationType="fade">
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.rippleDark,
            }}>
            <View
              style={{
                backgroundColor: colors.white,
                width: '60%',
                borderRadius: 14,
              }}>
              <TouchableOpacity
                onPress={() => imageCapture(_handleUploadImage)}
                style={[styles.button, {backgroundColor: colors.white}]}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: colors.dark, fontSize: 16},
                  ]}>
                  Take a photo
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => imagePicker(_handleUploadImage)}
                style={[styles.button, {backgroundColor: colors.white}]}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: colors.dark, fontSize: 16},
                  ]}>
                  Open gallery
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setChoice(false)}
                style={[styles.button, {backgroundColor: colors.error}]}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: colors.white, fontSize: 16},
                  ]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: fonts.bold,
  },
  container: {
    backgroundColor: colors.vanilla,
    paddingTop: StatusBar.currentHeight,
  },
  profileContainer: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  profileEdit: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  profileEditText: {
    marginLeft: 6,
    fontSize: 14,
    color: colors.grey,
    fontFamily: fonts.regular,
  },
  profileName: {
    fontSize: 24,
    fontFamily: fonts.bold,
  },
  profilePhone: {
    fontSize: 14,
    fontFamily: fonts.regular,
    marginTop: 10,
    paddingBottom: 30,
    color: colors.grey,
  },
  profileCardContainer: {
    width: '100%',
  },
  profileCard: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    elevation: 2,
    marginVertical: 8,
  },
  profileCardName: {
    fontFamily: fonts.bold,
    fontSize: 16,
  },
  logout: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 2,
    marginVertical: 8,
  },
  profileLogout: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.error,
  },
});
