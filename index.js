import { Dimensions, Platform, StatusBar } from 'react-native';

function isIphone() {
    return Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV;
}
export function isIphoneX() {
    const dimen = Dimensions.get('window');
    const {height, width} = dimen;

    return (
        isIphone() &&
    (
      height === 780 || width === 780 || // iPhone 12 mini
      height === 812 || width === 812 || // iPhone X, XS, 11 Pro, 13 mini
      height === 844 || width === 844 || // iPhone 12, 12 Pro, 13, 13 Pro, 16e
      height === 852 || width === 852 || // iPhone 14 Pro, 15, 15 Pro,16
      height === 874 || width === 874 || // iPhone 16 Pro
      height === 896 || width === 896 || // iPhone XR, XS Max, 11, 11 Pro Max
      height === 926 || width === 926 || // iPhone 12 Pro Max, 13 Pro Max
      height === 932 || width === 932 || // iPhone 14 Pro Max, 15 Pro Max, 15 Plus,16 Plus
      height === 956 || width === 956    // iPhone 16 Pro Max,  
    )
    );
}

function hasIsland() {
    const dimen = Dimensions.get('window');
    const { height, width } = dimen;
  
    return (
      isIphone() &&
      (
        height === 852 || width === 852 || // iPhone 14 Pro, 15, 15 Pro,16
        height === 874 || width === 874 || // iPhone 16 Pro
        height === 932 || width === 932 || // iPhone 14 Pro Max, 15 Pro Max, 15 Plus,16 Plus
        height === 956 || width === 956    // iPhone 16 Pro Max,  
      )
    );
  }

export function ifIphoneX(iphoneXStyle, regularStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    }
    return regularStyle;
}

export function getStatusBarHeight(safe) {
    function safeHeight(hasIsland){
        return hasIsland ? 59 : 44;
    }
    return Platform.select({
        ios: ifIphoneX(safe ? safeHeight(hasIsland()) : 30, 20),
        android: StatusBar.currentHeight ?? 0,
        default: 0
    });
}

export function getBottomSpace() {
    return isIphoneX() ? 34 : 0;
}
