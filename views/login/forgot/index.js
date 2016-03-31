'use strict';

exports.init = function(req, res) {
    console.log('in init function');
    if (req.isAuthenticated()) {
        console.log('in if of init');
        res.redirect(req.user.defaultReturnUrl());
    } else {
        console.log('in else of init');
        console.log(req.user);
        res.render('login/forgot/index');
    }
};

exports.send = function(req, res, next) {
    console.log('in send function ');
    var workflow = req.app.utility.workflow(req, res);

    workflow.on('validate', function() {
        console.log(' inside send validate');
        if (!req.body.email) {
            workflow.outcome.errfor.email = 'required';
            return workflow.emit('response');
        }

        workflow.emit('generateToken');
    });
    console.log('in send function111 ');
    workflow.on('generateToken', function() {
        console.log('in send generateToken');
        /*var crypto = require('crypto');
        crypto.randomBytes(21, function(err, buf) {
            if (err) {
                return next(err);
            }

            var token = buf.toString('hex');
            req.app.db.models.User.encryptPassword(token,
                function(err, hash) {
                    if (err) {
                        return next(err);
                    }

                    workflow.emit('patchUser', token,
                        hash);
                });
        });*/
        console.log('b4 callijng encryptPassword');
        var crypto = require('crypto');
        crypto.randomBytes(21, function(err, buf) {
            if (err) {
                return next(err);
            }

            var token = buf.toString('hex');
            console.log('token');
            console.log(token);
            req.app.db.models.User.encryptPassword(token,
                function(err, hash) {
                    console.log(hash);
                    console.log('error and hash');
                    /*if (err) {
                        console.log('in the error if');
                        console.log(err);
                        return next(err);
                    }*/
                    console.log('no error');
                    console.log(hash);
                    workflow.emit('patchUser', token,
                        hash);
                });
        });

    });
    console.log('in send function 8989');
    workflow.on('patchUser', function(token, hash) {
        console.log('in patch user');
        var conditions = {
            email: req.body.email.toLowerCase()
        };
        var fieldsToSet = {
            resetPasswordToken: hash,
            resetPasswordExpires: Date.now() + 10000000
        };
        req.app.db.models.User.findOneAndUpdate(conditions,
            fieldsToSet,
            function(err, user) {
                if (err) {
                    console.log('error occured....');
                    return workflow.emit('exception', err);
                }

                if (!user) {
                    console.log('not a user ..........');
                    return workflow.emit('response');
                }
                console.log('b4 emit of sendEmail');
                workflow.emit('sendEmail', token, user);
                console.log('after emit of sendEmail');
                console.log(token);
                console.log(user);
            });
    });
    console.log('in send mail  function start ');
    workflow.on('sendEmail', function(token, user) {
        console.log('in send mail function ');
        req.app.utility.sendmail(req, res, {
            from: req.app.config.smtp.from.name + ' <' +
                req.app.config.smtp.from.address + '>',
            to: user.email,
            subject: 'Reset your ' + req.app.config.projectName +
                ' password',
            textPath: 'login/forgot/email-text',
            htmlPath: 'login/forgot/email-html',
            locals: {
                username: user.username,
                resetLink: req.protocol + '://' + req.headers
                    .host + '/login/reset/' + user.email +
                    '/' + token + '/',
                projectName: req.app.config.projectName
            },
            success: function(message) {
                workflow.emit('response');
            },
            error: function(err) {
                workflow.outcome.errors.push(
                    'Error Sending: ' + err);
                workflow.emit('response');
            }
        });
    });
    console.log('b4 emit of validate');
    workflow.emit('validate');
    console.log('after emit of validate');
};
