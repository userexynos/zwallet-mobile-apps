import Main from './Main';
import Transactions from './Transactions';
import History from './History';
import SearchReceiver from './SearchReceiver';
import TransferAmount from './TransferAmount';
import TransferConfirm from './TransferConfirm';
import TransferPinInput from './TransferPinInput';
import TransferStatus from './TransferStatus';
import Topup from './Topup';
import Profile from './Profile';
import ProfileInfo from './ProfileInfo';
import ProfilePassword from './ProfilePassword';
import ProfilePin from './ProfilePin';
import ProfileManagePhone from './ProfileManagePhone';
import ProfilePhone from './ProfilePhone';
import Notification from './Notification';

export {
  Main,
  Transactions,
  History,
  SearchReceiver,
  TransferAmount,
  TransferConfirm,
  TransferPinInput,
  TransferStatus,
  Topup,
  Profile,
  ProfileInfo,
  ProfilePassword,
  ProfilePin,
  ProfileManagePhone,
  ProfilePhone,
  Notification,
};
// /* eslint-disable react-native/no-inline-styles */
// import React from 'react';
// import {
//   StyleSheet,
//   View,
//   SafeAreaView,
//   StatusBar,
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import {colors} from '../../helpers/constants';
// import CardHistory from '../../components/Cards/CardHistory';
// import Toolbar from '../../components/Toolbars/Toolbar';
// import ButtonIcon from '../../components/Buttons/ButtonIcon';
// import Button from '../../components/Buttons/Button';

// const {height, width} = Dimensions.get('screen');

// const TransferPinInput = ({navigation}) => {
//   return (
//     <>
//       <StatusBar
//         translucent
//         backgroundColor={colors.transparent}
//         barStyle="dark-content"
//       />
//       <SafeAreaView>
//         <View style={styles.container}>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             style={{height: '100%'}}
//             stickyHeaderIndices={[0]}>
//             <Toolbar
//               backgroundColor={colors.vanilla}
//               navigation={navigation}
//               title="Find Receiver"
//             />
//           </ScrollView>
//         </View>
//       </SafeAreaView>
//     </>
//   );
// };

// export default TransferPinInput;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: colors.vanilla,
//     paddingTop: StatusBar.currentHeight,
//   },
// });
