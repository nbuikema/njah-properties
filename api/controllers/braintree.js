const braintree = require('braintree');
const sgMail = require('@sendgrid/mail');
const User = require('../models/user');
require('dotenv').config();

const gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

exports.generateToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
    })
};

exports.processPayment = (req, res) => {
    let nonce = req.body.paymentMethodNonce;
    let amount = req.body.amount;
    let date = Date.now();
    let payment = {amount, date};
    let newTransaction = gateway.transaction.sale(
        {
            amount: amount,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        }, (err, result) => {
            if(err) {
                res.status(500).json(err);
            } else {
                User.findOneAndUpdate(
                    {_id: req.selectedUser._id},
                    {$push: {payments: payment}},
                    {new: true},
                    (err, user) => {
                        if(err) {
                            return res.status(400).json({error: 'Your info could not be updated.'});
                        }
                        const emailData = {
                            to: user.email,
                            from: 'noreply@njahproperties.com',
                            subject: `Rent Payment Receipt`,
                            html: `
                                <p>You successfully made a rental payment in the amount of $${payment.amount} on ${moment(payment.date).format('MMMM Do YYYY, h:mm:ss a')}.</p>
                            `
                        };
                        sgMail.send(emailData);
                        user.password = undefined;
                        return res.json(user);
                    }
                );
            }
        }
    );
};