'use strict';

exports.delete = function(req, res, next) {
    console.log('in exports delete');
    req.app.db.models.Event.findByIdAndRemove({
        _id: req.params.eventid
    }).exec(function(err) {
        if (err) {
            return next(err);
        } else {
            console.log('Record deleted!!');
            req.flash('success', 'Record Deleted!!!');
            res.redirect('/events/myevents/');
        }
    });
};

exports.update = function(req, res, next) {

    console.log('to the edit pafe.........');
    console.log(req.params.eventid);
    req.app.db.models.Event.findById(req.params.eventid).exec(function(err,
        event) {
        if (err) {
            return next(err);
        }
        if (req.xhr) {
            res.send(event);
        } else {
            console.log('no error to go to edit page');
            res.render('events/addevent/editevent', {
                title: 'Edit Event',
                event: event
            });
        }
    });
};

exports.find = function(req, res, next) {
    console.log('find function of /evnts function/');
    console.log(req.user.username);
    req.query.username = req.user.username;
    req.query.limit = req.query.limit ? parseInt(req.query.limit,
            null) :
        20;
    req.query.page = req.query.page ? parseInt(req.query.page,
            null) :
        1;
    req.query.sort = req.query.sort ? req.query.sort : '_id';
    console.log('111');
    var filters = {};
    if (req.query.username) {
        console.log('username if');
        filters.username = new RegExp('^.*?' + req.query.username +
            '.*$',
            'i');
        console.log('filters.username is:' + filters.username);
    }
    console.log('222');


    req.app.db.models.Event.pagedFind({
        filters: filters,
        keys: 'eventName username eventDescription',
        limit: req.query.limit,
        page: req.query.page,
        sort: req.query.sort
    }, function(err, results) {
        if (err) {
            return next(err);
        }

        if (req.xhr) {
            res.header("Cache-Control",
                "no-cache, no-store, must-revalidate"
            );
            results.filters = req.query;
            res.send(results);
        } else {
            results.filters = req.query;
            console.log(
                'results.data value is............'
            );
            console.log(results.data);
            res.render('events/index', {
                data: results.data
            });
        }
    });
};
