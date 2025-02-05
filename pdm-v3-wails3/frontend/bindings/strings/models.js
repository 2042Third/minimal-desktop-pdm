// @ts-check
// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unused imports
import {Create as $Create} from "@wailsio/runtime";

/**
 * A Builder is used to efficiently build a string using [Builder.Write] methods.
 * It minimizes memory copying. The zero value is ready to use.
 * Do not copy a non-zero Builder.
 */
export class Builder {
    /**
     * Creates a new Builder instance.
     * @param {Partial<Builder>} [$$source = {}] - The source object to create the Builder.
     */
    constructor($$source = {}) {

        Object.assign(this, $$source);
    }

    /**
     * Creates a new Builder instance from a string or object.
     * @param {any} [$$source = {}]
     * @returns {Builder}
     */
    static createFrom($$source = {}) {
        let $$parsedSource = typeof $$source === 'string' ? JSON.parse($$source) : $$source;
        return new Builder(/** @type {Partial<Builder>} */($$parsedSource));
    }
}
