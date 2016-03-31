'use strict';

exports.init = function(req, res) {
    console.log('in logout init');
    console.log(req.user);
    req.logout();
    console.log(req.user);
    res.redirect('/');
};
