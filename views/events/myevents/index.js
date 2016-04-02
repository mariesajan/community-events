'use strict';

exports.show = function(req, res, next) {
    console.log('param id is :');
    console.log(req.params.eventid);
    req.app.db.models.Event.findById(req.params.eventid).exec(function(err,
        event) {
        if (err) {
            return next(err);
        }
        console.log('hellloooooooo.. the event is :');
        console.log(event);
        if (req.xhr) {
            res.send(event);
        } else {
            res.render('events/myevents/details', {
                data: event
            });
        }
    });
};

exports.init = function(req, res, next) {
    var filters = {};
    req.app.db.models.Event.pagedFind({
        filters: filters,
        keys: 'eventName username eventDescription eventDate startTime endTime venue'
    }, function(err, results) {
        if (err) {
            return next(err);
        }
        if(req.user){
          console.log('Iam a user......................................................');
          res.render('events/myevents/index', {
              data: results.data
          });
        }else{
          console.log('Iam not a user......................................................');
          res.render('events/myevents/not_user_index', {
              data: results.data
          });
        }

    });
};

/*
exports.show = function(req, res, next) {
    var filters = {};
    filters._id = req.params.eventid;
    console.log('in show........param id is :');
    console.log(req.params.eventid);
    req.app.db.models.Event.pagedFind({
        filters: filters,
        keys: 'eventName username eventDescription eventDate startTime endTime venue'
    }, function(err, results) {
        if (err) {
            return next(err);
        }
        console.log('The results are :');
        console.log(results.data);
        res.render('events/myevents/details', {
            data: results.data
        });

    });

};
*/
