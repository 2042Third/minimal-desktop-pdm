// @ts-check
// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unused imports
import {Create as $Create} from "@wailsio/runtime";

/**
 * DB is a database handle representing a pool of zero or more
 * underlying connections. It's safe for concurrent use by multiple
 * goroutines.
 * 
 * The sql package creates and frees connections automatically; it
 * also maintains a free pool of idle connections. If the database has
 * a concept of per-connection state, such state can be reliably observed
 * within a transaction ([Tx]) or connection ([Conn]). Once [DB.Begin] is called, the
 * returned [Tx] is bound to a single connection. Once [Tx.Commit] or
 * [Tx.Rollback] is called on the transaction, that transaction's
 * connection is returned to [DB]'s idle connection pool. The pool size
 * can be controlled with [DB.SetMaxIdleConns].
 */
export class DB {
    /**
     * Creates a new DB instance.
     * @param {Partial<DB>} [$$source = {}] - The source object to create the DB.
     */
    constructor($$source = {}) {

        Object.assign(this, $$source);
    }

    /**
     * Creates a new DB instance from a string or object.
     * @param {any} [$$source = {}]
     * @returns {DB}
     */
    static createFrom($$source = {}) {
        let $$parsedSource = typeof $$source === 'string' ? JSON.parse($$source) : $$source;
        return new DB(/** @type {Partial<DB>} */($$parsedSource));
    }
}
