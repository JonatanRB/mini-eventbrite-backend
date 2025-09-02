import crypto from 'crypto';
import QRCode from 'qrcode';
import { env } from '../config/env.js';

export function singTicket(ticketId) {
    const h = crypto.createHmac('sha256', env.qrSingingSecret)
    h.update(ticketId);
    return h.digest('hex');
}

export function buldQrById(id) {
    return JSON.stringify({t: ticketId, s : singTicket(ticketId)});
}

export async function generateQrPngBuffer (payload) {
    return await QRCode.toBuffer(payload, {type: 'png', width: 512, margin: 1
    });
}

