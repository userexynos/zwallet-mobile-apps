/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Text,
  ToastAndroid,
  Modal,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import {colors, fonts} from '../../helpers/constants';
import Toolbar from '../../components/Toolbars/Toolbar';
import WebviewToolbar from '../../components/Toolbars/WebviewToolbar';
import {RectButton} from 'react-native-gesture-handler';
import {GuideTopup} from '../../redux/actions/users';
import Loading from '../../components/Modals/Loading';

const Topup = ({navigation}) => {
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [webview, setWebview] = React.useState(false);

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.Auth);
  const {topupGuide, userdata} = useSelector((state) => state.Users);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => _loadTopup(), []);

  const _loadTopup = () => {
    setLoading(true);
    const _callbackTopup = (res, err) => {
      setLoading(false);
      if (err) {
        if (res) {
          return setError(res.data.message);
        }

        ToastAndroid.show('Connection Refused', ToastAndroid.SHORT);
        return setError('Connection Refused');
      }
    };
    dispatch(GuideTopup(token, _callbackTopup));
  };

  const RenderTopup = () => (
    <>
      {error ? (
        <Text
          style={{
            color: colors.error,
            fontFamily: fonts.bold,
            textAlign: 'center',
            marginVertical: 20,
          }}>
          {error}
        </Text>
      ) : !topupGuide.length ? (
        <Text
          style={{
            color: colors.grey,
            fontFamily: fonts.bold,
            textAlign: 'center',
            marginVertical: 20,
          }}>
          Topup data isn't available
        </Text>
      ) : (
        topupGuide.map((item, index) => (
          <RectButton
            key={index}
            rippleColor={colors.transparent}
            style={[
              styles.topupCardContainer,
              {paddingVertical: 16, marginVertical: 8},
            ]}>
            <Text style={styles.topupCardNumber}>{index + 1}</Text>
            <View style={styles.topupCard}>
              <Text
                style={[
                  styles.topupCardRekening,
                  {fontSize: 16, color: colors.grey},
                ]}>
                {item.detail}
              </Text>
            </View>
          </RectButton>
        ))
      )}
    </>
  );

  const RenderWebview = () => (
    <Modal animationType="fade" hardwareAccelerated={true} visible={webview}>
      <>
        <WebviewToolbar
          toolbarColor={colors.white}
          backgroundColor={colors.white}
          title="Top up"
        />
        <WebView
          style={{height: '100%', width: '100%'}}
          source={{uri: 'https://google.com/'}}
        />
      </>
    </Modal>
  );

  return (
    <>
      <Loading show={loading} />
      <RenderWebview />
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
            <Toolbar
              backgroundColor={colors.vanilla}
              navigation={navigation}
              title="Top up"
            />

            <View style={styles.topupContainer}>
              <View style={{zIndex: 0}}>
                <RectButton
                  rippleColor={colors.rippleDark}
                  onPress={() => setWebview(true)}
                  style={styles.topupCardContainer}>
                  <Image
                    source={require('../../assets/images/plus.png')}
                    style={styles.topupCardPhoto}
                  />
                  <View style={styles.topupCard}>
                    <Text style={styles.topupCardTitle}>
                      Virtual Account Number
                    </Text>
                    <Text style={styles.topupCardRekening}>
                      2389 {userdata?.phone}
                    </Text>
                  </View>
                </RectButton>
              </View>

              <Text style={styles.topupDesc}>
                We provide you virtual account number for top up via nearest
                ATM.
              </Text>

              <Text style={styles.title}>How to Top Up</Text>

              <RenderTopup />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Topup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.vanilla,
    paddingTop: StatusBar.currentHeight,
  },
  topupContainer: {
    paddingHorizontal: 16,
  },
  topupDesc: {
    color: colors.grey,
    fontFamily: fonts.regular,
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 20,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 16,
    marginBottom: 15,
  },
  topupCardContainer: {
    borderRadius: 10,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
  },
  topupCard: {
    marginLeft: 15,
  },
  topupCardNumber: {
    color: colors.primary,
    fontFamily: fonts.bold,
    fontSize: 18,
  },
  topupCardTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
  },
  topupCardRekening: {
    fontFamily: fonts.regular,
    color: colors.grey,
    fontSize: 14,
  },
  topupCardPhoto: {
    height: 56,
    width: 56,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.rippleDark,
  },
  modalContainer: {
    width: '100%',
    height: '10%',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});
