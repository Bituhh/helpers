"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = exports.CaseType = void 0;
var CaseType;
(function (CaseType) {
    CaseType[CaseType["upper"] = 0] = "upper";
    CaseType[CaseType["lower"] = 1] = "lower";
    CaseType[CaseType["mixed"] = 2] = "mixed";
})(CaseType = exports.CaseType || (exports.CaseType = {}));
class Random {
    static alphanumeric(length = 16) {
        let string = '';
        for (let i = 0; i < length; i++) {
            if (Math.random() > 0.5) {
                string += Random.character(CaseType.mixed);
            }
            else {
                string += `${Random.number(10)}`;
            }
        }
        return string;
    }
    static number(max = 1000) {
        return Math.floor(Math.random() * max);
    }
    static character(caseType = CaseType.lower) {
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        switch (caseType) {
            case CaseType.mixed:
                if (Math.random() > 0.5) {
                    return characters[Random.number(characters.length)].toUpperCase();
                }
                else {
                    return characters[Random.number(characters.length)];
                }
            case CaseType.upper:
                return characters[Random.number(characters.length)].toUpperCase();
            case CaseType.lower:
            default:
                return characters[Random.number(characters.length)];
        }
    }
    static string(length = 16, caseType = CaseType.mixed) {
        let string = '';
        for (let i = 0; i < length; i++) {
            string += Random.character(caseType);
        }
        return string;
    }
    static array(size = 100, maxValueInArray = 1000) {
        const array = new Array(size);
        for (let i = 0; i < array.length; i++) {
            array[i] = Random.number(maxValueInArray);
        }
        return array;
    }
    static columns(length = 10) {
        const obj = {};
        for (let i = 0; i < length; i++) {
            obj[Random.alphanumeric()] = Random.alphanumeric();
        }
        return obj;
    }
    ;
    static table(maxColumnLength = 100, maxRowLength = 1000) {
        const columnsLength = Random.number(maxColumnLength) + 1;
        const rowLength = Random.number(maxRowLength) + 1;
        const array = [];
        for (let i = 0; i < rowLength; i++) {
            array.push(Random.columns(columnsLength));
        }
        return array;
    }
    ;
    static object(maxSize = 10) {
        const size = Random.number(maxSize);
        const obj = {};
        for (let i = 0; i < size; i++) {
            obj[Random.alphanumeric()] = Random.alphanumeric();
        }
        return obj;
    }
}
exports.Random = Random;
