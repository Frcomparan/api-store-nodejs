const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const UserService = require('./user.service');
const { config } = require('../config/config');
const jwtConfig = {
  expiresIn: '7d',
};

const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, config.jwtSecret, jwtConfig);

    return {
      user,
      token,
    };
  }

  async sendRecovery(email) {
    console.log(email);
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const payload = {
      sub: user.id,
    };

    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: '5min',
    });

    await service.update(user.id, {
      recoveryToken: token,
    });

    const link = `http://myfrontend.com/recovery?token=${token}`;

    const mail = {
      from: config.localEmailPs, // sender address
      to: user.email, // list of receivers
      subject: 'Email to recover password', // Subject line
      html: `<b>Go to this link --> ${link}</b>`, // html body
    };

    const rta = await this.sendMail(mail);
    return rta;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);

      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }

      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, {
        recoveryToken: null,
        password: hash,
      });

      return { message: 'password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: config.localEmail,
        pass: config.localEmailPs,
      },
    });

    let info = await transporter.sendMail(infoMail);

    return {
      message: 'All good',
      link: `Preview URL: %s ${nodemailer.getTestMessageUrl(info)}`,
    };
  }
}

module.exports = AuthService;
