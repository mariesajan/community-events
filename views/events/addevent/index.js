'use strict';

exports.init = function(req, res, next) {
    console.log('helloooo  init of addevent...........  ');
    res.render('events/addevent/index', {
        title: 'Add Event'
    });
};

exports.update = function(req, res, next) {
    console.log('in update of edit event......+++');
    var fieldsToSet = {
        eventDescription: req.body.eventdesc,
        venue: req.body.venue,
        eventDate: req.body.eventdate,
        startTime: req.body.starttime,
        endTime: req.body.endtime
    };
    console.log('b4 findbyidandUpdate');
    console.log(req.params.eventid);
    req.app.db.models.Event.findByIdAndUpdate(req.params.eventid,
        fieldsToSet,
        function(err) {
            console.log('Reached here');
            if (err) {
                console.log('Error occured');
                console.log(err);
                return next(err);
            } else {
                console.log('No error occured');
                req.flash('success', 'Event Updated..');
                res.redirect('/events/myevents/');
            }

        });
};


exports.create = function(req, res, next) {
    var workflow = req.app.utility.workflow(req, res);
    console.log(' hellooo in create Event function+++++++++++++++++++++.');
    console.log(req.user.username);
    console.log(req.body.eventname);
    workflow.on('validate', function() {
        console.log('in workflow validat');
        if (!req.body.eventname) {
            workflow.outcome.errors.push(
                'Please enter the event name:');
            return workflow.emit('response');
        }
        workflow.emit('createEvent');
    });
    workflow.on('createEvent', function() {
        var fieldsToSet = {
            username: req.user.username,
            eventName: req.body.eventname,
            eventDescription: req.body.eventdesc,
            eventDate: req.body.eventdate,
            venue: req.body.venue,
            startTime: req.body.starttime,
            endTime: req.body.endtime
        };
        console.log('B4 create ');
        req.app.db.models.Event.create(fieldsToSet, function(err,
            event) {
            console.log('inside the create event');
            if (err) {
                console.log('error');
                //return next(err);
                return workflow.emit('exception', err);
            }
            console.log('no error');
            workflow.outcome.record = event;
            req.flash('success', 'Event Added');
            res.redirect('/events/myevents/');
        });
    });

    workflow.emit('validate');
};
