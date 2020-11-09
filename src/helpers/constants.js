import axiosCreate from 'axios';

const colors = {
  primary: '#6379F4',
  dark: '#3A3D42',
  white: '#FFFFFF',
  error: '#FF5B37',
  success: '#1EC15F',
  white20: 'rgba(99, 121, 244, 0.2)',
  vanilla: '#FAFCFF',
  transparent: 'rgba(0,0,0,0)',
  grey: '#A9A9A9',
  grey2: '#E5E8ED',
  rippleDark: 'rgba(0,0,0,0.1)',
};

const fonts = {
  light: 'NunitoSans-Light',
  regular: 'NunitoSans-Regular',
  semiBold: 'NunitoSans-SemiBold',
  bold: 'NunitoSans-Bold',
};

const axios = axiosCreate.create({
  // baseURL: 'http://54.86.186.28:4444/api/v1',
  baseURL: 'http://192.168.100.27:4444/api/v1',
});

export {colors, fonts, axios};
