
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Spice_jar_photos_upload
 * 
 */
export type Spice_jar_photos_upload = $Result.DefaultSelection<Prisma.$Spice_jar_photos_uploadPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Spice_jar_photos_uploads
 * const spice_jar_photos_uploads = await prisma.spice_jar_photos_upload.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Spice_jar_photos_uploads
   * const spice_jar_photos_uploads = await prisma.spice_jar_photos_upload.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.spice_jar_photos_upload`: Exposes CRUD operations for the **Spice_jar_photos_upload** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Spice_jar_photos_uploads
    * const spice_jar_photos_uploads = await prisma.spice_jar_photos_upload.findMany()
    * ```
    */
  get spice_jar_photos_upload(): Prisma.Spice_jar_photos_uploadDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.2.0
   * Query Engine version: 2804dc98259d2ea960602aca6b8e7fdc03c1758f
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
export type InputJsonValue = null | string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Spice_jar_photos_upload: 'Spice_jar_photos_upload'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.Args}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'spice_jar_photos_upload'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      Spice_jar_photos_upload: {
        payload: Prisma.$Spice_jar_photos_uploadPayload<ExtArgs>
        fields: Prisma.Spice_jar_photos_uploadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Spice_jar_photos_uploadFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Spice_jar_photos_uploadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Spice_jar_photos_uploadFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Spice_jar_photos_uploadPayload>
          }
          findFirst: {
            args: Prisma.Spice_jar_photos_uploadFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Spice_jar_photos_uploadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Spice_jar_photos_uploadFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Spice_jar_photos_uploadPayload>
          }
          findMany: {
            args: Prisma.Spice_jar_photos_uploadFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Spice_jar_photos_uploadPayload>[]
          }
          create: {
            args: Prisma.Spice_jar_photos_uploadCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Spice_jar_photos_uploadPayload>
          }
          createMany: {
            args: Prisma.Spice_jar_photos_uploadCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.Spice_jar_photos_uploadDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Spice_jar_photos_uploadPayload>
          }
          update: {
            args: Prisma.Spice_jar_photos_uploadUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Spice_jar_photos_uploadPayload>
          }
          deleteMany: {
            args: Prisma.Spice_jar_photos_uploadDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.Spice_jar_photos_uploadUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.Spice_jar_photos_uploadUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Spice_jar_photos_uploadPayload>
          }
          aggregate: {
            args: Prisma.Spice_jar_photos_uploadAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateSpice_jar_photos_upload>
          }
          groupBy: {
            args: Prisma.Spice_jar_photos_uploadGroupByArgs<ExtArgs>,
            result: $Utils.Optional<Spice_jar_photos_uploadGroupByOutputType>[]
          }
          count: {
            args: Prisma.Spice_jar_photos_uploadCountArgs<ExtArgs>,
            result: $Utils.Optional<Spice_jar_photos_uploadCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Spice_jar_photos_upload
   */

  export type AggregateSpice_jar_photos_upload = {
    _count: Spice_jar_photos_uploadCountAggregateOutputType | null
    _avg: Spice_jar_photos_uploadAvgAggregateOutputType | null
    _sum: Spice_jar_photos_uploadSumAggregateOutputType | null
    _min: Spice_jar_photos_uploadMinAggregateOutputType | null
    _max: Spice_jar_photos_uploadMaxAggregateOutputType | null
  }

  export type Spice_jar_photos_uploadAvgAggregateOutputType = {
    upload_duration_sec: number | null
    ai_processing_duration_sec: number | null
  }

  export type Spice_jar_photos_uploadSumAggregateOutputType = {
    upload_duration_sec: number | null
    ai_processing_duration_sec: number | null
  }

  export type Spice_jar_photos_uploadMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    uploaded_at: Date | null
    upload_duration_sec: number | null
    ai_processing_duration_sec: number | null
    photo_url: string | null
  }

  export type Spice_jar_photos_uploadMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    uploaded_at: Date | null
    upload_duration_sec: number | null
    ai_processing_duration_sec: number | null
    photo_url: string | null
  }

  export type Spice_jar_photos_uploadCountAggregateOutputType = {
    id: number
    created_at: number
    uploaded_at: number
    upload_duration_sec: number
    ai_processing_duration_sec: number
    photo_url: number
    extracted_data: number
    _all: number
  }


  export type Spice_jar_photos_uploadAvgAggregateInputType = {
    upload_duration_sec?: true
    ai_processing_duration_sec?: true
  }

  export type Spice_jar_photos_uploadSumAggregateInputType = {
    upload_duration_sec?: true
    ai_processing_duration_sec?: true
  }

  export type Spice_jar_photos_uploadMinAggregateInputType = {
    id?: true
    created_at?: true
    uploaded_at?: true
    upload_duration_sec?: true
    ai_processing_duration_sec?: true
    photo_url?: true
  }

  export type Spice_jar_photos_uploadMaxAggregateInputType = {
    id?: true
    created_at?: true
    uploaded_at?: true
    upload_duration_sec?: true
    ai_processing_duration_sec?: true
    photo_url?: true
  }

  export type Spice_jar_photos_uploadCountAggregateInputType = {
    id?: true
    created_at?: true
    uploaded_at?: true
    upload_duration_sec?: true
    ai_processing_duration_sec?: true
    photo_url?: true
    extracted_data?: true
    _all?: true
  }

  export type Spice_jar_photos_uploadAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Spice_jar_photos_upload to aggregate.
     */
    where?: Spice_jar_photos_uploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spice_jar_photos_uploads to fetch.
     */
    orderBy?: Spice_jar_photos_uploadOrderByWithRelationInput | Spice_jar_photos_uploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Spice_jar_photos_uploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spice_jar_photos_uploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spice_jar_photos_uploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Spice_jar_photos_uploads
    **/
    _count?: true | Spice_jar_photos_uploadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Spice_jar_photos_uploadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Spice_jar_photos_uploadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Spice_jar_photos_uploadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Spice_jar_photos_uploadMaxAggregateInputType
  }

  export type GetSpice_jar_photos_uploadAggregateType<T extends Spice_jar_photos_uploadAggregateArgs> = {
        [P in keyof T & keyof AggregateSpice_jar_photos_upload]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpice_jar_photos_upload[P]>
      : GetScalarType<T[P], AggregateSpice_jar_photos_upload[P]>
  }




  export type Spice_jar_photos_uploadGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: Spice_jar_photos_uploadWhereInput
    orderBy?: Spice_jar_photos_uploadOrderByWithAggregationInput | Spice_jar_photos_uploadOrderByWithAggregationInput[]
    by: Spice_jar_photos_uploadScalarFieldEnum[] | Spice_jar_photos_uploadScalarFieldEnum
    having?: Spice_jar_photos_uploadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Spice_jar_photos_uploadCountAggregateInputType | true
    _avg?: Spice_jar_photos_uploadAvgAggregateInputType
    _sum?: Spice_jar_photos_uploadSumAggregateInputType
    _min?: Spice_jar_photos_uploadMinAggregateInputType
    _max?: Spice_jar_photos_uploadMaxAggregateInputType
  }

  export type Spice_jar_photos_uploadGroupByOutputType = {
    id: string
    created_at: Date
    uploaded_at: Date | null
    upload_duration_sec: number | null
    ai_processing_duration_sec: number | null
    photo_url: string | null
    extracted_data: JsonValue | null
    _count: Spice_jar_photos_uploadCountAggregateOutputType | null
    _avg: Spice_jar_photos_uploadAvgAggregateOutputType | null
    _sum: Spice_jar_photos_uploadSumAggregateOutputType | null
    _min: Spice_jar_photos_uploadMinAggregateOutputType | null
    _max: Spice_jar_photos_uploadMaxAggregateOutputType | null
  }

  type GetSpice_jar_photos_uploadGroupByPayload<T extends Spice_jar_photos_uploadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Spice_jar_photos_uploadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Spice_jar_photos_uploadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Spice_jar_photos_uploadGroupByOutputType[P]>
            : GetScalarType<T[P], Spice_jar_photos_uploadGroupByOutputType[P]>
        }
      >
    >


  export type Spice_jar_photos_uploadSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    uploaded_at?: boolean
    upload_duration_sec?: boolean
    ai_processing_duration_sec?: boolean
    photo_url?: boolean
    extracted_data?: boolean
  }, ExtArgs["result"]["spice_jar_photos_upload"]>

  export type Spice_jar_photos_uploadSelectScalar = {
    id?: boolean
    created_at?: boolean
    uploaded_at?: boolean
    upload_duration_sec?: boolean
    ai_processing_duration_sec?: boolean
    photo_url?: boolean
    extracted_data?: boolean
  }


  export type $Spice_jar_photos_uploadPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "Spice_jar_photos_upload"
    objects: {}
    scalars: $Extensions.GetResult<{
      /**
       * @zod.string.uuid()
       */
      id: string
      created_at: Date
      uploaded_at: Date | null
      /**
       * @zod.custom.use(z.number().or(z.nan()))
       */
      upload_duration_sec: number | null
      /**
       * @zod.custom.use(z.number().or(z.nan()))
       */
      ai_processing_duration_sec: number | null
      photo_url: string | null
      extracted_data: Prisma.JsonValue | null
    }, ExtArgs["result"]["spice_jar_photos_upload"]>
    composites: {}
  }


  type Spice_jar_photos_uploadGetPayload<S extends boolean | null | undefined | Spice_jar_photos_uploadDefaultArgs> = $Result.GetResult<Prisma.$Spice_jar_photos_uploadPayload, S>

  type Spice_jar_photos_uploadCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<Spice_jar_photos_uploadFindManyArgs, 'select' | 'include'> & {
      select?: Spice_jar_photos_uploadCountAggregateInputType | true
    }

  export interface Spice_jar_photos_uploadDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Spice_jar_photos_upload'], meta: { name: 'Spice_jar_photos_upload' } }
    /**
     * Find zero or one Spice_jar_photos_upload that matches the filter.
     * @param {Spice_jar_photos_uploadFindUniqueArgs} args - Arguments to find a Spice_jar_photos_upload
     * @example
     * // Get one Spice_jar_photos_upload
     * const spice_jar_photos_upload = await prisma.spice_jar_photos_upload.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends Spice_jar_photos_uploadFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, Spice_jar_photos_uploadFindUniqueArgs<ExtArgs>>
    ): Prisma__Spice_jar_photos_uploadClient<$Result.GetResult<Prisma.$Spice_jar_photos_uploadPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Spice_jar_photos_upload that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {Spice_jar_photos_uploadFindUniqueOrThrowArgs} args - Arguments to find a Spice_jar_photos_upload
     * @example
     * // Get one Spice_jar_photos_upload
     * const spice_jar_photos_upload = await prisma.spice_jar_photos_upload.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends Spice_jar_photos_uploadFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, Spice_jar_photos_uploadFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__Spice_jar_photos_uploadClient<$Result.GetResult<Prisma.$Spice_jar_photos_uploadPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Spice_jar_photos_upload that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Spice_jar_photos_uploadFindFirstArgs} args - Arguments to find a Spice_jar_photos_upload
     * @example
     * // Get one Spice_jar_photos_upload
     * const spice_jar_photos_upload = await prisma.spice_jar_photos_upload.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends Spice_jar_photos_uploadFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, Spice_jar_photos_uploadFindFirstArgs<ExtArgs>>
    ): Prisma__Spice_jar_photos_uploadClient<$Result.GetResult<Prisma.$Spice_jar_photos_uploadPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Spice_jar_photos_upload that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Spice_jar_photos_uploadFindFirstOrThrowArgs} args - Arguments to find a Spice_jar_photos_upload
     * @example
     * // Get one Spice_jar_photos_upload
     * const spice_jar_photos_upload = await prisma.spice_jar_photos_upload.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends Spice_jar_photos_uploadFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, Spice_jar_photos_uploadFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__Spice_jar_photos_uploadClient<$Result.GetResult<Prisma.$Spice_jar_photos_uploadPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Spice_jar_photos_uploads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Spice_jar_photos_uploadFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Spice_jar_photos_uploads
     * const spice_jar_photos_uploads = await prisma.spice_jar_photos_upload.findMany()
     * 
     * // Get first 10 Spice_jar_photos_uploads
     * const spice_jar_photos_uploads = await prisma.spice_jar_photos_upload.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const spice_jar_photos_uploadWithIdOnly = await prisma.spice_jar_photos_upload.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends Spice_jar_photos_uploadFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, Spice_jar_photos_uploadFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Spice_jar_photos_uploadPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Spice_jar_photos_upload.
     * @param {Spice_jar_photos_uploadCreateArgs} args - Arguments to create a Spice_jar_photos_upload.
     * @example
     * // Create one Spice_jar_photos_upload
     * const Spice_jar_photos_upload = await prisma.spice_jar_photos_upload.create({
     *   data: {
     *     // ... data to create a Spice_jar_photos_upload
     *   }
     * })
     * 
    **/
    create<T extends Spice_jar_photos_uploadCreateArgs<ExtArgs>>(
      args: SelectSubset<T, Spice_jar_photos_uploadCreateArgs<ExtArgs>>
    ): Prisma__Spice_jar_photos_uploadClient<$Result.GetResult<Prisma.$Spice_jar_photos_uploadPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Spice_jar_photos_uploads.
     *     @param {Spice_jar_photos_uploadCreateManyArgs} args - Arguments to create many Spice_jar_photos_uploads.
     *     @example
     *     // Create many Spice_jar_photos_uploads
     *     const spice_jar_photos_upload = await prisma.spice_jar_photos_upload.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends Spice_jar_photos_uploadCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, Spice_jar_photos_uploadCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Spice_jar_photos_upload.
     * @param {Spice_jar_photos_uploadDeleteArgs} args - Arguments to delete one Spice_jar_photos_upload.
     * @example
     * // Delete one Spice_jar_photos_upload
     * const Spice_jar_photos_upload = await prisma.spice_jar_photos_upload.delete({
     *   where: {
     *     // ... filter to delete one Spice_jar_photos_upload
     *   }
     * })
     * 
    **/
    delete<T extends Spice_jar_photos_uploadDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, Spice_jar_photos_uploadDeleteArgs<ExtArgs>>
    ): Prisma__Spice_jar_photos_uploadClient<$Result.GetResult<Prisma.$Spice_jar_photos_uploadPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Spice_jar_photos_upload.
     * @param {Spice_jar_photos_uploadUpdateArgs} args - Arguments to update one Spice_jar_photos_upload.
     * @example
     * // Update one Spice_jar_photos_upload
     * const spice_jar_photos_upload = await prisma.spice_jar_photos_upload.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends Spice_jar_photos_uploadUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, Spice_jar_photos_uploadUpdateArgs<ExtArgs>>
    ): Prisma__Spice_jar_photos_uploadClient<$Result.GetResult<Prisma.$Spice_jar_photos_uploadPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Spice_jar_photos_uploads.
     * @param {Spice_jar_photos_uploadDeleteManyArgs} args - Arguments to filter Spice_jar_photos_uploads to delete.
     * @example
     * // Delete a few Spice_jar_photos_uploads
     * const { count } = await prisma.spice_jar_photos_upload.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends Spice_jar_photos_uploadDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, Spice_jar_photos_uploadDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spice_jar_photos_uploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Spice_jar_photos_uploadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Spice_jar_photos_uploads
     * const spice_jar_photos_upload = await prisma.spice_jar_photos_upload.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends Spice_jar_photos_uploadUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, Spice_jar_photos_uploadUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Spice_jar_photos_upload.
     * @param {Spice_jar_photos_uploadUpsertArgs} args - Arguments to update or create a Spice_jar_photos_upload.
     * @example
     * // Update or create a Spice_jar_photos_upload
     * const spice_jar_photos_upload = await prisma.spice_jar_photos_upload.upsert({
     *   create: {
     *     // ... data to create a Spice_jar_photos_upload
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Spice_jar_photos_upload we want to update
     *   }
     * })
    **/
    upsert<T extends Spice_jar_photos_uploadUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, Spice_jar_photos_uploadUpsertArgs<ExtArgs>>
    ): Prisma__Spice_jar_photos_uploadClient<$Result.GetResult<Prisma.$Spice_jar_photos_uploadPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Spice_jar_photos_uploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Spice_jar_photos_uploadCountArgs} args - Arguments to filter Spice_jar_photos_uploads to count.
     * @example
     * // Count the number of Spice_jar_photos_uploads
     * const count = await prisma.spice_jar_photos_upload.count({
     *   where: {
     *     // ... the filter for the Spice_jar_photos_uploads we want to count
     *   }
     * })
    **/
    count<T extends Spice_jar_photos_uploadCountArgs>(
      args?: Subset<T, Spice_jar_photos_uploadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Spice_jar_photos_uploadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Spice_jar_photos_upload.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Spice_jar_photos_uploadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Spice_jar_photos_uploadAggregateArgs>(args: Subset<T, Spice_jar_photos_uploadAggregateArgs>): Prisma.PrismaPromise<GetSpice_jar_photos_uploadAggregateType<T>>

    /**
     * Group by Spice_jar_photos_upload.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Spice_jar_photos_uploadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Spice_jar_photos_uploadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Spice_jar_photos_uploadGroupByArgs['orderBy'] }
        : { orderBy?: Spice_jar_photos_uploadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Spice_jar_photos_uploadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpice_jar_photos_uploadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Spice_jar_photos_upload model
   */
  readonly fields: Spice_jar_photos_uploadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Spice_jar_photos_upload.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Spice_jar_photos_uploadClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Spice_jar_photos_upload model
   */ 
  interface Spice_jar_photos_uploadFieldRefs {
    readonly id: FieldRef<"Spice_jar_photos_upload", 'String'>
    readonly created_at: FieldRef<"Spice_jar_photos_upload", 'DateTime'>
    readonly uploaded_at: FieldRef<"Spice_jar_photos_upload", 'DateTime'>
    readonly upload_duration_sec: FieldRef<"Spice_jar_photos_upload", 'Float'>
    readonly ai_processing_duration_sec: FieldRef<"Spice_jar_photos_upload", 'Float'>
    readonly photo_url: FieldRef<"Spice_jar_photos_upload", 'String'>
    readonly extracted_data: FieldRef<"Spice_jar_photos_upload", 'Json'>
  }
    

  // Custom InputTypes

  /**
   * Spice_jar_photos_upload findUnique
   */
  export type Spice_jar_photos_uploadFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spice_jar_photos_upload
     */
    select?: Spice_jar_photos_uploadSelect<ExtArgs> | null
    /**
     * Filter, which Spice_jar_photos_upload to fetch.
     */
    where: Spice_jar_photos_uploadWhereUniqueInput
  }


  /**
   * Spice_jar_photos_upload findUniqueOrThrow
   */
  export type Spice_jar_photos_uploadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spice_jar_photos_upload
     */
    select?: Spice_jar_photos_uploadSelect<ExtArgs> | null
    /**
     * Filter, which Spice_jar_photos_upload to fetch.
     */
    where: Spice_jar_photos_uploadWhereUniqueInput
  }


  /**
   * Spice_jar_photos_upload findFirst
   */
  export type Spice_jar_photos_uploadFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spice_jar_photos_upload
     */
    select?: Spice_jar_photos_uploadSelect<ExtArgs> | null
    /**
     * Filter, which Spice_jar_photos_upload to fetch.
     */
    where?: Spice_jar_photos_uploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spice_jar_photos_uploads to fetch.
     */
    orderBy?: Spice_jar_photos_uploadOrderByWithRelationInput | Spice_jar_photos_uploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Spice_jar_photos_uploads.
     */
    cursor?: Spice_jar_photos_uploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spice_jar_photos_uploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spice_jar_photos_uploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Spice_jar_photos_uploads.
     */
    distinct?: Spice_jar_photos_uploadScalarFieldEnum | Spice_jar_photos_uploadScalarFieldEnum[]
  }


  /**
   * Spice_jar_photos_upload findFirstOrThrow
   */
  export type Spice_jar_photos_uploadFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spice_jar_photos_upload
     */
    select?: Spice_jar_photos_uploadSelect<ExtArgs> | null
    /**
     * Filter, which Spice_jar_photos_upload to fetch.
     */
    where?: Spice_jar_photos_uploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spice_jar_photos_uploads to fetch.
     */
    orderBy?: Spice_jar_photos_uploadOrderByWithRelationInput | Spice_jar_photos_uploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Spice_jar_photos_uploads.
     */
    cursor?: Spice_jar_photos_uploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spice_jar_photos_uploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spice_jar_photos_uploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Spice_jar_photos_uploads.
     */
    distinct?: Spice_jar_photos_uploadScalarFieldEnum | Spice_jar_photos_uploadScalarFieldEnum[]
  }


  /**
   * Spice_jar_photos_upload findMany
   */
  export type Spice_jar_photos_uploadFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spice_jar_photos_upload
     */
    select?: Spice_jar_photos_uploadSelect<ExtArgs> | null
    /**
     * Filter, which Spice_jar_photos_uploads to fetch.
     */
    where?: Spice_jar_photos_uploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spice_jar_photos_uploads to fetch.
     */
    orderBy?: Spice_jar_photos_uploadOrderByWithRelationInput | Spice_jar_photos_uploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Spice_jar_photos_uploads.
     */
    cursor?: Spice_jar_photos_uploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spice_jar_photos_uploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spice_jar_photos_uploads.
     */
    skip?: number
    distinct?: Spice_jar_photos_uploadScalarFieldEnum | Spice_jar_photos_uploadScalarFieldEnum[]
  }


  /**
   * Spice_jar_photos_upload create
   */
  export type Spice_jar_photos_uploadCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spice_jar_photos_upload
     */
    select?: Spice_jar_photos_uploadSelect<ExtArgs> | null
    /**
     * The data needed to create a Spice_jar_photos_upload.
     */
    data: XOR<Spice_jar_photos_uploadCreateInput, Spice_jar_photos_uploadUncheckedCreateInput>
  }


  /**
   * Spice_jar_photos_upload createMany
   */
  export type Spice_jar_photos_uploadCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Spice_jar_photos_uploads.
     */
    data: Spice_jar_photos_uploadCreateManyInput | Spice_jar_photos_uploadCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Spice_jar_photos_upload update
   */
  export type Spice_jar_photos_uploadUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spice_jar_photos_upload
     */
    select?: Spice_jar_photos_uploadSelect<ExtArgs> | null
    /**
     * The data needed to update a Spice_jar_photos_upload.
     */
    data: XOR<Spice_jar_photos_uploadUpdateInput, Spice_jar_photos_uploadUncheckedUpdateInput>
    /**
     * Choose, which Spice_jar_photos_upload to update.
     */
    where: Spice_jar_photos_uploadWhereUniqueInput
  }


  /**
   * Spice_jar_photos_upload updateMany
   */
  export type Spice_jar_photos_uploadUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Spice_jar_photos_uploads.
     */
    data: XOR<Spice_jar_photos_uploadUpdateManyMutationInput, Spice_jar_photos_uploadUncheckedUpdateManyInput>
    /**
     * Filter which Spice_jar_photos_uploads to update
     */
    where?: Spice_jar_photos_uploadWhereInput
  }


  /**
   * Spice_jar_photos_upload upsert
   */
  export type Spice_jar_photos_uploadUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spice_jar_photos_upload
     */
    select?: Spice_jar_photos_uploadSelect<ExtArgs> | null
    /**
     * The filter to search for the Spice_jar_photos_upload to update in case it exists.
     */
    where: Spice_jar_photos_uploadWhereUniqueInput
    /**
     * In case the Spice_jar_photos_upload found by the `where` argument doesn't exist, create a new Spice_jar_photos_upload with this data.
     */
    create: XOR<Spice_jar_photos_uploadCreateInput, Spice_jar_photos_uploadUncheckedCreateInput>
    /**
     * In case the Spice_jar_photos_upload was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Spice_jar_photos_uploadUpdateInput, Spice_jar_photos_uploadUncheckedUpdateInput>
  }


  /**
   * Spice_jar_photos_upload delete
   */
  export type Spice_jar_photos_uploadDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spice_jar_photos_upload
     */
    select?: Spice_jar_photos_uploadSelect<ExtArgs> | null
    /**
     * Filter which Spice_jar_photos_upload to delete.
     */
    where: Spice_jar_photos_uploadWhereUniqueInput
  }


  /**
   * Spice_jar_photos_upload deleteMany
   */
  export type Spice_jar_photos_uploadDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Spice_jar_photos_uploads to delete
     */
    where?: Spice_jar_photos_uploadWhereInput
  }


  /**
   * Spice_jar_photos_upload without action
   */
  export type Spice_jar_photos_uploadDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spice_jar_photos_upload
     */
    select?: Spice_jar_photos_uploadSelect<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Spice_jar_photos_uploadScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    uploaded_at: 'uploaded_at',
    upload_duration_sec: 'upload_duration_sec',
    ai_processing_duration_sec: 'ai_processing_duration_sec',
    photo_url: 'photo_url',
    extracted_data: 'extracted_data'
  };

  export type Spice_jar_photos_uploadScalarFieldEnum = (typeof Spice_jar_photos_uploadScalarFieldEnum)[keyof typeof Spice_jar_photos_uploadScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type Spice_jar_photos_uploadWhereInput = {
    AND?: Spice_jar_photos_uploadWhereInput | Spice_jar_photos_uploadWhereInput[]
    OR?: Spice_jar_photos_uploadWhereInput[]
    NOT?: Spice_jar_photos_uploadWhereInput | Spice_jar_photos_uploadWhereInput[]
    id?: UuidFilter<"Spice_jar_photos_upload"> | string
    created_at?: DateTimeFilter<"Spice_jar_photos_upload"> | Date | string
    uploaded_at?: DateTimeNullableFilter<"Spice_jar_photos_upload"> | Date | string | null
    upload_duration_sec?: FloatNullableFilter<"Spice_jar_photos_upload"> | number | null
    ai_processing_duration_sec?: FloatNullableFilter<"Spice_jar_photos_upload"> | number | null
    photo_url?: StringNullableFilter<"Spice_jar_photos_upload"> | string | null
    extracted_data?: JsonNullableFilter<"Spice_jar_photos_upload">
  }

  export type Spice_jar_photos_uploadOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    uploaded_at?: SortOrderInput | SortOrder
    upload_duration_sec?: SortOrderInput | SortOrder
    ai_processing_duration_sec?: SortOrderInput | SortOrder
    photo_url?: SortOrderInput | SortOrder
    extracted_data?: SortOrderInput | SortOrder
  }

  export type Spice_jar_photos_uploadWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: Spice_jar_photos_uploadWhereInput | Spice_jar_photos_uploadWhereInput[]
    OR?: Spice_jar_photos_uploadWhereInput[]
    NOT?: Spice_jar_photos_uploadWhereInput | Spice_jar_photos_uploadWhereInput[]
    created_at?: DateTimeFilter<"Spice_jar_photos_upload"> | Date | string
    uploaded_at?: DateTimeNullableFilter<"Spice_jar_photos_upload"> | Date | string | null
    upload_duration_sec?: FloatNullableFilter<"Spice_jar_photos_upload"> | number | null
    ai_processing_duration_sec?: FloatNullableFilter<"Spice_jar_photos_upload"> | number | null
    photo_url?: StringNullableFilter<"Spice_jar_photos_upload"> | string | null
    extracted_data?: JsonNullableFilter<"Spice_jar_photos_upload">
  }, "id">

  export type Spice_jar_photos_uploadOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    uploaded_at?: SortOrderInput | SortOrder
    upload_duration_sec?: SortOrderInput | SortOrder
    ai_processing_duration_sec?: SortOrderInput | SortOrder
    photo_url?: SortOrderInput | SortOrder
    extracted_data?: SortOrderInput | SortOrder
    _count?: Spice_jar_photos_uploadCountOrderByAggregateInput
    _avg?: Spice_jar_photos_uploadAvgOrderByAggregateInput
    _max?: Spice_jar_photos_uploadMaxOrderByAggregateInput
    _min?: Spice_jar_photos_uploadMinOrderByAggregateInput
    _sum?: Spice_jar_photos_uploadSumOrderByAggregateInput
  }

  export type Spice_jar_photos_uploadScalarWhereWithAggregatesInput = {
    AND?: Spice_jar_photos_uploadScalarWhereWithAggregatesInput | Spice_jar_photos_uploadScalarWhereWithAggregatesInput[]
    OR?: Spice_jar_photos_uploadScalarWhereWithAggregatesInput[]
    NOT?: Spice_jar_photos_uploadScalarWhereWithAggregatesInput | Spice_jar_photos_uploadScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Spice_jar_photos_upload"> | string
    created_at?: DateTimeWithAggregatesFilter<"Spice_jar_photos_upload"> | Date | string
    uploaded_at?: DateTimeNullableWithAggregatesFilter<"Spice_jar_photos_upload"> | Date | string | null
    upload_duration_sec?: FloatNullableWithAggregatesFilter<"Spice_jar_photos_upload"> | number | null
    ai_processing_duration_sec?: FloatNullableWithAggregatesFilter<"Spice_jar_photos_upload"> | number | null
    photo_url?: StringNullableWithAggregatesFilter<"Spice_jar_photos_upload"> | string | null
    extracted_data?: JsonNullableWithAggregatesFilter<"Spice_jar_photos_upload">
  }

  export type Spice_jar_photos_uploadCreateInput = {
    id: string
    created_at: Date | string
    uploaded_at?: Date | string | null
    upload_duration_sec?: number | null
    ai_processing_duration_sec?: number | null
    photo_url?: string | null
    extracted_data?: NullableJsonNullValueInput | InputJsonValue
  }

  export type Spice_jar_photos_uploadUncheckedCreateInput = {
    id: string
    created_at: Date | string
    uploaded_at?: Date | string | null
    upload_duration_sec?: number | null
    ai_processing_duration_sec?: number | null
    photo_url?: string | null
    extracted_data?: NullableJsonNullValueInput | InputJsonValue
  }

  export type Spice_jar_photos_uploadUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    upload_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    ai_processing_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    extracted_data?: NullableJsonNullValueInput | InputJsonValue
  }

  export type Spice_jar_photos_uploadUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    upload_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    ai_processing_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    extracted_data?: NullableJsonNullValueInput | InputJsonValue
  }

  export type Spice_jar_photos_uploadCreateManyInput = {
    id: string
    created_at: Date | string
    uploaded_at?: Date | string | null
    upload_duration_sec?: number | null
    ai_processing_duration_sec?: number | null
    photo_url?: string | null
    extracted_data?: NullableJsonNullValueInput | InputJsonValue
  }

  export type Spice_jar_photos_uploadUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    upload_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    ai_processing_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    extracted_data?: NullableJsonNullValueInput | InputJsonValue
  }

  export type Spice_jar_photos_uploadUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    upload_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    ai_processing_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    extracted_data?: NullableJsonNullValueInput | InputJsonValue
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type Spice_jar_photos_uploadCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    uploaded_at?: SortOrder
    upload_duration_sec?: SortOrder
    ai_processing_duration_sec?: SortOrder
    photo_url?: SortOrder
    extracted_data?: SortOrder
  }

  export type Spice_jar_photos_uploadAvgOrderByAggregateInput = {
    upload_duration_sec?: SortOrder
    ai_processing_duration_sec?: SortOrder
  }

  export type Spice_jar_photos_uploadMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    uploaded_at?: SortOrder
    upload_duration_sec?: SortOrder
    ai_processing_duration_sec?: SortOrder
    photo_url?: SortOrder
  }

  export type Spice_jar_photos_uploadMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    uploaded_at?: SortOrder
    upload_duration_sec?: SortOrder
    ai_processing_duration_sec?: SortOrder
    photo_url?: SortOrder
  }

  export type Spice_jar_photos_uploadSumOrderByAggregateInput = {
    upload_duration_sec?: SortOrder
    ai_processing_duration_sec?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use Spice_jar_photos_uploadDefaultArgs instead
     */
    export type Spice_jar_photos_uploadArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = Spice_jar_photos_uploadDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}