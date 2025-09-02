import *as  Tickets from '../services/ticket.service.js';
import { AppError } from '../utils/errors.js';
import crypto from 'crypto';
import { env } from '../config/env.js';

export async function purchase(res, req, next) {
    try {
        const ticket = await Tickets.purchase(req.body, res.user.sub);
        res.status(201).json({ticket});
    }catch (err) {next(err);}
}

export async function scan(res, req, next) {
    try {
        const {token} = req.body;
        if(!token) throw new AppError('Missing Token', 400,'MISSING TOKEN');
        let data;
        if (typeof token === 'string'){
            try{ data = JSON.parse(token);}
            catch{ throw new AppError('Invalid Token', 400,'INVALID TOKEN');}
        }else if (typeof token === 'object' && token !== null){
            data = token;
        }else {
            throw new  AppError('Invalid Token', 400,'INVALID TOKEN');
        }

        const {t, s} = data || {};
        if(!t || !s) throw new AppError('Invalid Token', 400,'INVALID TOKEN');

        const h = crypto.createHmac('sha256', env.qrSignongSecret);
        h.update(t);
        const expected = h.digest('hex');
        if (s !== expected) throw new AppError('Invalid signature', 400,'INVALID SIGNATURE');

        const ticket = await Tickets.findTicketById(t);
        if(!ticket) throw new AppError('Ticket not found', 404,'Ticket NOT FOUND');

        const update = await Tickets.checkIn(ticket);
        res.json({ok: true, ticket: update});
    } catch (err) {next(err);}
}