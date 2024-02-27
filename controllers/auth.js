
import _ from 'lodash';
import jwt from 'jsonwebtoken';

// import PasswordController from './password.js';
import {
  environment,
  // privateKey,
  // corePublicKey,
  // cookieName,
  cookieExpiresIn,
} from '../config/index.js';
// import ContactModel from '../models/contact.js';
// import CustomError from '../utils/error/CustomError.js';

// tracks login failures of contacts we have in the database
const MAX_LOGIN_ATTEMPS = 5;
const loginFailures = {};

const AuthController = {
  getUser: async (ctx) => {
    ctx.body = _.get(ctx, ['state', 'jwt', 'user']);
  },

  checkRegistration: async (ctx) => {
    const token = _.get(ctx, ['request', 'body', 'token']);

    try {
      // const { email } = jwt.verify(token, corePublicKey, {
      //   algorithm: 'RS256',
      //   ignoreExpiration: true,
      // });
      // const contact = await ContactModel.findOne({
      //   'clientPortal.email': email,
      // }).exec();
      // const passwordResetToken = _.get(contact, [
      //   'clientPortal',
      //   'passwordResetToken',
      // ]);

      // if (!contact) {
      //   throw CustomError("Contact doesn't exist", 401);
      // }

      // ctx.body = {
      //   email,
      //   hasAccount:
      //     (await contact.hasAccount()) || !_.isEmpty(passwordResetToken),
      // };
    } catch (e) {
      ctx.body = {
        email: null,
        hasAccount: false,
        error: e.message,
      };
    }
  },

  login: async (ctx, next) => {
    const email = _.get(ctx, ['request', 'body', 'email']);
    const password = _.get(ctx, ['request', 'body', 'password']);
    const contact = await ContactModel.findOne({
      'clientPortal.email': email,
    }).exec();
    const numFailures = _.get(loginFailures, [email, 'count'], 0);

    if (!contact || !(await contact.hasAccount())) {
      throw CustomError('Username or password is incorrect', 401);
    }

    if (await contact.hasPassword(password)) {
      _.unset(loginFailures, email);
      contact.clientPortal.registrationToken = undefined;
      await contact.save();
      ctx.state.contact = contact;
      await next();
    } else if (numFailures >= MAX_LOGIN_ATTEMPS) {
      // if user has failed to enter correct password 5 times, we block the account and user needs to reset the password
      // if (!contact.get('clientportal.passwordResetToken')) {
      //   await PasswordController.requestPasswordReset(ctx, next);
      //   _.unset(loginFailures, email);
      // }
      throw CustomError(
        'Too many login tries. An email to reset the password has been sent.',
        403
      );
    } else {
      _.set(loginFailures, [email, 'count'], numFailures + 1);
      throw CustomError('Username or password is incorrect', 401);
    }
  },

  register: async (ctx, next) => {
    const email = _.get(ctx, ['request', 'body', 'email']);
    const password = _.get(ctx, ['request', 'body', 'password']);
    const doesAgreePrivacy = _.get(ctx, [
      'request',
      'body',
      'doesAgreePrivacy',
    ]);
    const doesAgreeCookies = _.get(ctx, [
      'request',
      'body',
      'doesAgreeCookies',
    ]);
    const token = _.get(ctx, ['request', 'body', 'token']);
    const { _id, email: tokenEmail } = jwt.verify(token, corePublicKey, {
      algorithm: 'RS256',
    });
    const contact = await ContactModel.findById(_id).exec();
    if (
      contact &&
      _.get(contact, ['clientPortal', 'registrationToken']) === token &&
      _.toLower(email) === _.toLower(tokenEmail) &&
      doesAgreePrivacy &&
      doesAgreeCookies
    ) {
      contact.clientPortal.email = email;
      contact.clientPortal.password = password;
      contact.clientPortal.agreedPrivacyAt = new Date();
      contact.clientPortal.agreedCookiesAt = new Date();
      contact.clientPortal.registrationToken = undefined;
      await contact.save();
      ctx.state.contact = contact;
      await next();
    } else {
      throw CustomError('Invalid token', 401);
    }
  },

  logout: async (ctx, next) => {
    ctx.cookies.set(cookieName); // clears the cookie
    ctx.body = { status: 'ok' };
  },

  setCookie: async (ctx) => {
    const contact = _.get(ctx, ['state', 'contact']);
    const user = _.pick(contact, [
      '_id',
      'clientPortal.email',
      'phoneNumber',
      'salutation',
      'firstName',
      'lastName',
    ]);
    const token = jwt.sign({ user }, privateKey, {
      algorithm: 'RS256',
      expiresIn: cookieExpiresIn,
    });
    ctx.cookies.set(cookieName, token, {
      secure: environment === 'production',
    });
    ctx.body = user;
  },
};

export default AuthController;