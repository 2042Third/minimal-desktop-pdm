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

export function Close(): Promise<void> & { cancel(): void } {
    let $resultPromise = $Call.ByID(2841246318) as any;
    return $resultPromise;
}

export function Execute(query: string): Promise<models$0.SQLiteResultOutput> & { cancel(): void } {
    let $resultPromise = $Call.ByID(913414865, query) as any;
    let $typingPromise = $resultPromise.then(($result: any) => {
        return $$createType0($result);
    }) as any;
    $typingPromise.cancel = $resultPromise.cancel.bind($resultPromise);
    return $typingPromise;
}

export function ExecuteQuery(query: string): Promise<models$0.QueryResult> & { cancel(): void } {
    let $resultPromise = $Call.ByID(3595892903, query) as any;
    let $typingPromise = $resultPromise.then(($result: any) => {
        return $$createType1($result);
    }) as any;
    $typingPromise.cancel = $resultPromise.cancel.bind($resultPromise);
    return $typingPromise;
}

export function GetDB(): Promise<gorm$0.DB | null> & { cancel(): void } {
    let $resultPromise = $Call.ByID(772526788) as any;
    let $typingPromise = $resultPromise.then(($result: any) => {
        return $$createType3($result);
    }) as any;
    $typingPromise.cancel = $resultPromise.cancel.bind($resultPromise);
    return $typingPromise;
}

export function GetGorm(): Promise<gorm$0.DB | null> & { cancel(): void } {
    let $resultPromise = $Call.ByID(1569253765) as any;
    let $typingPromise = $resultPromise.then(($result: any) => {
        return $$createType3($result);
    }) as any;
    $typingPromise.cancel = $resultPromise.cancel.bind($resultPromise);
    return $typingPromise;
}

export function GetName(): Promise<string> & { cancel(): void } {
    let $resultPromise = $Call.ByID(2086215133) as any;
    return $resultPromise;
}

export function GetSQL(): Promise<sql$0.DB | null> & { cancel(): void } {
    let $resultPromise = $Call.ByID(2696950202) as any;
    let $typingPromise = $resultPromise.then(($result: any) => {
        return $$createType5($result);
    }) as any;
    $typingPromise.cancel = $resultPromise.cancel.bind($resultPromise);
    return $typingPromise;
}

export function GetSQLite(): Promise<sql$0.DB | null> & { cancel(): void } {
    let $resultPromise = $Call.ByID(2889310246) as any;
    let $typingPromise = $resultPromise.then(($result: any) => {
        return $$createType5($result);
    }) as any;
    $typingPromise.cancel = $resultPromise.cancel.bind($resultPromise);
    return $typingPromise;
}

export function Open(path: string, passwd: string): Promise<void> & { cancel(): void } {
    let $resultPromise = $Call.ByID(2763850682, path, passwd) as any;
    return $resultPromise;
}

export function RunQueryTest(): Promise<void> & { cancel(): void } {
    let $resultPromise = $Call.ByID(2708218905) as any;
    return $resultPromise;
}

export function RunSmallTest(): Promise<void> & { cancel(): void } {
    let $resultPromise = $Call.ByID(710338514) as any;
    return $resultPromise;
}

export function RunTransactionTest1(): Promise<void> & { cancel(): void } {
    let $resultPromise = $Call.ByID(353677308) as any;
    return $resultPromise;
}

// Private type creation functions
const $$createType0 = models$0.SQLiteResultOutput.createFrom;
const $$createType1 = models$0.QueryResult.createFrom;
const $$createType2 = gorm$0.DB.createFrom;
const $$createType3 = $Create.Nullable($$createType2);
const $$createType4 = sql$0.DB.createFrom;
const $$createType5 = $Create.Nullable($$createType4);
