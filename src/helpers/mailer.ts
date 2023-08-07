import userModel from '@/models/UserModel';
import bcrypt, { genSalt } from 'bcrypt';
import nodemailer from 'nodemailer';

export const sendMail = async (email: any, emailType: any, userId: any) => {
    try {
        const salt = await genSalt(10);
        if (!salt) {
            throw new Error('Error While Generating Salt');
        }

        const hashedToken = await bcrypt.hash(userId.toString(), salt);
        if (!hashedToken) {
            throw new Error('Error While Hashing Token');
        }

        const { EMAIL_TYPE_VERIFY, EMAIL_TYPE_RESET, DOMAIN } = process.env

        if (emailType === EMAIL_TYPE_VERIFY) {
            const verify = await userModel.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 43200000
                }
            }, {
                new: true
            });
            if (!verify) {
                throw new Error('Verify Token Not Generated');
            }
        } else if (emailType === EMAIL_TYPE_RESET) {
            const reset = await userModel.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 43200000
                }
            }, {
                new: true
            });
            if (!reset) {
                throw new Error('Reset Token Not Generated');
            }
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "21083a5625e748",
                pass: "b19a00cb5551f1"
            }
        });

        const mailOptions = {
            from: 'stebinraj22@gmail.com',
            to: email,
            subject: emailType === EMAIL_TYPE_VERIFY ? "Verify your email" : EMAIL_TYPE_RESET && "Reset your password",
            html: `<p>Click <a href=${emailType === EMAIL_TYPE_VERIFY ? `${DOMAIN}/verifyemail?token=${hashedToken}`
                : emailType === EMAIL_TYPE_RESET && `${DOMAIN}/updatepassword?token=${hashedToken}`} replace={true}>here
                </a>to ${emailType === EMAIL_TYPE_VERIFY ? 'Verify'
                    : emailType === EMAIL_TYPE_RESET && 'Reset'}
                </p>`
        }

        const send = await transport.sendMail(mailOptions);

        if (!send) {
            throw new Error('Email Not Send');
        }
    } catch (error: any) {
        throw new Error(error);
    }
}
