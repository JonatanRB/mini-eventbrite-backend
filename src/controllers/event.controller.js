import * as Event from '../services/event.service.js'

export async function list(req, res, next) {
    try {
        const item = await Events.listPublished();
        res.json({item});
    }catch (err) { next(err); }
}

export async function get(req, res, next) {
    try {
        const item = await Events.getById(req.params.id);
        res.json({item});
    }catch (err) { next(err); }
}

export async function create(req, res, next) {
    try {
        const item = await Events.createEvent(req.body, req.user.sub);
        res.status(201).json({item});
    }catch (err) { next(err); }
}