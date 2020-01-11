import request from 'request';

const ENV = process.env.NODE_ENV || 'development';
const envConfig = require(`../../../config/environments/${ENV}`).default;
const accessToken = envConfig.facebook.access_token;

export const sendMessage = (senderId: string, message: string) : void => {
  try {
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {
        access_token: accessToken,
      },
      method: 'POST',
      json: {
        recipient: {
          id: senderId
        },
        message: {
          text: message
        },
      }
    });
  } catch (e) {
    console.log(e);
  }
};
