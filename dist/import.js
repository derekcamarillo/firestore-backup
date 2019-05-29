"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
const fs = __importStar(require("fs"));
/**
 * Restore data to firestore
 *
 * @param {string} fileName
 * @param {Array<string>} dateArray
 * @param {Array<string>} geoArray
 */
exports.restore = (fileName, dateArray, geoArray) => {
    const db = admin.firestore();
    fs.readFile(fileName, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        // Turn string from file to an Array
        let dataArray = JSON.parse(data);
        return udpateCollection(db, dataArray, dateArray, geoArray);
    });
};
/**
 * Update data to firestore
 *
 * @param {any} db
 * @param {Array<any>} dataArray
 * @param {Array<string>} dateArray
 * @param {Array<string>} geoArray
 */
const udpateCollection = (db, dataArray, dateArray, geoArray) => __awaiter(this, void 0, void 0, function* () {
    for (var index in dataArray) {
        var collectionName = index;
        for (var doc in dataArray[index]) {
            if (dataArray[index].hasOwnProperty(doc)) {
                yield startUpdating(db, collectionName, doc, dataArray[index][doc], dateArray, geoArray);
            }
        }
    }
});
/**
 * Write data to database
 * @param db
 * @param collectionName
 * @param doc
 * @param data
 * @param dateArray
 * @param geoArray
 */
const startUpdating = (db, collectionName, doc, data, dateArray, geoArray) => {
    // convert date from unixtimestamp  
    let parameterValid = true;
    if (typeof dateArray === 'object' && dateArray.length > 0) {
        dateArray.map(date => {
            if (data.hasOwnProperty(date)) {
                data[date] = new Date(data[date]._seconds * 1000);
            }
            else {
                console.log('Please check your date parameters!!!', dateArray);
                parameterValid = false;
            }
        });
    }
    // Enter geo value
    if (typeof geoArray !== 'undefined' && geoArray.length > 0) {
        geoArray.map(geo => {
            if (data.hasOwnProperty(geo)) {
                data[geo] = new admin.firestore.GeoPoint(data[geo]._latitude, data[geo]._longitude);
            }
            else {
                console.log('Please check your geo parameters!!!', geoArray);
                parameterValid = false;
            }
        });
    }
    if (parameterValid) {
        return new Promise(resolve => {
            db.collection(collectionName).doc(doc)
                .set(data)
                .then(() => {
                console.log(`${doc} is successed adding to firestore!`);
                resolve('Data wrote!');
            })
                .catch(error => {
                console.log(error);
            });
        });
    }
    else {
        console.log(`${doc} is not imported to firestore. Please check your parameters!`);
        return false;
    }
};
//# sourceMappingURL=import.js.map