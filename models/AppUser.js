const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const crypto = require('crypto');


class AppUser extends Model {
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
}

AppUser.init( 
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
            },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1, 30]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1, 100],
            },
            set(value) {
              // Encrypt the email before saving
              const algorithm = 'aes-256-cbc';
              const encryptionKey = process.env.ENCRYPT_KEY;
              const iv = crypto.randomBytes(16);
              const cipher = crypto.createCipheriv(algorithm, encryptionKey, iv);
              let encryptedEmail = cipher.update(value, 'utf8', 'hex');
              encryptedEmail += cipher.final('hex');
              this.setDataValue('email', `${iv.toString('hex')}:${encryptedEmail}`);
            },
            get() {
              // Decrypt the email when accessed
              const algorithm = 'aes-256-cbc';
              const encryptionKey = process.env.ENCRYPT_KEY;
              const encryptedValue = this.getDataValue('email');
              if (!encryptedValue) {
                return null;
              }
              const [ivHex, encryptedEmail] = encryptedValue.split(':');
              const iv = Buffer.from(ivHex, 'hex');
              const decipher = crypto.createDecipheriv(algorithm, encryptionKey, iv);
              let decryptedEmail = decipher.update(encryptedEmail, 'hex', 'utf8');
              decryptedEmail += decipher.final('utf8');
              return decryptedEmail;
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 30]
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
        hooks: {
            beforeCreate: async (newUserData) => {
              const emailRegex = /^\S+@\S+\.\S+$/;
                 
              newUserData.password = await bcrypt.hash(newUserData.password, 10);
              const { email } = newUserData;  // Destructure email from newUserData

              const isValidEmail = emailRegex.test(email); // Test if email is valid
          
              if (!isValidEmail) {
                throw new Error('Invalid email format');
              }
              console.log('valid: ', isValidEmail);
              return newUserData;
            },
        }
    }
);

module.exports = AppUser;