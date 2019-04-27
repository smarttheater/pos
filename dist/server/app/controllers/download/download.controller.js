"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * download
 */
const debug = require("debug");
const http_status_1 = require("http-status");
const iconvLite = require("iconv-lite");
const json2csv = require("json2csv");
const log = debug('frontend:download');
function order(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('download', req.query);
        try {
            const fields = [
                { label: 'Car Name', value: 'car' },
                { label: 'Price USD', value: 'price' },
                { label: 'color', value: 'color' }
            ];
            const opts = { fields };
            const data = [
                {
                    'car': 'Audi',
                    'price': 40000,
                    'color': 'blue'
                }, {
                    'car': 'BMW',
                    'price': 35000,
                    'color': 'black'
                }, {
                    'car': 'Porsche',
                    'price': 60000,
                    'color': 'green'
                }
            ];
            const csv = yield json2csv.parseAsync(data, opts);
            res.setHeader('Content-disposition', 'attachment; filename=order.csv');
            res.setHeader('Content-Type', 'text/csv; charset=Shift_JIS');
            res.send(iconvLite.encode(csv, 'Shift_JIS'));
            res.end();
        }
        catch (error) {
            log('error', error);
            res.status(http_status_1.BAD_REQUEST);
            res.end();
        }
    });
}
exports.order = order;
function reservation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('download', req.body);
        try {
        }
        catch (error) {
            log('error', error);
            res.status(http_status_1.BAD_REQUEST);
            res.json({ error });
        }
    });
}
exports.reservation = reservation;
