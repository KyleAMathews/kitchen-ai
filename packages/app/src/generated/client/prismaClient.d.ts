
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
 * Model Ingredients
 * 
 */
export type Ingredients = $Result.DefaultSelection<Prisma.$IngredientsPayload>
/**
 * Model Ingredients_photo_uploads
 * 
 */
export type Ingredients_photo_uploads = $Result.DefaultSelection<Prisma.$Ingredients_photo_uploadsPayload>
/**
 * Model Users
 * 
 */
export type Users = $Result.DefaultSelection<Prisma.$UsersPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const photo_upload_state: {
  uploading: 'uploading',
  ai_processing: 'ai_processing',
  reviewing: 'reviewing',
  done: 'done'
};

export type photo_upload_state = (typeof photo_upload_state)[keyof typeof photo_upload_state]

}

export type photo_upload_state = $Enums.photo_upload_state

export const photo_upload_state: typeof $Enums.photo_upload_state

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Ingredients
 * const ingredients = await prisma.ingredients.findMany()
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
   * // Fetch zero or more Ingredients
   * const ingredients = await prisma.ingredients.findMany()
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
   * `prisma.ingredients`: Exposes CRUD operations for the **Ingredients** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ingredients
    * const ingredients = await prisma.ingredients.findMany()
    * ```
    */
  get ingredients(): Prisma.IngredientsDelegate<ExtArgs>;

  /**
   * `prisma.ingredients_photo_uploads`: Exposes CRUD operations for the **Ingredients_photo_uploads** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ingredients_photo_uploads
    * const ingredients_photo_uploads = await prisma.ingredients_photo_uploads.findMany()
    * ```
    */
  get ingredients_photo_uploads(): Prisma.Ingredients_photo_uploadsDelegate<ExtArgs>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **Users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.UsersDelegate<ExtArgs>;
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
    Ingredients: 'Ingredients',
    Ingredients_photo_uploads: 'Ingredients_photo_uploads',
    Users: 'Users'
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
      modelProps: 'ingredients' | 'ingredients_photo_uploads' | 'users'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      Ingredients: {
        payload: Prisma.$IngredientsPayload<ExtArgs>
        fields: Prisma.IngredientsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IngredientsFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$IngredientsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IngredientsFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$IngredientsPayload>
          }
          findFirst: {
            args: Prisma.IngredientsFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$IngredientsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IngredientsFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$IngredientsPayload>
          }
          findMany: {
            args: Prisma.IngredientsFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$IngredientsPayload>[]
          }
          create: {
            args: Prisma.IngredientsCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$IngredientsPayload>
          }
          createMany: {
            args: Prisma.IngredientsCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.IngredientsDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$IngredientsPayload>
          }
          update: {
            args: Prisma.IngredientsUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$IngredientsPayload>
          }
          deleteMany: {
            args: Prisma.IngredientsDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.IngredientsUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.IngredientsUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$IngredientsPayload>
          }
          aggregate: {
            args: Prisma.IngredientsAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateIngredients>
          }
          groupBy: {
            args: Prisma.IngredientsGroupByArgs<ExtArgs>,
            result: $Utils.Optional<IngredientsGroupByOutputType>[]
          }
          count: {
            args: Prisma.IngredientsCountArgs<ExtArgs>,
            result: $Utils.Optional<IngredientsCountAggregateOutputType> | number
          }
        }
      }
      Ingredients_photo_uploads: {
        payload: Prisma.$Ingredients_photo_uploadsPayload<ExtArgs>
        fields: Prisma.Ingredients_photo_uploadsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Ingredients_photo_uploadsFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Ingredients_photo_uploadsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Ingredients_photo_uploadsFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Ingredients_photo_uploadsPayload>
          }
          findFirst: {
            args: Prisma.Ingredients_photo_uploadsFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Ingredients_photo_uploadsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Ingredients_photo_uploadsFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Ingredients_photo_uploadsPayload>
          }
          findMany: {
            args: Prisma.Ingredients_photo_uploadsFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Ingredients_photo_uploadsPayload>[]
          }
          create: {
            args: Prisma.Ingredients_photo_uploadsCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Ingredients_photo_uploadsPayload>
          }
          createMany: {
            args: Prisma.Ingredients_photo_uploadsCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.Ingredients_photo_uploadsDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Ingredients_photo_uploadsPayload>
          }
          update: {
            args: Prisma.Ingredients_photo_uploadsUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Ingredients_photo_uploadsPayload>
          }
          deleteMany: {
            args: Prisma.Ingredients_photo_uploadsDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.Ingredients_photo_uploadsUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.Ingredients_photo_uploadsUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Ingredients_photo_uploadsPayload>
          }
          aggregate: {
            args: Prisma.Ingredients_photo_uploadsAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateIngredients_photo_uploads>
          }
          groupBy: {
            args: Prisma.Ingredients_photo_uploadsGroupByArgs<ExtArgs>,
            result: $Utils.Optional<Ingredients_photo_uploadsGroupByOutputType>[]
          }
          count: {
            args: Prisma.Ingredients_photo_uploadsCountArgs<ExtArgs>,
            result: $Utils.Optional<Ingredients_photo_uploadsCountAggregateOutputType> | number
          }
        }
      }
      Users: {
        payload: Prisma.$UsersPayload<ExtArgs>
        fields: Prisma.UsersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsersFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UsersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsersFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          findFirst: {
            args: Prisma.UsersFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UsersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsersFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          findMany: {
            args: Prisma.UsersFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>[]
          }
          create: {
            args: Prisma.UsersCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          createMany: {
            args: Prisma.UsersCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UsersDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          update: {
            args: Prisma.UsersUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          deleteMany: {
            args: Prisma.UsersDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UsersUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UsersUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.UsersGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsersCountArgs<ExtArgs>,
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
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
   * Count Type Ingredients_photo_uploadsCountOutputType
   */

  export type Ingredients_photo_uploadsCountOutputType = {
    ingredients: number
  }

  export type Ingredients_photo_uploadsCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    ingredients?: boolean | Ingredients_photo_uploadsCountOutputTypeCountIngredientsArgs
  }

  // Custom InputTypes

  /**
   * Ingredients_photo_uploadsCountOutputType without action
   */
  export type Ingredients_photo_uploadsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploadsCountOutputType
     */
    select?: Ingredients_photo_uploadsCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * Ingredients_photo_uploadsCountOutputType without action
   */
  export type Ingredients_photo_uploadsCountOutputTypeCountIngredientsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: IngredientsWhereInput
  }



  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    ingredients_photo_uploads: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    ingredients_photo_uploads?: boolean | UsersCountOutputTypeCountIngredients_photo_uploadsArgs
  }

  // Custom InputTypes

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountIngredients_photo_uploadsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: Ingredients_photo_uploadsWhereInput
  }



  /**
   * Models
   */

  /**
   * Model Ingredients
   */

  export type AggregateIngredients = {
    _count: IngredientsCountAggregateOutputType | null
    _avg: IngredientsAvgAggregateOutputType | null
    _sum: IngredientsSumAggregateOutputType | null
    _min: IngredientsMinAggregateOutputType | null
    _max: IngredientsMaxAggregateOutputType | null
  }

  export type IngredientsAvgAggregateOutputType = {
    fill_level: number | null
    shelf_life_months: number | null
  }

  export type IngredientsSumAggregateOutputType = {
    fill_level: number | null
    shelf_life_months: number | null
  }

  export type IngredientsMinAggregateOutputType = {
    id: string | null
    name: string | null
    is_reviewed: boolean | null
    fill_level: number | null
    shelf_life_months: number | null
    fill_date: string | null
    is_ground: boolean | null
    ingredients_photo_uploads_id: string | null
  }

  export type IngredientsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    is_reviewed: boolean | null
    fill_level: number | null
    shelf_life_months: number | null
    fill_date: string | null
    is_ground: boolean | null
    ingredients_photo_uploads_id: string | null
  }

  export type IngredientsCountAggregateOutputType = {
    id: number
    name: number
    is_reviewed: number
    fill_level: number
    shelf_life_months: number
    fill_date: number
    is_ground: number
    ingredients_photo_uploads_id: number
    _all: number
  }


  export type IngredientsAvgAggregateInputType = {
    fill_level?: true
    shelf_life_months?: true
  }

  export type IngredientsSumAggregateInputType = {
    fill_level?: true
    shelf_life_months?: true
  }

  export type IngredientsMinAggregateInputType = {
    id?: true
    name?: true
    is_reviewed?: true
    fill_level?: true
    shelf_life_months?: true
    fill_date?: true
    is_ground?: true
    ingredients_photo_uploads_id?: true
  }

  export type IngredientsMaxAggregateInputType = {
    id?: true
    name?: true
    is_reviewed?: true
    fill_level?: true
    shelf_life_months?: true
    fill_date?: true
    is_ground?: true
    ingredients_photo_uploads_id?: true
  }

  export type IngredientsCountAggregateInputType = {
    id?: true
    name?: true
    is_reviewed?: true
    fill_level?: true
    shelf_life_months?: true
    fill_date?: true
    is_ground?: true
    ingredients_photo_uploads_id?: true
    _all?: true
  }

  export type IngredientsAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ingredients to aggregate.
     */
    where?: IngredientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredients to fetch.
     */
    orderBy?: IngredientsOrderByWithRelationInput | IngredientsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IngredientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ingredients
    **/
    _count?: true | IngredientsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IngredientsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IngredientsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IngredientsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IngredientsMaxAggregateInputType
  }

  export type GetIngredientsAggregateType<T extends IngredientsAggregateArgs> = {
        [P in keyof T & keyof AggregateIngredients]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIngredients[P]>
      : GetScalarType<T[P], AggregateIngredients[P]>
  }




  export type IngredientsGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: IngredientsWhereInput
    orderBy?: IngredientsOrderByWithAggregationInput | IngredientsOrderByWithAggregationInput[]
    by: IngredientsScalarFieldEnum[] | IngredientsScalarFieldEnum
    having?: IngredientsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IngredientsCountAggregateInputType | true
    _avg?: IngredientsAvgAggregateInputType
    _sum?: IngredientsSumAggregateInputType
    _min?: IngredientsMinAggregateInputType
    _max?: IngredientsMaxAggregateInputType
  }

  export type IngredientsGroupByOutputType = {
    id: string
    name: string
    is_reviewed: boolean
    fill_level: number
    shelf_life_months: number
    fill_date: string
    is_ground: boolean | null
    ingredients_photo_uploads_id: string | null
    _count: IngredientsCountAggregateOutputType | null
    _avg: IngredientsAvgAggregateOutputType | null
    _sum: IngredientsSumAggregateOutputType | null
    _min: IngredientsMinAggregateOutputType | null
    _max: IngredientsMaxAggregateOutputType | null
  }

  type GetIngredientsGroupByPayload<T extends IngredientsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IngredientsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IngredientsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IngredientsGroupByOutputType[P]>
            : GetScalarType<T[P], IngredientsGroupByOutputType[P]>
        }
      >
    >


  export type IngredientsSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    is_reviewed?: boolean
    fill_level?: boolean
    shelf_life_months?: boolean
    fill_date?: boolean
    is_ground?: boolean
    ingredients_photo_uploads_id?: boolean
    ingredients_photo_uploads?: boolean | Ingredients$ingredients_photo_uploadsArgs<ExtArgs>
  }, ExtArgs["result"]["ingredients"]>

  export type IngredientsSelectScalar = {
    id?: boolean
    name?: boolean
    is_reviewed?: boolean
    fill_level?: boolean
    shelf_life_months?: boolean
    fill_date?: boolean
    is_ground?: boolean
    ingredients_photo_uploads_id?: boolean
  }

  export type IngredientsInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    ingredients_photo_uploads?: boolean | Ingredients$ingredients_photo_uploadsArgs<ExtArgs>
  }


  export type $IngredientsPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "Ingredients"
    objects: {
      ingredients_photo_uploads: Prisma.$Ingredients_photo_uploadsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetResult<{
      /**
       * @zod.string.uuid()
       */
      id: string
      name: string
      is_reviewed: boolean
      /**
       * @zod.number.int().gte(-2147483648).lte(2147483647)
       */
      fill_level: number
      /**
       * @zod.number.int().gte(-2147483648).lte(2147483647)
       */
      shelf_life_months: number
      fill_date: string
      is_ground: boolean | null
      /**
       * @zod.string.uuid()
       */
      ingredients_photo_uploads_id: string | null
    }, ExtArgs["result"]["ingredients"]>
    composites: {}
  }


  type IngredientsGetPayload<S extends boolean | null | undefined | IngredientsDefaultArgs> = $Result.GetResult<Prisma.$IngredientsPayload, S>

  type IngredientsCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<IngredientsFindManyArgs, 'select' | 'include'> & {
      select?: IngredientsCountAggregateInputType | true
    }

  export interface IngredientsDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ingredients'], meta: { name: 'Ingredients' } }
    /**
     * Find zero or one Ingredients that matches the filter.
     * @param {IngredientsFindUniqueArgs} args - Arguments to find a Ingredients
     * @example
     * // Get one Ingredients
     * const ingredients = await prisma.ingredients.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends IngredientsFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, IngredientsFindUniqueArgs<ExtArgs>>
    ): Prisma__IngredientsClient<$Result.GetResult<Prisma.$IngredientsPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Ingredients that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {IngredientsFindUniqueOrThrowArgs} args - Arguments to find a Ingredients
     * @example
     * // Get one Ingredients
     * const ingredients = await prisma.ingredients.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends IngredientsFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, IngredientsFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__IngredientsClient<$Result.GetResult<Prisma.$IngredientsPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Ingredients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientsFindFirstArgs} args - Arguments to find a Ingredients
     * @example
     * // Get one Ingredients
     * const ingredients = await prisma.ingredients.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends IngredientsFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, IngredientsFindFirstArgs<ExtArgs>>
    ): Prisma__IngredientsClient<$Result.GetResult<Prisma.$IngredientsPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Ingredients that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientsFindFirstOrThrowArgs} args - Arguments to find a Ingredients
     * @example
     * // Get one Ingredients
     * const ingredients = await prisma.ingredients.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends IngredientsFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, IngredientsFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__IngredientsClient<$Result.GetResult<Prisma.$IngredientsPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Ingredients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ingredients
     * const ingredients = await prisma.ingredients.findMany()
     * 
     * // Get first 10 Ingredients
     * const ingredients = await prisma.ingredients.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ingredientsWithIdOnly = await prisma.ingredients.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends IngredientsFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, IngredientsFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IngredientsPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Ingredients.
     * @param {IngredientsCreateArgs} args - Arguments to create a Ingredients.
     * @example
     * // Create one Ingredients
     * const Ingredients = await prisma.ingredients.create({
     *   data: {
     *     // ... data to create a Ingredients
     *   }
     * })
     * 
    **/
    create<T extends IngredientsCreateArgs<ExtArgs>>(
      args: SelectSubset<T, IngredientsCreateArgs<ExtArgs>>
    ): Prisma__IngredientsClient<$Result.GetResult<Prisma.$IngredientsPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Ingredients.
     *     @param {IngredientsCreateManyArgs} args - Arguments to create many Ingredients.
     *     @example
     *     // Create many Ingredients
     *     const ingredients = await prisma.ingredients.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends IngredientsCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, IngredientsCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Ingredients.
     * @param {IngredientsDeleteArgs} args - Arguments to delete one Ingredients.
     * @example
     * // Delete one Ingredients
     * const Ingredients = await prisma.ingredients.delete({
     *   where: {
     *     // ... filter to delete one Ingredients
     *   }
     * })
     * 
    **/
    delete<T extends IngredientsDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, IngredientsDeleteArgs<ExtArgs>>
    ): Prisma__IngredientsClient<$Result.GetResult<Prisma.$IngredientsPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Ingredients.
     * @param {IngredientsUpdateArgs} args - Arguments to update one Ingredients.
     * @example
     * // Update one Ingredients
     * const ingredients = await prisma.ingredients.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends IngredientsUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, IngredientsUpdateArgs<ExtArgs>>
    ): Prisma__IngredientsClient<$Result.GetResult<Prisma.$IngredientsPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Ingredients.
     * @param {IngredientsDeleteManyArgs} args - Arguments to filter Ingredients to delete.
     * @example
     * // Delete a few Ingredients
     * const { count } = await prisma.ingredients.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends IngredientsDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, IngredientsDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ingredients
     * const ingredients = await prisma.ingredients.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends IngredientsUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, IngredientsUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Ingredients.
     * @param {IngredientsUpsertArgs} args - Arguments to update or create a Ingredients.
     * @example
     * // Update or create a Ingredients
     * const ingredients = await prisma.ingredients.upsert({
     *   create: {
     *     // ... data to create a Ingredients
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ingredients we want to update
     *   }
     * })
    **/
    upsert<T extends IngredientsUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, IngredientsUpsertArgs<ExtArgs>>
    ): Prisma__IngredientsClient<$Result.GetResult<Prisma.$IngredientsPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientsCountArgs} args - Arguments to filter Ingredients to count.
     * @example
     * // Count the number of Ingredients
     * const count = await prisma.ingredients.count({
     *   where: {
     *     // ... the filter for the Ingredients we want to count
     *   }
     * })
    **/
    count<T extends IngredientsCountArgs>(
      args?: Subset<T, IngredientsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IngredientsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends IngredientsAggregateArgs>(args: Subset<T, IngredientsAggregateArgs>): Prisma.PrismaPromise<GetIngredientsAggregateType<T>>

    /**
     * Group by Ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientsGroupByArgs} args - Group by arguments.
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
      T extends IngredientsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IngredientsGroupByArgs['orderBy'] }
        : { orderBy?: IngredientsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, IngredientsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIngredientsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ingredients model
   */
  readonly fields: IngredientsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ingredients.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IngredientsClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    ingredients_photo_uploads<T extends Ingredients$ingredients_photo_uploadsArgs<ExtArgs> = {}>(args?: Subset<T, Ingredients$ingredients_photo_uploadsArgs<ExtArgs>>): Prisma__Ingredients_photo_uploadsClient<$Result.GetResult<Prisma.$Ingredients_photo_uploadsPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

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
   * Fields of the Ingredients model
   */ 
  interface IngredientsFieldRefs {
    readonly id: FieldRef<"Ingredients", 'String'>
    readonly name: FieldRef<"Ingredients", 'String'>
    readonly is_reviewed: FieldRef<"Ingredients", 'Boolean'>
    readonly fill_level: FieldRef<"Ingredients", 'Int'>
    readonly shelf_life_months: FieldRef<"Ingredients", 'Int'>
    readonly fill_date: FieldRef<"Ingredients", 'String'>
    readonly is_ground: FieldRef<"Ingredients", 'Boolean'>
    readonly ingredients_photo_uploads_id: FieldRef<"Ingredients", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Ingredients findUnique
   */
  export type IngredientsFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredients
     */
    select?: IngredientsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: IngredientsInclude<ExtArgs> | null
    /**
     * Filter, which Ingredients to fetch.
     */
    where: IngredientsWhereUniqueInput
  }


  /**
   * Ingredients findUniqueOrThrow
   */
  export type IngredientsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredients
     */
    select?: IngredientsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: IngredientsInclude<ExtArgs> | null
    /**
     * Filter, which Ingredients to fetch.
     */
    where: IngredientsWhereUniqueInput
  }


  /**
   * Ingredients findFirst
   */
  export type IngredientsFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredients
     */
    select?: IngredientsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: IngredientsInclude<ExtArgs> | null
    /**
     * Filter, which Ingredients to fetch.
     */
    where?: IngredientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredients to fetch.
     */
    orderBy?: IngredientsOrderByWithRelationInput | IngredientsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ingredients.
     */
    cursor?: IngredientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ingredients.
     */
    distinct?: IngredientsScalarFieldEnum | IngredientsScalarFieldEnum[]
  }


  /**
   * Ingredients findFirstOrThrow
   */
  export type IngredientsFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredients
     */
    select?: IngredientsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: IngredientsInclude<ExtArgs> | null
    /**
     * Filter, which Ingredients to fetch.
     */
    where?: IngredientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredients to fetch.
     */
    orderBy?: IngredientsOrderByWithRelationInput | IngredientsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ingredients.
     */
    cursor?: IngredientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ingredients.
     */
    distinct?: IngredientsScalarFieldEnum | IngredientsScalarFieldEnum[]
  }


  /**
   * Ingredients findMany
   */
  export type IngredientsFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredients
     */
    select?: IngredientsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: IngredientsInclude<ExtArgs> | null
    /**
     * Filter, which Ingredients to fetch.
     */
    where?: IngredientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredients to fetch.
     */
    orderBy?: IngredientsOrderByWithRelationInput | IngredientsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ingredients.
     */
    cursor?: IngredientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredients.
     */
    skip?: number
    distinct?: IngredientsScalarFieldEnum | IngredientsScalarFieldEnum[]
  }


  /**
   * Ingredients create
   */
  export type IngredientsCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredients
     */
    select?: IngredientsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: IngredientsInclude<ExtArgs> | null
    /**
     * The data needed to create a Ingredients.
     */
    data: XOR<IngredientsCreateInput, IngredientsUncheckedCreateInput>
  }


  /**
   * Ingredients createMany
   */
  export type IngredientsCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ingredients.
     */
    data: IngredientsCreateManyInput | IngredientsCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Ingredients update
   */
  export type IngredientsUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredients
     */
    select?: IngredientsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: IngredientsInclude<ExtArgs> | null
    /**
     * The data needed to update a Ingredients.
     */
    data: XOR<IngredientsUpdateInput, IngredientsUncheckedUpdateInput>
    /**
     * Choose, which Ingredients to update.
     */
    where: IngredientsWhereUniqueInput
  }


  /**
   * Ingredients updateMany
   */
  export type IngredientsUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ingredients.
     */
    data: XOR<IngredientsUpdateManyMutationInput, IngredientsUncheckedUpdateManyInput>
    /**
     * Filter which Ingredients to update
     */
    where?: IngredientsWhereInput
  }


  /**
   * Ingredients upsert
   */
  export type IngredientsUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredients
     */
    select?: IngredientsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: IngredientsInclude<ExtArgs> | null
    /**
     * The filter to search for the Ingredients to update in case it exists.
     */
    where: IngredientsWhereUniqueInput
    /**
     * In case the Ingredients found by the `where` argument doesn't exist, create a new Ingredients with this data.
     */
    create: XOR<IngredientsCreateInput, IngredientsUncheckedCreateInput>
    /**
     * In case the Ingredients was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IngredientsUpdateInput, IngredientsUncheckedUpdateInput>
  }


  /**
   * Ingredients delete
   */
  export type IngredientsDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredients
     */
    select?: IngredientsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: IngredientsInclude<ExtArgs> | null
    /**
     * Filter which Ingredients to delete.
     */
    where: IngredientsWhereUniqueInput
  }


  /**
   * Ingredients deleteMany
   */
  export type IngredientsDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ingredients to delete
     */
    where?: IngredientsWhereInput
  }


  /**
   * Ingredients.ingredients_photo_uploads
   */
  export type Ingredients$ingredients_photo_uploadsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploads
     */
    select?: Ingredients_photo_uploadsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Ingredients_photo_uploadsInclude<ExtArgs> | null
    where?: Ingredients_photo_uploadsWhereInput
  }


  /**
   * Ingredients without action
   */
  export type IngredientsDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredients
     */
    select?: IngredientsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: IngredientsInclude<ExtArgs> | null
  }



  /**
   * Model Ingredients_photo_uploads
   */

  export type AggregateIngredients_photo_uploads = {
    _count: Ingredients_photo_uploadsCountAggregateOutputType | null
    _avg: Ingredients_photo_uploadsAvgAggregateOutputType | null
    _sum: Ingredients_photo_uploadsSumAggregateOutputType | null
    _min: Ingredients_photo_uploadsMinAggregateOutputType | null
    _max: Ingredients_photo_uploadsMaxAggregateOutputType | null
  }

  export type Ingredients_photo_uploadsAvgAggregateOutputType = {
    upload_duration_sec: number | null
    ai_processing_duration_sec: number | null
  }

  export type Ingredients_photo_uploadsSumAggregateOutputType = {
    upload_duration_sec: number | null
    ai_processing_duration_sec: number | null
  }

  export type Ingredients_photo_uploadsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    created_at: Date | null
    uploaded_at: Date | null
    state: $Enums.photo_upload_state | null
    upload_duration_sec: number | null
    ai_processing_duration_sec: number | null
    photo_url: string | null
  }

  export type Ingredients_photo_uploadsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    created_at: Date | null
    uploaded_at: Date | null
    state: $Enums.photo_upload_state | null
    upload_duration_sec: number | null
    ai_processing_duration_sec: number | null
    photo_url: string | null
  }

  export type Ingredients_photo_uploadsCountAggregateOutputType = {
    id: number
    user_id: number
    created_at: number
    uploaded_at: number
    state: number
    upload_duration_sec: number
    ai_processing_duration_sec: number
    photo_url: number
    _all: number
  }


  export type Ingredients_photo_uploadsAvgAggregateInputType = {
    upload_duration_sec?: true
    ai_processing_duration_sec?: true
  }

  export type Ingredients_photo_uploadsSumAggregateInputType = {
    upload_duration_sec?: true
    ai_processing_duration_sec?: true
  }

  export type Ingredients_photo_uploadsMinAggregateInputType = {
    id?: true
    user_id?: true
    created_at?: true
    uploaded_at?: true
    state?: true
    upload_duration_sec?: true
    ai_processing_duration_sec?: true
    photo_url?: true
  }

  export type Ingredients_photo_uploadsMaxAggregateInputType = {
    id?: true
    user_id?: true
    created_at?: true
    uploaded_at?: true
    state?: true
    upload_duration_sec?: true
    ai_processing_duration_sec?: true
    photo_url?: true
  }

  export type Ingredients_photo_uploadsCountAggregateInputType = {
    id?: true
    user_id?: true
    created_at?: true
    uploaded_at?: true
    state?: true
    upload_duration_sec?: true
    ai_processing_duration_sec?: true
    photo_url?: true
    _all?: true
  }

  export type Ingredients_photo_uploadsAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ingredients_photo_uploads to aggregate.
     */
    where?: Ingredients_photo_uploadsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredients_photo_uploads to fetch.
     */
    orderBy?: Ingredients_photo_uploadsOrderByWithRelationInput | Ingredients_photo_uploadsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Ingredients_photo_uploadsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredients_photo_uploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredients_photo_uploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ingredients_photo_uploads
    **/
    _count?: true | Ingredients_photo_uploadsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Ingredients_photo_uploadsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Ingredients_photo_uploadsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Ingredients_photo_uploadsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Ingredients_photo_uploadsMaxAggregateInputType
  }

  export type GetIngredients_photo_uploadsAggregateType<T extends Ingredients_photo_uploadsAggregateArgs> = {
        [P in keyof T & keyof AggregateIngredients_photo_uploads]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIngredients_photo_uploads[P]>
      : GetScalarType<T[P], AggregateIngredients_photo_uploads[P]>
  }




  export type Ingredients_photo_uploadsGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: Ingredients_photo_uploadsWhereInput
    orderBy?: Ingredients_photo_uploadsOrderByWithAggregationInput | Ingredients_photo_uploadsOrderByWithAggregationInput[]
    by: Ingredients_photo_uploadsScalarFieldEnum[] | Ingredients_photo_uploadsScalarFieldEnum
    having?: Ingredients_photo_uploadsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Ingredients_photo_uploadsCountAggregateInputType | true
    _avg?: Ingredients_photo_uploadsAvgAggregateInputType
    _sum?: Ingredients_photo_uploadsSumAggregateInputType
    _min?: Ingredients_photo_uploadsMinAggregateInputType
    _max?: Ingredients_photo_uploadsMaxAggregateInputType
  }

  export type Ingredients_photo_uploadsGroupByOutputType = {
    id: string
    user_id: string
    created_at: Date
    uploaded_at: Date | null
    state: $Enums.photo_upload_state
    upload_duration_sec: number | null
    ai_processing_duration_sec: number | null
    photo_url: string | null
    _count: Ingredients_photo_uploadsCountAggregateOutputType | null
    _avg: Ingredients_photo_uploadsAvgAggregateOutputType | null
    _sum: Ingredients_photo_uploadsSumAggregateOutputType | null
    _min: Ingredients_photo_uploadsMinAggregateOutputType | null
    _max: Ingredients_photo_uploadsMaxAggregateOutputType | null
  }

  type GetIngredients_photo_uploadsGroupByPayload<T extends Ingredients_photo_uploadsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Ingredients_photo_uploadsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Ingredients_photo_uploadsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Ingredients_photo_uploadsGroupByOutputType[P]>
            : GetScalarType<T[P], Ingredients_photo_uploadsGroupByOutputType[P]>
        }
      >
    >


  export type Ingredients_photo_uploadsSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    created_at?: boolean
    uploaded_at?: boolean
    state?: boolean
    upload_duration_sec?: boolean
    ai_processing_duration_sec?: boolean
    photo_url?: boolean
    ingredients?: boolean | Ingredients_photo_uploads$ingredientsArgs<ExtArgs>
    users?: boolean | UsersDefaultArgs<ExtArgs>
    _count?: boolean | Ingredients_photo_uploadsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ingredients_photo_uploads"]>

  export type Ingredients_photo_uploadsSelectScalar = {
    id?: boolean
    user_id?: boolean
    created_at?: boolean
    uploaded_at?: boolean
    state?: boolean
    upload_duration_sec?: boolean
    ai_processing_duration_sec?: boolean
    photo_url?: boolean
  }

  export type Ingredients_photo_uploadsInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    ingredients?: boolean | Ingredients_photo_uploads$ingredientsArgs<ExtArgs>
    users?: boolean | UsersDefaultArgs<ExtArgs>
    _count?: boolean | Ingredients_photo_uploadsCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $Ingredients_photo_uploadsPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "Ingredients_photo_uploads"
    objects: {
      ingredients: Prisma.$IngredientsPayload<ExtArgs>[]
      users: Prisma.$UsersPayload<ExtArgs>
    }
    scalars: $Extensions.GetResult<{
      /**
       * @zod.string.uuid()
       */
      id: string
      user_id: string
      created_at: Date
      uploaded_at: Date | null
      state: $Enums.photo_upload_state
      /**
       * @zod.custom.use(z.number().or(z.nan()))
       */
      upload_duration_sec: number | null
      /**
       * @zod.custom.use(z.number().or(z.nan()))
       */
      ai_processing_duration_sec: number | null
      photo_url: string | null
    }, ExtArgs["result"]["ingredients_photo_uploads"]>
    composites: {}
  }


  type Ingredients_photo_uploadsGetPayload<S extends boolean | null | undefined | Ingredients_photo_uploadsDefaultArgs> = $Result.GetResult<Prisma.$Ingredients_photo_uploadsPayload, S>

  type Ingredients_photo_uploadsCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<Ingredients_photo_uploadsFindManyArgs, 'select' | 'include'> & {
      select?: Ingredients_photo_uploadsCountAggregateInputType | true
    }

  export interface Ingredients_photo_uploadsDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ingredients_photo_uploads'], meta: { name: 'Ingredients_photo_uploads' } }
    /**
     * Find zero or one Ingredients_photo_uploads that matches the filter.
     * @param {Ingredients_photo_uploadsFindUniqueArgs} args - Arguments to find a Ingredients_photo_uploads
     * @example
     * // Get one Ingredients_photo_uploads
     * const ingredients_photo_uploads = await prisma.ingredients_photo_uploads.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends Ingredients_photo_uploadsFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, Ingredients_photo_uploadsFindUniqueArgs<ExtArgs>>
    ): Prisma__Ingredients_photo_uploadsClient<$Result.GetResult<Prisma.$Ingredients_photo_uploadsPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Ingredients_photo_uploads that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {Ingredients_photo_uploadsFindUniqueOrThrowArgs} args - Arguments to find a Ingredients_photo_uploads
     * @example
     * // Get one Ingredients_photo_uploads
     * const ingredients_photo_uploads = await prisma.ingredients_photo_uploads.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends Ingredients_photo_uploadsFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, Ingredients_photo_uploadsFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__Ingredients_photo_uploadsClient<$Result.GetResult<Prisma.$Ingredients_photo_uploadsPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Ingredients_photo_uploads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ingredients_photo_uploadsFindFirstArgs} args - Arguments to find a Ingredients_photo_uploads
     * @example
     * // Get one Ingredients_photo_uploads
     * const ingredients_photo_uploads = await prisma.ingredients_photo_uploads.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends Ingredients_photo_uploadsFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, Ingredients_photo_uploadsFindFirstArgs<ExtArgs>>
    ): Prisma__Ingredients_photo_uploadsClient<$Result.GetResult<Prisma.$Ingredients_photo_uploadsPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Ingredients_photo_uploads that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ingredients_photo_uploadsFindFirstOrThrowArgs} args - Arguments to find a Ingredients_photo_uploads
     * @example
     * // Get one Ingredients_photo_uploads
     * const ingredients_photo_uploads = await prisma.ingredients_photo_uploads.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends Ingredients_photo_uploadsFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, Ingredients_photo_uploadsFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__Ingredients_photo_uploadsClient<$Result.GetResult<Prisma.$Ingredients_photo_uploadsPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Ingredients_photo_uploads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ingredients_photo_uploadsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ingredients_photo_uploads
     * const ingredients_photo_uploads = await prisma.ingredients_photo_uploads.findMany()
     * 
     * // Get first 10 Ingredients_photo_uploads
     * const ingredients_photo_uploads = await prisma.ingredients_photo_uploads.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ingredients_photo_uploadsWithIdOnly = await prisma.ingredients_photo_uploads.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends Ingredients_photo_uploadsFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, Ingredients_photo_uploadsFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Ingredients_photo_uploadsPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Ingredients_photo_uploads.
     * @param {Ingredients_photo_uploadsCreateArgs} args - Arguments to create a Ingredients_photo_uploads.
     * @example
     * // Create one Ingredients_photo_uploads
     * const Ingredients_photo_uploads = await prisma.ingredients_photo_uploads.create({
     *   data: {
     *     // ... data to create a Ingredients_photo_uploads
     *   }
     * })
     * 
    **/
    create<T extends Ingredients_photo_uploadsCreateArgs<ExtArgs>>(
      args: SelectSubset<T, Ingredients_photo_uploadsCreateArgs<ExtArgs>>
    ): Prisma__Ingredients_photo_uploadsClient<$Result.GetResult<Prisma.$Ingredients_photo_uploadsPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Ingredients_photo_uploads.
     *     @param {Ingredients_photo_uploadsCreateManyArgs} args - Arguments to create many Ingredients_photo_uploads.
     *     @example
     *     // Create many Ingredients_photo_uploads
     *     const ingredients_photo_uploads = await prisma.ingredients_photo_uploads.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends Ingredients_photo_uploadsCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, Ingredients_photo_uploadsCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Ingredients_photo_uploads.
     * @param {Ingredients_photo_uploadsDeleteArgs} args - Arguments to delete one Ingredients_photo_uploads.
     * @example
     * // Delete one Ingredients_photo_uploads
     * const Ingredients_photo_uploads = await prisma.ingredients_photo_uploads.delete({
     *   where: {
     *     // ... filter to delete one Ingredients_photo_uploads
     *   }
     * })
     * 
    **/
    delete<T extends Ingredients_photo_uploadsDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, Ingredients_photo_uploadsDeleteArgs<ExtArgs>>
    ): Prisma__Ingredients_photo_uploadsClient<$Result.GetResult<Prisma.$Ingredients_photo_uploadsPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Ingredients_photo_uploads.
     * @param {Ingredients_photo_uploadsUpdateArgs} args - Arguments to update one Ingredients_photo_uploads.
     * @example
     * // Update one Ingredients_photo_uploads
     * const ingredients_photo_uploads = await prisma.ingredients_photo_uploads.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends Ingredients_photo_uploadsUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, Ingredients_photo_uploadsUpdateArgs<ExtArgs>>
    ): Prisma__Ingredients_photo_uploadsClient<$Result.GetResult<Prisma.$Ingredients_photo_uploadsPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Ingredients_photo_uploads.
     * @param {Ingredients_photo_uploadsDeleteManyArgs} args - Arguments to filter Ingredients_photo_uploads to delete.
     * @example
     * // Delete a few Ingredients_photo_uploads
     * const { count } = await prisma.ingredients_photo_uploads.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends Ingredients_photo_uploadsDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, Ingredients_photo_uploadsDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ingredients_photo_uploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ingredients_photo_uploadsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ingredients_photo_uploads
     * const ingredients_photo_uploads = await prisma.ingredients_photo_uploads.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends Ingredients_photo_uploadsUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, Ingredients_photo_uploadsUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Ingredients_photo_uploads.
     * @param {Ingredients_photo_uploadsUpsertArgs} args - Arguments to update or create a Ingredients_photo_uploads.
     * @example
     * // Update or create a Ingredients_photo_uploads
     * const ingredients_photo_uploads = await prisma.ingredients_photo_uploads.upsert({
     *   create: {
     *     // ... data to create a Ingredients_photo_uploads
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ingredients_photo_uploads we want to update
     *   }
     * })
    **/
    upsert<T extends Ingredients_photo_uploadsUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, Ingredients_photo_uploadsUpsertArgs<ExtArgs>>
    ): Prisma__Ingredients_photo_uploadsClient<$Result.GetResult<Prisma.$Ingredients_photo_uploadsPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Ingredients_photo_uploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ingredients_photo_uploadsCountArgs} args - Arguments to filter Ingredients_photo_uploads to count.
     * @example
     * // Count the number of Ingredients_photo_uploads
     * const count = await prisma.ingredients_photo_uploads.count({
     *   where: {
     *     // ... the filter for the Ingredients_photo_uploads we want to count
     *   }
     * })
    **/
    count<T extends Ingredients_photo_uploadsCountArgs>(
      args?: Subset<T, Ingredients_photo_uploadsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Ingredients_photo_uploadsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ingredients_photo_uploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ingredients_photo_uploadsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Ingredients_photo_uploadsAggregateArgs>(args: Subset<T, Ingredients_photo_uploadsAggregateArgs>): Prisma.PrismaPromise<GetIngredients_photo_uploadsAggregateType<T>>

    /**
     * Group by Ingredients_photo_uploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ingredients_photo_uploadsGroupByArgs} args - Group by arguments.
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
      T extends Ingredients_photo_uploadsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Ingredients_photo_uploadsGroupByArgs['orderBy'] }
        : { orderBy?: Ingredients_photo_uploadsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, Ingredients_photo_uploadsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIngredients_photo_uploadsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ingredients_photo_uploads model
   */
  readonly fields: Ingredients_photo_uploadsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ingredients_photo_uploads.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Ingredients_photo_uploadsClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    ingredients<T extends Ingredients_photo_uploads$ingredientsArgs<ExtArgs> = {}>(args?: Subset<T, Ingredients_photo_uploads$ingredientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IngredientsPayload<ExtArgs>, T, 'findMany'> | Null>;

    users<T extends UsersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsersDefaultArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

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
   * Fields of the Ingredients_photo_uploads model
   */ 
  interface Ingredients_photo_uploadsFieldRefs {
    readonly id: FieldRef<"Ingredients_photo_uploads", 'String'>
    readonly user_id: FieldRef<"Ingredients_photo_uploads", 'String'>
    readonly created_at: FieldRef<"Ingredients_photo_uploads", 'DateTime'>
    readonly uploaded_at: FieldRef<"Ingredients_photo_uploads", 'DateTime'>
    readonly state: FieldRef<"Ingredients_photo_uploads", 'photo_upload_state'>
    readonly upload_duration_sec: FieldRef<"Ingredients_photo_uploads", 'Float'>
    readonly ai_processing_duration_sec: FieldRef<"Ingredients_photo_uploads", 'Float'>
    readonly photo_url: FieldRef<"Ingredients_photo_uploads", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Ingredients_photo_uploads findUnique
   */
  export type Ingredients_photo_uploadsFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploads
     */
    select?: Ingredients_photo_uploadsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Ingredients_photo_uploadsInclude<ExtArgs> | null
    /**
     * Filter, which Ingredients_photo_uploads to fetch.
     */
    where: Ingredients_photo_uploadsWhereUniqueInput
  }


  /**
   * Ingredients_photo_uploads findUniqueOrThrow
   */
  export type Ingredients_photo_uploadsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploads
     */
    select?: Ingredients_photo_uploadsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Ingredients_photo_uploadsInclude<ExtArgs> | null
    /**
     * Filter, which Ingredients_photo_uploads to fetch.
     */
    where: Ingredients_photo_uploadsWhereUniqueInput
  }


  /**
   * Ingredients_photo_uploads findFirst
   */
  export type Ingredients_photo_uploadsFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploads
     */
    select?: Ingredients_photo_uploadsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Ingredients_photo_uploadsInclude<ExtArgs> | null
    /**
     * Filter, which Ingredients_photo_uploads to fetch.
     */
    where?: Ingredients_photo_uploadsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredients_photo_uploads to fetch.
     */
    orderBy?: Ingredients_photo_uploadsOrderByWithRelationInput | Ingredients_photo_uploadsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ingredients_photo_uploads.
     */
    cursor?: Ingredients_photo_uploadsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredients_photo_uploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredients_photo_uploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ingredients_photo_uploads.
     */
    distinct?: Ingredients_photo_uploadsScalarFieldEnum | Ingredients_photo_uploadsScalarFieldEnum[]
  }


  /**
   * Ingredients_photo_uploads findFirstOrThrow
   */
  export type Ingredients_photo_uploadsFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploads
     */
    select?: Ingredients_photo_uploadsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Ingredients_photo_uploadsInclude<ExtArgs> | null
    /**
     * Filter, which Ingredients_photo_uploads to fetch.
     */
    where?: Ingredients_photo_uploadsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredients_photo_uploads to fetch.
     */
    orderBy?: Ingredients_photo_uploadsOrderByWithRelationInput | Ingredients_photo_uploadsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ingredients_photo_uploads.
     */
    cursor?: Ingredients_photo_uploadsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredients_photo_uploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredients_photo_uploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ingredients_photo_uploads.
     */
    distinct?: Ingredients_photo_uploadsScalarFieldEnum | Ingredients_photo_uploadsScalarFieldEnum[]
  }


  /**
   * Ingredients_photo_uploads findMany
   */
  export type Ingredients_photo_uploadsFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploads
     */
    select?: Ingredients_photo_uploadsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Ingredients_photo_uploadsInclude<ExtArgs> | null
    /**
     * Filter, which Ingredients_photo_uploads to fetch.
     */
    where?: Ingredients_photo_uploadsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredients_photo_uploads to fetch.
     */
    orderBy?: Ingredients_photo_uploadsOrderByWithRelationInput | Ingredients_photo_uploadsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ingredients_photo_uploads.
     */
    cursor?: Ingredients_photo_uploadsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredients_photo_uploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredients_photo_uploads.
     */
    skip?: number
    distinct?: Ingredients_photo_uploadsScalarFieldEnum | Ingredients_photo_uploadsScalarFieldEnum[]
  }


  /**
   * Ingredients_photo_uploads create
   */
  export type Ingredients_photo_uploadsCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploads
     */
    select?: Ingredients_photo_uploadsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Ingredients_photo_uploadsInclude<ExtArgs> | null
    /**
     * The data needed to create a Ingredients_photo_uploads.
     */
    data: XOR<Ingredients_photo_uploadsCreateInput, Ingredients_photo_uploadsUncheckedCreateInput>
  }


  /**
   * Ingredients_photo_uploads createMany
   */
  export type Ingredients_photo_uploadsCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ingredients_photo_uploads.
     */
    data: Ingredients_photo_uploadsCreateManyInput | Ingredients_photo_uploadsCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Ingredients_photo_uploads update
   */
  export type Ingredients_photo_uploadsUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploads
     */
    select?: Ingredients_photo_uploadsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Ingredients_photo_uploadsInclude<ExtArgs> | null
    /**
     * The data needed to update a Ingredients_photo_uploads.
     */
    data: XOR<Ingredients_photo_uploadsUpdateInput, Ingredients_photo_uploadsUncheckedUpdateInput>
    /**
     * Choose, which Ingredients_photo_uploads to update.
     */
    where: Ingredients_photo_uploadsWhereUniqueInput
  }


  /**
   * Ingredients_photo_uploads updateMany
   */
  export type Ingredients_photo_uploadsUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ingredients_photo_uploads.
     */
    data: XOR<Ingredients_photo_uploadsUpdateManyMutationInput, Ingredients_photo_uploadsUncheckedUpdateManyInput>
    /**
     * Filter which Ingredients_photo_uploads to update
     */
    where?: Ingredients_photo_uploadsWhereInput
  }


  /**
   * Ingredients_photo_uploads upsert
   */
  export type Ingredients_photo_uploadsUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploads
     */
    select?: Ingredients_photo_uploadsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Ingredients_photo_uploadsInclude<ExtArgs> | null
    /**
     * The filter to search for the Ingredients_photo_uploads to update in case it exists.
     */
    where: Ingredients_photo_uploadsWhereUniqueInput
    /**
     * In case the Ingredients_photo_uploads found by the `where` argument doesn't exist, create a new Ingredients_photo_uploads with this data.
     */
    create: XOR<Ingredients_photo_uploadsCreateInput, Ingredients_photo_uploadsUncheckedCreateInput>
    /**
     * In case the Ingredients_photo_uploads was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Ingredients_photo_uploadsUpdateInput, Ingredients_photo_uploadsUncheckedUpdateInput>
  }


  /**
   * Ingredients_photo_uploads delete
   */
  export type Ingredients_photo_uploadsDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploads
     */
    select?: Ingredients_photo_uploadsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Ingredients_photo_uploadsInclude<ExtArgs> | null
    /**
     * Filter which Ingredients_photo_uploads to delete.
     */
    where: Ingredients_photo_uploadsWhereUniqueInput
  }


  /**
   * Ingredients_photo_uploads deleteMany
   */
  export type Ingredients_photo_uploadsDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ingredients_photo_uploads to delete
     */
    where?: Ingredients_photo_uploadsWhereInput
  }


  /**
   * Ingredients_photo_uploads.ingredients
   */
  export type Ingredients_photo_uploads$ingredientsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredients
     */
    select?: IngredientsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: IngredientsInclude<ExtArgs> | null
    where?: IngredientsWhereInput
    orderBy?: IngredientsOrderByWithRelationInput | IngredientsOrderByWithRelationInput[]
    cursor?: IngredientsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IngredientsScalarFieldEnum | IngredientsScalarFieldEnum[]
  }


  /**
   * Ingredients_photo_uploads without action
   */
  export type Ingredients_photo_uploadsDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploads
     */
    select?: Ingredients_photo_uploadsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Ingredients_photo_uploadsInclude<ExtArgs> | null
  }



  /**
   * Model Users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    id: string | null
    name: string | null
    avatar_url: string | null
  }

  export type UsersMaxAggregateOutputType = {
    id: string | null
    name: string | null
    avatar_url: string | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    name: number
    avatar_url: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    id?: true
    name?: true
    avatar_url?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    name?: true
    avatar_url?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    name?: true
    avatar_url?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to aggregate.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type UsersGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UsersWhereInput
    orderBy?: UsersOrderByWithAggregationInput | UsersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: UsersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: string
    name: string
    avatar_url: string | null
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends UsersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type UsersSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    avatar_url?: boolean
    ingredients_photo_uploads?: boolean | Users$ingredients_photo_uploadsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type UsersSelectScalar = {
    id?: boolean
    name?: boolean
    avatar_url?: boolean
  }

  export type UsersInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    ingredients_photo_uploads?: boolean | Users$ingredients_photo_uploadsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $UsersPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "Users"
    objects: {
      ingredients_photo_uploads: Prisma.$Ingredients_photo_uploadsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetResult<{
      id: string
      name: string
      avatar_url: string | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }


  type UsersGetPayload<S extends boolean | null | undefined | UsersDefaultArgs> = $Result.GetResult<Prisma.$UsersPayload, S>

  type UsersCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<UsersFindManyArgs, 'select' | 'include'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface UsersDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Users'], meta: { name: 'Users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {UsersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UsersFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UsersFindUniqueArgs<ExtArgs>>
    ): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Users that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UsersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UsersFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UsersFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UsersFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UsersFindFirstArgs<ExtArgs>>
    ): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UsersFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UsersFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UsersFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UsersFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Users.
     * @param {UsersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
    **/
    create<T extends UsersCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UsersCreateArgs<ExtArgs>>
    ): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Users.
     *     @param {UsersCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const users = await prisma.users.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UsersCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UsersCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Users.
     * @param {UsersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
    **/
    delete<T extends UsersDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UsersDeleteArgs<ExtArgs>>
    ): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Users.
     * @param {UsersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UsersUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UsersUpdateArgs<ExtArgs>>
    ): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UsersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UsersDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UsersDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UsersUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UsersUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Users.
     * @param {UsersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
    **/
    upsert<T extends UsersUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UsersUpsertArgs<ExtArgs>>
    ): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UsersCountArgs>(
      args?: Subset<T, UsersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersGroupByArgs} args - Group by arguments.
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
      T extends UsersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsersGroupByArgs['orderBy'] }
        : { orderBy?: UsersGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UsersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Users model
   */
  readonly fields: UsersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsersClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    ingredients_photo_uploads<T extends Users$ingredients_photo_uploadsArgs<ExtArgs> = {}>(args?: Subset<T, Users$ingredients_photo_uploadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Ingredients_photo_uploadsPayload<ExtArgs>, T, 'findMany'> | Null>;

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
   * Fields of the Users model
   */ 
  interface UsersFieldRefs {
    readonly id: FieldRef<"Users", 'String'>
    readonly name: FieldRef<"Users", 'String'>
    readonly avatar_url: FieldRef<"Users", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Users findUnique
   */
  export type UsersFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where: UsersWhereUniqueInput
  }


  /**
   * Users findUniqueOrThrow
   */
  export type UsersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where: UsersWhereUniqueInput
  }


  /**
   * Users findFirst
   */
  export type UsersFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }


  /**
   * Users findFirstOrThrow
   */
  export type UsersFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }


  /**
   * Users findMany
   */
  export type UsersFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }


  /**
   * Users create
   */
  export type UsersCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * The data needed to create a Users.
     */
    data: XOR<UsersCreateInput, UsersUncheckedCreateInput>
  }


  /**
   * Users createMany
   */
  export type UsersCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UsersCreateManyInput | UsersCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Users update
   */
  export type UsersUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * The data needed to update a Users.
     */
    data: XOR<UsersUpdateInput, UsersUncheckedUpdateInput>
    /**
     * Choose, which Users to update.
     */
    where: UsersWhereUniqueInput
  }


  /**
   * Users updateMany
   */
  export type UsersUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UsersUpdateManyMutationInput, UsersUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UsersWhereInput
  }


  /**
   * Users upsert
   */
  export type UsersUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * The filter to search for the Users to update in case it exists.
     */
    where: UsersWhereUniqueInput
    /**
     * In case the Users found by the `where` argument doesn't exist, create a new Users with this data.
     */
    create: XOR<UsersCreateInput, UsersUncheckedCreateInput>
    /**
     * In case the Users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsersUpdateInput, UsersUncheckedUpdateInput>
  }


  /**
   * Users delete
   */
  export type UsersDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter which Users to delete.
     */
    where: UsersWhereUniqueInput
  }


  /**
   * Users deleteMany
   */
  export type UsersDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UsersWhereInput
  }


  /**
   * Users.ingredients_photo_uploads
   */
  export type Users$ingredients_photo_uploadsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploads
     */
    select?: Ingredients_photo_uploadsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Ingredients_photo_uploadsInclude<ExtArgs> | null
    where?: Ingredients_photo_uploadsWhereInput
    orderBy?: Ingredients_photo_uploadsOrderByWithRelationInput | Ingredients_photo_uploadsOrderByWithRelationInput[]
    cursor?: Ingredients_photo_uploadsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Ingredients_photo_uploadsScalarFieldEnum | Ingredients_photo_uploadsScalarFieldEnum[]
  }


  /**
   * Users without action
   */
  export type UsersDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UsersInclude<ExtArgs> | null
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


  export const IngredientsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    is_reviewed: 'is_reviewed',
    fill_level: 'fill_level',
    shelf_life_months: 'shelf_life_months',
    fill_date: 'fill_date',
    is_ground: 'is_ground',
    ingredients_photo_uploads_id: 'ingredients_photo_uploads_id'
  };

  export type IngredientsScalarFieldEnum = (typeof IngredientsScalarFieldEnum)[keyof typeof IngredientsScalarFieldEnum]


  export const Ingredients_photo_uploadsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    created_at: 'created_at',
    uploaded_at: 'uploaded_at',
    state: 'state',
    upload_duration_sec: 'upload_duration_sec',
    ai_processing_duration_sec: 'ai_processing_duration_sec',
    photo_url: 'photo_url'
  };

  export type Ingredients_photo_uploadsScalarFieldEnum = (typeof Ingredients_photo_uploadsScalarFieldEnum)[keyof typeof Ingredients_photo_uploadsScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    name: 'name',
    avatar_url: 'avatar_url'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'photo_upload_state'
   */
  export type Enumphoto_upload_stateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'photo_upload_state'>
    


  /**
   * Reference to a field of type 'photo_upload_state[]'
   */
  export type ListEnumphoto_upload_stateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'photo_upload_state[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type IngredientsWhereInput = {
    AND?: IngredientsWhereInput | IngredientsWhereInput[]
    OR?: IngredientsWhereInput[]
    NOT?: IngredientsWhereInput | IngredientsWhereInput[]
    id?: UuidFilter<"Ingredients"> | string
    name?: StringFilter<"Ingredients"> | string
    is_reviewed?: BoolFilter<"Ingredients"> | boolean
    fill_level?: IntFilter<"Ingredients"> | number
    shelf_life_months?: IntFilter<"Ingredients"> | number
    fill_date?: StringFilter<"Ingredients"> | string
    is_ground?: BoolNullableFilter<"Ingredients"> | boolean | null
    ingredients_photo_uploads_id?: UuidNullableFilter<"Ingredients"> | string | null
    ingredients_photo_uploads?: XOR<Ingredients_photo_uploadsNullableRelationFilter, Ingredients_photo_uploadsWhereInput> | null
  }

  export type IngredientsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    is_reviewed?: SortOrder
    fill_level?: SortOrder
    shelf_life_months?: SortOrder
    fill_date?: SortOrder
    is_ground?: SortOrderInput | SortOrder
    ingredients_photo_uploads_id?: SortOrderInput | SortOrder
    ingredients_photo_uploads?: Ingredients_photo_uploadsOrderByWithRelationInput
  }

  export type IngredientsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: IngredientsWhereInput | IngredientsWhereInput[]
    OR?: IngredientsWhereInput[]
    NOT?: IngredientsWhereInput | IngredientsWhereInput[]
    name?: StringFilter<"Ingredients"> | string
    is_reviewed?: BoolFilter<"Ingredients"> | boolean
    fill_level?: IntFilter<"Ingredients"> | number
    shelf_life_months?: IntFilter<"Ingredients"> | number
    fill_date?: StringFilter<"Ingredients"> | string
    is_ground?: BoolNullableFilter<"Ingredients"> | boolean | null
    ingredients_photo_uploads_id?: UuidNullableFilter<"Ingredients"> | string | null
    ingredients_photo_uploads?: XOR<Ingredients_photo_uploadsNullableRelationFilter, Ingredients_photo_uploadsWhereInput> | null
  }, "id">

  export type IngredientsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    is_reviewed?: SortOrder
    fill_level?: SortOrder
    shelf_life_months?: SortOrder
    fill_date?: SortOrder
    is_ground?: SortOrderInput | SortOrder
    ingredients_photo_uploads_id?: SortOrderInput | SortOrder
    _count?: IngredientsCountOrderByAggregateInput
    _avg?: IngredientsAvgOrderByAggregateInput
    _max?: IngredientsMaxOrderByAggregateInput
    _min?: IngredientsMinOrderByAggregateInput
    _sum?: IngredientsSumOrderByAggregateInput
  }

  export type IngredientsScalarWhereWithAggregatesInput = {
    AND?: IngredientsScalarWhereWithAggregatesInput | IngredientsScalarWhereWithAggregatesInput[]
    OR?: IngredientsScalarWhereWithAggregatesInput[]
    NOT?: IngredientsScalarWhereWithAggregatesInput | IngredientsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Ingredients"> | string
    name?: StringWithAggregatesFilter<"Ingredients"> | string
    is_reviewed?: BoolWithAggregatesFilter<"Ingredients"> | boolean
    fill_level?: IntWithAggregatesFilter<"Ingredients"> | number
    shelf_life_months?: IntWithAggregatesFilter<"Ingredients"> | number
    fill_date?: StringWithAggregatesFilter<"Ingredients"> | string
    is_ground?: BoolNullableWithAggregatesFilter<"Ingredients"> | boolean | null
    ingredients_photo_uploads_id?: UuidNullableWithAggregatesFilter<"Ingredients"> | string | null
  }

  export type Ingredients_photo_uploadsWhereInput = {
    AND?: Ingredients_photo_uploadsWhereInput | Ingredients_photo_uploadsWhereInput[]
    OR?: Ingredients_photo_uploadsWhereInput[]
    NOT?: Ingredients_photo_uploadsWhereInput | Ingredients_photo_uploadsWhereInput[]
    id?: UuidFilter<"Ingredients_photo_uploads"> | string
    user_id?: StringFilter<"Ingredients_photo_uploads"> | string
    created_at?: DateTimeFilter<"Ingredients_photo_uploads"> | Date | string
    uploaded_at?: DateTimeNullableFilter<"Ingredients_photo_uploads"> | Date | string | null
    state?: Enumphoto_upload_stateFilter<"Ingredients_photo_uploads"> | $Enums.photo_upload_state
    upload_duration_sec?: FloatNullableFilter<"Ingredients_photo_uploads"> | number | null
    ai_processing_duration_sec?: FloatNullableFilter<"Ingredients_photo_uploads"> | number | null
    photo_url?: StringNullableFilter<"Ingredients_photo_uploads"> | string | null
    ingredients?: IngredientsListRelationFilter
    users?: XOR<UsersRelationFilter, UsersWhereInput>
  }

  export type Ingredients_photo_uploadsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    uploaded_at?: SortOrderInput | SortOrder
    state?: SortOrder
    upload_duration_sec?: SortOrderInput | SortOrder
    ai_processing_duration_sec?: SortOrderInput | SortOrder
    photo_url?: SortOrderInput | SortOrder
    ingredients?: IngredientsOrderByRelationAggregateInput
    users?: UsersOrderByWithRelationInput
  }

  export type Ingredients_photo_uploadsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: Ingredients_photo_uploadsWhereInput | Ingredients_photo_uploadsWhereInput[]
    OR?: Ingredients_photo_uploadsWhereInput[]
    NOT?: Ingredients_photo_uploadsWhereInput | Ingredients_photo_uploadsWhereInput[]
    user_id?: StringFilter<"Ingredients_photo_uploads"> | string
    created_at?: DateTimeFilter<"Ingredients_photo_uploads"> | Date | string
    uploaded_at?: DateTimeNullableFilter<"Ingredients_photo_uploads"> | Date | string | null
    state?: Enumphoto_upload_stateFilter<"Ingredients_photo_uploads"> | $Enums.photo_upload_state
    upload_duration_sec?: FloatNullableFilter<"Ingredients_photo_uploads"> | number | null
    ai_processing_duration_sec?: FloatNullableFilter<"Ingredients_photo_uploads"> | number | null
    photo_url?: StringNullableFilter<"Ingredients_photo_uploads"> | string | null
    ingredients?: IngredientsListRelationFilter
    users?: XOR<UsersRelationFilter, UsersWhereInput>
  }, "id">

  export type Ingredients_photo_uploadsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    uploaded_at?: SortOrderInput | SortOrder
    state?: SortOrder
    upload_duration_sec?: SortOrderInput | SortOrder
    ai_processing_duration_sec?: SortOrderInput | SortOrder
    photo_url?: SortOrderInput | SortOrder
    _count?: Ingredients_photo_uploadsCountOrderByAggregateInput
    _avg?: Ingredients_photo_uploadsAvgOrderByAggregateInput
    _max?: Ingredients_photo_uploadsMaxOrderByAggregateInput
    _min?: Ingredients_photo_uploadsMinOrderByAggregateInput
    _sum?: Ingredients_photo_uploadsSumOrderByAggregateInput
  }

  export type Ingredients_photo_uploadsScalarWhereWithAggregatesInput = {
    AND?: Ingredients_photo_uploadsScalarWhereWithAggregatesInput | Ingredients_photo_uploadsScalarWhereWithAggregatesInput[]
    OR?: Ingredients_photo_uploadsScalarWhereWithAggregatesInput[]
    NOT?: Ingredients_photo_uploadsScalarWhereWithAggregatesInput | Ingredients_photo_uploadsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Ingredients_photo_uploads"> | string
    user_id?: StringWithAggregatesFilter<"Ingredients_photo_uploads"> | string
    created_at?: DateTimeWithAggregatesFilter<"Ingredients_photo_uploads"> | Date | string
    uploaded_at?: DateTimeNullableWithAggregatesFilter<"Ingredients_photo_uploads"> | Date | string | null
    state?: Enumphoto_upload_stateWithAggregatesFilter<"Ingredients_photo_uploads"> | $Enums.photo_upload_state
    upload_duration_sec?: FloatNullableWithAggregatesFilter<"Ingredients_photo_uploads"> | number | null
    ai_processing_duration_sec?: FloatNullableWithAggregatesFilter<"Ingredients_photo_uploads"> | number | null
    photo_url?: StringNullableWithAggregatesFilter<"Ingredients_photo_uploads"> | string | null
  }

  export type UsersWhereInput = {
    AND?: UsersWhereInput | UsersWhereInput[]
    OR?: UsersWhereInput[]
    NOT?: UsersWhereInput | UsersWhereInput[]
    id?: StringFilter<"Users"> | string
    name?: StringFilter<"Users"> | string
    avatar_url?: StringNullableFilter<"Users"> | string | null
    ingredients_photo_uploads?: Ingredients_photo_uploadsListRelationFilter
  }

  export type UsersOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    avatar_url?: SortOrderInput | SortOrder
    ingredients_photo_uploads?: Ingredients_photo_uploadsOrderByRelationAggregateInput
  }

  export type UsersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UsersWhereInput | UsersWhereInput[]
    OR?: UsersWhereInput[]
    NOT?: UsersWhereInput | UsersWhereInput[]
    name?: StringFilter<"Users"> | string
    avatar_url?: StringNullableFilter<"Users"> | string | null
    ingredients_photo_uploads?: Ingredients_photo_uploadsListRelationFilter
  }, "id">

  export type UsersOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    avatar_url?: SortOrderInput | SortOrder
    _count?: UsersCountOrderByAggregateInput
    _max?: UsersMaxOrderByAggregateInput
    _min?: UsersMinOrderByAggregateInput
  }

  export type UsersScalarWhereWithAggregatesInput = {
    AND?: UsersScalarWhereWithAggregatesInput | UsersScalarWhereWithAggregatesInput[]
    OR?: UsersScalarWhereWithAggregatesInput[]
    NOT?: UsersScalarWhereWithAggregatesInput | UsersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Users"> | string
    name?: StringWithAggregatesFilter<"Users"> | string
    avatar_url?: StringNullableWithAggregatesFilter<"Users"> | string | null
  }

  export type IngredientsCreateInput = {
    id: string
    name: string
    is_reviewed: boolean
    fill_level: number
    shelf_life_months: number
    fill_date: string
    is_ground?: boolean | null
    ingredients_photo_uploads?: Ingredients_photo_uploadsCreateNestedOneWithoutIngredientsInput
  }

  export type IngredientsUncheckedCreateInput = {
    id: string
    name: string
    is_reviewed: boolean
    fill_level: number
    shelf_life_months: number
    fill_date: string
    is_ground?: boolean | null
    ingredients_photo_uploads_id?: string | null
  }

  export type IngredientsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is_reviewed?: BoolFieldUpdateOperationsInput | boolean
    fill_level?: IntFieldUpdateOperationsInput | number
    shelf_life_months?: IntFieldUpdateOperationsInput | number
    fill_date?: StringFieldUpdateOperationsInput | string
    is_ground?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ingredients_photo_uploads?: Ingredients_photo_uploadsUpdateOneWithoutIngredientsNestedInput
  }

  export type IngredientsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is_reviewed?: BoolFieldUpdateOperationsInput | boolean
    fill_level?: IntFieldUpdateOperationsInput | number
    shelf_life_months?: IntFieldUpdateOperationsInput | number
    fill_date?: StringFieldUpdateOperationsInput | string
    is_ground?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ingredients_photo_uploads_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IngredientsCreateManyInput = {
    id: string
    name: string
    is_reviewed: boolean
    fill_level: number
    shelf_life_months: number
    fill_date: string
    is_ground?: boolean | null
    ingredients_photo_uploads_id?: string | null
  }

  export type IngredientsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is_reviewed?: BoolFieldUpdateOperationsInput | boolean
    fill_level?: IntFieldUpdateOperationsInput | number
    shelf_life_months?: IntFieldUpdateOperationsInput | number
    fill_date?: StringFieldUpdateOperationsInput | string
    is_ground?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type IngredientsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is_reviewed?: BoolFieldUpdateOperationsInput | boolean
    fill_level?: IntFieldUpdateOperationsInput | number
    shelf_life_months?: IntFieldUpdateOperationsInput | number
    fill_date?: StringFieldUpdateOperationsInput | string
    is_ground?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ingredients_photo_uploads_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Ingredients_photo_uploadsCreateInput = {
    id: string
    created_at: Date | string
    uploaded_at?: Date | string | null
    state: $Enums.photo_upload_state
    upload_duration_sec?: number | null
    ai_processing_duration_sec?: number | null
    photo_url?: string | null
    ingredients?: IngredientsCreateNestedManyWithoutIngredients_photo_uploadsInput
    users: UsersCreateNestedOneWithoutIngredients_photo_uploadsInput
  }

  export type Ingredients_photo_uploadsUncheckedCreateInput = {
    id: string
    user_id: string
    created_at: Date | string
    uploaded_at?: Date | string | null
    state: $Enums.photo_upload_state
    upload_duration_sec?: number | null
    ai_processing_duration_sec?: number | null
    photo_url?: string | null
    ingredients?: IngredientsUncheckedCreateNestedManyWithoutIngredients_photo_uploadsInput
  }

  export type Ingredients_photo_uploadsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    state?: Enumphoto_upload_stateFieldUpdateOperationsInput | $Enums.photo_upload_state
    upload_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    ai_processing_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    ingredients?: IngredientsUpdateManyWithoutIngredients_photo_uploadsNestedInput
    users?: UsersUpdateOneRequiredWithoutIngredients_photo_uploadsNestedInput
  }

  export type Ingredients_photo_uploadsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    state?: Enumphoto_upload_stateFieldUpdateOperationsInput | $Enums.photo_upload_state
    upload_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    ai_processing_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    ingredients?: IngredientsUncheckedUpdateManyWithoutIngredients_photo_uploadsNestedInput
  }

  export type Ingredients_photo_uploadsCreateManyInput = {
    id: string
    user_id: string
    created_at: Date | string
    uploaded_at?: Date | string | null
    state: $Enums.photo_upload_state
    upload_duration_sec?: number | null
    ai_processing_duration_sec?: number | null
    photo_url?: string | null
  }

  export type Ingredients_photo_uploadsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    state?: Enumphoto_upload_stateFieldUpdateOperationsInput | $Enums.photo_upload_state
    upload_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    ai_processing_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Ingredients_photo_uploadsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    state?: Enumphoto_upload_stateFieldUpdateOperationsInput | $Enums.photo_upload_state
    upload_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    ai_processing_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UsersCreateInput = {
    id: string
    name: string
    avatar_url?: string | null
    ingredients_photo_uploads?: Ingredients_photo_uploadsCreateNestedManyWithoutUsersInput
  }

  export type UsersUncheckedCreateInput = {
    id: string
    name: string
    avatar_url?: string | null
    ingredients_photo_uploads?: Ingredients_photo_uploadsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UsersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    ingredients_photo_uploads?: Ingredients_photo_uploadsUpdateManyWithoutUsersNestedInput
  }

  export type UsersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    ingredients_photo_uploads?: Ingredients_photo_uploadsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type UsersCreateManyInput = {
    id: string
    name: string
    avatar_url?: string | null
  }

  export type UsersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UsersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type StringFilter<$PrismaModel = never> = {
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
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type Ingredients_photo_uploadsNullableRelationFilter = {
    is?: Ingredients_photo_uploadsWhereInput | null
    isNot?: Ingredients_photo_uploadsWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type IngredientsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    is_reviewed?: SortOrder
    fill_level?: SortOrder
    shelf_life_months?: SortOrder
    fill_date?: SortOrder
    is_ground?: SortOrder
    ingredients_photo_uploads_id?: SortOrder
  }

  export type IngredientsAvgOrderByAggregateInput = {
    fill_level?: SortOrder
    shelf_life_months?: SortOrder
  }

  export type IngredientsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    is_reviewed?: SortOrder
    fill_level?: SortOrder
    shelf_life_months?: SortOrder
    fill_date?: SortOrder
    is_ground?: SortOrder
    ingredients_photo_uploads_id?: SortOrder
  }

  export type IngredientsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    is_reviewed?: SortOrder
    fill_level?: SortOrder
    shelf_life_months?: SortOrder
    fill_date?: SortOrder
    is_ground?: SortOrder
    ingredients_photo_uploads_id?: SortOrder
  }

  export type IngredientsSumOrderByAggregateInput = {
    fill_level?: SortOrder
    shelf_life_months?: SortOrder
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

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
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
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
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

  export type Enumphoto_upload_stateFilter<$PrismaModel = never> = {
    equals?: $Enums.photo_upload_state | Enumphoto_upload_stateFieldRefInput<$PrismaModel>
    in?: $Enums.photo_upload_state[] | ListEnumphoto_upload_stateFieldRefInput<$PrismaModel>
    notIn?: $Enums.photo_upload_state[] | ListEnumphoto_upload_stateFieldRefInput<$PrismaModel>
    not?: NestedEnumphoto_upload_stateFilter<$PrismaModel> | $Enums.photo_upload_state
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

  export type IngredientsListRelationFilter = {
    every?: IngredientsWhereInput
    some?: IngredientsWhereInput
    none?: IngredientsWhereInput
  }

  export type UsersRelationFilter = {
    is?: UsersWhereInput
    isNot?: UsersWhereInput
  }

  export type IngredientsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type Ingredients_photo_uploadsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    uploaded_at?: SortOrder
    state?: SortOrder
    upload_duration_sec?: SortOrder
    ai_processing_duration_sec?: SortOrder
    photo_url?: SortOrder
  }

  export type Ingredients_photo_uploadsAvgOrderByAggregateInput = {
    upload_duration_sec?: SortOrder
    ai_processing_duration_sec?: SortOrder
  }

  export type Ingredients_photo_uploadsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    uploaded_at?: SortOrder
    state?: SortOrder
    upload_duration_sec?: SortOrder
    ai_processing_duration_sec?: SortOrder
    photo_url?: SortOrder
  }

  export type Ingredients_photo_uploadsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    uploaded_at?: SortOrder
    state?: SortOrder
    upload_duration_sec?: SortOrder
    ai_processing_duration_sec?: SortOrder
    photo_url?: SortOrder
  }

  export type Ingredients_photo_uploadsSumOrderByAggregateInput = {
    upload_duration_sec?: SortOrder
    ai_processing_duration_sec?: SortOrder
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

  export type Enumphoto_upload_stateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.photo_upload_state | Enumphoto_upload_stateFieldRefInput<$PrismaModel>
    in?: $Enums.photo_upload_state[] | ListEnumphoto_upload_stateFieldRefInput<$PrismaModel>
    notIn?: $Enums.photo_upload_state[] | ListEnumphoto_upload_stateFieldRefInput<$PrismaModel>
    not?: NestedEnumphoto_upload_stateWithAggregatesFilter<$PrismaModel> | $Enums.photo_upload_state
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumphoto_upload_stateFilter<$PrismaModel>
    _max?: NestedEnumphoto_upload_stateFilter<$PrismaModel>
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

  export type Ingredients_photo_uploadsListRelationFilter = {
    every?: Ingredients_photo_uploadsWhereInput
    some?: Ingredients_photo_uploadsWhereInput
    none?: Ingredients_photo_uploadsWhereInput
  }

  export type Ingredients_photo_uploadsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsersCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    avatar_url?: SortOrder
  }

  export type UsersMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    avatar_url?: SortOrder
  }

  export type UsersMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    avatar_url?: SortOrder
  }

  export type Ingredients_photo_uploadsCreateNestedOneWithoutIngredientsInput = {
    create?: XOR<Ingredients_photo_uploadsCreateWithoutIngredientsInput, Ingredients_photo_uploadsUncheckedCreateWithoutIngredientsInput>
    connectOrCreate?: Ingredients_photo_uploadsCreateOrConnectWithoutIngredientsInput
    connect?: Ingredients_photo_uploadsWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type Ingredients_photo_uploadsUpdateOneWithoutIngredientsNestedInput = {
    create?: XOR<Ingredients_photo_uploadsCreateWithoutIngredientsInput, Ingredients_photo_uploadsUncheckedCreateWithoutIngredientsInput>
    connectOrCreate?: Ingredients_photo_uploadsCreateOrConnectWithoutIngredientsInput
    upsert?: Ingredients_photo_uploadsUpsertWithoutIngredientsInput
    disconnect?: Ingredients_photo_uploadsWhereInput | boolean
    delete?: Ingredients_photo_uploadsWhereInput | boolean
    connect?: Ingredients_photo_uploadsWhereUniqueInput
    update?: XOR<XOR<Ingredients_photo_uploadsUpdateToOneWithWhereWithoutIngredientsInput, Ingredients_photo_uploadsUpdateWithoutIngredientsInput>, Ingredients_photo_uploadsUncheckedUpdateWithoutIngredientsInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IngredientsCreateNestedManyWithoutIngredients_photo_uploadsInput = {
    create?: XOR<IngredientsCreateWithoutIngredients_photo_uploadsInput, IngredientsUncheckedCreateWithoutIngredients_photo_uploadsInput> | IngredientsCreateWithoutIngredients_photo_uploadsInput[] | IngredientsUncheckedCreateWithoutIngredients_photo_uploadsInput[]
    connectOrCreate?: IngredientsCreateOrConnectWithoutIngredients_photo_uploadsInput | IngredientsCreateOrConnectWithoutIngredients_photo_uploadsInput[]
    createMany?: IngredientsCreateManyIngredients_photo_uploadsInputEnvelope
    connect?: IngredientsWhereUniqueInput | IngredientsWhereUniqueInput[]
  }

  export type UsersCreateNestedOneWithoutIngredients_photo_uploadsInput = {
    create?: XOR<UsersCreateWithoutIngredients_photo_uploadsInput, UsersUncheckedCreateWithoutIngredients_photo_uploadsInput>
    connectOrCreate?: UsersCreateOrConnectWithoutIngredients_photo_uploadsInput
    connect?: UsersWhereUniqueInput
  }

  export type IngredientsUncheckedCreateNestedManyWithoutIngredients_photo_uploadsInput = {
    create?: XOR<IngredientsCreateWithoutIngredients_photo_uploadsInput, IngredientsUncheckedCreateWithoutIngredients_photo_uploadsInput> | IngredientsCreateWithoutIngredients_photo_uploadsInput[] | IngredientsUncheckedCreateWithoutIngredients_photo_uploadsInput[]
    connectOrCreate?: IngredientsCreateOrConnectWithoutIngredients_photo_uploadsInput | IngredientsCreateOrConnectWithoutIngredients_photo_uploadsInput[]
    createMany?: IngredientsCreateManyIngredients_photo_uploadsInputEnvelope
    connect?: IngredientsWhereUniqueInput | IngredientsWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type Enumphoto_upload_stateFieldUpdateOperationsInput = {
    set?: $Enums.photo_upload_state
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IngredientsUpdateManyWithoutIngredients_photo_uploadsNestedInput = {
    create?: XOR<IngredientsCreateWithoutIngredients_photo_uploadsInput, IngredientsUncheckedCreateWithoutIngredients_photo_uploadsInput> | IngredientsCreateWithoutIngredients_photo_uploadsInput[] | IngredientsUncheckedCreateWithoutIngredients_photo_uploadsInput[]
    connectOrCreate?: IngredientsCreateOrConnectWithoutIngredients_photo_uploadsInput | IngredientsCreateOrConnectWithoutIngredients_photo_uploadsInput[]
    upsert?: IngredientsUpsertWithWhereUniqueWithoutIngredients_photo_uploadsInput | IngredientsUpsertWithWhereUniqueWithoutIngredients_photo_uploadsInput[]
    createMany?: IngredientsCreateManyIngredients_photo_uploadsInputEnvelope
    set?: IngredientsWhereUniqueInput | IngredientsWhereUniqueInput[]
    disconnect?: IngredientsWhereUniqueInput | IngredientsWhereUniqueInput[]
    delete?: IngredientsWhereUniqueInput | IngredientsWhereUniqueInput[]
    connect?: IngredientsWhereUniqueInput | IngredientsWhereUniqueInput[]
    update?: IngredientsUpdateWithWhereUniqueWithoutIngredients_photo_uploadsInput | IngredientsUpdateWithWhereUniqueWithoutIngredients_photo_uploadsInput[]
    updateMany?: IngredientsUpdateManyWithWhereWithoutIngredients_photo_uploadsInput | IngredientsUpdateManyWithWhereWithoutIngredients_photo_uploadsInput[]
    deleteMany?: IngredientsScalarWhereInput | IngredientsScalarWhereInput[]
  }

  export type UsersUpdateOneRequiredWithoutIngredients_photo_uploadsNestedInput = {
    create?: XOR<UsersCreateWithoutIngredients_photo_uploadsInput, UsersUncheckedCreateWithoutIngredients_photo_uploadsInput>
    connectOrCreate?: UsersCreateOrConnectWithoutIngredients_photo_uploadsInput
    upsert?: UsersUpsertWithoutIngredients_photo_uploadsInput
    connect?: UsersWhereUniqueInput
    update?: XOR<XOR<UsersUpdateToOneWithWhereWithoutIngredients_photo_uploadsInput, UsersUpdateWithoutIngredients_photo_uploadsInput>, UsersUncheckedUpdateWithoutIngredients_photo_uploadsInput>
  }

  export type IngredientsUncheckedUpdateManyWithoutIngredients_photo_uploadsNestedInput = {
    create?: XOR<IngredientsCreateWithoutIngredients_photo_uploadsInput, IngredientsUncheckedCreateWithoutIngredients_photo_uploadsInput> | IngredientsCreateWithoutIngredients_photo_uploadsInput[] | IngredientsUncheckedCreateWithoutIngredients_photo_uploadsInput[]
    connectOrCreate?: IngredientsCreateOrConnectWithoutIngredients_photo_uploadsInput | IngredientsCreateOrConnectWithoutIngredients_photo_uploadsInput[]
    upsert?: IngredientsUpsertWithWhereUniqueWithoutIngredients_photo_uploadsInput | IngredientsUpsertWithWhereUniqueWithoutIngredients_photo_uploadsInput[]
    createMany?: IngredientsCreateManyIngredients_photo_uploadsInputEnvelope
    set?: IngredientsWhereUniqueInput | IngredientsWhereUniqueInput[]
    disconnect?: IngredientsWhereUniqueInput | IngredientsWhereUniqueInput[]
    delete?: IngredientsWhereUniqueInput | IngredientsWhereUniqueInput[]
    connect?: IngredientsWhereUniqueInput | IngredientsWhereUniqueInput[]
    update?: IngredientsUpdateWithWhereUniqueWithoutIngredients_photo_uploadsInput | IngredientsUpdateWithWhereUniqueWithoutIngredients_photo_uploadsInput[]
    updateMany?: IngredientsUpdateManyWithWhereWithoutIngredients_photo_uploadsInput | IngredientsUpdateManyWithWhereWithoutIngredients_photo_uploadsInput[]
    deleteMany?: IngredientsScalarWhereInput | IngredientsScalarWhereInput[]
  }

  export type Ingredients_photo_uploadsCreateNestedManyWithoutUsersInput = {
    create?: XOR<Ingredients_photo_uploadsCreateWithoutUsersInput, Ingredients_photo_uploadsUncheckedCreateWithoutUsersInput> | Ingredients_photo_uploadsCreateWithoutUsersInput[] | Ingredients_photo_uploadsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: Ingredients_photo_uploadsCreateOrConnectWithoutUsersInput | Ingredients_photo_uploadsCreateOrConnectWithoutUsersInput[]
    createMany?: Ingredients_photo_uploadsCreateManyUsersInputEnvelope
    connect?: Ingredients_photo_uploadsWhereUniqueInput | Ingredients_photo_uploadsWhereUniqueInput[]
  }

  export type Ingredients_photo_uploadsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<Ingredients_photo_uploadsCreateWithoutUsersInput, Ingredients_photo_uploadsUncheckedCreateWithoutUsersInput> | Ingredients_photo_uploadsCreateWithoutUsersInput[] | Ingredients_photo_uploadsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: Ingredients_photo_uploadsCreateOrConnectWithoutUsersInput | Ingredients_photo_uploadsCreateOrConnectWithoutUsersInput[]
    createMany?: Ingredients_photo_uploadsCreateManyUsersInputEnvelope
    connect?: Ingredients_photo_uploadsWhereUniqueInput | Ingredients_photo_uploadsWhereUniqueInput[]
  }

  export type Ingredients_photo_uploadsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<Ingredients_photo_uploadsCreateWithoutUsersInput, Ingredients_photo_uploadsUncheckedCreateWithoutUsersInput> | Ingredients_photo_uploadsCreateWithoutUsersInput[] | Ingredients_photo_uploadsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: Ingredients_photo_uploadsCreateOrConnectWithoutUsersInput | Ingredients_photo_uploadsCreateOrConnectWithoutUsersInput[]
    upsert?: Ingredients_photo_uploadsUpsertWithWhereUniqueWithoutUsersInput | Ingredients_photo_uploadsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: Ingredients_photo_uploadsCreateManyUsersInputEnvelope
    set?: Ingredients_photo_uploadsWhereUniqueInput | Ingredients_photo_uploadsWhereUniqueInput[]
    disconnect?: Ingredients_photo_uploadsWhereUniqueInput | Ingredients_photo_uploadsWhereUniqueInput[]
    delete?: Ingredients_photo_uploadsWhereUniqueInput | Ingredients_photo_uploadsWhereUniqueInput[]
    connect?: Ingredients_photo_uploadsWhereUniqueInput | Ingredients_photo_uploadsWhereUniqueInput[]
    update?: Ingredients_photo_uploadsUpdateWithWhereUniqueWithoutUsersInput | Ingredients_photo_uploadsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: Ingredients_photo_uploadsUpdateManyWithWhereWithoutUsersInput | Ingredients_photo_uploadsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: Ingredients_photo_uploadsScalarWhereInput | Ingredients_photo_uploadsScalarWhereInput[]
  }

  export type Ingredients_photo_uploadsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<Ingredients_photo_uploadsCreateWithoutUsersInput, Ingredients_photo_uploadsUncheckedCreateWithoutUsersInput> | Ingredients_photo_uploadsCreateWithoutUsersInput[] | Ingredients_photo_uploadsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: Ingredients_photo_uploadsCreateOrConnectWithoutUsersInput | Ingredients_photo_uploadsCreateOrConnectWithoutUsersInput[]
    upsert?: Ingredients_photo_uploadsUpsertWithWhereUniqueWithoutUsersInput | Ingredients_photo_uploadsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: Ingredients_photo_uploadsCreateManyUsersInputEnvelope
    set?: Ingredients_photo_uploadsWhereUniqueInput | Ingredients_photo_uploadsWhereUniqueInput[]
    disconnect?: Ingredients_photo_uploadsWhereUniqueInput | Ingredients_photo_uploadsWhereUniqueInput[]
    delete?: Ingredients_photo_uploadsWhereUniqueInput | Ingredients_photo_uploadsWhereUniqueInput[]
    connect?: Ingredients_photo_uploadsWhereUniqueInput | Ingredients_photo_uploadsWhereUniqueInput[]
    update?: Ingredients_photo_uploadsUpdateWithWhereUniqueWithoutUsersInput | Ingredients_photo_uploadsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: Ingredients_photo_uploadsUpdateManyWithWhereWithoutUsersInput | Ingredients_photo_uploadsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: Ingredients_photo_uploadsScalarWhereInput | Ingredients_photo_uploadsScalarWhereInput[]
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
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

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
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
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
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

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
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

  export type NestedEnumphoto_upload_stateFilter<$PrismaModel = never> = {
    equals?: $Enums.photo_upload_state | Enumphoto_upload_stateFieldRefInput<$PrismaModel>
    in?: $Enums.photo_upload_state[] | ListEnumphoto_upload_stateFieldRefInput<$PrismaModel>
    notIn?: $Enums.photo_upload_state[] | ListEnumphoto_upload_stateFieldRefInput<$PrismaModel>
    not?: NestedEnumphoto_upload_stateFilter<$PrismaModel> | $Enums.photo_upload_state
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

  export type NestedEnumphoto_upload_stateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.photo_upload_state | Enumphoto_upload_stateFieldRefInput<$PrismaModel>
    in?: $Enums.photo_upload_state[] | ListEnumphoto_upload_stateFieldRefInput<$PrismaModel>
    notIn?: $Enums.photo_upload_state[] | ListEnumphoto_upload_stateFieldRefInput<$PrismaModel>
    not?: NestedEnumphoto_upload_stateWithAggregatesFilter<$PrismaModel> | $Enums.photo_upload_state
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumphoto_upload_stateFilter<$PrismaModel>
    _max?: NestedEnumphoto_upload_stateFilter<$PrismaModel>
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

  export type Ingredients_photo_uploadsCreateWithoutIngredientsInput = {
    id: string
    created_at: Date | string
    uploaded_at?: Date | string | null
    state: $Enums.photo_upload_state
    upload_duration_sec?: number | null
    ai_processing_duration_sec?: number | null
    photo_url?: string | null
    users: UsersCreateNestedOneWithoutIngredients_photo_uploadsInput
  }

  export type Ingredients_photo_uploadsUncheckedCreateWithoutIngredientsInput = {
    id: string
    user_id: string
    created_at: Date | string
    uploaded_at?: Date | string | null
    state: $Enums.photo_upload_state
    upload_duration_sec?: number | null
    ai_processing_duration_sec?: number | null
    photo_url?: string | null
  }

  export type Ingredients_photo_uploadsCreateOrConnectWithoutIngredientsInput = {
    where: Ingredients_photo_uploadsWhereUniqueInput
    create: XOR<Ingredients_photo_uploadsCreateWithoutIngredientsInput, Ingredients_photo_uploadsUncheckedCreateWithoutIngredientsInput>
  }

  export type Ingredients_photo_uploadsUpsertWithoutIngredientsInput = {
    update: XOR<Ingredients_photo_uploadsUpdateWithoutIngredientsInput, Ingredients_photo_uploadsUncheckedUpdateWithoutIngredientsInput>
    create: XOR<Ingredients_photo_uploadsCreateWithoutIngredientsInput, Ingredients_photo_uploadsUncheckedCreateWithoutIngredientsInput>
    where?: Ingredients_photo_uploadsWhereInput
  }

  export type Ingredients_photo_uploadsUpdateToOneWithWhereWithoutIngredientsInput = {
    where?: Ingredients_photo_uploadsWhereInput
    data: XOR<Ingredients_photo_uploadsUpdateWithoutIngredientsInput, Ingredients_photo_uploadsUncheckedUpdateWithoutIngredientsInput>
  }

  export type Ingredients_photo_uploadsUpdateWithoutIngredientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    state?: Enumphoto_upload_stateFieldUpdateOperationsInput | $Enums.photo_upload_state
    upload_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    ai_processing_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UsersUpdateOneRequiredWithoutIngredients_photo_uploadsNestedInput
  }

  export type Ingredients_photo_uploadsUncheckedUpdateWithoutIngredientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    state?: Enumphoto_upload_stateFieldUpdateOperationsInput | $Enums.photo_upload_state
    upload_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    ai_processing_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IngredientsCreateWithoutIngredients_photo_uploadsInput = {
    id: string
    name: string
    is_reviewed: boolean
    fill_level: number
    shelf_life_months: number
    fill_date: string
    is_ground?: boolean | null
  }

  export type IngredientsUncheckedCreateWithoutIngredients_photo_uploadsInput = {
    id: string
    name: string
    is_reviewed: boolean
    fill_level: number
    shelf_life_months: number
    fill_date: string
    is_ground?: boolean | null
  }

  export type IngredientsCreateOrConnectWithoutIngredients_photo_uploadsInput = {
    where: IngredientsWhereUniqueInput
    create: XOR<IngredientsCreateWithoutIngredients_photo_uploadsInput, IngredientsUncheckedCreateWithoutIngredients_photo_uploadsInput>
  }

  export type IngredientsCreateManyIngredients_photo_uploadsInputEnvelope = {
    data: IngredientsCreateManyIngredients_photo_uploadsInput | IngredientsCreateManyIngredients_photo_uploadsInput[]
    skipDuplicates?: boolean
  }

  export type UsersCreateWithoutIngredients_photo_uploadsInput = {
    id: string
    name: string
    avatar_url?: string | null
  }

  export type UsersUncheckedCreateWithoutIngredients_photo_uploadsInput = {
    id: string
    name: string
    avatar_url?: string | null
  }

  export type UsersCreateOrConnectWithoutIngredients_photo_uploadsInput = {
    where: UsersWhereUniqueInput
    create: XOR<UsersCreateWithoutIngredients_photo_uploadsInput, UsersUncheckedCreateWithoutIngredients_photo_uploadsInput>
  }

  export type IngredientsUpsertWithWhereUniqueWithoutIngredients_photo_uploadsInput = {
    where: IngredientsWhereUniqueInput
    update: XOR<IngredientsUpdateWithoutIngredients_photo_uploadsInput, IngredientsUncheckedUpdateWithoutIngredients_photo_uploadsInput>
    create: XOR<IngredientsCreateWithoutIngredients_photo_uploadsInput, IngredientsUncheckedCreateWithoutIngredients_photo_uploadsInput>
  }

  export type IngredientsUpdateWithWhereUniqueWithoutIngredients_photo_uploadsInput = {
    where: IngredientsWhereUniqueInput
    data: XOR<IngredientsUpdateWithoutIngredients_photo_uploadsInput, IngredientsUncheckedUpdateWithoutIngredients_photo_uploadsInput>
  }

  export type IngredientsUpdateManyWithWhereWithoutIngredients_photo_uploadsInput = {
    where: IngredientsScalarWhereInput
    data: XOR<IngredientsUpdateManyMutationInput, IngredientsUncheckedUpdateManyWithoutIngredients_photo_uploadsInput>
  }

  export type IngredientsScalarWhereInput = {
    AND?: IngredientsScalarWhereInput | IngredientsScalarWhereInput[]
    OR?: IngredientsScalarWhereInput[]
    NOT?: IngredientsScalarWhereInput | IngredientsScalarWhereInput[]
    id?: UuidFilter<"Ingredients"> | string
    name?: StringFilter<"Ingredients"> | string
    is_reviewed?: BoolFilter<"Ingredients"> | boolean
    fill_level?: IntFilter<"Ingredients"> | number
    shelf_life_months?: IntFilter<"Ingredients"> | number
    fill_date?: StringFilter<"Ingredients"> | string
    is_ground?: BoolNullableFilter<"Ingredients"> | boolean | null
    ingredients_photo_uploads_id?: UuidNullableFilter<"Ingredients"> | string | null
  }

  export type UsersUpsertWithoutIngredients_photo_uploadsInput = {
    update: XOR<UsersUpdateWithoutIngredients_photo_uploadsInput, UsersUncheckedUpdateWithoutIngredients_photo_uploadsInput>
    create: XOR<UsersCreateWithoutIngredients_photo_uploadsInput, UsersUncheckedCreateWithoutIngredients_photo_uploadsInput>
    where?: UsersWhereInput
  }

  export type UsersUpdateToOneWithWhereWithoutIngredients_photo_uploadsInput = {
    where?: UsersWhereInput
    data: XOR<UsersUpdateWithoutIngredients_photo_uploadsInput, UsersUncheckedUpdateWithoutIngredients_photo_uploadsInput>
  }

  export type UsersUpdateWithoutIngredients_photo_uploadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UsersUncheckedUpdateWithoutIngredients_photo_uploadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Ingredients_photo_uploadsCreateWithoutUsersInput = {
    id: string
    created_at: Date | string
    uploaded_at?: Date | string | null
    state: $Enums.photo_upload_state
    upload_duration_sec?: number | null
    ai_processing_duration_sec?: number | null
    photo_url?: string | null
    ingredients?: IngredientsCreateNestedManyWithoutIngredients_photo_uploadsInput
  }

  export type Ingredients_photo_uploadsUncheckedCreateWithoutUsersInput = {
    id: string
    created_at: Date | string
    uploaded_at?: Date | string | null
    state: $Enums.photo_upload_state
    upload_duration_sec?: number | null
    ai_processing_duration_sec?: number | null
    photo_url?: string | null
    ingredients?: IngredientsUncheckedCreateNestedManyWithoutIngredients_photo_uploadsInput
  }

  export type Ingredients_photo_uploadsCreateOrConnectWithoutUsersInput = {
    where: Ingredients_photo_uploadsWhereUniqueInput
    create: XOR<Ingredients_photo_uploadsCreateWithoutUsersInput, Ingredients_photo_uploadsUncheckedCreateWithoutUsersInput>
  }

  export type Ingredients_photo_uploadsCreateManyUsersInputEnvelope = {
    data: Ingredients_photo_uploadsCreateManyUsersInput | Ingredients_photo_uploadsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type Ingredients_photo_uploadsUpsertWithWhereUniqueWithoutUsersInput = {
    where: Ingredients_photo_uploadsWhereUniqueInput
    update: XOR<Ingredients_photo_uploadsUpdateWithoutUsersInput, Ingredients_photo_uploadsUncheckedUpdateWithoutUsersInput>
    create: XOR<Ingredients_photo_uploadsCreateWithoutUsersInput, Ingredients_photo_uploadsUncheckedCreateWithoutUsersInput>
  }

  export type Ingredients_photo_uploadsUpdateWithWhereUniqueWithoutUsersInput = {
    where: Ingredients_photo_uploadsWhereUniqueInput
    data: XOR<Ingredients_photo_uploadsUpdateWithoutUsersInput, Ingredients_photo_uploadsUncheckedUpdateWithoutUsersInput>
  }

  export type Ingredients_photo_uploadsUpdateManyWithWhereWithoutUsersInput = {
    where: Ingredients_photo_uploadsScalarWhereInput
    data: XOR<Ingredients_photo_uploadsUpdateManyMutationInput, Ingredients_photo_uploadsUncheckedUpdateManyWithoutUsersInput>
  }

  export type Ingredients_photo_uploadsScalarWhereInput = {
    AND?: Ingredients_photo_uploadsScalarWhereInput | Ingredients_photo_uploadsScalarWhereInput[]
    OR?: Ingredients_photo_uploadsScalarWhereInput[]
    NOT?: Ingredients_photo_uploadsScalarWhereInput | Ingredients_photo_uploadsScalarWhereInput[]
    id?: UuidFilter<"Ingredients_photo_uploads"> | string
    user_id?: StringFilter<"Ingredients_photo_uploads"> | string
    created_at?: DateTimeFilter<"Ingredients_photo_uploads"> | Date | string
    uploaded_at?: DateTimeNullableFilter<"Ingredients_photo_uploads"> | Date | string | null
    state?: Enumphoto_upload_stateFilter<"Ingredients_photo_uploads"> | $Enums.photo_upload_state
    upload_duration_sec?: FloatNullableFilter<"Ingredients_photo_uploads"> | number | null
    ai_processing_duration_sec?: FloatNullableFilter<"Ingredients_photo_uploads"> | number | null
    photo_url?: StringNullableFilter<"Ingredients_photo_uploads"> | string | null
  }

  export type IngredientsCreateManyIngredients_photo_uploadsInput = {
    id: string
    name: string
    is_reviewed: boolean
    fill_level: number
    shelf_life_months: number
    fill_date: string
    is_ground?: boolean | null
  }

  export type IngredientsUpdateWithoutIngredients_photo_uploadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is_reviewed?: BoolFieldUpdateOperationsInput | boolean
    fill_level?: IntFieldUpdateOperationsInput | number
    shelf_life_months?: IntFieldUpdateOperationsInput | number
    fill_date?: StringFieldUpdateOperationsInput | string
    is_ground?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type IngredientsUncheckedUpdateWithoutIngredients_photo_uploadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is_reviewed?: BoolFieldUpdateOperationsInput | boolean
    fill_level?: IntFieldUpdateOperationsInput | number
    shelf_life_months?: IntFieldUpdateOperationsInput | number
    fill_date?: StringFieldUpdateOperationsInput | string
    is_ground?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type IngredientsUncheckedUpdateManyWithoutIngredients_photo_uploadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is_reviewed?: BoolFieldUpdateOperationsInput | boolean
    fill_level?: IntFieldUpdateOperationsInput | number
    shelf_life_months?: IntFieldUpdateOperationsInput | number
    fill_date?: StringFieldUpdateOperationsInput | string
    is_ground?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type Ingredients_photo_uploadsCreateManyUsersInput = {
    id: string
    created_at: Date | string
    uploaded_at?: Date | string | null
    state: $Enums.photo_upload_state
    upload_duration_sec?: number | null
    ai_processing_duration_sec?: number | null
    photo_url?: string | null
  }

  export type Ingredients_photo_uploadsUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    state?: Enumphoto_upload_stateFieldUpdateOperationsInput | $Enums.photo_upload_state
    upload_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    ai_processing_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    ingredients?: IngredientsUpdateManyWithoutIngredients_photo_uploadsNestedInput
  }

  export type Ingredients_photo_uploadsUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    state?: Enumphoto_upload_stateFieldUpdateOperationsInput | $Enums.photo_upload_state
    upload_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    ai_processing_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    ingredients?: IngredientsUncheckedUpdateManyWithoutIngredients_photo_uploadsNestedInput
  }

  export type Ingredients_photo_uploadsUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    state?: Enumphoto_upload_stateFieldUpdateOperationsInput | $Enums.photo_upload_state
    upload_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    ai_processing_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use Ingredients_photo_uploadsCountOutputTypeDefaultArgs instead
     */
    export type Ingredients_photo_uploadsCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = Ingredients_photo_uploadsCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UsersCountOutputTypeDefaultArgs instead
     */
    export type UsersCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = UsersCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use IngredientsDefaultArgs instead
     */
    export type IngredientsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = IngredientsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use Ingredients_photo_uploadsDefaultArgs instead
     */
    export type Ingredients_photo_uploadsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = Ingredients_photo_uploadsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UsersDefaultArgs instead
     */
    export type UsersArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = UsersDefaultArgs<ExtArgs>

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