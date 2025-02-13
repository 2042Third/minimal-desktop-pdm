// @ts-check
// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unused imports
import {Create as $Create} from "@wailsio/runtime";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unused imports
import * as clause$0 from "./clause/models.js";

export class join {
    /**
     * Creates a new join instance.
     * @param {Partial<join>} [$$source = {}] - The source object to create the join.
     */
    constructor($$source = {}) {
        if (!("Name" in $$source)) {
            /**
             * @member
             * @type {string}
             */
            this["Name"] = "";
        }
        if (!("Conds" in $$source)) {
            /**
             * @member
             * @type {any[]}
             */
            this["Conds"] = [];
        }
        if (!("On" in $$source)) {
            /**
             * @member
             * @type {clause$0.Where | null}
             */
            this["On"] = null;
        }
        if (!("Selects" in $$source)) {
            /**
             * @member
             * @type {string[]}
             */
            this["Selects"] = [];
        }
        if (!("Omits" in $$source)) {
            /**
             * @member
             * @type {string[]}
             */
            this["Omits"] = [];
        }
        if (!("JoinType" in $$source)) {
            /**
             * @member
             * @type {clause$0.JoinType}
             */
            this["JoinType"] = (/** @type {clause$0.JoinType} */(""));
        }

        Object.assign(this, $$source);
    }

    /**
     * Creates a new join instance from a string or object.
     * @param {any} [$$source = {}]
     * @returns {join}
     */
    static createFrom($$source = {}) {
        const $$createField1_0 = $$createType0;
        const $$createField2_0 = $$createType2;
        const $$createField3_0 = $$createType3;
        const $$createField4_0 = $$createType3;
        let $$parsedSource = typeof $$source === 'string' ? JSON.parse($$source) : $$source;
        if ("Conds" in $$parsedSource) {
            $$parsedSource["Conds"] = $$createField1_0($$parsedSource["Conds"]);
        }
        if ("On" in $$parsedSource) {
            $$parsedSource["On"] = $$createField2_0($$parsedSource["On"]);
        }
        if ("Selects" in $$parsedSource) {
            $$parsedSource["Selects"] = $$createField3_0($$parsedSource["Selects"]);
        }
        if ("Omits" in $$parsedSource) {
            $$parsedSource["Omits"] = $$createField4_0($$parsedSource["Omits"]);
        }
        return new join(/** @type {Partial<join>} */($$parsedSource));
    }
}

// Private type creation functions
const $$createType0 = $Create.Array($Create.Any);
const $$createType1 = clause$0.Where.createFrom;
const $$createType2 = $Create.Nullable($$createType1);
const $$createType3 = $Create.Array($Create.Any);
