'use strict';

exports = module.exports = function(app, mongoose) {
    console.log('in event schema.... ');
    var eventSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        eventName: {
            type: String,
            required: true
        },
        eventDescription: {
            type: String
        },
        venue: {
            type: String
        },
        eventDate: {
            type: String
        },
        startTime: {
            type: String
        },
        endTime: {
            type: String
        },
    });
    eventSchema.plugin(require('./plugins/pagedFind'));
    eventSchema.index({
        eventName: 1
    });
    eventSchema.index({
        username: 1
    });
    eventSchema.index({
        eventDescription: 1
    });
    eventSchema.set('autoIndex', (app.get('env') === 'development'));
    app.db.model('Event', eventSchema);
};
