// @ts-check
// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unused imports
import {Create as $Create} from "@wailsio/runtime";

/**
 * A StructField describes a single field in a struct.
 */
export class StructField {
    /**
     * Creates a new StructField instance.
     * @param {Partial<StructField>} [$$source = {}] - The source object to create the StructField.
     */
    constructor($$source = {}) {
        if (!("Name" in $$source)) {
            /**
             * Name is the field name.
             * @member
             * @type {string}
             */
            this["Name"] = "";
        }
        if (!("PkgPath" in $$source)) {
            /**
             * PkgPath is the package path that qualifies a lower case (unexported)
             * field name. It is empty for upper case (exported) field names.
             * See https://golang.org/ref/spec#Uniqueness_of_identifiers
             * @member
             * @type {string}
             */
            this["PkgPath"] = "";
        }
        if (!("Type" in $$source)) {
            /**
             * field type
             * @member
             * @type {Type}
             */
            this["Type"] = null;
        }
        if (!("Tag" in $$source)) {
            /**
             * field tag string
             * @member
             * @type {StructTag}
             */
            this["Tag"] = (/** @type {StructTag} */(""));
        }
        if (!("Offset" in $$source)) {
            /**
             * offset within struct, in bytes
             * @member
             * @type {number}
             */
            this["Offset"] = 0;
        }
        if (!("Index" in $$source)) {
            /**
             * index sequence for Type.FieldByIndex
             * @member
             * @type {number[]}
             */
            this["Index"] = [];
        }
        if (!("Anonymous" in $$source)) {
            /**
             * is an embedded field
             * @member
             * @type {boolean}
             */
            this["Anonymous"] = false;
        }

        Object.assign(this, $$source);
    }

    /**
     * Creates a new StructField instance from a string or object.
     * @param {any} [$$source = {}]
     * @returns {StructField}
     */
    static createFrom($$source = {}) {
        const $$createField5_0 = $$createType0;
        let $$parsedSource = typeof $$source === 'string' ? JSON.parse($$source) : $$source;
        if ("Index" in $$parsedSource) {
            $$parsedSource["Index"] = $$createField5_0($$parsedSource["Index"]);
        }
        return new StructField(/** @type {Partial<StructField>} */($$parsedSource));
    }
}

/**
 * A StructTag is the tag string in a struct field.
 * 
 * By convention, tag strings are a concatenation of
 * optionally space-separated key:"value" pairs.
 * Each key is a non-empty string consisting of non-control
 * characters other than space (U+0020 ' '), quote (U+0022 '"'),
 * and colon (U+003A ':').  Each value is quoted using U+0022 '"'
 * characters and Go string literal syntax.
 * @typedef {string} StructTag
 */

/**
 * Type is the representation of a Go type.
 * 
 * Not all methods apply to all kinds of types. Restrictions,
 * if any, are noted in the documentation for each method.
 * Use the Kind method to find out the kind of type before
 * calling kind-specific methods. Calling a method
 * inappropriate to the kind of type causes a run-time panic.
 * 
 * Type values are comparable, such as with the == operator,
 * so they can be used as map keys.
 * Two Type values are equal if they represent identical types.
 * @typedef {any} Type
 */

/**
 * Value is the reflection interface to a Go value.
 * 
 * Not all methods apply to all kinds of values. Restrictions,
 * if any, are noted in the documentation for each method.
 * Use the Kind method to find out the kind of value before
 * calling kind-specific methods. Calling a method
 * inappropriate to the kind of type causes a run time panic.
 * 
 * The zero Value represents no value.
 * Its [Value.IsValid] method returns false, its Kind method returns [Invalid],
 * its String method returns "<invalid Value>", and all other methods panic.
 * Most functions and methods never return an invalid value.
 * If one does, its documentation states the conditions explicitly.
 * 
 * A Value can be used concurrently by multiple goroutines provided that
 * the underlying Go value can be used concurrently for the equivalent
 * direct operations.
 * 
 * To compare two Values, compare the results of the Interface method.
 * Using == on two Values does not compare the underlying values
 * they represent.
 */
export class Value {
    /**
     * Creates a new Value instance.
     * @param {Partial<Value>} [$$source = {}] - The source object to create the Value.
     */
    constructor($$source = {}) {

        Object.assign(this, $$source);
    }

    /**
     * Creates a new Value instance from a string or object.
     * @param {any} [$$source = {}]
     * @returns {Value}
     */
    static createFrom($$source = {}) {
        let $$parsedSource = typeof $$source === 'string' ? JSON.parse($$source) : $$source;
        return new Value(/** @type {Partial<Value>} */($$parsedSource));
    }
}

// Private type creation functions
const $$createType0 = $Create.Array($Create.Any);
