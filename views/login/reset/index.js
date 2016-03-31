'use strict';

exports.init = function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect(req.user.defaultReturnUrl());
    } else {
        console.log('in init of rest');
        res.render('login/reset/index');
    }
};

exports.set = function(req, res) {
    var workflow = req.app.utility.workflow(req, res);

    workflow.on('validate', function() {
        if (!req.body.password) {
            workflow.outcome.errfor.password = 'required';
        }

        if (!req.body.confirm) {
            workflow.outcome.errfor.confirm = 'required';
        }

        if (req.body.password !== req.body.confirm) {
            workflow.outcome.errors.push('Passwords do not match.');
        }

        if (workflow.hasErrors()) {
            return workflow.emit('response');
        }

        workflow.emit('findUser');
    });

    workflow.on('findUser', function() {
        var conditions = {
            email: req.params.email,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        };
        req.app.db.models.User.findOne(conditions, function(err,
            user) {
            console.log('rest index.js... user....');
            console.log(user);
            console.log(err);
            if (err) {
                console.log('error.....');
                return workflow.emit('exception', err);
            }

            if (!user) {
                console.log('not a user/............');
                workflow.outcome.errors.push(
                    'Invalid request.');
                return workflow.emit('response');
            }
            console.log('b4 call of  validate pasword');

            console.log(req.params.token);
            console.log(user.resetPasswordToken);
            req.app.db.models.User.validatePassword(req.params
                .token, user.resetPasswordToken,
                function(err, isValid) {
                    if (err) {

                        return workflow.emit(
                            'exception', err);
                    }

                    console.log('b4 !isValid if ');
                    if (!isValid) {
                        workflow.outcome.errors.push(
                            'Invalid request.');
                        return workflow.emit('response');
                    }
                    console.log('b4 patch User');
                    workflow.emit('patchUser', user);
                });
        });
    });

    workflow.on('patchUser', function(user) {
        req.app.db.models.User.encryptPassword(req.body.password,
            function(err, hash) {
                if (err) {
                    return workflow.emit('exception', err);
                }

                var fieldsToSet = {
                    password: hash,
                    resetPasswordToken: ''
                };
                req.app.db.models.User.findByIdAndUpdate(user._id,
                    fieldsToSet,
                    function(err, user) {
                        if (err) {
                            return workflow.emit(
                                'exception', err);
                        }

                        workflow.emit('response');
                    });
            });
    });

    workflow.emit('validate');
};
