// @ts-check
// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unused imports
import {Create as $Create} from "@wailsio/runtime";

export class QueryResult {
    /**
     * Creates a new QueryResult instance.
     * @param {Partial<QueryResult>} [$$source = {}] - The source object to create the QueryResult.
     */
    constructor($$source = {}) {
        if (!("columns" in $$source)) {
            /**
             * @member
             * @type {string[]}
             */
            this["columns"] = [];
        }
        if (!("rows" in $$source)) {
            /**
             * @member
             * @type {any[][]}
             */
            this["rows"] = [];
        }
        if (!("error" in $$source)) {
            /**
             * @member
             * @type {string}
             */
            this["error"] = "";
        }

        Object.assign(this, $$source);
    }

    /**
     * Creates a new QueryResult instance from a string or object.
     * @param {any} [$$source = {}]
     * @returns {QueryResult}
     */
    static createFrom($$source = {}) {
        const $$createField0_0 = $$createType0;
        const $$createField1_0 = $$createType2;
        let $$parsedSource = typeof $$source === 'string' ? JSON.parse($$source) : $$source;
        if ("columns" in $$parsedSource) {
            $$parsedSource["columns"] = $$createField0_0($$parsedSource["columns"]);
        }
        if ("rows" in $$parsedSource) {
            $$parsedSource["rows"] = $$createField1_0($$parsedSource["rows"]);
        }
        return new QueryResult(/** @type {Partial<QueryResult>} */($$parsedSource));
    }
}

// Private type creation functions
const $$createType0 = $Create.Array($Create.Any);
const $$createType1 = $Create.Array($Create.Any);
const $$createType2 = $Create.Array($$createType1);
