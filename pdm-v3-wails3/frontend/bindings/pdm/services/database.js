// @ts-check
// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unused imports
import {Call as $Call, Create as $Create} from "@wailsio/runtime";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unused imports
import * as sql$0 from "../../database/sql/models.js";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unused imports
import * as gorm$0 from "../../gorm.io/gorm/models.js";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unused imports
import * as models$0 from "../models/models.js";

/**
 * @returns {Promise<void> & { cancel(): void }}
 */
export function Close() {
    let $resultPromise = /** @type {any} */($Call.ByID(2841246318));
    return $resultPromise;
}

/**
 * @param {string} query
 * @returns {Promise<void> & { cancel(): void }}
 */
export function Execute(query) {
    let $resultPromise = /** @type {any} */($Call.ByID(913414865, query));
    return $resultPromise;
}

/**
 * @param {string} query
 * @returns {Promise<models$0.QueryResult> & { cancel(): void }}
 */
export function ExecuteQuery(query) {
    let $resultPromise = /** @type {any} */($Call.ByID(3595892903, query));
    let $typingPromise = /** @type {any} */($resultPromise.then(($result) => {
        return $$createType0($result);
    }));
    $typingPromise.cancel = $resultPromise.cancel.bind($resultPromise);
    return $typingPromise;
}

/**
 * @returns {Promise<gorm$0.DB | null> & { cancel(): void }}
 */
export function GetDB() {
    let $resultPromise = /** @type {any} */($Call.ByID(772526788));
    let $typingPromise = /** @type {any} */($resultPromise.then(($result) => {
        return $$createType2($result);
    }));
    $typingPromise.cancel = $resultPromise.cancel.bind($resultPromise);
    return $typingPromise;
}

/**
 * @returns {Promise<gorm$0.DB | null> & { cancel(): void }}
 */
export function GetGorm() {
    let $resultPromise = /** @type {any} */($Call.ByID(1569253765));
    let $typingPromise = /** @type {any} */($resultPromise.then(($result) => {
        return $$createType2($result);
    }));
    $typingPromise.cancel = $resultPromise.cancel.bind($resultPromise);
    return $typingPromise;
}

/**
 * @returns {Promise<string> & { cancel(): void }}
 */
export function GetName() {
    let $resultPromise = /** @type {any} */($Call.ByID(2086215133));
    return $resultPromise;
}

/**
 * @returns {Promise<sql$0.DB | null> & { cancel(): void }}
 */
export function GetSQL() {
    let $resultPromise = /** @type {any} */($Call.ByID(2696950202));
    let $typingPromise = /** @type {any} */($resultPromise.then(($result) => {
        return $$createType4($result);
    }));
    $typingPromise.cancel = $resultPromise.cancel.bind($resultPromise);
    return $typingPromise;
}

/**
 * @returns {Promise<sql$0.DB | null> & { cancel(): void }}
 */
export function GetSQLite() {
    let $resultPromise = /** @type {any} */($Call.ByID(2889310246));
    let $typingPromise = /** @type {any} */($resultPromise.then(($result) => {
        return $$createType4($result);
    }));
    $typingPromise.cancel = $resultPromise.cancel.bind($resultPromise);
    return $typingPromise;
}

/**
 * @param {string} path
 * @param {string} passwd
 * @returns {Promise<void> & { cancel(): void }}
 */
export function Open(path, passwd) {
    let $resultPromise = /** @type {any} */($Call.ByID(2763850682, path, passwd));
    return $resultPromise;
}

/**
 * @returns {Promise<void> & { cancel(): void }}
 */
export function RunQueryTest() {
    let $resultPromise = /** @type {any} */($Call.ByID(2708218905));
    return $resultPromise;
}

/**
 * @returns {Promise<void> & { cancel(): void }}
 */
export function RunSmallTest() {
    let $resultPromise = /** @type {any} */($Call.ByID(710338514));
    return $resultPromise;
}

/**
 * @returns {Promise<void> & { cancel(): void }}
 */
export function RunTransactionTest1() {
    let $resultPromise = /** @type {any} */($Call.ByID(353677308));
    return $resultPromise;
}

// Private type creation functions
const $$createType0 = models$0.QueryResult.createFrom;
const $$createType1 = gorm$0.DB.createFrom;
const $$createType2 = $Create.Nullable($$createType1);
const $$createType3 = sql$0.DB.createFrom;
const $$createType4 = $Create.Nullable($$createType3);
