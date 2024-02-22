
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
 * Model Ingredient_events
 * 
 */
export type Ingredient_events = $Result.DefaultSelection<Prisma.$Ingredient_eventsPayload>
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
 * Model Recipe_ingredients
 * 
 */
export type Recipe_ingredients = $Result.DefaultSelection<Prisma.$Recipe_ingredientsPayload>
/**
 * Model Recipes
 * 
 */
export type Recipes = $Result.DefaultSelection<Prisma.$RecipesPayload>
/**
 * Model Users
 * 
 */
export type Users = $Result.DefaultSelection<Prisma.$UsersPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ingredients_tracking_type: {
  fill_level: 'fill_level',
  count: 'count'
};

export type ingredients_tracking_type = (typeof ingredients_tracking_type)[keyof typeof ingredients_tracking_type]


export const ingredient_photo_upload_state: {
  uploading: 'uploading',
  ai_processing: 'ai_processing',
  reviewing: 'reviewing',
  done: 'done'
};

export type ingredient_photo_upload_state = (typeof ingredient_photo_upload_state)[keyof typeof ingredient_photo_upload_state]

}

export type ingredients_tracking_type = $Enums.ingredients_tracking_type

export const ingredients_tracking_type: typeof $Enums.ingredients_tracking_type

export type ingredient_photo_upload_state = $Enums.ingredient_photo_upload_state

export const ingredient_photo_upload_state: typeof $Enums.ingredient_photo_upload_state

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Ingredient_events
 * const ingredient_events = await prisma.ingredient_events.findMany()
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
   * // Fetch zero or more Ingredient_events
   * const ingredient_events = await prisma.ingredient_events.findMany()
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
   * `prisma.ingredient_events`: Exposes CRUD operations for the **Ingredient_events** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ingredient_events
    * const ingredient_events = await prisma.ingredient_events.findMany()
    * ```
    */
  get ingredient_events(): Prisma.Ingredient_eventsDelegate<ExtArgs>;

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
   * `prisma.recipe_ingredients`: Exposes CRUD operations for the **Recipe_ingredients** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Recipe_ingredients
    * const recipe_ingredients = await prisma.recipe_ingredients.findMany()
    * ```
    */
  get recipe_ingredients(): Prisma.Recipe_ingredientsDelegate<ExtArgs>;

  /**
   * `prisma.recipes`: Exposes CRUD operations for the **Recipes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Recipes
    * const recipes = await prisma.recipes.findMany()
    * ```
    */
  get recipes(): Prisma.RecipesDelegate<ExtArgs>;

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
    Ingredient_events: 'Ingredient_events',
    Ingredients: 'Ingredients',
    Ingredients_photo_uploads: 'Ingredients_photo_uploads',
    Recipe_ingredients: 'Recipe_ingredients',
    Recipes: 'Recipes',
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
      modelProps: 'ingredient_events' | 'ingredients' | 'ingredients_photo_uploads' | 'recipe_ingredients' | 'recipes' | 'users'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      Ingredient_events: {
        payload: Prisma.$Ingredient_eventsPayload<ExtArgs>
        fields: Prisma.Ingredient_eventsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Ingredient_eventsFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Ingredient_eventsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Ingredient_eventsFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Ingredient_eventsPayload>
          }
          findFirst: {
            args: Prisma.Ingredient_eventsFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Ingredient_eventsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Ingredient_eventsFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Ingredient_eventsPayload>
          }
          findMany: {
            args: Prisma.Ingredient_eventsFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Ingredient_eventsPayload>[]
          }
          create: {
            args: Prisma.Ingredient_eventsCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Ingredient_eventsPayload>
          }
          createMany: {
            args: Prisma.Ingredient_eventsCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.Ingredient_eventsDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Ingredient_eventsPayload>
          }
          update: {
            args: Prisma.Ingredient_eventsUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Ingredient_eventsPayload>
          }
          deleteMany: {
            args: Prisma.Ingredient_eventsDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.Ingredient_eventsUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.Ingredient_eventsUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Ingredient_eventsPayload>
          }
          aggregate: {
            args: Prisma.Ingredient_eventsAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateIngredient_events>
          }
          groupBy: {
            args: Prisma.Ingredient_eventsGroupByArgs<ExtArgs>,
            result: $Utils.Optional<Ingredient_eventsGroupByOutputType>[]
          }
          count: {
            args: Prisma.Ingredient_eventsCountArgs<ExtArgs>,
            result: $Utils.Optional<Ingredient_eventsCountAggregateOutputType> | number
          }
        }
      }
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
      Recipe_ingredients: {
        payload: Prisma.$Recipe_ingredientsPayload<ExtArgs>
        fields: Prisma.Recipe_ingredientsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Recipe_ingredientsFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Recipe_ingredientsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Recipe_ingredientsFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Recipe_ingredientsPayload>
          }
          findFirst: {
            args: Prisma.Recipe_ingredientsFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Recipe_ingredientsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Recipe_ingredientsFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Recipe_ingredientsPayload>
          }
          findMany: {
            args: Prisma.Recipe_ingredientsFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Recipe_ingredientsPayload>[]
          }
          create: {
            args: Prisma.Recipe_ingredientsCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Recipe_ingredientsPayload>
          }
          createMany: {
            args: Prisma.Recipe_ingredientsCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.Recipe_ingredientsDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Recipe_ingredientsPayload>
          }
          update: {
            args: Prisma.Recipe_ingredientsUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Recipe_ingredientsPayload>
          }
          deleteMany: {
            args: Prisma.Recipe_ingredientsDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.Recipe_ingredientsUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.Recipe_ingredientsUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$Recipe_ingredientsPayload>
          }
          aggregate: {
            args: Prisma.Recipe_ingredientsAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateRecipe_ingredients>
          }
          groupBy: {
            args: Prisma.Recipe_ingredientsGroupByArgs<ExtArgs>,
            result: $Utils.Optional<Recipe_ingredientsGroupByOutputType>[]
          }
          count: {
            args: Prisma.Recipe_ingredientsCountArgs<ExtArgs>,
            result: $Utils.Optional<Recipe_ingredientsCountAggregateOutputType> | number
          }
        }
      }
      Recipes: {
        payload: Prisma.$RecipesPayload<ExtArgs>
        fields: Prisma.RecipesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecipesFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RecipesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecipesFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RecipesPayload>
          }
          findFirst: {
            args: Prisma.RecipesFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RecipesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecipesFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RecipesPayload>
          }
          findMany: {
            args: Prisma.RecipesFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RecipesPayload>[]
          }
          create: {
            args: Prisma.RecipesCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RecipesPayload>
          }
          createMany: {
            args: Prisma.RecipesCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.RecipesDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RecipesPayload>
          }
          update: {
            args: Prisma.RecipesUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RecipesPayload>
          }
          deleteMany: {
            args: Prisma.RecipesDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.RecipesUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.RecipesUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RecipesPayload>
          }
          aggregate: {
            args: Prisma.RecipesAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateRecipes>
          }
          groupBy: {
            args: Prisma.RecipesGroupByArgs<ExtArgs>,
            result: $Utils.Optional<RecipesGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecipesCountArgs<ExtArgs>,
            result: $Utils.Optional<RecipesCountAggregateOutputType> | number
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
   * Count Type IngredientsCountOutputType
   */

  export type IngredientsCountOutputType = {
    ingredient_events: number
  }

  export type IngredientsCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    ingredient_events?: boolean | IngredientsCountOutputTypeCountIngredient_eventsArgs
  }

  // Custom InputTypes

  /**
   * IngredientsCountOutputType without action
   */
  export type IngredientsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngredientsCountOutputType
     */
    select?: IngredientsCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * IngredientsCountOutputType without action
   */
  export type IngredientsCountOutputTypeCountIngredient_eventsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: Ingredient_eventsWhereInput
  }



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
   * Count Type RecipesCountOutputType
   */

  export type RecipesCountOutputType = {
    recipe_ingredients: number
  }

  export type RecipesCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    recipe_ingredients?: boolean | RecipesCountOutputTypeCountRecipe_ingredientsArgs
  }

  // Custom InputTypes

  /**
   * RecipesCountOutputType without action
   */
  export type RecipesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipesCountOutputType
     */
    select?: RecipesCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * RecipesCountOutputType without action
   */
  export type RecipesCountOutputTypeCountRecipe_ingredientsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: Recipe_ingredientsWhereInput
  }



  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    ingredient_events: number
    ingredients_photo_uploads: number
    recipes: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    ingredient_events?: boolean | UsersCountOutputTypeCountIngredient_eventsArgs
    ingredients_photo_uploads?: boolean | UsersCountOutputTypeCountIngredients_photo_uploadsArgs
    recipes?: boolean | UsersCountOutputTypeCountRecipesArgs
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
  export type UsersCountOutputTypeCountIngredient_eventsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: Ingredient_eventsWhereInput
  }


  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountIngredients_photo_uploadsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: Ingredients_photo_uploadsWhereInput
  }


  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountRecipesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: RecipesWhereInput
  }



  /**
   * Models
   */

  /**
   * Model Ingredient_events
   */

  export type AggregateIngredient_events = {
    _count: Ingredient_eventsCountAggregateOutputType | null
    _min: Ingredient_eventsMinAggregateOutputType | null
    _max: Ingredient_eventsMaxAggregateOutputType | null
  }

  export type Ingredient_eventsMinAggregateOutputType = {
    id: string | null
    ingredient_id: string | null
    user_id: string | null
    timestamp: Date | null
  }

  export type Ingredient_eventsMaxAggregateOutputType = {
    id: string | null
    ingredient_id: string | null
    user_id: string | null
    timestamp: Date | null
  }

  export type Ingredient_eventsCountAggregateOutputType = {
    id: number
    ingredient_id: number
    user_id: number
    timestamp: number
    from_values: number
    to_values: number
    _all: number
  }


  export type Ingredient_eventsMinAggregateInputType = {
    id?: true
    ingredient_id?: true
    user_id?: true
    timestamp?: true
  }

  export type Ingredient_eventsMaxAggregateInputType = {
    id?: true
    ingredient_id?: true
    user_id?: true
    timestamp?: true
  }

  export type Ingredient_eventsCountAggregateInputType = {
    id?: true
    ingredient_id?: true
    user_id?: true
    timestamp?: true
    from_values?: true
    to_values?: true
    _all?: true
  }

  export type Ingredient_eventsAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ingredient_events to aggregate.
     */
    where?: Ingredient_eventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredient_events to fetch.
     */
    orderBy?: Ingredient_eventsOrderByWithRelationInput | Ingredient_eventsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Ingredient_eventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredient_events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredient_events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ingredient_events
    **/
    _count?: true | Ingredient_eventsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Ingredient_eventsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Ingredient_eventsMaxAggregateInputType
  }

  export type GetIngredient_eventsAggregateType<T extends Ingredient_eventsAggregateArgs> = {
        [P in keyof T & keyof AggregateIngredient_events]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIngredient_events[P]>
      : GetScalarType<T[P], AggregateIngredient_events[P]>
  }




  export type Ingredient_eventsGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: Ingredient_eventsWhereInput
    orderBy?: Ingredient_eventsOrderByWithAggregationInput | Ingredient_eventsOrderByWithAggregationInput[]
    by: Ingredient_eventsScalarFieldEnum[] | Ingredient_eventsScalarFieldEnum
    having?: Ingredient_eventsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Ingredient_eventsCountAggregateInputType | true
    _min?: Ingredient_eventsMinAggregateInputType
    _max?: Ingredient_eventsMaxAggregateInputType
  }

  export type Ingredient_eventsGroupByOutputType = {
    id: string
    ingredient_id: string
    user_id: string
    timestamp: Date
    from_values: JsonValue | null
    to_values: JsonValue | null
    _count: Ingredient_eventsCountAggregateOutputType | null
    _min: Ingredient_eventsMinAggregateOutputType | null
    _max: Ingredient_eventsMaxAggregateOutputType | null
  }

  type GetIngredient_eventsGroupByPayload<T extends Ingredient_eventsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Ingredient_eventsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Ingredient_eventsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Ingredient_eventsGroupByOutputType[P]>
            : GetScalarType<T[P], Ingredient_eventsGroupByOutputType[P]>
        }
      >
    >


  export type Ingredient_eventsSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ingredient_id?: boolean
    user_id?: boolean
    timestamp?: boolean
    from_values?: boolean
    to_values?: boolean
    ingredients?: boolean | IngredientsDefaultArgs<ExtArgs>
    users?: boolean | UsersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ingredient_events"]>

  export type Ingredient_eventsSelectScalar = {
    id?: boolean
    ingredient_id?: boolean
    user_id?: boolean
    timestamp?: boolean
    from_values?: boolean
    to_values?: boolean
  }

  export type Ingredient_eventsInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    ingredients?: boolean | IngredientsDefaultArgs<ExtArgs>
    users?: boolean | UsersDefaultArgs<ExtArgs>
  }


  export type $Ingredient_eventsPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "Ingredient_events"
    objects: {
      ingredients: Prisma.$IngredientsPayload<ExtArgs>
      users: Prisma.$UsersPayload<ExtArgs>
    }
    scalars: $Extensions.GetResult<{
      /**
       * @zod.string.uuid()
       */
      id: string
      /**
       * @zod.string.uuid()
       */
      ingredient_id: string
      user_id: string
      timestamp: Date
      from_values: Prisma.JsonValue | null
      to_values: Prisma.JsonValue | null
    }, ExtArgs["result"]["ingredient_events"]>
    composites: {}
  }


  type Ingredient_eventsGetPayload<S extends boolean | null | undefined | Ingredient_eventsDefaultArgs> = $Result.GetResult<Prisma.$Ingredient_eventsPayload, S>

  type Ingredient_eventsCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<Ingredient_eventsFindManyArgs, 'select' | 'include'> & {
      select?: Ingredient_eventsCountAggregateInputType | true
    }

  export interface Ingredient_eventsDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ingredient_events'], meta: { name: 'Ingredient_events' } }
    /**
     * Find zero or one Ingredient_events that matches the filter.
     * @param {Ingredient_eventsFindUniqueArgs} args - Arguments to find a Ingredient_events
     * @example
     * // Get one Ingredient_events
     * const ingredient_events = await prisma.ingredient_events.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends Ingredient_eventsFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, Ingredient_eventsFindUniqueArgs<ExtArgs>>
    ): Prisma__Ingredient_eventsClient<$Result.GetResult<Prisma.$Ingredient_eventsPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Ingredient_events that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {Ingredient_eventsFindUniqueOrThrowArgs} args - Arguments to find a Ingredient_events
     * @example
     * // Get one Ingredient_events
     * const ingredient_events = await prisma.ingredient_events.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends Ingredient_eventsFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, Ingredient_eventsFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__Ingredient_eventsClient<$Result.GetResult<Prisma.$Ingredient_eventsPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Ingredient_events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ingredient_eventsFindFirstArgs} args - Arguments to find a Ingredient_events
     * @example
     * // Get one Ingredient_events
     * const ingredient_events = await prisma.ingredient_events.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends Ingredient_eventsFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, Ingredient_eventsFindFirstArgs<ExtArgs>>
    ): Prisma__Ingredient_eventsClient<$Result.GetResult<Prisma.$Ingredient_eventsPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Ingredient_events that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ingredient_eventsFindFirstOrThrowArgs} args - Arguments to find a Ingredient_events
     * @example
     * // Get one Ingredient_events
     * const ingredient_events = await prisma.ingredient_events.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends Ingredient_eventsFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, Ingredient_eventsFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__Ingredient_eventsClient<$Result.GetResult<Prisma.$Ingredient_eventsPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Ingredient_events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ingredient_eventsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ingredient_events
     * const ingredient_events = await prisma.ingredient_events.findMany()
     * 
     * // Get first 10 Ingredient_events
     * const ingredient_events = await prisma.ingredient_events.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ingredient_eventsWithIdOnly = await prisma.ingredient_events.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends Ingredient_eventsFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, Ingredient_eventsFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Ingredient_eventsPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Ingredient_events.
     * @param {Ingredient_eventsCreateArgs} args - Arguments to create a Ingredient_events.
     * @example
     * // Create one Ingredient_events
     * const Ingredient_events = await prisma.ingredient_events.create({
     *   data: {
     *     // ... data to create a Ingredient_events
     *   }
     * })
     * 
    **/
    create<T extends Ingredient_eventsCreateArgs<ExtArgs>>(
      args: SelectSubset<T, Ingredient_eventsCreateArgs<ExtArgs>>
    ): Prisma__Ingredient_eventsClient<$Result.GetResult<Prisma.$Ingredient_eventsPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Ingredient_events.
     *     @param {Ingredient_eventsCreateManyArgs} args - Arguments to create many Ingredient_events.
     *     @example
     *     // Create many Ingredient_events
     *     const ingredient_events = await prisma.ingredient_events.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends Ingredient_eventsCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, Ingredient_eventsCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Ingredient_events.
     * @param {Ingredient_eventsDeleteArgs} args - Arguments to delete one Ingredient_events.
     * @example
     * // Delete one Ingredient_events
     * const Ingredient_events = await prisma.ingredient_events.delete({
     *   where: {
     *     // ... filter to delete one Ingredient_events
     *   }
     * })
     * 
    **/
    delete<T extends Ingredient_eventsDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, Ingredient_eventsDeleteArgs<ExtArgs>>
    ): Prisma__Ingredient_eventsClient<$Result.GetResult<Prisma.$Ingredient_eventsPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Ingredient_events.
     * @param {Ingredient_eventsUpdateArgs} args - Arguments to update one Ingredient_events.
     * @example
     * // Update one Ingredient_events
     * const ingredient_events = await prisma.ingredient_events.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends Ingredient_eventsUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, Ingredient_eventsUpdateArgs<ExtArgs>>
    ): Prisma__Ingredient_eventsClient<$Result.GetResult<Prisma.$Ingredient_eventsPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Ingredient_events.
     * @param {Ingredient_eventsDeleteManyArgs} args - Arguments to filter Ingredient_events to delete.
     * @example
     * // Delete a few Ingredient_events
     * const { count } = await prisma.ingredient_events.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends Ingredient_eventsDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, Ingredient_eventsDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ingredient_events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ingredient_eventsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ingredient_events
     * const ingredient_events = await prisma.ingredient_events.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends Ingredient_eventsUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, Ingredient_eventsUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Ingredient_events.
     * @param {Ingredient_eventsUpsertArgs} args - Arguments to update or create a Ingredient_events.
     * @example
     * // Update or create a Ingredient_events
     * const ingredient_events = await prisma.ingredient_events.upsert({
     *   create: {
     *     // ... data to create a Ingredient_events
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ingredient_events we want to update
     *   }
     * })
    **/
    upsert<T extends Ingredient_eventsUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, Ingredient_eventsUpsertArgs<ExtArgs>>
    ): Prisma__Ingredient_eventsClient<$Result.GetResult<Prisma.$Ingredient_eventsPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Ingredient_events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ingredient_eventsCountArgs} args - Arguments to filter Ingredient_events to count.
     * @example
     * // Count the number of Ingredient_events
     * const count = await prisma.ingredient_events.count({
     *   where: {
     *     // ... the filter for the Ingredient_events we want to count
     *   }
     * })
    **/
    count<T extends Ingredient_eventsCountArgs>(
      args?: Subset<T, Ingredient_eventsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Ingredient_eventsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ingredient_events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ingredient_eventsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Ingredient_eventsAggregateArgs>(args: Subset<T, Ingredient_eventsAggregateArgs>): Prisma.PrismaPromise<GetIngredient_eventsAggregateType<T>>

    /**
     * Group by Ingredient_events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Ingredient_eventsGroupByArgs} args - Group by arguments.
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
      T extends Ingredient_eventsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Ingredient_eventsGroupByArgs['orderBy'] }
        : { orderBy?: Ingredient_eventsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, Ingredient_eventsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIngredient_eventsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ingredient_events model
   */
  readonly fields: Ingredient_eventsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ingredient_events.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Ingredient_eventsClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    ingredients<T extends IngredientsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, IngredientsDefaultArgs<ExtArgs>>): Prisma__IngredientsClient<$Result.GetResult<Prisma.$IngredientsPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

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
   * Fields of the Ingredient_events model
   */ 
  interface Ingredient_eventsFieldRefs {
    readonly id: FieldRef<"Ingredient_events", 'String'>
    readonly ingredient_id: FieldRef<"Ingredient_events", 'String'>
    readonly user_id: FieldRef<"Ingredient_events", 'String'>
    readonly timestamp: FieldRef<"Ingredient_events", 'DateTime'>
    readonly from_values: FieldRef<"Ingredient_events", 'Json'>
    readonly to_values: FieldRef<"Ingredient_events", 'Json'>
  }
    

  // Custom InputTypes

  /**
   * Ingredient_events findUnique
   */
  export type Ingredient_eventsFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient_events
     */
    select?: Ingredient_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Ingredient_eventsInclude<ExtArgs> | null
    /**
     * Filter, which Ingredient_events to fetch.
     */
    where: Ingredient_eventsWhereUniqueInput
  }


  /**
   * Ingredient_events findUniqueOrThrow
   */
  export type Ingredient_eventsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient_events
     */
    select?: Ingredient_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Ingredient_eventsInclude<ExtArgs> | null
    /**
     * Filter, which Ingredient_events to fetch.
     */
    where: Ingredient_eventsWhereUniqueInput
  }


  /**
   * Ingredient_events findFirst
   */
  export type Ingredient_eventsFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient_events
     */
    select?: Ingredient_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Ingredient_eventsInclude<ExtArgs> | null
    /**
     * Filter, which Ingredient_events to fetch.
     */
    where?: Ingredient_eventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredient_events to fetch.
     */
    orderBy?: Ingredient_eventsOrderByWithRelationInput | Ingredient_eventsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ingredient_events.
     */
    cursor?: Ingredient_eventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredient_events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredient_events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ingredient_events.
     */
    distinct?: Ingredient_eventsScalarFieldEnum | Ingredient_eventsScalarFieldEnum[]
  }


  /**
   * Ingredient_events findFirstOrThrow
   */
  export type Ingredient_eventsFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient_events
     */
    select?: Ingredient_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Ingredient_eventsInclude<ExtArgs> | null
    /**
     * Filter, which Ingredient_events to fetch.
     */
    where?: Ingredient_eventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredient_events to fetch.
     */
    orderBy?: Ingredient_eventsOrderByWithRelationInput | Ingredient_eventsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ingredient_events.
     */
    cursor?: Ingredient_eventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredient_events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredient_events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ingredient_events.
     */
    distinct?: Ingredient_eventsScalarFieldEnum | Ingredient_eventsScalarFieldEnum[]
  }


  /**
   * Ingredient_events findMany
   */
  export type Ingredient_eventsFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient_events
     */
    select?: Ingredient_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Ingredient_eventsInclude<ExtArgs> | null
    /**
     * Filter, which Ingredient_events to fetch.
     */
    where?: Ingredient_eventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredient_events to fetch.
     */
    orderBy?: Ingredient_eventsOrderByWithRelationInput | Ingredient_eventsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ingredient_events.
     */
    cursor?: Ingredient_eventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredient_events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredient_events.
     */
    skip?: number
    distinct?: Ingredient_eventsScalarFieldEnum | Ingredient_eventsScalarFieldEnum[]
  }


  /**
   * Ingredient_events create
   */
  export type Ingredient_eventsCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient_events
     */
    select?: Ingredient_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Ingredient_eventsInclude<ExtArgs> | null
    /**
     * The data needed to create a Ingredient_events.
     */
    data: XOR<Ingredient_eventsCreateInput, Ingredient_eventsUncheckedCreateInput>
  }


  /**
   * Ingredient_events createMany
   */
  export type Ingredient_eventsCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ingredient_events.
     */
    data: Ingredient_eventsCreateManyInput | Ingredient_eventsCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Ingredient_events update
   */
  export type Ingredient_eventsUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient_events
     */
    select?: Ingredient_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Ingredient_eventsInclude<ExtArgs> | null
    /**
     * The data needed to update a Ingredient_events.
     */
    data: XOR<Ingredient_eventsUpdateInput, Ingredient_eventsUncheckedUpdateInput>
    /**
     * Choose, which Ingredient_events to update.
     */
    where: Ingredient_eventsWhereUniqueInput
  }


  /**
   * Ingredient_events updateMany
   */
  export type Ingredient_eventsUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ingredient_events.
     */
    data: XOR<Ingredient_eventsUpdateManyMutationInput, Ingredient_eventsUncheckedUpdateManyInput>
    /**
     * Filter which Ingredient_events to update
     */
    where?: Ingredient_eventsWhereInput
  }


  /**
   * Ingredient_events upsert
   */
  export type Ingredient_eventsUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient_events
     */
    select?: Ingredient_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Ingredient_eventsInclude<ExtArgs> | null
    /**
     * The filter to search for the Ingredient_events to update in case it exists.
     */
    where: Ingredient_eventsWhereUniqueInput
    /**
     * In case the Ingredient_events found by the `where` argument doesn't exist, create a new Ingredient_events with this data.
     */
    create: XOR<Ingredient_eventsCreateInput, Ingredient_eventsUncheckedCreateInput>
    /**
     * In case the Ingredient_events was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Ingredient_eventsUpdateInput, Ingredient_eventsUncheckedUpdateInput>
  }


  /**
   * Ingredient_events delete
   */
  export type Ingredient_eventsDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient_events
     */
    select?: Ingredient_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Ingredient_eventsInclude<ExtArgs> | null
    /**
     * Filter which Ingredient_events to delete.
     */
    where: Ingredient_eventsWhereUniqueInput
  }


  /**
   * Ingredient_events deleteMany
   */
  export type Ingredient_eventsDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ingredient_events to delete
     */
    where?: Ingredient_eventsWhereInput
  }


  /**
   * Ingredient_events without action
   */
  export type Ingredient_eventsDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient_events
     */
    select?: Ingredient_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Ingredient_eventsInclude<ExtArgs> | null
  }



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
    count: number | null
    shelf_life_months: number | null
  }

  export type IngredientsSumAggregateOutputType = {
    fill_level: number | null
    count: number | null
    shelf_life_months: number | null
  }

  export type IngredientsMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    is_reviewed: boolean | null
    embedding: string | null
    tracking_type: $Enums.ingredients_tracking_type | null
    fill_level: number | null
    count: number | null
    shelf_life_months: number | null
    fill_date: string | null
    is_ground: boolean | null
    ingredients_photo_uploads_id: string | null
  }

  export type IngredientsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    is_reviewed: boolean | null
    embedding: string | null
    tracking_type: $Enums.ingredients_tracking_type | null
    fill_level: number | null
    count: number | null
    shelf_life_months: number | null
    fill_date: string | null
    is_ground: boolean | null
    ingredients_photo_uploads_id: string | null
  }

  export type IngredientsCountAggregateOutputType = {
    id: number
    name: number
    description: number
    is_reviewed: number
    embedding: number
    tracking_type: number
    fill_level: number
    count: number
    shelf_life_months: number
    fill_date: number
    is_ground: number
    ingredients_photo_uploads_id: number
    _all: number
  }


  export type IngredientsAvgAggregateInputType = {
    fill_level?: true
    count?: true
    shelf_life_months?: true
  }

  export type IngredientsSumAggregateInputType = {
    fill_level?: true
    count?: true
    shelf_life_months?: true
  }

  export type IngredientsMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    is_reviewed?: true
    embedding?: true
    tracking_type?: true
    fill_level?: true
    count?: true
    shelf_life_months?: true
    fill_date?: true
    is_ground?: true
    ingredients_photo_uploads_id?: true
  }

  export type IngredientsMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    is_reviewed?: true
    embedding?: true
    tracking_type?: true
    fill_level?: true
    count?: true
    shelf_life_months?: true
    fill_date?: true
    is_ground?: true
    ingredients_photo_uploads_id?: true
  }

  export type IngredientsCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    is_reviewed?: true
    embedding?: true
    tracking_type?: true
    fill_level?: true
    count?: true
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
    description: string
    is_reviewed: boolean
    embedding: string
    tracking_type: $Enums.ingredients_tracking_type | null
    fill_level: number
    count: number
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
    description?: boolean
    is_reviewed?: boolean
    embedding?: boolean
    tracking_type?: boolean
    fill_level?: boolean
    count?: boolean
    shelf_life_months?: boolean
    fill_date?: boolean
    is_ground?: boolean
    ingredients_photo_uploads_id?: boolean
    ingredient_events?: boolean | Ingredients$ingredient_eventsArgs<ExtArgs>
    ingredients_photo_uploads?: boolean | Ingredients$ingredients_photo_uploadsArgs<ExtArgs>
    _count?: boolean | IngredientsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ingredients"]>

  export type IngredientsSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    is_reviewed?: boolean
    embedding?: boolean
    tracking_type?: boolean
    fill_level?: boolean
    count?: boolean
    shelf_life_months?: boolean
    fill_date?: boolean
    is_ground?: boolean
    ingredients_photo_uploads_id?: boolean
  }

  export type IngredientsInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    ingredient_events?: boolean | Ingredients$ingredient_eventsArgs<ExtArgs>
    ingredients_photo_uploads?: boolean | Ingredients$ingredients_photo_uploadsArgs<ExtArgs>
    _count?: boolean | IngredientsCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $IngredientsPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "Ingredients"
    objects: {
      ingredient_events: Prisma.$Ingredient_eventsPayload<ExtArgs>[]
      ingredients_photo_uploads: Prisma.$Ingredients_photo_uploadsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetResult<{
      /**
       * @zod.string.uuid()
       */
      id: string
      name: string
      description: string
      is_reviewed: boolean
      embedding: string
      tracking_type: $Enums.ingredients_tracking_type | null
      /**
       * @zod.number.int().gte(-2147483648).lte(2147483647)
       */
      fill_level: number
      /**
       * @zod.number.int().gte(-2147483648).lte(2147483647)
       */
      count: number
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

    ingredient_events<T extends Ingredients$ingredient_eventsArgs<ExtArgs> = {}>(args?: Subset<T, Ingredients$ingredient_eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Ingredient_eventsPayload<ExtArgs>, T, 'findMany'> | Null>;

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
    readonly description: FieldRef<"Ingredients", 'String'>
    readonly is_reviewed: FieldRef<"Ingredients", 'Boolean'>
    readonly embedding: FieldRef<"Ingredients", 'String'>
    readonly tracking_type: FieldRef<"Ingredients", 'ingredients_tracking_type'>
    readonly fill_level: FieldRef<"Ingredients", 'Int'>
    readonly count: FieldRef<"Ingredients", 'Int'>
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
   * Ingredients.ingredient_events
   */
  export type Ingredients$ingredient_eventsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient_events
     */
    select?: Ingredient_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Ingredient_eventsInclude<ExtArgs> | null
    where?: Ingredient_eventsWhereInput
    orderBy?: Ingredient_eventsOrderByWithRelationInput | Ingredient_eventsOrderByWithRelationInput[]
    cursor?: Ingredient_eventsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Ingredient_eventsScalarFieldEnum | Ingredient_eventsScalarFieldEnum[]
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
    state: $Enums.ingredient_photo_upload_state | null
    upload_duration_sec: number | null
    ai_processing_duration_sec: number | null
    photo_url: string | null
  }

  export type Ingredients_photo_uploadsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    created_at: Date | null
    uploaded_at: Date | null
    state: $Enums.ingredient_photo_upload_state | null
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
    state: $Enums.ingredient_photo_upload_state
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
      state: $Enums.ingredient_photo_upload_state
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
    readonly state: FieldRef<"Ingredients_photo_uploads", 'ingredient_photo_upload_state'>
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
   * Model Recipe_ingredients
   */

  export type AggregateRecipe_ingredients = {
    _count: Recipe_ingredientsCountAggregateOutputType | null
    _min: Recipe_ingredientsMinAggregateOutputType | null
    _max: Recipe_ingredientsMaxAggregateOutputType | null
  }

  export type Recipe_ingredientsMinAggregateOutputType = {
    id: string | null
    listing: string | null
    extracted_name: string | null
    embedding: string | null
    recipe_id: string | null
  }

  export type Recipe_ingredientsMaxAggregateOutputType = {
    id: string | null
    listing: string | null
    extracted_name: string | null
    embedding: string | null
    recipe_id: string | null
  }

  export type Recipe_ingredientsCountAggregateOutputType = {
    id: number
    listing: number
    extracted_name: number
    embedding: number
    recipe_id: number
    _all: number
  }


  export type Recipe_ingredientsMinAggregateInputType = {
    id?: true
    listing?: true
    extracted_name?: true
    embedding?: true
    recipe_id?: true
  }

  export type Recipe_ingredientsMaxAggregateInputType = {
    id?: true
    listing?: true
    extracted_name?: true
    embedding?: true
    recipe_id?: true
  }

  export type Recipe_ingredientsCountAggregateInputType = {
    id?: true
    listing?: true
    extracted_name?: true
    embedding?: true
    recipe_id?: true
    _all?: true
  }

  export type Recipe_ingredientsAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recipe_ingredients to aggregate.
     */
    where?: Recipe_ingredientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipe_ingredients to fetch.
     */
    orderBy?: Recipe_ingredientsOrderByWithRelationInput | Recipe_ingredientsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Recipe_ingredientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipe_ingredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipe_ingredients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Recipe_ingredients
    **/
    _count?: true | Recipe_ingredientsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Recipe_ingredientsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Recipe_ingredientsMaxAggregateInputType
  }

  export type GetRecipe_ingredientsAggregateType<T extends Recipe_ingredientsAggregateArgs> = {
        [P in keyof T & keyof AggregateRecipe_ingredients]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecipe_ingredients[P]>
      : GetScalarType<T[P], AggregateRecipe_ingredients[P]>
  }




  export type Recipe_ingredientsGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: Recipe_ingredientsWhereInput
    orderBy?: Recipe_ingredientsOrderByWithAggregationInput | Recipe_ingredientsOrderByWithAggregationInput[]
    by: Recipe_ingredientsScalarFieldEnum[] | Recipe_ingredientsScalarFieldEnum
    having?: Recipe_ingredientsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Recipe_ingredientsCountAggregateInputType | true
    _min?: Recipe_ingredientsMinAggregateInputType
    _max?: Recipe_ingredientsMaxAggregateInputType
  }

  export type Recipe_ingredientsGroupByOutputType = {
    id: string
    listing: string
    extracted_name: string
    embedding: string
    recipe_id: string
    _count: Recipe_ingredientsCountAggregateOutputType | null
    _min: Recipe_ingredientsMinAggregateOutputType | null
    _max: Recipe_ingredientsMaxAggregateOutputType | null
  }

  type GetRecipe_ingredientsGroupByPayload<T extends Recipe_ingredientsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Recipe_ingredientsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Recipe_ingredientsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Recipe_ingredientsGroupByOutputType[P]>
            : GetScalarType<T[P], Recipe_ingredientsGroupByOutputType[P]>
        }
      >
    >


  export type Recipe_ingredientsSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listing?: boolean
    extracted_name?: boolean
    embedding?: boolean
    recipe_id?: boolean
    recipes?: boolean | RecipesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipe_ingredients"]>

  export type Recipe_ingredientsSelectScalar = {
    id?: boolean
    listing?: boolean
    extracted_name?: boolean
    embedding?: boolean
    recipe_id?: boolean
  }

  export type Recipe_ingredientsInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    recipes?: boolean | RecipesDefaultArgs<ExtArgs>
  }


  export type $Recipe_ingredientsPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "Recipe_ingredients"
    objects: {
      recipes: Prisma.$RecipesPayload<ExtArgs>
    }
    scalars: $Extensions.GetResult<{
      /**
       * @zod.string.uuid()
       */
      id: string
      listing: string
      extracted_name: string
      embedding: string
      /**
       * @zod.string.uuid()
       */
      recipe_id: string
    }, ExtArgs["result"]["recipe_ingredients"]>
    composites: {}
  }


  type Recipe_ingredientsGetPayload<S extends boolean | null | undefined | Recipe_ingredientsDefaultArgs> = $Result.GetResult<Prisma.$Recipe_ingredientsPayload, S>

  type Recipe_ingredientsCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<Recipe_ingredientsFindManyArgs, 'select' | 'include'> & {
      select?: Recipe_ingredientsCountAggregateInputType | true
    }

  export interface Recipe_ingredientsDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Recipe_ingredients'], meta: { name: 'Recipe_ingredients' } }
    /**
     * Find zero or one Recipe_ingredients that matches the filter.
     * @param {Recipe_ingredientsFindUniqueArgs} args - Arguments to find a Recipe_ingredients
     * @example
     * // Get one Recipe_ingredients
     * const recipe_ingredients = await prisma.recipe_ingredients.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends Recipe_ingredientsFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, Recipe_ingredientsFindUniqueArgs<ExtArgs>>
    ): Prisma__Recipe_ingredientsClient<$Result.GetResult<Prisma.$Recipe_ingredientsPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Recipe_ingredients that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {Recipe_ingredientsFindUniqueOrThrowArgs} args - Arguments to find a Recipe_ingredients
     * @example
     * // Get one Recipe_ingredients
     * const recipe_ingredients = await prisma.recipe_ingredients.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends Recipe_ingredientsFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, Recipe_ingredientsFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__Recipe_ingredientsClient<$Result.GetResult<Prisma.$Recipe_ingredientsPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Recipe_ingredients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Recipe_ingredientsFindFirstArgs} args - Arguments to find a Recipe_ingredients
     * @example
     * // Get one Recipe_ingredients
     * const recipe_ingredients = await prisma.recipe_ingredients.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends Recipe_ingredientsFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, Recipe_ingredientsFindFirstArgs<ExtArgs>>
    ): Prisma__Recipe_ingredientsClient<$Result.GetResult<Prisma.$Recipe_ingredientsPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Recipe_ingredients that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Recipe_ingredientsFindFirstOrThrowArgs} args - Arguments to find a Recipe_ingredients
     * @example
     * // Get one Recipe_ingredients
     * const recipe_ingredients = await prisma.recipe_ingredients.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends Recipe_ingredientsFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, Recipe_ingredientsFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__Recipe_ingredientsClient<$Result.GetResult<Prisma.$Recipe_ingredientsPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Recipe_ingredients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Recipe_ingredientsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Recipe_ingredients
     * const recipe_ingredients = await prisma.recipe_ingredients.findMany()
     * 
     * // Get first 10 Recipe_ingredients
     * const recipe_ingredients = await prisma.recipe_ingredients.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recipe_ingredientsWithIdOnly = await prisma.recipe_ingredients.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends Recipe_ingredientsFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, Recipe_ingredientsFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Recipe_ingredientsPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Recipe_ingredients.
     * @param {Recipe_ingredientsCreateArgs} args - Arguments to create a Recipe_ingredients.
     * @example
     * // Create one Recipe_ingredients
     * const Recipe_ingredients = await prisma.recipe_ingredients.create({
     *   data: {
     *     // ... data to create a Recipe_ingredients
     *   }
     * })
     * 
    **/
    create<T extends Recipe_ingredientsCreateArgs<ExtArgs>>(
      args: SelectSubset<T, Recipe_ingredientsCreateArgs<ExtArgs>>
    ): Prisma__Recipe_ingredientsClient<$Result.GetResult<Prisma.$Recipe_ingredientsPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Recipe_ingredients.
     *     @param {Recipe_ingredientsCreateManyArgs} args - Arguments to create many Recipe_ingredients.
     *     @example
     *     // Create many Recipe_ingredients
     *     const recipe_ingredients = await prisma.recipe_ingredients.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends Recipe_ingredientsCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, Recipe_ingredientsCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Recipe_ingredients.
     * @param {Recipe_ingredientsDeleteArgs} args - Arguments to delete one Recipe_ingredients.
     * @example
     * // Delete one Recipe_ingredients
     * const Recipe_ingredients = await prisma.recipe_ingredients.delete({
     *   where: {
     *     // ... filter to delete one Recipe_ingredients
     *   }
     * })
     * 
    **/
    delete<T extends Recipe_ingredientsDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, Recipe_ingredientsDeleteArgs<ExtArgs>>
    ): Prisma__Recipe_ingredientsClient<$Result.GetResult<Prisma.$Recipe_ingredientsPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Recipe_ingredients.
     * @param {Recipe_ingredientsUpdateArgs} args - Arguments to update one Recipe_ingredients.
     * @example
     * // Update one Recipe_ingredients
     * const recipe_ingredients = await prisma.recipe_ingredients.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends Recipe_ingredientsUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, Recipe_ingredientsUpdateArgs<ExtArgs>>
    ): Prisma__Recipe_ingredientsClient<$Result.GetResult<Prisma.$Recipe_ingredientsPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Recipe_ingredients.
     * @param {Recipe_ingredientsDeleteManyArgs} args - Arguments to filter Recipe_ingredients to delete.
     * @example
     * // Delete a few Recipe_ingredients
     * const { count } = await prisma.recipe_ingredients.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends Recipe_ingredientsDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, Recipe_ingredientsDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recipe_ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Recipe_ingredientsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Recipe_ingredients
     * const recipe_ingredients = await prisma.recipe_ingredients.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends Recipe_ingredientsUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, Recipe_ingredientsUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Recipe_ingredients.
     * @param {Recipe_ingredientsUpsertArgs} args - Arguments to update or create a Recipe_ingredients.
     * @example
     * // Update or create a Recipe_ingredients
     * const recipe_ingredients = await prisma.recipe_ingredients.upsert({
     *   create: {
     *     // ... data to create a Recipe_ingredients
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Recipe_ingredients we want to update
     *   }
     * })
    **/
    upsert<T extends Recipe_ingredientsUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, Recipe_ingredientsUpsertArgs<ExtArgs>>
    ): Prisma__Recipe_ingredientsClient<$Result.GetResult<Prisma.$Recipe_ingredientsPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Recipe_ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Recipe_ingredientsCountArgs} args - Arguments to filter Recipe_ingredients to count.
     * @example
     * // Count the number of Recipe_ingredients
     * const count = await prisma.recipe_ingredients.count({
     *   where: {
     *     // ... the filter for the Recipe_ingredients we want to count
     *   }
     * })
    **/
    count<T extends Recipe_ingredientsCountArgs>(
      args?: Subset<T, Recipe_ingredientsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Recipe_ingredientsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Recipe_ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Recipe_ingredientsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Recipe_ingredientsAggregateArgs>(args: Subset<T, Recipe_ingredientsAggregateArgs>): Prisma.PrismaPromise<GetRecipe_ingredientsAggregateType<T>>

    /**
     * Group by Recipe_ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Recipe_ingredientsGroupByArgs} args - Group by arguments.
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
      T extends Recipe_ingredientsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Recipe_ingredientsGroupByArgs['orderBy'] }
        : { orderBy?: Recipe_ingredientsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, Recipe_ingredientsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecipe_ingredientsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Recipe_ingredients model
   */
  readonly fields: Recipe_ingredientsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Recipe_ingredients.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Recipe_ingredientsClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    recipes<T extends RecipesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RecipesDefaultArgs<ExtArgs>>): Prisma__RecipesClient<$Result.GetResult<Prisma.$RecipesPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

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
   * Fields of the Recipe_ingredients model
   */ 
  interface Recipe_ingredientsFieldRefs {
    readonly id: FieldRef<"Recipe_ingredients", 'String'>
    readonly listing: FieldRef<"Recipe_ingredients", 'String'>
    readonly extracted_name: FieldRef<"Recipe_ingredients", 'String'>
    readonly embedding: FieldRef<"Recipe_ingredients", 'String'>
    readonly recipe_id: FieldRef<"Recipe_ingredients", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Recipe_ingredients findUnique
   */
  export type Recipe_ingredientsFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe_ingredients
     */
    select?: Recipe_ingredientsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Recipe_ingredientsInclude<ExtArgs> | null
    /**
     * Filter, which Recipe_ingredients to fetch.
     */
    where: Recipe_ingredientsWhereUniqueInput
  }


  /**
   * Recipe_ingredients findUniqueOrThrow
   */
  export type Recipe_ingredientsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe_ingredients
     */
    select?: Recipe_ingredientsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Recipe_ingredientsInclude<ExtArgs> | null
    /**
     * Filter, which Recipe_ingredients to fetch.
     */
    where: Recipe_ingredientsWhereUniqueInput
  }


  /**
   * Recipe_ingredients findFirst
   */
  export type Recipe_ingredientsFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe_ingredients
     */
    select?: Recipe_ingredientsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Recipe_ingredientsInclude<ExtArgs> | null
    /**
     * Filter, which Recipe_ingredients to fetch.
     */
    where?: Recipe_ingredientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipe_ingredients to fetch.
     */
    orderBy?: Recipe_ingredientsOrderByWithRelationInput | Recipe_ingredientsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recipe_ingredients.
     */
    cursor?: Recipe_ingredientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipe_ingredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipe_ingredients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recipe_ingredients.
     */
    distinct?: Recipe_ingredientsScalarFieldEnum | Recipe_ingredientsScalarFieldEnum[]
  }


  /**
   * Recipe_ingredients findFirstOrThrow
   */
  export type Recipe_ingredientsFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe_ingredients
     */
    select?: Recipe_ingredientsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Recipe_ingredientsInclude<ExtArgs> | null
    /**
     * Filter, which Recipe_ingredients to fetch.
     */
    where?: Recipe_ingredientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipe_ingredients to fetch.
     */
    orderBy?: Recipe_ingredientsOrderByWithRelationInput | Recipe_ingredientsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recipe_ingredients.
     */
    cursor?: Recipe_ingredientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipe_ingredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipe_ingredients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recipe_ingredients.
     */
    distinct?: Recipe_ingredientsScalarFieldEnum | Recipe_ingredientsScalarFieldEnum[]
  }


  /**
   * Recipe_ingredients findMany
   */
  export type Recipe_ingredientsFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe_ingredients
     */
    select?: Recipe_ingredientsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Recipe_ingredientsInclude<ExtArgs> | null
    /**
     * Filter, which Recipe_ingredients to fetch.
     */
    where?: Recipe_ingredientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipe_ingredients to fetch.
     */
    orderBy?: Recipe_ingredientsOrderByWithRelationInput | Recipe_ingredientsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Recipe_ingredients.
     */
    cursor?: Recipe_ingredientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipe_ingredients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipe_ingredients.
     */
    skip?: number
    distinct?: Recipe_ingredientsScalarFieldEnum | Recipe_ingredientsScalarFieldEnum[]
  }


  /**
   * Recipe_ingredients create
   */
  export type Recipe_ingredientsCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe_ingredients
     */
    select?: Recipe_ingredientsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Recipe_ingredientsInclude<ExtArgs> | null
    /**
     * The data needed to create a Recipe_ingredients.
     */
    data: XOR<Recipe_ingredientsCreateInput, Recipe_ingredientsUncheckedCreateInput>
  }


  /**
   * Recipe_ingredients createMany
   */
  export type Recipe_ingredientsCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Recipe_ingredients.
     */
    data: Recipe_ingredientsCreateManyInput | Recipe_ingredientsCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Recipe_ingredients update
   */
  export type Recipe_ingredientsUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe_ingredients
     */
    select?: Recipe_ingredientsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Recipe_ingredientsInclude<ExtArgs> | null
    /**
     * The data needed to update a Recipe_ingredients.
     */
    data: XOR<Recipe_ingredientsUpdateInput, Recipe_ingredientsUncheckedUpdateInput>
    /**
     * Choose, which Recipe_ingredients to update.
     */
    where: Recipe_ingredientsWhereUniqueInput
  }


  /**
   * Recipe_ingredients updateMany
   */
  export type Recipe_ingredientsUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Recipe_ingredients.
     */
    data: XOR<Recipe_ingredientsUpdateManyMutationInput, Recipe_ingredientsUncheckedUpdateManyInput>
    /**
     * Filter which Recipe_ingredients to update
     */
    where?: Recipe_ingredientsWhereInput
  }


  /**
   * Recipe_ingredients upsert
   */
  export type Recipe_ingredientsUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe_ingredients
     */
    select?: Recipe_ingredientsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Recipe_ingredientsInclude<ExtArgs> | null
    /**
     * The filter to search for the Recipe_ingredients to update in case it exists.
     */
    where: Recipe_ingredientsWhereUniqueInput
    /**
     * In case the Recipe_ingredients found by the `where` argument doesn't exist, create a new Recipe_ingredients with this data.
     */
    create: XOR<Recipe_ingredientsCreateInput, Recipe_ingredientsUncheckedCreateInput>
    /**
     * In case the Recipe_ingredients was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Recipe_ingredientsUpdateInput, Recipe_ingredientsUncheckedUpdateInput>
  }


  /**
   * Recipe_ingredients delete
   */
  export type Recipe_ingredientsDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe_ingredients
     */
    select?: Recipe_ingredientsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Recipe_ingredientsInclude<ExtArgs> | null
    /**
     * Filter which Recipe_ingredients to delete.
     */
    where: Recipe_ingredientsWhereUniqueInput
  }


  /**
   * Recipe_ingredients deleteMany
   */
  export type Recipe_ingredientsDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recipe_ingredients to delete
     */
    where?: Recipe_ingredientsWhereInput
  }


  /**
   * Recipe_ingredients without action
   */
  export type Recipe_ingredientsDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe_ingredients
     */
    select?: Recipe_ingredientsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Recipe_ingredientsInclude<ExtArgs> | null
  }



  /**
   * Model Recipes
   */

  export type AggregateRecipes = {
    _count: RecipesCountAggregateOutputType | null
    _min: RecipesMinAggregateOutputType | null
    _max: RecipesMaxAggregateOutputType | null
  }

  export type RecipesMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    url: string | null
    user_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type RecipesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    url: string | null
    user_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type RecipesCountAggregateOutputType = {
    id: number
    name: number
    description: number
    url: number
    user_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type RecipesMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    url?: true
    user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type RecipesMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    url?: true
    user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type RecipesCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    url?: true
    user_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type RecipesAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recipes to aggregate.
     */
    where?: RecipesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipesOrderByWithRelationInput | RecipesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecipesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Recipes
    **/
    _count?: true | RecipesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecipesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecipesMaxAggregateInputType
  }

  export type GetRecipesAggregateType<T extends RecipesAggregateArgs> = {
        [P in keyof T & keyof AggregateRecipes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecipes[P]>
      : GetScalarType<T[P], AggregateRecipes[P]>
  }




  export type RecipesGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: RecipesWhereInput
    orderBy?: RecipesOrderByWithAggregationInput | RecipesOrderByWithAggregationInput[]
    by: RecipesScalarFieldEnum[] | RecipesScalarFieldEnum
    having?: RecipesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecipesCountAggregateInputType | true
    _min?: RecipesMinAggregateInputType
    _max?: RecipesMaxAggregateInputType
  }

  export type RecipesGroupByOutputType = {
    id: string
    name: string
    description: string
    url: string
    user_id: string
    created_at: Date
    updated_at: Date
    _count: RecipesCountAggregateOutputType | null
    _min: RecipesMinAggregateOutputType | null
    _max: RecipesMaxAggregateOutputType | null
  }

  type GetRecipesGroupByPayload<T extends RecipesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecipesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecipesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecipesGroupByOutputType[P]>
            : GetScalarType<T[P], RecipesGroupByOutputType[P]>
        }
      >
    >


  export type RecipesSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    url?: boolean
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    recipe_ingredients?: boolean | Recipes$recipe_ingredientsArgs<ExtArgs>
    users?: boolean | UsersDefaultArgs<ExtArgs>
    _count?: boolean | RecipesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipes"]>

  export type RecipesSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    url?: boolean
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type RecipesInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    recipe_ingredients?: boolean | Recipes$recipe_ingredientsArgs<ExtArgs>
    users?: boolean | UsersDefaultArgs<ExtArgs>
    _count?: boolean | RecipesCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $RecipesPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "Recipes"
    objects: {
      recipe_ingredients: Prisma.$Recipe_ingredientsPayload<ExtArgs>[]
      users: Prisma.$UsersPayload<ExtArgs>
    }
    scalars: $Extensions.GetResult<{
      /**
       * @zod.string.uuid()
       */
      id: string
      name: string
      description: string
      url: string
      user_id: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["recipes"]>
    composites: {}
  }


  type RecipesGetPayload<S extends boolean | null | undefined | RecipesDefaultArgs> = $Result.GetResult<Prisma.$RecipesPayload, S>

  type RecipesCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<RecipesFindManyArgs, 'select' | 'include'> & {
      select?: RecipesCountAggregateInputType | true
    }

  export interface RecipesDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Recipes'], meta: { name: 'Recipes' } }
    /**
     * Find zero or one Recipes that matches the filter.
     * @param {RecipesFindUniqueArgs} args - Arguments to find a Recipes
     * @example
     * // Get one Recipes
     * const recipes = await prisma.recipes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends RecipesFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, RecipesFindUniqueArgs<ExtArgs>>
    ): Prisma__RecipesClient<$Result.GetResult<Prisma.$RecipesPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Recipes that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {RecipesFindUniqueOrThrowArgs} args - Arguments to find a Recipes
     * @example
     * // Get one Recipes
     * const recipes = await prisma.recipes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends RecipesFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RecipesFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__RecipesClient<$Result.GetResult<Prisma.$RecipesPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Recipes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipesFindFirstArgs} args - Arguments to find a Recipes
     * @example
     * // Get one Recipes
     * const recipes = await prisma.recipes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends RecipesFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, RecipesFindFirstArgs<ExtArgs>>
    ): Prisma__RecipesClient<$Result.GetResult<Prisma.$RecipesPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Recipes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipesFindFirstOrThrowArgs} args - Arguments to find a Recipes
     * @example
     * // Get one Recipes
     * const recipes = await prisma.recipes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends RecipesFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RecipesFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__RecipesClient<$Result.GetResult<Prisma.$RecipesPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Recipes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Recipes
     * const recipes = await prisma.recipes.findMany()
     * 
     * // Get first 10 Recipes
     * const recipes = await prisma.recipes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recipesWithIdOnly = await prisma.recipes.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends RecipesFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RecipesFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipesPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Recipes.
     * @param {RecipesCreateArgs} args - Arguments to create a Recipes.
     * @example
     * // Create one Recipes
     * const Recipes = await prisma.recipes.create({
     *   data: {
     *     // ... data to create a Recipes
     *   }
     * })
     * 
    **/
    create<T extends RecipesCreateArgs<ExtArgs>>(
      args: SelectSubset<T, RecipesCreateArgs<ExtArgs>>
    ): Prisma__RecipesClient<$Result.GetResult<Prisma.$RecipesPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Recipes.
     *     @param {RecipesCreateManyArgs} args - Arguments to create many Recipes.
     *     @example
     *     // Create many Recipes
     *     const recipes = await prisma.recipes.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends RecipesCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RecipesCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Recipes.
     * @param {RecipesDeleteArgs} args - Arguments to delete one Recipes.
     * @example
     * // Delete one Recipes
     * const Recipes = await prisma.recipes.delete({
     *   where: {
     *     // ... filter to delete one Recipes
     *   }
     * })
     * 
    **/
    delete<T extends RecipesDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, RecipesDeleteArgs<ExtArgs>>
    ): Prisma__RecipesClient<$Result.GetResult<Prisma.$RecipesPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Recipes.
     * @param {RecipesUpdateArgs} args - Arguments to update one Recipes.
     * @example
     * // Update one Recipes
     * const recipes = await prisma.recipes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends RecipesUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, RecipesUpdateArgs<ExtArgs>>
    ): Prisma__RecipesClient<$Result.GetResult<Prisma.$RecipesPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Recipes.
     * @param {RecipesDeleteManyArgs} args - Arguments to filter Recipes to delete.
     * @example
     * // Delete a few Recipes
     * const { count } = await prisma.recipes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends RecipesDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RecipesDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Recipes
     * const recipes = await prisma.recipes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends RecipesUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, RecipesUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Recipes.
     * @param {RecipesUpsertArgs} args - Arguments to update or create a Recipes.
     * @example
     * // Update or create a Recipes
     * const recipes = await prisma.recipes.upsert({
     *   create: {
     *     // ... data to create a Recipes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Recipes we want to update
     *   }
     * })
    **/
    upsert<T extends RecipesUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, RecipesUpsertArgs<ExtArgs>>
    ): Prisma__RecipesClient<$Result.GetResult<Prisma.$RecipesPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Recipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipesCountArgs} args - Arguments to filter Recipes to count.
     * @example
     * // Count the number of Recipes
     * const count = await prisma.recipes.count({
     *   where: {
     *     // ... the filter for the Recipes we want to count
     *   }
     * })
    **/
    count<T extends RecipesCountArgs>(
      args?: Subset<T, RecipesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecipesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Recipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RecipesAggregateArgs>(args: Subset<T, RecipesAggregateArgs>): Prisma.PrismaPromise<GetRecipesAggregateType<T>>

    /**
     * Group by Recipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipesGroupByArgs} args - Group by arguments.
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
      T extends RecipesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecipesGroupByArgs['orderBy'] }
        : { orderBy?: RecipesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RecipesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecipesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Recipes model
   */
  readonly fields: RecipesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Recipes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecipesClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    recipe_ingredients<T extends Recipes$recipe_ingredientsArgs<ExtArgs> = {}>(args?: Subset<T, Recipes$recipe_ingredientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Recipe_ingredientsPayload<ExtArgs>, T, 'findMany'> | Null>;

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
   * Fields of the Recipes model
   */ 
  interface RecipesFieldRefs {
    readonly id: FieldRef<"Recipes", 'String'>
    readonly name: FieldRef<"Recipes", 'String'>
    readonly description: FieldRef<"Recipes", 'String'>
    readonly url: FieldRef<"Recipes", 'String'>
    readonly user_id: FieldRef<"Recipes", 'String'>
    readonly created_at: FieldRef<"Recipes", 'DateTime'>
    readonly updated_at: FieldRef<"Recipes", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * Recipes findUnique
   */
  export type RecipesFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipes
     */
    select?: RecipesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RecipesInclude<ExtArgs> | null
    /**
     * Filter, which Recipes to fetch.
     */
    where: RecipesWhereUniqueInput
  }


  /**
   * Recipes findUniqueOrThrow
   */
  export type RecipesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipes
     */
    select?: RecipesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RecipesInclude<ExtArgs> | null
    /**
     * Filter, which Recipes to fetch.
     */
    where: RecipesWhereUniqueInput
  }


  /**
   * Recipes findFirst
   */
  export type RecipesFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipes
     */
    select?: RecipesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RecipesInclude<ExtArgs> | null
    /**
     * Filter, which Recipes to fetch.
     */
    where?: RecipesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipesOrderByWithRelationInput | RecipesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recipes.
     */
    cursor?: RecipesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recipes.
     */
    distinct?: RecipesScalarFieldEnum | RecipesScalarFieldEnum[]
  }


  /**
   * Recipes findFirstOrThrow
   */
  export type RecipesFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipes
     */
    select?: RecipesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RecipesInclude<ExtArgs> | null
    /**
     * Filter, which Recipes to fetch.
     */
    where?: RecipesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipesOrderByWithRelationInput | RecipesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recipes.
     */
    cursor?: RecipesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recipes.
     */
    distinct?: RecipesScalarFieldEnum | RecipesScalarFieldEnum[]
  }


  /**
   * Recipes findMany
   */
  export type RecipesFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipes
     */
    select?: RecipesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RecipesInclude<ExtArgs> | null
    /**
     * Filter, which Recipes to fetch.
     */
    where?: RecipesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipesOrderByWithRelationInput | RecipesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Recipes.
     */
    cursor?: RecipesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    distinct?: RecipesScalarFieldEnum | RecipesScalarFieldEnum[]
  }


  /**
   * Recipes create
   */
  export type RecipesCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipes
     */
    select?: RecipesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RecipesInclude<ExtArgs> | null
    /**
     * The data needed to create a Recipes.
     */
    data: XOR<RecipesCreateInput, RecipesUncheckedCreateInput>
  }


  /**
   * Recipes createMany
   */
  export type RecipesCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Recipes.
     */
    data: RecipesCreateManyInput | RecipesCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Recipes update
   */
  export type RecipesUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipes
     */
    select?: RecipesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RecipesInclude<ExtArgs> | null
    /**
     * The data needed to update a Recipes.
     */
    data: XOR<RecipesUpdateInput, RecipesUncheckedUpdateInput>
    /**
     * Choose, which Recipes to update.
     */
    where: RecipesWhereUniqueInput
  }


  /**
   * Recipes updateMany
   */
  export type RecipesUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Recipes.
     */
    data: XOR<RecipesUpdateManyMutationInput, RecipesUncheckedUpdateManyInput>
    /**
     * Filter which Recipes to update
     */
    where?: RecipesWhereInput
  }


  /**
   * Recipes upsert
   */
  export type RecipesUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipes
     */
    select?: RecipesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RecipesInclude<ExtArgs> | null
    /**
     * The filter to search for the Recipes to update in case it exists.
     */
    where: RecipesWhereUniqueInput
    /**
     * In case the Recipes found by the `where` argument doesn't exist, create a new Recipes with this data.
     */
    create: XOR<RecipesCreateInput, RecipesUncheckedCreateInput>
    /**
     * In case the Recipes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecipesUpdateInput, RecipesUncheckedUpdateInput>
  }


  /**
   * Recipes delete
   */
  export type RecipesDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipes
     */
    select?: RecipesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RecipesInclude<ExtArgs> | null
    /**
     * Filter which Recipes to delete.
     */
    where: RecipesWhereUniqueInput
  }


  /**
   * Recipes deleteMany
   */
  export type RecipesDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recipes to delete
     */
    where?: RecipesWhereInput
  }


  /**
   * Recipes.recipe_ingredients
   */
  export type Recipes$recipe_ingredientsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe_ingredients
     */
    select?: Recipe_ingredientsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Recipe_ingredientsInclude<ExtArgs> | null
    where?: Recipe_ingredientsWhereInput
    orderBy?: Recipe_ingredientsOrderByWithRelationInput | Recipe_ingredientsOrderByWithRelationInput[]
    cursor?: Recipe_ingredientsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Recipe_ingredientsScalarFieldEnum | Recipe_ingredientsScalarFieldEnum[]
  }


  /**
   * Recipes without action
   */
  export type RecipesDefaultArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipes
     */
    select?: RecipesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RecipesInclude<ExtArgs> | null
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
    ingredient_events?: boolean | Users$ingredient_eventsArgs<ExtArgs>
    ingredients_photo_uploads?: boolean | Users$ingredients_photo_uploadsArgs<ExtArgs>
    recipes?: boolean | Users$recipesArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type UsersSelectScalar = {
    id?: boolean
    name?: boolean
    avatar_url?: boolean
  }

  export type UsersInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    ingredient_events?: boolean | Users$ingredient_eventsArgs<ExtArgs>
    ingredients_photo_uploads?: boolean | Users$ingredients_photo_uploadsArgs<ExtArgs>
    recipes?: boolean | Users$recipesArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $UsersPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    name: "Users"
    objects: {
      ingredient_events: Prisma.$Ingredient_eventsPayload<ExtArgs>[]
      ingredients_photo_uploads: Prisma.$Ingredients_photo_uploadsPayload<ExtArgs>[]
      recipes: Prisma.$RecipesPayload<ExtArgs>[]
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

    ingredient_events<T extends Users$ingredient_eventsArgs<ExtArgs> = {}>(args?: Subset<T, Users$ingredient_eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Ingredient_eventsPayload<ExtArgs>, T, 'findMany'> | Null>;

    ingredients_photo_uploads<T extends Users$ingredients_photo_uploadsArgs<ExtArgs> = {}>(args?: Subset<T, Users$ingredients_photo_uploadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Ingredients_photo_uploadsPayload<ExtArgs>, T, 'findMany'> | Null>;

    recipes<T extends Users$recipesArgs<ExtArgs> = {}>(args?: Subset<T, Users$recipesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipesPayload<ExtArgs>, T, 'findMany'> | Null>;

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
   * Users.ingredient_events
   */
  export type Users$ingredient_eventsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient_events
     */
    select?: Ingredient_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Ingredient_eventsInclude<ExtArgs> | null
    where?: Ingredient_eventsWhereInput
    orderBy?: Ingredient_eventsOrderByWithRelationInput | Ingredient_eventsOrderByWithRelationInput[]
    cursor?: Ingredient_eventsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Ingredient_eventsScalarFieldEnum | Ingredient_eventsScalarFieldEnum[]
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
   * Users.recipes
   */
  export type Users$recipesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipes
     */
    select?: RecipesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RecipesInclude<ExtArgs> | null
    where?: RecipesWhereInput
    orderBy?: RecipesOrderByWithRelationInput | RecipesOrderByWithRelationInput[]
    cursor?: RecipesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecipesScalarFieldEnum | RecipesScalarFieldEnum[]
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


  export const Ingredient_eventsScalarFieldEnum: {
    id: 'id',
    ingredient_id: 'ingredient_id',
    user_id: 'user_id',
    timestamp: 'timestamp',
    from_values: 'from_values',
    to_values: 'to_values'
  };

  export type Ingredient_eventsScalarFieldEnum = (typeof Ingredient_eventsScalarFieldEnum)[keyof typeof Ingredient_eventsScalarFieldEnum]


  export const IngredientsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    is_reviewed: 'is_reviewed',
    embedding: 'embedding',
    tracking_type: 'tracking_type',
    fill_level: 'fill_level',
    count: 'count',
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


  export const Recipe_ingredientsScalarFieldEnum: {
    id: 'id',
    listing: 'listing',
    extracted_name: 'extracted_name',
    embedding: 'embedding',
    recipe_id: 'recipe_id'
  };

  export type Recipe_ingredientsScalarFieldEnum = (typeof Recipe_ingredientsScalarFieldEnum)[keyof typeof Recipe_ingredientsScalarFieldEnum]


  export const RecipesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    url: 'url',
    user_id: 'user_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type RecipesScalarFieldEnum = (typeof RecipesScalarFieldEnum)[keyof typeof RecipesScalarFieldEnum]


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
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'ingredients_tracking_type'
   */
  export type Enumingredients_tracking_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ingredients_tracking_type'>
    


  /**
   * Reference to a field of type 'ingredients_tracking_type[]'
   */
  export type ListEnumingredients_tracking_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ingredients_tracking_type[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'ingredient_photo_upload_state'
   */
  export type Enumingredient_photo_upload_stateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ingredient_photo_upload_state'>
    


  /**
   * Reference to a field of type 'ingredient_photo_upload_state[]'
   */
  export type ListEnumingredient_photo_upload_stateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ingredient_photo_upload_state[]'>
    


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


  export type Ingredient_eventsWhereInput = {
    AND?: Ingredient_eventsWhereInput | Ingredient_eventsWhereInput[]
    OR?: Ingredient_eventsWhereInput[]
    NOT?: Ingredient_eventsWhereInput | Ingredient_eventsWhereInput[]
    id?: UuidFilter<"Ingredient_events"> | string
    ingredient_id?: UuidFilter<"Ingredient_events"> | string
    user_id?: StringFilter<"Ingredient_events"> | string
    timestamp?: DateTimeFilter<"Ingredient_events"> | Date | string
    from_values?: JsonNullableFilter<"Ingredient_events">
    to_values?: JsonNullableFilter<"Ingredient_events">
    ingredients?: XOR<IngredientsRelationFilter, IngredientsWhereInput>
    users?: XOR<UsersRelationFilter, UsersWhereInput>
  }

  export type Ingredient_eventsOrderByWithRelationInput = {
    id?: SortOrder
    ingredient_id?: SortOrder
    user_id?: SortOrder
    timestamp?: SortOrder
    from_values?: SortOrderInput | SortOrder
    to_values?: SortOrderInput | SortOrder
    ingredients?: IngredientsOrderByWithRelationInput
    users?: UsersOrderByWithRelationInput
  }

  export type Ingredient_eventsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: Ingredient_eventsWhereInput | Ingredient_eventsWhereInput[]
    OR?: Ingredient_eventsWhereInput[]
    NOT?: Ingredient_eventsWhereInput | Ingredient_eventsWhereInput[]
    ingredient_id?: UuidFilter<"Ingredient_events"> | string
    user_id?: StringFilter<"Ingredient_events"> | string
    timestamp?: DateTimeFilter<"Ingredient_events"> | Date | string
    from_values?: JsonNullableFilter<"Ingredient_events">
    to_values?: JsonNullableFilter<"Ingredient_events">
    ingredients?: XOR<IngredientsRelationFilter, IngredientsWhereInput>
    users?: XOR<UsersRelationFilter, UsersWhereInput>
  }, "id">

  export type Ingredient_eventsOrderByWithAggregationInput = {
    id?: SortOrder
    ingredient_id?: SortOrder
    user_id?: SortOrder
    timestamp?: SortOrder
    from_values?: SortOrderInput | SortOrder
    to_values?: SortOrderInput | SortOrder
    _count?: Ingredient_eventsCountOrderByAggregateInput
    _max?: Ingredient_eventsMaxOrderByAggregateInput
    _min?: Ingredient_eventsMinOrderByAggregateInput
  }

  export type Ingredient_eventsScalarWhereWithAggregatesInput = {
    AND?: Ingredient_eventsScalarWhereWithAggregatesInput | Ingredient_eventsScalarWhereWithAggregatesInput[]
    OR?: Ingredient_eventsScalarWhereWithAggregatesInput[]
    NOT?: Ingredient_eventsScalarWhereWithAggregatesInput | Ingredient_eventsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Ingredient_events"> | string
    ingredient_id?: UuidWithAggregatesFilter<"Ingredient_events"> | string
    user_id?: StringWithAggregatesFilter<"Ingredient_events"> | string
    timestamp?: DateTimeWithAggregatesFilter<"Ingredient_events"> | Date | string
    from_values?: JsonNullableWithAggregatesFilter<"Ingredient_events">
    to_values?: JsonNullableWithAggregatesFilter<"Ingredient_events">
  }

  export type IngredientsWhereInput = {
    AND?: IngredientsWhereInput | IngredientsWhereInput[]
    OR?: IngredientsWhereInput[]
    NOT?: IngredientsWhereInput | IngredientsWhereInput[]
    id?: UuidFilter<"Ingredients"> | string
    name?: StringFilter<"Ingredients"> | string
    description?: StringFilter<"Ingredients"> | string
    is_reviewed?: BoolFilter<"Ingredients"> | boolean
    embedding?: StringFilter<"Ingredients"> | string
    tracking_type?: Enumingredients_tracking_typeNullableFilter<"Ingredients"> | $Enums.ingredients_tracking_type | null
    fill_level?: IntFilter<"Ingredients"> | number
    count?: IntFilter<"Ingredients"> | number
    shelf_life_months?: IntFilter<"Ingredients"> | number
    fill_date?: StringFilter<"Ingredients"> | string
    is_ground?: BoolNullableFilter<"Ingredients"> | boolean | null
    ingredients_photo_uploads_id?: UuidNullableFilter<"Ingredients"> | string | null
    ingredient_events?: Ingredient_eventsListRelationFilter
    ingredients_photo_uploads?: XOR<Ingredients_photo_uploadsNullableRelationFilter, Ingredients_photo_uploadsWhereInput> | null
  }

  export type IngredientsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    is_reviewed?: SortOrder
    embedding?: SortOrder
    tracking_type?: SortOrderInput | SortOrder
    fill_level?: SortOrder
    count?: SortOrder
    shelf_life_months?: SortOrder
    fill_date?: SortOrder
    is_ground?: SortOrderInput | SortOrder
    ingredients_photo_uploads_id?: SortOrderInput | SortOrder
    ingredient_events?: Ingredient_eventsOrderByRelationAggregateInput
    ingredients_photo_uploads?: Ingredients_photo_uploadsOrderByWithRelationInput
  }

  export type IngredientsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: IngredientsWhereInput | IngredientsWhereInput[]
    OR?: IngredientsWhereInput[]
    NOT?: IngredientsWhereInput | IngredientsWhereInput[]
    name?: StringFilter<"Ingredients"> | string
    description?: StringFilter<"Ingredients"> | string
    is_reviewed?: BoolFilter<"Ingredients"> | boolean
    embedding?: StringFilter<"Ingredients"> | string
    tracking_type?: Enumingredients_tracking_typeNullableFilter<"Ingredients"> | $Enums.ingredients_tracking_type | null
    fill_level?: IntFilter<"Ingredients"> | number
    count?: IntFilter<"Ingredients"> | number
    shelf_life_months?: IntFilter<"Ingredients"> | number
    fill_date?: StringFilter<"Ingredients"> | string
    is_ground?: BoolNullableFilter<"Ingredients"> | boolean | null
    ingredients_photo_uploads_id?: UuidNullableFilter<"Ingredients"> | string | null
    ingredient_events?: Ingredient_eventsListRelationFilter
    ingredients_photo_uploads?: XOR<Ingredients_photo_uploadsNullableRelationFilter, Ingredients_photo_uploadsWhereInput> | null
  }, "id">

  export type IngredientsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    is_reviewed?: SortOrder
    embedding?: SortOrder
    tracking_type?: SortOrderInput | SortOrder
    fill_level?: SortOrder
    count?: SortOrder
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
    description?: StringWithAggregatesFilter<"Ingredients"> | string
    is_reviewed?: BoolWithAggregatesFilter<"Ingredients"> | boolean
    embedding?: StringWithAggregatesFilter<"Ingredients"> | string
    tracking_type?: Enumingredients_tracking_typeNullableWithAggregatesFilter<"Ingredients"> | $Enums.ingredients_tracking_type | null
    fill_level?: IntWithAggregatesFilter<"Ingredients"> | number
    count?: IntWithAggregatesFilter<"Ingredients"> | number
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
    state?: Enumingredient_photo_upload_stateFilter<"Ingredients_photo_uploads"> | $Enums.ingredient_photo_upload_state
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
    state?: Enumingredient_photo_upload_stateFilter<"Ingredients_photo_uploads"> | $Enums.ingredient_photo_upload_state
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
    state?: Enumingredient_photo_upload_stateWithAggregatesFilter<"Ingredients_photo_uploads"> | $Enums.ingredient_photo_upload_state
    upload_duration_sec?: FloatNullableWithAggregatesFilter<"Ingredients_photo_uploads"> | number | null
    ai_processing_duration_sec?: FloatNullableWithAggregatesFilter<"Ingredients_photo_uploads"> | number | null
    photo_url?: StringNullableWithAggregatesFilter<"Ingredients_photo_uploads"> | string | null
  }

  export type Recipe_ingredientsWhereInput = {
    AND?: Recipe_ingredientsWhereInput | Recipe_ingredientsWhereInput[]
    OR?: Recipe_ingredientsWhereInput[]
    NOT?: Recipe_ingredientsWhereInput | Recipe_ingredientsWhereInput[]
    id?: UuidFilter<"Recipe_ingredients"> | string
    listing?: StringFilter<"Recipe_ingredients"> | string
    extracted_name?: StringFilter<"Recipe_ingredients"> | string
    embedding?: StringFilter<"Recipe_ingredients"> | string
    recipe_id?: UuidFilter<"Recipe_ingredients"> | string
    recipes?: XOR<RecipesRelationFilter, RecipesWhereInput>
  }

  export type Recipe_ingredientsOrderByWithRelationInput = {
    id?: SortOrder
    listing?: SortOrder
    extracted_name?: SortOrder
    embedding?: SortOrder
    recipe_id?: SortOrder
    recipes?: RecipesOrderByWithRelationInput
  }

  export type Recipe_ingredientsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: Recipe_ingredientsWhereInput | Recipe_ingredientsWhereInput[]
    OR?: Recipe_ingredientsWhereInput[]
    NOT?: Recipe_ingredientsWhereInput | Recipe_ingredientsWhereInput[]
    listing?: StringFilter<"Recipe_ingredients"> | string
    extracted_name?: StringFilter<"Recipe_ingredients"> | string
    embedding?: StringFilter<"Recipe_ingredients"> | string
    recipe_id?: UuidFilter<"Recipe_ingredients"> | string
    recipes?: XOR<RecipesRelationFilter, RecipesWhereInput>
  }, "id">

  export type Recipe_ingredientsOrderByWithAggregationInput = {
    id?: SortOrder
    listing?: SortOrder
    extracted_name?: SortOrder
    embedding?: SortOrder
    recipe_id?: SortOrder
    _count?: Recipe_ingredientsCountOrderByAggregateInput
    _max?: Recipe_ingredientsMaxOrderByAggregateInput
    _min?: Recipe_ingredientsMinOrderByAggregateInput
  }

  export type Recipe_ingredientsScalarWhereWithAggregatesInput = {
    AND?: Recipe_ingredientsScalarWhereWithAggregatesInput | Recipe_ingredientsScalarWhereWithAggregatesInput[]
    OR?: Recipe_ingredientsScalarWhereWithAggregatesInput[]
    NOT?: Recipe_ingredientsScalarWhereWithAggregatesInput | Recipe_ingredientsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Recipe_ingredients"> | string
    listing?: StringWithAggregatesFilter<"Recipe_ingredients"> | string
    extracted_name?: StringWithAggregatesFilter<"Recipe_ingredients"> | string
    embedding?: StringWithAggregatesFilter<"Recipe_ingredients"> | string
    recipe_id?: UuidWithAggregatesFilter<"Recipe_ingredients"> | string
  }

  export type RecipesWhereInput = {
    AND?: RecipesWhereInput | RecipesWhereInput[]
    OR?: RecipesWhereInput[]
    NOT?: RecipesWhereInput | RecipesWhereInput[]
    id?: UuidFilter<"Recipes"> | string
    name?: StringFilter<"Recipes"> | string
    description?: StringFilter<"Recipes"> | string
    url?: StringFilter<"Recipes"> | string
    user_id?: StringFilter<"Recipes"> | string
    created_at?: DateTimeFilter<"Recipes"> | Date | string
    updated_at?: DateTimeFilter<"Recipes"> | Date | string
    recipe_ingredients?: Recipe_ingredientsListRelationFilter
    users?: XOR<UsersRelationFilter, UsersWhereInput>
  }

  export type RecipesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    url?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    recipe_ingredients?: Recipe_ingredientsOrderByRelationAggregateInput
    users?: UsersOrderByWithRelationInput
  }

  export type RecipesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RecipesWhereInput | RecipesWhereInput[]
    OR?: RecipesWhereInput[]
    NOT?: RecipesWhereInput | RecipesWhereInput[]
    name?: StringFilter<"Recipes"> | string
    description?: StringFilter<"Recipes"> | string
    url?: StringFilter<"Recipes"> | string
    user_id?: StringFilter<"Recipes"> | string
    created_at?: DateTimeFilter<"Recipes"> | Date | string
    updated_at?: DateTimeFilter<"Recipes"> | Date | string
    recipe_ingredients?: Recipe_ingredientsListRelationFilter
    users?: XOR<UsersRelationFilter, UsersWhereInput>
  }, "id">

  export type RecipesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    url?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: RecipesCountOrderByAggregateInput
    _max?: RecipesMaxOrderByAggregateInput
    _min?: RecipesMinOrderByAggregateInput
  }

  export type RecipesScalarWhereWithAggregatesInput = {
    AND?: RecipesScalarWhereWithAggregatesInput | RecipesScalarWhereWithAggregatesInput[]
    OR?: RecipesScalarWhereWithAggregatesInput[]
    NOT?: RecipesScalarWhereWithAggregatesInput | RecipesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Recipes"> | string
    name?: StringWithAggregatesFilter<"Recipes"> | string
    description?: StringWithAggregatesFilter<"Recipes"> | string
    url?: StringWithAggregatesFilter<"Recipes"> | string
    user_id?: StringWithAggregatesFilter<"Recipes"> | string
    created_at?: DateTimeWithAggregatesFilter<"Recipes"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Recipes"> | Date | string
  }

  export type UsersWhereInput = {
    AND?: UsersWhereInput | UsersWhereInput[]
    OR?: UsersWhereInput[]
    NOT?: UsersWhereInput | UsersWhereInput[]
    id?: StringFilter<"Users"> | string
    name?: StringFilter<"Users"> | string
    avatar_url?: StringNullableFilter<"Users"> | string | null
    ingredient_events?: Ingredient_eventsListRelationFilter
    ingredients_photo_uploads?: Ingredients_photo_uploadsListRelationFilter
    recipes?: RecipesListRelationFilter
  }

  export type UsersOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    avatar_url?: SortOrderInput | SortOrder
    ingredient_events?: Ingredient_eventsOrderByRelationAggregateInput
    ingredients_photo_uploads?: Ingredients_photo_uploadsOrderByRelationAggregateInput
    recipes?: RecipesOrderByRelationAggregateInput
  }

  export type UsersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UsersWhereInput | UsersWhereInput[]
    OR?: UsersWhereInput[]
    NOT?: UsersWhereInput | UsersWhereInput[]
    name?: StringFilter<"Users"> | string
    avatar_url?: StringNullableFilter<"Users"> | string | null
    ingredient_events?: Ingredient_eventsListRelationFilter
    ingredients_photo_uploads?: Ingredients_photo_uploadsListRelationFilter
    recipes?: RecipesListRelationFilter
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

  export type Ingredient_eventsCreateInput = {
    id: string
    timestamp: Date | string
    from_values?: NullableJsonNullValueInput | InputJsonValue
    to_values?: NullableJsonNullValueInput | InputJsonValue
    ingredients: IngredientsCreateNestedOneWithoutIngredient_eventsInput
    users: UsersCreateNestedOneWithoutIngredient_eventsInput
  }

  export type Ingredient_eventsUncheckedCreateInput = {
    id: string
    ingredient_id: string
    user_id: string
    timestamp: Date | string
    from_values?: NullableJsonNullValueInput | InputJsonValue
    to_values?: NullableJsonNullValueInput | InputJsonValue
  }

  export type Ingredient_eventsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    from_values?: NullableJsonNullValueInput | InputJsonValue
    to_values?: NullableJsonNullValueInput | InputJsonValue
    ingredients?: IngredientsUpdateOneRequiredWithoutIngredient_eventsNestedInput
    users?: UsersUpdateOneRequiredWithoutIngredient_eventsNestedInput
  }

  export type Ingredient_eventsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ingredient_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    from_values?: NullableJsonNullValueInput | InputJsonValue
    to_values?: NullableJsonNullValueInput | InputJsonValue
  }

  export type Ingredient_eventsCreateManyInput = {
    id: string
    ingredient_id: string
    user_id: string
    timestamp: Date | string
    from_values?: NullableJsonNullValueInput | InputJsonValue
    to_values?: NullableJsonNullValueInput | InputJsonValue
  }

  export type Ingredient_eventsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    from_values?: NullableJsonNullValueInput | InputJsonValue
    to_values?: NullableJsonNullValueInput | InputJsonValue
  }

  export type Ingredient_eventsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ingredient_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    from_values?: NullableJsonNullValueInput | InputJsonValue
    to_values?: NullableJsonNullValueInput | InputJsonValue
  }

  export type IngredientsCreateInput = {
    id: string
    name: string
    description: string
    is_reviewed: boolean
    embedding: string
    tracking_type?: $Enums.ingredients_tracking_type | null
    fill_level: number
    count: number
    shelf_life_months: number
    fill_date: string
    is_ground?: boolean | null
    ingredient_events?: Ingredient_eventsCreateNestedManyWithoutIngredientsInput
    ingredients_photo_uploads?: Ingredients_photo_uploadsCreateNestedOneWithoutIngredientsInput
  }

  export type IngredientsUncheckedCreateInput = {
    id: string
    name: string
    description: string
    is_reviewed: boolean
    embedding: string
    tracking_type?: $Enums.ingredients_tracking_type | null
    fill_level: number
    count: number
    shelf_life_months: number
    fill_date: string
    is_ground?: boolean | null
    ingredients_photo_uploads_id?: string | null
    ingredient_events?: Ingredient_eventsUncheckedCreateNestedManyWithoutIngredientsInput
  }

  export type IngredientsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    is_reviewed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: StringFieldUpdateOperationsInput | string
    tracking_type?: NullableEnumingredients_tracking_typeFieldUpdateOperationsInput | $Enums.ingredients_tracking_type | null
    fill_level?: IntFieldUpdateOperationsInput | number
    count?: IntFieldUpdateOperationsInput | number
    shelf_life_months?: IntFieldUpdateOperationsInput | number
    fill_date?: StringFieldUpdateOperationsInput | string
    is_ground?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ingredient_events?: Ingredient_eventsUpdateManyWithoutIngredientsNestedInput
    ingredients_photo_uploads?: Ingredients_photo_uploadsUpdateOneWithoutIngredientsNestedInput
  }

  export type IngredientsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    is_reviewed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: StringFieldUpdateOperationsInput | string
    tracking_type?: NullableEnumingredients_tracking_typeFieldUpdateOperationsInput | $Enums.ingredients_tracking_type | null
    fill_level?: IntFieldUpdateOperationsInput | number
    count?: IntFieldUpdateOperationsInput | number
    shelf_life_months?: IntFieldUpdateOperationsInput | number
    fill_date?: StringFieldUpdateOperationsInput | string
    is_ground?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ingredients_photo_uploads_id?: NullableStringFieldUpdateOperationsInput | string | null
    ingredient_events?: Ingredient_eventsUncheckedUpdateManyWithoutIngredientsNestedInput
  }

  export type IngredientsCreateManyInput = {
    id: string
    name: string
    description: string
    is_reviewed: boolean
    embedding: string
    tracking_type?: $Enums.ingredients_tracking_type | null
    fill_level: number
    count: number
    shelf_life_months: number
    fill_date: string
    is_ground?: boolean | null
    ingredients_photo_uploads_id?: string | null
  }

  export type IngredientsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    is_reviewed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: StringFieldUpdateOperationsInput | string
    tracking_type?: NullableEnumingredients_tracking_typeFieldUpdateOperationsInput | $Enums.ingredients_tracking_type | null
    fill_level?: IntFieldUpdateOperationsInput | number
    count?: IntFieldUpdateOperationsInput | number
    shelf_life_months?: IntFieldUpdateOperationsInput | number
    fill_date?: StringFieldUpdateOperationsInput | string
    is_ground?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type IngredientsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    is_reviewed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: StringFieldUpdateOperationsInput | string
    tracking_type?: NullableEnumingredients_tracking_typeFieldUpdateOperationsInput | $Enums.ingredients_tracking_type | null
    fill_level?: IntFieldUpdateOperationsInput | number
    count?: IntFieldUpdateOperationsInput | number
    shelf_life_months?: IntFieldUpdateOperationsInput | number
    fill_date?: StringFieldUpdateOperationsInput | string
    is_ground?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ingredients_photo_uploads_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Ingredients_photo_uploadsCreateInput = {
    id: string
    created_at: Date | string
    uploaded_at?: Date | string | null
    state: $Enums.ingredient_photo_upload_state
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
    state: $Enums.ingredient_photo_upload_state
    upload_duration_sec?: number | null
    ai_processing_duration_sec?: number | null
    photo_url?: string | null
    ingredients?: IngredientsUncheckedCreateNestedManyWithoutIngredients_photo_uploadsInput
  }

  export type Ingredients_photo_uploadsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    state?: Enumingredient_photo_upload_stateFieldUpdateOperationsInput | $Enums.ingredient_photo_upload_state
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
    state?: Enumingredient_photo_upload_stateFieldUpdateOperationsInput | $Enums.ingredient_photo_upload_state
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
    state: $Enums.ingredient_photo_upload_state
    upload_duration_sec?: number | null
    ai_processing_duration_sec?: number | null
    photo_url?: string | null
  }

  export type Ingredients_photo_uploadsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    state?: Enumingredient_photo_upload_stateFieldUpdateOperationsInput | $Enums.ingredient_photo_upload_state
    upload_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    ai_processing_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Ingredients_photo_uploadsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    state?: Enumingredient_photo_upload_stateFieldUpdateOperationsInput | $Enums.ingredient_photo_upload_state
    upload_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    ai_processing_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Recipe_ingredientsCreateInput = {
    id: string
    listing: string
    extracted_name: string
    embedding: string
    recipes: RecipesCreateNestedOneWithoutRecipe_ingredientsInput
  }

  export type Recipe_ingredientsUncheckedCreateInput = {
    id: string
    listing: string
    extracted_name: string
    embedding: string
    recipe_id: string
  }

  export type Recipe_ingredientsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    listing?: StringFieldUpdateOperationsInput | string
    extracted_name?: StringFieldUpdateOperationsInput | string
    embedding?: StringFieldUpdateOperationsInput | string
    recipes?: RecipesUpdateOneRequiredWithoutRecipe_ingredientsNestedInput
  }

  export type Recipe_ingredientsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    listing?: StringFieldUpdateOperationsInput | string
    extracted_name?: StringFieldUpdateOperationsInput | string
    embedding?: StringFieldUpdateOperationsInput | string
    recipe_id?: StringFieldUpdateOperationsInput | string
  }

  export type Recipe_ingredientsCreateManyInput = {
    id: string
    listing: string
    extracted_name: string
    embedding: string
    recipe_id: string
  }

  export type Recipe_ingredientsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    listing?: StringFieldUpdateOperationsInput | string
    extracted_name?: StringFieldUpdateOperationsInput | string
    embedding?: StringFieldUpdateOperationsInput | string
  }

  export type Recipe_ingredientsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    listing?: StringFieldUpdateOperationsInput | string
    extracted_name?: StringFieldUpdateOperationsInput | string
    embedding?: StringFieldUpdateOperationsInput | string
    recipe_id?: StringFieldUpdateOperationsInput | string
  }

  export type RecipesCreateInput = {
    id: string
    name: string
    description: string
    url: string
    created_at: Date | string
    updated_at: Date | string
    recipe_ingredients?: Recipe_ingredientsCreateNestedManyWithoutRecipesInput
    users: UsersCreateNestedOneWithoutRecipesInput
  }

  export type RecipesUncheckedCreateInput = {
    id: string
    name: string
    description: string
    url: string
    user_id: string
    created_at: Date | string
    updated_at: Date | string
    recipe_ingredients?: Recipe_ingredientsUncheckedCreateNestedManyWithoutRecipesInput
  }

  export type RecipesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recipe_ingredients?: Recipe_ingredientsUpdateManyWithoutRecipesNestedInput
    users?: UsersUpdateOneRequiredWithoutRecipesNestedInput
  }

  export type RecipesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recipe_ingredients?: Recipe_ingredientsUncheckedUpdateManyWithoutRecipesNestedInput
  }

  export type RecipesCreateManyInput = {
    id: string
    name: string
    description: string
    url: string
    user_id: string
    created_at: Date | string
    updated_at: Date | string
  }

  export type RecipesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsersCreateInput = {
    id: string
    name: string
    avatar_url?: string | null
    ingredient_events?: Ingredient_eventsCreateNestedManyWithoutUsersInput
    ingredients_photo_uploads?: Ingredients_photo_uploadsCreateNestedManyWithoutUsersInput
    recipes?: RecipesCreateNestedManyWithoutUsersInput
  }

  export type UsersUncheckedCreateInput = {
    id: string
    name: string
    avatar_url?: string | null
    ingredient_events?: Ingredient_eventsUncheckedCreateNestedManyWithoutUsersInput
    ingredients_photo_uploads?: Ingredients_photo_uploadsUncheckedCreateNestedManyWithoutUsersInput
    recipes?: RecipesUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UsersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    ingredient_events?: Ingredient_eventsUpdateManyWithoutUsersNestedInput
    ingredients_photo_uploads?: Ingredients_photo_uploadsUpdateManyWithoutUsersNestedInput
    recipes?: RecipesUpdateManyWithoutUsersNestedInput
  }

  export type UsersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    ingredient_events?: Ingredient_eventsUncheckedUpdateManyWithoutUsersNestedInput
    ingredients_photo_uploads?: Ingredients_photo_uploadsUncheckedUpdateManyWithoutUsersNestedInput
    recipes?: RecipesUncheckedUpdateManyWithoutUsersNestedInput
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

  export type IngredientsRelationFilter = {
    is?: IngredientsWhereInput
    isNot?: IngredientsWhereInput
  }

  export type UsersRelationFilter = {
    is?: UsersWhereInput
    isNot?: UsersWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type Ingredient_eventsCountOrderByAggregateInput = {
    id?: SortOrder
    ingredient_id?: SortOrder
    user_id?: SortOrder
    timestamp?: SortOrder
    from_values?: SortOrder
    to_values?: SortOrder
  }

  export type Ingredient_eventsMaxOrderByAggregateInput = {
    id?: SortOrder
    ingredient_id?: SortOrder
    user_id?: SortOrder
    timestamp?: SortOrder
  }

  export type Ingredient_eventsMinOrderByAggregateInput = {
    id?: SortOrder
    ingredient_id?: SortOrder
    user_id?: SortOrder
    timestamp?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type Enumingredients_tracking_typeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ingredients_tracking_type | Enumingredients_tracking_typeFieldRefInput<$PrismaModel> | null
    in?: $Enums.ingredients_tracking_type[] | ListEnumingredients_tracking_typeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ingredients_tracking_type[] | ListEnumingredients_tracking_typeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumingredients_tracking_typeNullableFilter<$PrismaModel> | $Enums.ingredients_tracking_type | null
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

  export type Ingredient_eventsListRelationFilter = {
    every?: Ingredient_eventsWhereInput
    some?: Ingredient_eventsWhereInput
    none?: Ingredient_eventsWhereInput
  }

  export type Ingredients_photo_uploadsNullableRelationFilter = {
    is?: Ingredients_photo_uploadsWhereInput | null
    isNot?: Ingredients_photo_uploadsWhereInput | null
  }

  export type Ingredient_eventsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type IngredientsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    is_reviewed?: SortOrder
    embedding?: SortOrder
    tracking_type?: SortOrder
    fill_level?: SortOrder
    count?: SortOrder
    shelf_life_months?: SortOrder
    fill_date?: SortOrder
    is_ground?: SortOrder
    ingredients_photo_uploads_id?: SortOrder
  }

  export type IngredientsAvgOrderByAggregateInput = {
    fill_level?: SortOrder
    count?: SortOrder
    shelf_life_months?: SortOrder
  }

  export type IngredientsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    is_reviewed?: SortOrder
    embedding?: SortOrder
    tracking_type?: SortOrder
    fill_level?: SortOrder
    count?: SortOrder
    shelf_life_months?: SortOrder
    fill_date?: SortOrder
    is_ground?: SortOrder
    ingredients_photo_uploads_id?: SortOrder
  }

  export type IngredientsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    is_reviewed?: SortOrder
    embedding?: SortOrder
    tracking_type?: SortOrder
    fill_level?: SortOrder
    count?: SortOrder
    shelf_life_months?: SortOrder
    fill_date?: SortOrder
    is_ground?: SortOrder
    ingredients_photo_uploads_id?: SortOrder
  }

  export type IngredientsSumOrderByAggregateInput = {
    fill_level?: SortOrder
    count?: SortOrder
    shelf_life_months?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type Enumingredients_tracking_typeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ingredients_tracking_type | Enumingredients_tracking_typeFieldRefInput<$PrismaModel> | null
    in?: $Enums.ingredients_tracking_type[] | ListEnumingredients_tracking_typeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ingredients_tracking_type[] | ListEnumingredients_tracking_typeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumingredients_tracking_typeNullableWithAggregatesFilter<$PrismaModel> | $Enums.ingredients_tracking_type | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumingredients_tracking_typeNullableFilter<$PrismaModel>
    _max?: NestedEnumingredients_tracking_typeNullableFilter<$PrismaModel>
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

  export type Enumingredient_photo_upload_stateFilter<$PrismaModel = never> = {
    equals?: $Enums.ingredient_photo_upload_state | Enumingredient_photo_upload_stateFieldRefInput<$PrismaModel>
    in?: $Enums.ingredient_photo_upload_state[] | ListEnumingredient_photo_upload_stateFieldRefInput<$PrismaModel>
    notIn?: $Enums.ingredient_photo_upload_state[] | ListEnumingredient_photo_upload_stateFieldRefInput<$PrismaModel>
    not?: NestedEnumingredient_photo_upload_stateFilter<$PrismaModel> | $Enums.ingredient_photo_upload_state
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

  export type Enumingredient_photo_upload_stateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ingredient_photo_upload_state | Enumingredient_photo_upload_stateFieldRefInput<$PrismaModel>
    in?: $Enums.ingredient_photo_upload_state[] | ListEnumingredient_photo_upload_stateFieldRefInput<$PrismaModel>
    notIn?: $Enums.ingredient_photo_upload_state[] | ListEnumingredient_photo_upload_stateFieldRefInput<$PrismaModel>
    not?: NestedEnumingredient_photo_upload_stateWithAggregatesFilter<$PrismaModel> | $Enums.ingredient_photo_upload_state
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumingredient_photo_upload_stateFilter<$PrismaModel>
    _max?: NestedEnumingredient_photo_upload_stateFilter<$PrismaModel>
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

  export type RecipesRelationFilter = {
    is?: RecipesWhereInput
    isNot?: RecipesWhereInput
  }

  export type Recipe_ingredientsCountOrderByAggregateInput = {
    id?: SortOrder
    listing?: SortOrder
    extracted_name?: SortOrder
    embedding?: SortOrder
    recipe_id?: SortOrder
  }

  export type Recipe_ingredientsMaxOrderByAggregateInput = {
    id?: SortOrder
    listing?: SortOrder
    extracted_name?: SortOrder
    embedding?: SortOrder
    recipe_id?: SortOrder
  }

  export type Recipe_ingredientsMinOrderByAggregateInput = {
    id?: SortOrder
    listing?: SortOrder
    extracted_name?: SortOrder
    embedding?: SortOrder
    recipe_id?: SortOrder
  }

  export type Recipe_ingredientsListRelationFilter = {
    every?: Recipe_ingredientsWhereInput
    some?: Recipe_ingredientsWhereInput
    none?: Recipe_ingredientsWhereInput
  }

  export type Recipe_ingredientsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RecipesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    url?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type RecipesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    url?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type RecipesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    url?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type Ingredients_photo_uploadsListRelationFilter = {
    every?: Ingredients_photo_uploadsWhereInput
    some?: Ingredients_photo_uploadsWhereInput
    none?: Ingredients_photo_uploadsWhereInput
  }

  export type RecipesListRelationFilter = {
    every?: RecipesWhereInput
    some?: RecipesWhereInput
    none?: RecipesWhereInput
  }

  export type Ingredients_photo_uploadsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RecipesOrderByRelationAggregateInput = {
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

  export type IngredientsCreateNestedOneWithoutIngredient_eventsInput = {
    create?: XOR<IngredientsCreateWithoutIngredient_eventsInput, IngredientsUncheckedCreateWithoutIngredient_eventsInput>
    connectOrCreate?: IngredientsCreateOrConnectWithoutIngredient_eventsInput
    connect?: IngredientsWhereUniqueInput
  }

  export type UsersCreateNestedOneWithoutIngredient_eventsInput = {
    create?: XOR<UsersCreateWithoutIngredient_eventsInput, UsersUncheckedCreateWithoutIngredient_eventsInput>
    connectOrCreate?: UsersCreateOrConnectWithoutIngredient_eventsInput
    connect?: UsersWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IngredientsUpdateOneRequiredWithoutIngredient_eventsNestedInput = {
    create?: XOR<IngredientsCreateWithoutIngredient_eventsInput, IngredientsUncheckedCreateWithoutIngredient_eventsInput>
    connectOrCreate?: IngredientsCreateOrConnectWithoutIngredient_eventsInput
    upsert?: IngredientsUpsertWithoutIngredient_eventsInput
    connect?: IngredientsWhereUniqueInput
    update?: XOR<XOR<IngredientsUpdateToOneWithWhereWithoutIngredient_eventsInput, IngredientsUpdateWithoutIngredient_eventsInput>, IngredientsUncheckedUpdateWithoutIngredient_eventsInput>
  }

  export type UsersUpdateOneRequiredWithoutIngredient_eventsNestedInput = {
    create?: XOR<UsersCreateWithoutIngredient_eventsInput, UsersUncheckedCreateWithoutIngredient_eventsInput>
    connectOrCreate?: UsersCreateOrConnectWithoutIngredient_eventsInput
    upsert?: UsersUpsertWithoutIngredient_eventsInput
    connect?: UsersWhereUniqueInput
    update?: XOR<XOR<UsersUpdateToOneWithWhereWithoutIngredient_eventsInput, UsersUpdateWithoutIngredient_eventsInput>, UsersUncheckedUpdateWithoutIngredient_eventsInput>
  }

  export type Ingredient_eventsCreateNestedManyWithoutIngredientsInput = {
    create?: XOR<Ingredient_eventsCreateWithoutIngredientsInput, Ingredient_eventsUncheckedCreateWithoutIngredientsInput> | Ingredient_eventsCreateWithoutIngredientsInput[] | Ingredient_eventsUncheckedCreateWithoutIngredientsInput[]
    connectOrCreate?: Ingredient_eventsCreateOrConnectWithoutIngredientsInput | Ingredient_eventsCreateOrConnectWithoutIngredientsInput[]
    createMany?: Ingredient_eventsCreateManyIngredientsInputEnvelope
    connect?: Ingredient_eventsWhereUniqueInput | Ingredient_eventsWhereUniqueInput[]
  }

  export type Ingredients_photo_uploadsCreateNestedOneWithoutIngredientsInput = {
    create?: XOR<Ingredients_photo_uploadsCreateWithoutIngredientsInput, Ingredients_photo_uploadsUncheckedCreateWithoutIngredientsInput>
    connectOrCreate?: Ingredients_photo_uploadsCreateOrConnectWithoutIngredientsInput
    connect?: Ingredients_photo_uploadsWhereUniqueInput
  }

  export type Ingredient_eventsUncheckedCreateNestedManyWithoutIngredientsInput = {
    create?: XOR<Ingredient_eventsCreateWithoutIngredientsInput, Ingredient_eventsUncheckedCreateWithoutIngredientsInput> | Ingredient_eventsCreateWithoutIngredientsInput[] | Ingredient_eventsUncheckedCreateWithoutIngredientsInput[]
    connectOrCreate?: Ingredient_eventsCreateOrConnectWithoutIngredientsInput | Ingredient_eventsCreateOrConnectWithoutIngredientsInput[]
    createMany?: Ingredient_eventsCreateManyIngredientsInputEnvelope
    connect?: Ingredient_eventsWhereUniqueInput | Ingredient_eventsWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableEnumingredients_tracking_typeFieldUpdateOperationsInput = {
    set?: $Enums.ingredients_tracking_type | null
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

  export type Ingredient_eventsUpdateManyWithoutIngredientsNestedInput = {
    create?: XOR<Ingredient_eventsCreateWithoutIngredientsInput, Ingredient_eventsUncheckedCreateWithoutIngredientsInput> | Ingredient_eventsCreateWithoutIngredientsInput[] | Ingredient_eventsUncheckedCreateWithoutIngredientsInput[]
    connectOrCreate?: Ingredient_eventsCreateOrConnectWithoutIngredientsInput | Ingredient_eventsCreateOrConnectWithoutIngredientsInput[]
    upsert?: Ingredient_eventsUpsertWithWhereUniqueWithoutIngredientsInput | Ingredient_eventsUpsertWithWhereUniqueWithoutIngredientsInput[]
    createMany?: Ingredient_eventsCreateManyIngredientsInputEnvelope
    set?: Ingredient_eventsWhereUniqueInput | Ingredient_eventsWhereUniqueInput[]
    disconnect?: Ingredient_eventsWhereUniqueInput | Ingredient_eventsWhereUniqueInput[]
    delete?: Ingredient_eventsWhereUniqueInput | Ingredient_eventsWhereUniqueInput[]
    connect?: Ingredient_eventsWhereUniqueInput | Ingredient_eventsWhereUniqueInput[]
    update?: Ingredient_eventsUpdateWithWhereUniqueWithoutIngredientsInput | Ingredient_eventsUpdateWithWhereUniqueWithoutIngredientsInput[]
    updateMany?: Ingredient_eventsUpdateManyWithWhereWithoutIngredientsInput | Ingredient_eventsUpdateManyWithWhereWithoutIngredientsInput[]
    deleteMany?: Ingredient_eventsScalarWhereInput | Ingredient_eventsScalarWhereInput[]
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

  export type Ingredient_eventsUncheckedUpdateManyWithoutIngredientsNestedInput = {
    create?: XOR<Ingredient_eventsCreateWithoutIngredientsInput, Ingredient_eventsUncheckedCreateWithoutIngredientsInput> | Ingredient_eventsCreateWithoutIngredientsInput[] | Ingredient_eventsUncheckedCreateWithoutIngredientsInput[]
    connectOrCreate?: Ingredient_eventsCreateOrConnectWithoutIngredientsInput | Ingredient_eventsCreateOrConnectWithoutIngredientsInput[]
    upsert?: Ingredient_eventsUpsertWithWhereUniqueWithoutIngredientsInput | Ingredient_eventsUpsertWithWhereUniqueWithoutIngredientsInput[]
    createMany?: Ingredient_eventsCreateManyIngredientsInputEnvelope
    set?: Ingredient_eventsWhereUniqueInput | Ingredient_eventsWhereUniqueInput[]
    disconnect?: Ingredient_eventsWhereUniqueInput | Ingredient_eventsWhereUniqueInput[]
    delete?: Ingredient_eventsWhereUniqueInput | Ingredient_eventsWhereUniqueInput[]
    connect?: Ingredient_eventsWhereUniqueInput | Ingredient_eventsWhereUniqueInput[]
    update?: Ingredient_eventsUpdateWithWhereUniqueWithoutIngredientsInput | Ingredient_eventsUpdateWithWhereUniqueWithoutIngredientsInput[]
    updateMany?: Ingredient_eventsUpdateManyWithWhereWithoutIngredientsInput | Ingredient_eventsUpdateManyWithWhereWithoutIngredientsInput[]
    deleteMany?: Ingredient_eventsScalarWhereInput | Ingredient_eventsScalarWhereInput[]
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

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type Enumingredient_photo_upload_stateFieldUpdateOperationsInput = {
    set?: $Enums.ingredient_photo_upload_state
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

  export type RecipesCreateNestedOneWithoutRecipe_ingredientsInput = {
    create?: XOR<RecipesCreateWithoutRecipe_ingredientsInput, RecipesUncheckedCreateWithoutRecipe_ingredientsInput>
    connectOrCreate?: RecipesCreateOrConnectWithoutRecipe_ingredientsInput
    connect?: RecipesWhereUniqueInput
  }

  export type RecipesUpdateOneRequiredWithoutRecipe_ingredientsNestedInput = {
    create?: XOR<RecipesCreateWithoutRecipe_ingredientsInput, RecipesUncheckedCreateWithoutRecipe_ingredientsInput>
    connectOrCreate?: RecipesCreateOrConnectWithoutRecipe_ingredientsInput
    upsert?: RecipesUpsertWithoutRecipe_ingredientsInput
    connect?: RecipesWhereUniqueInput
    update?: XOR<XOR<RecipesUpdateToOneWithWhereWithoutRecipe_ingredientsInput, RecipesUpdateWithoutRecipe_ingredientsInput>, RecipesUncheckedUpdateWithoutRecipe_ingredientsInput>
  }

  export type Recipe_ingredientsCreateNestedManyWithoutRecipesInput = {
    create?: XOR<Recipe_ingredientsCreateWithoutRecipesInput, Recipe_ingredientsUncheckedCreateWithoutRecipesInput> | Recipe_ingredientsCreateWithoutRecipesInput[] | Recipe_ingredientsUncheckedCreateWithoutRecipesInput[]
    connectOrCreate?: Recipe_ingredientsCreateOrConnectWithoutRecipesInput | Recipe_ingredientsCreateOrConnectWithoutRecipesInput[]
    createMany?: Recipe_ingredientsCreateManyRecipesInputEnvelope
    connect?: Recipe_ingredientsWhereUniqueInput | Recipe_ingredientsWhereUniqueInput[]
  }

  export type UsersCreateNestedOneWithoutRecipesInput = {
    create?: XOR<UsersCreateWithoutRecipesInput, UsersUncheckedCreateWithoutRecipesInput>
    connectOrCreate?: UsersCreateOrConnectWithoutRecipesInput
    connect?: UsersWhereUniqueInput
  }

  export type Recipe_ingredientsUncheckedCreateNestedManyWithoutRecipesInput = {
    create?: XOR<Recipe_ingredientsCreateWithoutRecipesInput, Recipe_ingredientsUncheckedCreateWithoutRecipesInput> | Recipe_ingredientsCreateWithoutRecipesInput[] | Recipe_ingredientsUncheckedCreateWithoutRecipesInput[]
    connectOrCreate?: Recipe_ingredientsCreateOrConnectWithoutRecipesInput | Recipe_ingredientsCreateOrConnectWithoutRecipesInput[]
    createMany?: Recipe_ingredientsCreateManyRecipesInputEnvelope
    connect?: Recipe_ingredientsWhereUniqueInput | Recipe_ingredientsWhereUniqueInput[]
  }

  export type Recipe_ingredientsUpdateManyWithoutRecipesNestedInput = {
    create?: XOR<Recipe_ingredientsCreateWithoutRecipesInput, Recipe_ingredientsUncheckedCreateWithoutRecipesInput> | Recipe_ingredientsCreateWithoutRecipesInput[] | Recipe_ingredientsUncheckedCreateWithoutRecipesInput[]
    connectOrCreate?: Recipe_ingredientsCreateOrConnectWithoutRecipesInput | Recipe_ingredientsCreateOrConnectWithoutRecipesInput[]
    upsert?: Recipe_ingredientsUpsertWithWhereUniqueWithoutRecipesInput | Recipe_ingredientsUpsertWithWhereUniqueWithoutRecipesInput[]
    createMany?: Recipe_ingredientsCreateManyRecipesInputEnvelope
    set?: Recipe_ingredientsWhereUniqueInput | Recipe_ingredientsWhereUniqueInput[]
    disconnect?: Recipe_ingredientsWhereUniqueInput | Recipe_ingredientsWhereUniqueInput[]
    delete?: Recipe_ingredientsWhereUniqueInput | Recipe_ingredientsWhereUniqueInput[]
    connect?: Recipe_ingredientsWhereUniqueInput | Recipe_ingredientsWhereUniqueInput[]
    update?: Recipe_ingredientsUpdateWithWhereUniqueWithoutRecipesInput | Recipe_ingredientsUpdateWithWhereUniqueWithoutRecipesInput[]
    updateMany?: Recipe_ingredientsUpdateManyWithWhereWithoutRecipesInput | Recipe_ingredientsUpdateManyWithWhereWithoutRecipesInput[]
    deleteMany?: Recipe_ingredientsScalarWhereInput | Recipe_ingredientsScalarWhereInput[]
  }

  export type UsersUpdateOneRequiredWithoutRecipesNestedInput = {
    create?: XOR<UsersCreateWithoutRecipesInput, UsersUncheckedCreateWithoutRecipesInput>
    connectOrCreate?: UsersCreateOrConnectWithoutRecipesInput
    upsert?: UsersUpsertWithoutRecipesInput
    connect?: UsersWhereUniqueInput
    update?: XOR<XOR<UsersUpdateToOneWithWhereWithoutRecipesInput, UsersUpdateWithoutRecipesInput>, UsersUncheckedUpdateWithoutRecipesInput>
  }

  export type Recipe_ingredientsUncheckedUpdateManyWithoutRecipesNestedInput = {
    create?: XOR<Recipe_ingredientsCreateWithoutRecipesInput, Recipe_ingredientsUncheckedCreateWithoutRecipesInput> | Recipe_ingredientsCreateWithoutRecipesInput[] | Recipe_ingredientsUncheckedCreateWithoutRecipesInput[]
    connectOrCreate?: Recipe_ingredientsCreateOrConnectWithoutRecipesInput | Recipe_ingredientsCreateOrConnectWithoutRecipesInput[]
    upsert?: Recipe_ingredientsUpsertWithWhereUniqueWithoutRecipesInput | Recipe_ingredientsUpsertWithWhereUniqueWithoutRecipesInput[]
    createMany?: Recipe_ingredientsCreateManyRecipesInputEnvelope
    set?: Recipe_ingredientsWhereUniqueInput | Recipe_ingredientsWhereUniqueInput[]
    disconnect?: Recipe_ingredientsWhereUniqueInput | Recipe_ingredientsWhereUniqueInput[]
    delete?: Recipe_ingredientsWhereUniqueInput | Recipe_ingredientsWhereUniqueInput[]
    connect?: Recipe_ingredientsWhereUniqueInput | Recipe_ingredientsWhereUniqueInput[]
    update?: Recipe_ingredientsUpdateWithWhereUniqueWithoutRecipesInput | Recipe_ingredientsUpdateWithWhereUniqueWithoutRecipesInput[]
    updateMany?: Recipe_ingredientsUpdateManyWithWhereWithoutRecipesInput | Recipe_ingredientsUpdateManyWithWhereWithoutRecipesInput[]
    deleteMany?: Recipe_ingredientsScalarWhereInput | Recipe_ingredientsScalarWhereInput[]
  }

  export type Ingredient_eventsCreateNestedManyWithoutUsersInput = {
    create?: XOR<Ingredient_eventsCreateWithoutUsersInput, Ingredient_eventsUncheckedCreateWithoutUsersInput> | Ingredient_eventsCreateWithoutUsersInput[] | Ingredient_eventsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: Ingredient_eventsCreateOrConnectWithoutUsersInput | Ingredient_eventsCreateOrConnectWithoutUsersInput[]
    createMany?: Ingredient_eventsCreateManyUsersInputEnvelope
    connect?: Ingredient_eventsWhereUniqueInput | Ingredient_eventsWhereUniqueInput[]
  }

  export type Ingredients_photo_uploadsCreateNestedManyWithoutUsersInput = {
    create?: XOR<Ingredients_photo_uploadsCreateWithoutUsersInput, Ingredients_photo_uploadsUncheckedCreateWithoutUsersInput> | Ingredients_photo_uploadsCreateWithoutUsersInput[] | Ingredients_photo_uploadsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: Ingredients_photo_uploadsCreateOrConnectWithoutUsersInput | Ingredients_photo_uploadsCreateOrConnectWithoutUsersInput[]
    createMany?: Ingredients_photo_uploadsCreateManyUsersInputEnvelope
    connect?: Ingredients_photo_uploadsWhereUniqueInput | Ingredients_photo_uploadsWhereUniqueInput[]
  }

  export type RecipesCreateNestedManyWithoutUsersInput = {
    create?: XOR<RecipesCreateWithoutUsersInput, RecipesUncheckedCreateWithoutUsersInput> | RecipesCreateWithoutUsersInput[] | RecipesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: RecipesCreateOrConnectWithoutUsersInput | RecipesCreateOrConnectWithoutUsersInput[]
    createMany?: RecipesCreateManyUsersInputEnvelope
    connect?: RecipesWhereUniqueInput | RecipesWhereUniqueInput[]
  }

  export type Ingredient_eventsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<Ingredient_eventsCreateWithoutUsersInput, Ingredient_eventsUncheckedCreateWithoutUsersInput> | Ingredient_eventsCreateWithoutUsersInput[] | Ingredient_eventsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: Ingredient_eventsCreateOrConnectWithoutUsersInput | Ingredient_eventsCreateOrConnectWithoutUsersInput[]
    createMany?: Ingredient_eventsCreateManyUsersInputEnvelope
    connect?: Ingredient_eventsWhereUniqueInput | Ingredient_eventsWhereUniqueInput[]
  }

  export type Ingredients_photo_uploadsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<Ingredients_photo_uploadsCreateWithoutUsersInput, Ingredients_photo_uploadsUncheckedCreateWithoutUsersInput> | Ingredients_photo_uploadsCreateWithoutUsersInput[] | Ingredients_photo_uploadsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: Ingredients_photo_uploadsCreateOrConnectWithoutUsersInput | Ingredients_photo_uploadsCreateOrConnectWithoutUsersInput[]
    createMany?: Ingredients_photo_uploadsCreateManyUsersInputEnvelope
    connect?: Ingredients_photo_uploadsWhereUniqueInput | Ingredients_photo_uploadsWhereUniqueInput[]
  }

  export type RecipesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<RecipesCreateWithoutUsersInput, RecipesUncheckedCreateWithoutUsersInput> | RecipesCreateWithoutUsersInput[] | RecipesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: RecipesCreateOrConnectWithoutUsersInput | RecipesCreateOrConnectWithoutUsersInput[]
    createMany?: RecipesCreateManyUsersInputEnvelope
    connect?: RecipesWhereUniqueInput | RecipesWhereUniqueInput[]
  }

  export type Ingredient_eventsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<Ingredient_eventsCreateWithoutUsersInput, Ingredient_eventsUncheckedCreateWithoutUsersInput> | Ingredient_eventsCreateWithoutUsersInput[] | Ingredient_eventsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: Ingredient_eventsCreateOrConnectWithoutUsersInput | Ingredient_eventsCreateOrConnectWithoutUsersInput[]
    upsert?: Ingredient_eventsUpsertWithWhereUniqueWithoutUsersInput | Ingredient_eventsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: Ingredient_eventsCreateManyUsersInputEnvelope
    set?: Ingredient_eventsWhereUniqueInput | Ingredient_eventsWhereUniqueInput[]
    disconnect?: Ingredient_eventsWhereUniqueInput | Ingredient_eventsWhereUniqueInput[]
    delete?: Ingredient_eventsWhereUniqueInput | Ingredient_eventsWhereUniqueInput[]
    connect?: Ingredient_eventsWhereUniqueInput | Ingredient_eventsWhereUniqueInput[]
    update?: Ingredient_eventsUpdateWithWhereUniqueWithoutUsersInput | Ingredient_eventsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: Ingredient_eventsUpdateManyWithWhereWithoutUsersInput | Ingredient_eventsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: Ingredient_eventsScalarWhereInput | Ingredient_eventsScalarWhereInput[]
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

  export type RecipesUpdateManyWithoutUsersNestedInput = {
    create?: XOR<RecipesCreateWithoutUsersInput, RecipesUncheckedCreateWithoutUsersInput> | RecipesCreateWithoutUsersInput[] | RecipesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: RecipesCreateOrConnectWithoutUsersInput | RecipesCreateOrConnectWithoutUsersInput[]
    upsert?: RecipesUpsertWithWhereUniqueWithoutUsersInput | RecipesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: RecipesCreateManyUsersInputEnvelope
    set?: RecipesWhereUniqueInput | RecipesWhereUniqueInput[]
    disconnect?: RecipesWhereUniqueInput | RecipesWhereUniqueInput[]
    delete?: RecipesWhereUniqueInput | RecipesWhereUniqueInput[]
    connect?: RecipesWhereUniqueInput | RecipesWhereUniqueInput[]
    update?: RecipesUpdateWithWhereUniqueWithoutUsersInput | RecipesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: RecipesUpdateManyWithWhereWithoutUsersInput | RecipesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: RecipesScalarWhereInput | RecipesScalarWhereInput[]
  }

  export type Ingredient_eventsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<Ingredient_eventsCreateWithoutUsersInput, Ingredient_eventsUncheckedCreateWithoutUsersInput> | Ingredient_eventsCreateWithoutUsersInput[] | Ingredient_eventsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: Ingredient_eventsCreateOrConnectWithoutUsersInput | Ingredient_eventsCreateOrConnectWithoutUsersInput[]
    upsert?: Ingredient_eventsUpsertWithWhereUniqueWithoutUsersInput | Ingredient_eventsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: Ingredient_eventsCreateManyUsersInputEnvelope
    set?: Ingredient_eventsWhereUniqueInput | Ingredient_eventsWhereUniqueInput[]
    disconnect?: Ingredient_eventsWhereUniqueInput | Ingredient_eventsWhereUniqueInput[]
    delete?: Ingredient_eventsWhereUniqueInput | Ingredient_eventsWhereUniqueInput[]
    connect?: Ingredient_eventsWhereUniqueInput | Ingredient_eventsWhereUniqueInput[]
    update?: Ingredient_eventsUpdateWithWhereUniqueWithoutUsersInput | Ingredient_eventsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: Ingredient_eventsUpdateManyWithWhereWithoutUsersInput | Ingredient_eventsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: Ingredient_eventsScalarWhereInput | Ingredient_eventsScalarWhereInput[]
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

  export type RecipesUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<RecipesCreateWithoutUsersInput, RecipesUncheckedCreateWithoutUsersInput> | RecipesCreateWithoutUsersInput[] | RecipesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: RecipesCreateOrConnectWithoutUsersInput | RecipesCreateOrConnectWithoutUsersInput[]
    upsert?: RecipesUpsertWithWhereUniqueWithoutUsersInput | RecipesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: RecipesCreateManyUsersInputEnvelope
    set?: RecipesWhereUniqueInput | RecipesWhereUniqueInput[]
    disconnect?: RecipesWhereUniqueInput | RecipesWhereUniqueInput[]
    delete?: RecipesWhereUniqueInput | RecipesWhereUniqueInput[]
    connect?: RecipesWhereUniqueInput | RecipesWhereUniqueInput[]
    update?: RecipesUpdateWithWhereUniqueWithoutUsersInput | RecipesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: RecipesUpdateManyWithWhereWithoutUsersInput | RecipesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: RecipesScalarWhereInput | RecipesScalarWhereInput[]
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumingredients_tracking_typeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ingredients_tracking_type | Enumingredients_tracking_typeFieldRefInput<$PrismaModel> | null
    in?: $Enums.ingredients_tracking_type[] | ListEnumingredients_tracking_typeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ingredients_tracking_type[] | ListEnumingredients_tracking_typeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumingredients_tracking_typeNullableFilter<$PrismaModel> | $Enums.ingredients_tracking_type | null
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumingredients_tracking_typeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ingredients_tracking_type | Enumingredients_tracking_typeFieldRefInput<$PrismaModel> | null
    in?: $Enums.ingredients_tracking_type[] | ListEnumingredients_tracking_typeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ingredients_tracking_type[] | ListEnumingredients_tracking_typeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumingredients_tracking_typeNullableWithAggregatesFilter<$PrismaModel> | $Enums.ingredients_tracking_type | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumingredients_tracking_typeNullableFilter<$PrismaModel>
    _max?: NestedEnumingredients_tracking_typeNullableFilter<$PrismaModel>
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

  export type NestedEnumingredient_photo_upload_stateFilter<$PrismaModel = never> = {
    equals?: $Enums.ingredient_photo_upload_state | Enumingredient_photo_upload_stateFieldRefInput<$PrismaModel>
    in?: $Enums.ingredient_photo_upload_state[] | ListEnumingredient_photo_upload_stateFieldRefInput<$PrismaModel>
    notIn?: $Enums.ingredient_photo_upload_state[] | ListEnumingredient_photo_upload_stateFieldRefInput<$PrismaModel>
    not?: NestedEnumingredient_photo_upload_stateFilter<$PrismaModel> | $Enums.ingredient_photo_upload_state
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

  export type NestedEnumingredient_photo_upload_stateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ingredient_photo_upload_state | Enumingredient_photo_upload_stateFieldRefInput<$PrismaModel>
    in?: $Enums.ingredient_photo_upload_state[] | ListEnumingredient_photo_upload_stateFieldRefInput<$PrismaModel>
    notIn?: $Enums.ingredient_photo_upload_state[] | ListEnumingredient_photo_upload_stateFieldRefInput<$PrismaModel>
    not?: NestedEnumingredient_photo_upload_stateWithAggregatesFilter<$PrismaModel> | $Enums.ingredient_photo_upload_state
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumingredient_photo_upload_stateFilter<$PrismaModel>
    _max?: NestedEnumingredient_photo_upload_stateFilter<$PrismaModel>
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

  export type IngredientsCreateWithoutIngredient_eventsInput = {
    id: string
    name: string
    description: string
    is_reviewed: boolean
    embedding: string
    tracking_type?: $Enums.ingredients_tracking_type | null
    fill_level: number
    count: number
    shelf_life_months: number
    fill_date: string
    is_ground?: boolean | null
    ingredients_photo_uploads?: Ingredients_photo_uploadsCreateNestedOneWithoutIngredientsInput
  }

  export type IngredientsUncheckedCreateWithoutIngredient_eventsInput = {
    id: string
    name: string
    description: string
    is_reviewed: boolean
    embedding: string
    tracking_type?: $Enums.ingredients_tracking_type | null
    fill_level: number
    count: number
    shelf_life_months: number
    fill_date: string
    is_ground?: boolean | null
    ingredients_photo_uploads_id?: string | null
  }

  export type IngredientsCreateOrConnectWithoutIngredient_eventsInput = {
    where: IngredientsWhereUniqueInput
    create: XOR<IngredientsCreateWithoutIngredient_eventsInput, IngredientsUncheckedCreateWithoutIngredient_eventsInput>
  }

  export type UsersCreateWithoutIngredient_eventsInput = {
    id: string
    name: string
    avatar_url?: string | null
    ingredients_photo_uploads?: Ingredients_photo_uploadsCreateNestedManyWithoutUsersInput
    recipes?: RecipesCreateNestedManyWithoutUsersInput
  }

  export type UsersUncheckedCreateWithoutIngredient_eventsInput = {
    id: string
    name: string
    avatar_url?: string | null
    ingredients_photo_uploads?: Ingredients_photo_uploadsUncheckedCreateNestedManyWithoutUsersInput
    recipes?: RecipesUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UsersCreateOrConnectWithoutIngredient_eventsInput = {
    where: UsersWhereUniqueInput
    create: XOR<UsersCreateWithoutIngredient_eventsInput, UsersUncheckedCreateWithoutIngredient_eventsInput>
  }

  export type IngredientsUpsertWithoutIngredient_eventsInput = {
    update: XOR<IngredientsUpdateWithoutIngredient_eventsInput, IngredientsUncheckedUpdateWithoutIngredient_eventsInput>
    create: XOR<IngredientsCreateWithoutIngredient_eventsInput, IngredientsUncheckedCreateWithoutIngredient_eventsInput>
    where?: IngredientsWhereInput
  }

  export type IngredientsUpdateToOneWithWhereWithoutIngredient_eventsInput = {
    where?: IngredientsWhereInput
    data: XOR<IngredientsUpdateWithoutIngredient_eventsInput, IngredientsUncheckedUpdateWithoutIngredient_eventsInput>
  }

  export type IngredientsUpdateWithoutIngredient_eventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    is_reviewed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: StringFieldUpdateOperationsInput | string
    tracking_type?: NullableEnumingredients_tracking_typeFieldUpdateOperationsInput | $Enums.ingredients_tracking_type | null
    fill_level?: IntFieldUpdateOperationsInput | number
    count?: IntFieldUpdateOperationsInput | number
    shelf_life_months?: IntFieldUpdateOperationsInput | number
    fill_date?: StringFieldUpdateOperationsInput | string
    is_ground?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ingredients_photo_uploads?: Ingredients_photo_uploadsUpdateOneWithoutIngredientsNestedInput
  }

  export type IngredientsUncheckedUpdateWithoutIngredient_eventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    is_reviewed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: StringFieldUpdateOperationsInput | string
    tracking_type?: NullableEnumingredients_tracking_typeFieldUpdateOperationsInput | $Enums.ingredients_tracking_type | null
    fill_level?: IntFieldUpdateOperationsInput | number
    count?: IntFieldUpdateOperationsInput | number
    shelf_life_months?: IntFieldUpdateOperationsInput | number
    fill_date?: StringFieldUpdateOperationsInput | string
    is_ground?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ingredients_photo_uploads_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UsersUpsertWithoutIngredient_eventsInput = {
    update: XOR<UsersUpdateWithoutIngredient_eventsInput, UsersUncheckedUpdateWithoutIngredient_eventsInput>
    create: XOR<UsersCreateWithoutIngredient_eventsInput, UsersUncheckedCreateWithoutIngredient_eventsInput>
    where?: UsersWhereInput
  }

  export type UsersUpdateToOneWithWhereWithoutIngredient_eventsInput = {
    where?: UsersWhereInput
    data: XOR<UsersUpdateWithoutIngredient_eventsInput, UsersUncheckedUpdateWithoutIngredient_eventsInput>
  }

  export type UsersUpdateWithoutIngredient_eventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    ingredients_photo_uploads?: Ingredients_photo_uploadsUpdateManyWithoutUsersNestedInput
    recipes?: RecipesUpdateManyWithoutUsersNestedInput
  }

  export type UsersUncheckedUpdateWithoutIngredient_eventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    ingredients_photo_uploads?: Ingredients_photo_uploadsUncheckedUpdateManyWithoutUsersNestedInput
    recipes?: RecipesUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type Ingredient_eventsCreateWithoutIngredientsInput = {
    id: string
    timestamp: Date | string
    from_values?: NullableJsonNullValueInput | InputJsonValue
    to_values?: NullableJsonNullValueInput | InputJsonValue
    users: UsersCreateNestedOneWithoutIngredient_eventsInput
  }

  export type Ingredient_eventsUncheckedCreateWithoutIngredientsInput = {
    id: string
    user_id: string
    timestamp: Date | string
    from_values?: NullableJsonNullValueInput | InputJsonValue
    to_values?: NullableJsonNullValueInput | InputJsonValue
  }

  export type Ingredient_eventsCreateOrConnectWithoutIngredientsInput = {
    where: Ingredient_eventsWhereUniqueInput
    create: XOR<Ingredient_eventsCreateWithoutIngredientsInput, Ingredient_eventsUncheckedCreateWithoutIngredientsInput>
  }

  export type Ingredient_eventsCreateManyIngredientsInputEnvelope = {
    data: Ingredient_eventsCreateManyIngredientsInput | Ingredient_eventsCreateManyIngredientsInput[]
    skipDuplicates?: boolean
  }

  export type Ingredients_photo_uploadsCreateWithoutIngredientsInput = {
    id: string
    created_at: Date | string
    uploaded_at?: Date | string | null
    state: $Enums.ingredient_photo_upload_state
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
    state: $Enums.ingredient_photo_upload_state
    upload_duration_sec?: number | null
    ai_processing_duration_sec?: number | null
    photo_url?: string | null
  }

  export type Ingredients_photo_uploadsCreateOrConnectWithoutIngredientsInput = {
    where: Ingredients_photo_uploadsWhereUniqueInput
    create: XOR<Ingredients_photo_uploadsCreateWithoutIngredientsInput, Ingredients_photo_uploadsUncheckedCreateWithoutIngredientsInput>
  }

  export type Ingredient_eventsUpsertWithWhereUniqueWithoutIngredientsInput = {
    where: Ingredient_eventsWhereUniqueInput
    update: XOR<Ingredient_eventsUpdateWithoutIngredientsInput, Ingredient_eventsUncheckedUpdateWithoutIngredientsInput>
    create: XOR<Ingredient_eventsCreateWithoutIngredientsInput, Ingredient_eventsUncheckedCreateWithoutIngredientsInput>
  }

  export type Ingredient_eventsUpdateWithWhereUniqueWithoutIngredientsInput = {
    where: Ingredient_eventsWhereUniqueInput
    data: XOR<Ingredient_eventsUpdateWithoutIngredientsInput, Ingredient_eventsUncheckedUpdateWithoutIngredientsInput>
  }

  export type Ingredient_eventsUpdateManyWithWhereWithoutIngredientsInput = {
    where: Ingredient_eventsScalarWhereInput
    data: XOR<Ingredient_eventsUpdateManyMutationInput, Ingredient_eventsUncheckedUpdateManyWithoutIngredientsInput>
  }

  export type Ingredient_eventsScalarWhereInput = {
    AND?: Ingredient_eventsScalarWhereInput | Ingredient_eventsScalarWhereInput[]
    OR?: Ingredient_eventsScalarWhereInput[]
    NOT?: Ingredient_eventsScalarWhereInput | Ingredient_eventsScalarWhereInput[]
    id?: UuidFilter<"Ingredient_events"> | string
    ingredient_id?: UuidFilter<"Ingredient_events"> | string
    user_id?: StringFilter<"Ingredient_events"> | string
    timestamp?: DateTimeFilter<"Ingredient_events"> | Date | string
    from_values?: JsonNullableFilter<"Ingredient_events">
    to_values?: JsonNullableFilter<"Ingredient_events">
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
    state?: Enumingredient_photo_upload_stateFieldUpdateOperationsInput | $Enums.ingredient_photo_upload_state
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
    state?: Enumingredient_photo_upload_stateFieldUpdateOperationsInput | $Enums.ingredient_photo_upload_state
    upload_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    ai_processing_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IngredientsCreateWithoutIngredients_photo_uploadsInput = {
    id: string
    name: string
    description: string
    is_reviewed: boolean
    embedding: string
    tracking_type?: $Enums.ingredients_tracking_type | null
    fill_level: number
    count: number
    shelf_life_months: number
    fill_date: string
    is_ground?: boolean | null
    ingredient_events?: Ingredient_eventsCreateNestedManyWithoutIngredientsInput
  }

  export type IngredientsUncheckedCreateWithoutIngredients_photo_uploadsInput = {
    id: string
    name: string
    description: string
    is_reviewed: boolean
    embedding: string
    tracking_type?: $Enums.ingredients_tracking_type | null
    fill_level: number
    count: number
    shelf_life_months: number
    fill_date: string
    is_ground?: boolean | null
    ingredient_events?: Ingredient_eventsUncheckedCreateNestedManyWithoutIngredientsInput
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
    ingredient_events?: Ingredient_eventsCreateNestedManyWithoutUsersInput
    recipes?: RecipesCreateNestedManyWithoutUsersInput
  }

  export type UsersUncheckedCreateWithoutIngredients_photo_uploadsInput = {
    id: string
    name: string
    avatar_url?: string | null
    ingredient_events?: Ingredient_eventsUncheckedCreateNestedManyWithoutUsersInput
    recipes?: RecipesUncheckedCreateNestedManyWithoutUsersInput
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
    description?: StringFilter<"Ingredients"> | string
    is_reviewed?: BoolFilter<"Ingredients"> | boolean
    embedding?: StringFilter<"Ingredients"> | string
    tracking_type?: Enumingredients_tracking_typeNullableFilter<"Ingredients"> | $Enums.ingredients_tracking_type | null
    fill_level?: IntFilter<"Ingredients"> | number
    count?: IntFilter<"Ingredients"> | number
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
    ingredient_events?: Ingredient_eventsUpdateManyWithoutUsersNestedInput
    recipes?: RecipesUpdateManyWithoutUsersNestedInput
  }

  export type UsersUncheckedUpdateWithoutIngredients_photo_uploadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    ingredient_events?: Ingredient_eventsUncheckedUpdateManyWithoutUsersNestedInput
    recipes?: RecipesUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type RecipesCreateWithoutRecipe_ingredientsInput = {
    id: string
    name: string
    description: string
    url: string
    created_at: Date | string
    updated_at: Date | string
    users: UsersCreateNestedOneWithoutRecipesInput
  }

  export type RecipesUncheckedCreateWithoutRecipe_ingredientsInput = {
    id: string
    name: string
    description: string
    url: string
    user_id: string
    created_at: Date | string
    updated_at: Date | string
  }

  export type RecipesCreateOrConnectWithoutRecipe_ingredientsInput = {
    where: RecipesWhereUniqueInput
    create: XOR<RecipesCreateWithoutRecipe_ingredientsInput, RecipesUncheckedCreateWithoutRecipe_ingredientsInput>
  }

  export type RecipesUpsertWithoutRecipe_ingredientsInput = {
    update: XOR<RecipesUpdateWithoutRecipe_ingredientsInput, RecipesUncheckedUpdateWithoutRecipe_ingredientsInput>
    create: XOR<RecipesCreateWithoutRecipe_ingredientsInput, RecipesUncheckedCreateWithoutRecipe_ingredientsInput>
    where?: RecipesWhereInput
  }

  export type RecipesUpdateToOneWithWhereWithoutRecipe_ingredientsInput = {
    where?: RecipesWhereInput
    data: XOR<RecipesUpdateWithoutRecipe_ingredientsInput, RecipesUncheckedUpdateWithoutRecipe_ingredientsInput>
  }

  export type RecipesUpdateWithoutRecipe_ingredientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UsersUpdateOneRequiredWithoutRecipesNestedInput
  }

  export type RecipesUncheckedUpdateWithoutRecipe_ingredientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Recipe_ingredientsCreateWithoutRecipesInput = {
    id: string
    listing: string
    extracted_name: string
    embedding: string
  }

  export type Recipe_ingredientsUncheckedCreateWithoutRecipesInput = {
    id: string
    listing: string
    extracted_name: string
    embedding: string
  }

  export type Recipe_ingredientsCreateOrConnectWithoutRecipesInput = {
    where: Recipe_ingredientsWhereUniqueInput
    create: XOR<Recipe_ingredientsCreateWithoutRecipesInput, Recipe_ingredientsUncheckedCreateWithoutRecipesInput>
  }

  export type Recipe_ingredientsCreateManyRecipesInputEnvelope = {
    data: Recipe_ingredientsCreateManyRecipesInput | Recipe_ingredientsCreateManyRecipesInput[]
    skipDuplicates?: boolean
  }

  export type UsersCreateWithoutRecipesInput = {
    id: string
    name: string
    avatar_url?: string | null
    ingredient_events?: Ingredient_eventsCreateNestedManyWithoutUsersInput
    ingredients_photo_uploads?: Ingredients_photo_uploadsCreateNestedManyWithoutUsersInput
  }

  export type UsersUncheckedCreateWithoutRecipesInput = {
    id: string
    name: string
    avatar_url?: string | null
    ingredient_events?: Ingredient_eventsUncheckedCreateNestedManyWithoutUsersInput
    ingredients_photo_uploads?: Ingredients_photo_uploadsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UsersCreateOrConnectWithoutRecipesInput = {
    where: UsersWhereUniqueInput
    create: XOR<UsersCreateWithoutRecipesInput, UsersUncheckedCreateWithoutRecipesInput>
  }

  export type Recipe_ingredientsUpsertWithWhereUniqueWithoutRecipesInput = {
    where: Recipe_ingredientsWhereUniqueInput
    update: XOR<Recipe_ingredientsUpdateWithoutRecipesInput, Recipe_ingredientsUncheckedUpdateWithoutRecipesInput>
    create: XOR<Recipe_ingredientsCreateWithoutRecipesInput, Recipe_ingredientsUncheckedCreateWithoutRecipesInput>
  }

  export type Recipe_ingredientsUpdateWithWhereUniqueWithoutRecipesInput = {
    where: Recipe_ingredientsWhereUniqueInput
    data: XOR<Recipe_ingredientsUpdateWithoutRecipesInput, Recipe_ingredientsUncheckedUpdateWithoutRecipesInput>
  }

  export type Recipe_ingredientsUpdateManyWithWhereWithoutRecipesInput = {
    where: Recipe_ingredientsScalarWhereInput
    data: XOR<Recipe_ingredientsUpdateManyMutationInput, Recipe_ingredientsUncheckedUpdateManyWithoutRecipesInput>
  }

  export type Recipe_ingredientsScalarWhereInput = {
    AND?: Recipe_ingredientsScalarWhereInput | Recipe_ingredientsScalarWhereInput[]
    OR?: Recipe_ingredientsScalarWhereInput[]
    NOT?: Recipe_ingredientsScalarWhereInput | Recipe_ingredientsScalarWhereInput[]
    id?: UuidFilter<"Recipe_ingredients"> | string
    listing?: StringFilter<"Recipe_ingredients"> | string
    extracted_name?: StringFilter<"Recipe_ingredients"> | string
    embedding?: StringFilter<"Recipe_ingredients"> | string
    recipe_id?: UuidFilter<"Recipe_ingredients"> | string
  }

  export type UsersUpsertWithoutRecipesInput = {
    update: XOR<UsersUpdateWithoutRecipesInput, UsersUncheckedUpdateWithoutRecipesInput>
    create: XOR<UsersCreateWithoutRecipesInput, UsersUncheckedCreateWithoutRecipesInput>
    where?: UsersWhereInput
  }

  export type UsersUpdateToOneWithWhereWithoutRecipesInput = {
    where?: UsersWhereInput
    data: XOR<UsersUpdateWithoutRecipesInput, UsersUncheckedUpdateWithoutRecipesInput>
  }

  export type UsersUpdateWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    ingredient_events?: Ingredient_eventsUpdateManyWithoutUsersNestedInput
    ingredients_photo_uploads?: Ingredients_photo_uploadsUpdateManyWithoutUsersNestedInput
  }

  export type UsersUncheckedUpdateWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    ingredient_events?: Ingredient_eventsUncheckedUpdateManyWithoutUsersNestedInput
    ingredients_photo_uploads?: Ingredients_photo_uploadsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type Ingredient_eventsCreateWithoutUsersInput = {
    id: string
    timestamp: Date | string
    from_values?: NullableJsonNullValueInput | InputJsonValue
    to_values?: NullableJsonNullValueInput | InputJsonValue
    ingredients: IngredientsCreateNestedOneWithoutIngredient_eventsInput
  }

  export type Ingredient_eventsUncheckedCreateWithoutUsersInput = {
    id: string
    ingredient_id: string
    timestamp: Date | string
    from_values?: NullableJsonNullValueInput | InputJsonValue
    to_values?: NullableJsonNullValueInput | InputJsonValue
  }

  export type Ingredient_eventsCreateOrConnectWithoutUsersInput = {
    where: Ingredient_eventsWhereUniqueInput
    create: XOR<Ingredient_eventsCreateWithoutUsersInput, Ingredient_eventsUncheckedCreateWithoutUsersInput>
  }

  export type Ingredient_eventsCreateManyUsersInputEnvelope = {
    data: Ingredient_eventsCreateManyUsersInput | Ingredient_eventsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type Ingredients_photo_uploadsCreateWithoutUsersInput = {
    id: string
    created_at: Date | string
    uploaded_at?: Date | string | null
    state: $Enums.ingredient_photo_upload_state
    upload_duration_sec?: number | null
    ai_processing_duration_sec?: number | null
    photo_url?: string | null
    ingredients?: IngredientsCreateNestedManyWithoutIngredients_photo_uploadsInput
  }

  export type Ingredients_photo_uploadsUncheckedCreateWithoutUsersInput = {
    id: string
    created_at: Date | string
    uploaded_at?: Date | string | null
    state: $Enums.ingredient_photo_upload_state
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

  export type RecipesCreateWithoutUsersInput = {
    id: string
    name: string
    description: string
    url: string
    created_at: Date | string
    updated_at: Date | string
    recipe_ingredients?: Recipe_ingredientsCreateNestedManyWithoutRecipesInput
  }

  export type RecipesUncheckedCreateWithoutUsersInput = {
    id: string
    name: string
    description: string
    url: string
    created_at: Date | string
    updated_at: Date | string
    recipe_ingredients?: Recipe_ingredientsUncheckedCreateNestedManyWithoutRecipesInput
  }

  export type RecipesCreateOrConnectWithoutUsersInput = {
    where: RecipesWhereUniqueInput
    create: XOR<RecipesCreateWithoutUsersInput, RecipesUncheckedCreateWithoutUsersInput>
  }

  export type RecipesCreateManyUsersInputEnvelope = {
    data: RecipesCreateManyUsersInput | RecipesCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type Ingredient_eventsUpsertWithWhereUniqueWithoutUsersInput = {
    where: Ingredient_eventsWhereUniqueInput
    update: XOR<Ingredient_eventsUpdateWithoutUsersInput, Ingredient_eventsUncheckedUpdateWithoutUsersInput>
    create: XOR<Ingredient_eventsCreateWithoutUsersInput, Ingredient_eventsUncheckedCreateWithoutUsersInput>
  }

  export type Ingredient_eventsUpdateWithWhereUniqueWithoutUsersInput = {
    where: Ingredient_eventsWhereUniqueInput
    data: XOR<Ingredient_eventsUpdateWithoutUsersInput, Ingredient_eventsUncheckedUpdateWithoutUsersInput>
  }

  export type Ingredient_eventsUpdateManyWithWhereWithoutUsersInput = {
    where: Ingredient_eventsScalarWhereInput
    data: XOR<Ingredient_eventsUpdateManyMutationInput, Ingredient_eventsUncheckedUpdateManyWithoutUsersInput>
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
    state?: Enumingredient_photo_upload_stateFilter<"Ingredients_photo_uploads"> | $Enums.ingredient_photo_upload_state
    upload_duration_sec?: FloatNullableFilter<"Ingredients_photo_uploads"> | number | null
    ai_processing_duration_sec?: FloatNullableFilter<"Ingredients_photo_uploads"> | number | null
    photo_url?: StringNullableFilter<"Ingredients_photo_uploads"> | string | null
  }

  export type RecipesUpsertWithWhereUniqueWithoutUsersInput = {
    where: RecipesWhereUniqueInput
    update: XOR<RecipesUpdateWithoutUsersInput, RecipesUncheckedUpdateWithoutUsersInput>
    create: XOR<RecipesCreateWithoutUsersInput, RecipesUncheckedCreateWithoutUsersInput>
  }

  export type RecipesUpdateWithWhereUniqueWithoutUsersInput = {
    where: RecipesWhereUniqueInput
    data: XOR<RecipesUpdateWithoutUsersInput, RecipesUncheckedUpdateWithoutUsersInput>
  }

  export type RecipesUpdateManyWithWhereWithoutUsersInput = {
    where: RecipesScalarWhereInput
    data: XOR<RecipesUpdateManyMutationInput, RecipesUncheckedUpdateManyWithoutUsersInput>
  }

  export type RecipesScalarWhereInput = {
    AND?: RecipesScalarWhereInput | RecipesScalarWhereInput[]
    OR?: RecipesScalarWhereInput[]
    NOT?: RecipesScalarWhereInput | RecipesScalarWhereInput[]
    id?: UuidFilter<"Recipes"> | string
    name?: StringFilter<"Recipes"> | string
    description?: StringFilter<"Recipes"> | string
    url?: StringFilter<"Recipes"> | string
    user_id?: StringFilter<"Recipes"> | string
    created_at?: DateTimeFilter<"Recipes"> | Date | string
    updated_at?: DateTimeFilter<"Recipes"> | Date | string
  }

  export type Ingredient_eventsCreateManyIngredientsInput = {
    id: string
    user_id: string
    timestamp: Date | string
    from_values?: NullableJsonNullValueInput | InputJsonValue
    to_values?: NullableJsonNullValueInput | InputJsonValue
  }

  export type Ingredient_eventsUpdateWithoutIngredientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    from_values?: NullableJsonNullValueInput | InputJsonValue
    to_values?: NullableJsonNullValueInput | InputJsonValue
    users?: UsersUpdateOneRequiredWithoutIngredient_eventsNestedInput
  }

  export type Ingredient_eventsUncheckedUpdateWithoutIngredientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    from_values?: NullableJsonNullValueInput | InputJsonValue
    to_values?: NullableJsonNullValueInput | InputJsonValue
  }

  export type Ingredient_eventsUncheckedUpdateManyWithoutIngredientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    from_values?: NullableJsonNullValueInput | InputJsonValue
    to_values?: NullableJsonNullValueInput | InputJsonValue
  }

  export type IngredientsCreateManyIngredients_photo_uploadsInput = {
    id: string
    name: string
    description: string
    is_reviewed: boolean
    embedding: string
    tracking_type?: $Enums.ingredients_tracking_type | null
    fill_level: number
    count: number
    shelf_life_months: number
    fill_date: string
    is_ground?: boolean | null
  }

  export type IngredientsUpdateWithoutIngredients_photo_uploadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    is_reviewed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: StringFieldUpdateOperationsInput | string
    tracking_type?: NullableEnumingredients_tracking_typeFieldUpdateOperationsInput | $Enums.ingredients_tracking_type | null
    fill_level?: IntFieldUpdateOperationsInput | number
    count?: IntFieldUpdateOperationsInput | number
    shelf_life_months?: IntFieldUpdateOperationsInput | number
    fill_date?: StringFieldUpdateOperationsInput | string
    is_ground?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ingredient_events?: Ingredient_eventsUpdateManyWithoutIngredientsNestedInput
  }

  export type IngredientsUncheckedUpdateWithoutIngredients_photo_uploadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    is_reviewed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: StringFieldUpdateOperationsInput | string
    tracking_type?: NullableEnumingredients_tracking_typeFieldUpdateOperationsInput | $Enums.ingredients_tracking_type | null
    fill_level?: IntFieldUpdateOperationsInput | number
    count?: IntFieldUpdateOperationsInput | number
    shelf_life_months?: IntFieldUpdateOperationsInput | number
    fill_date?: StringFieldUpdateOperationsInput | string
    is_ground?: NullableBoolFieldUpdateOperationsInput | boolean | null
    ingredient_events?: Ingredient_eventsUncheckedUpdateManyWithoutIngredientsNestedInput
  }

  export type IngredientsUncheckedUpdateManyWithoutIngredients_photo_uploadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    is_reviewed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: StringFieldUpdateOperationsInput | string
    tracking_type?: NullableEnumingredients_tracking_typeFieldUpdateOperationsInput | $Enums.ingredients_tracking_type | null
    fill_level?: IntFieldUpdateOperationsInput | number
    count?: IntFieldUpdateOperationsInput | number
    shelf_life_months?: IntFieldUpdateOperationsInput | number
    fill_date?: StringFieldUpdateOperationsInput | string
    is_ground?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type Recipe_ingredientsCreateManyRecipesInput = {
    id: string
    listing: string
    extracted_name: string
    embedding: string
  }

  export type Recipe_ingredientsUpdateWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    listing?: StringFieldUpdateOperationsInput | string
    extracted_name?: StringFieldUpdateOperationsInput | string
    embedding?: StringFieldUpdateOperationsInput | string
  }

  export type Recipe_ingredientsUncheckedUpdateWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    listing?: StringFieldUpdateOperationsInput | string
    extracted_name?: StringFieldUpdateOperationsInput | string
    embedding?: StringFieldUpdateOperationsInput | string
  }

  export type Recipe_ingredientsUncheckedUpdateManyWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    listing?: StringFieldUpdateOperationsInput | string
    extracted_name?: StringFieldUpdateOperationsInput | string
    embedding?: StringFieldUpdateOperationsInput | string
  }

  export type Ingredient_eventsCreateManyUsersInput = {
    id: string
    ingredient_id: string
    timestamp: Date | string
    from_values?: NullableJsonNullValueInput | InputJsonValue
    to_values?: NullableJsonNullValueInput | InputJsonValue
  }

  export type Ingredients_photo_uploadsCreateManyUsersInput = {
    id: string
    created_at: Date | string
    uploaded_at?: Date | string | null
    state: $Enums.ingredient_photo_upload_state
    upload_duration_sec?: number | null
    ai_processing_duration_sec?: number | null
    photo_url?: string | null
  }

  export type RecipesCreateManyUsersInput = {
    id: string
    name: string
    description: string
    url: string
    created_at: Date | string
    updated_at: Date | string
  }

  export type Ingredient_eventsUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    from_values?: NullableJsonNullValueInput | InputJsonValue
    to_values?: NullableJsonNullValueInput | InputJsonValue
    ingredients?: IngredientsUpdateOneRequiredWithoutIngredient_eventsNestedInput
  }

  export type Ingredient_eventsUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    ingredient_id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    from_values?: NullableJsonNullValueInput | InputJsonValue
    to_values?: NullableJsonNullValueInput | InputJsonValue
  }

  export type Ingredient_eventsUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    ingredient_id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    from_values?: NullableJsonNullValueInput | InputJsonValue
    to_values?: NullableJsonNullValueInput | InputJsonValue
  }

  export type Ingredients_photo_uploadsUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    state?: Enumingredient_photo_upload_stateFieldUpdateOperationsInput | $Enums.ingredient_photo_upload_state
    upload_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    ai_processing_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    ingredients?: IngredientsUpdateManyWithoutIngredients_photo_uploadsNestedInput
  }

  export type Ingredients_photo_uploadsUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    state?: Enumingredient_photo_upload_stateFieldUpdateOperationsInput | $Enums.ingredient_photo_upload_state
    upload_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    ai_processing_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    ingredients?: IngredientsUncheckedUpdateManyWithoutIngredients_photo_uploadsNestedInput
  }

  export type Ingredients_photo_uploadsUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    state?: Enumingredient_photo_upload_stateFieldUpdateOperationsInput | $Enums.ingredient_photo_upload_state
    upload_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    ai_processing_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecipesUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recipe_ingredients?: Recipe_ingredientsUpdateManyWithoutRecipesNestedInput
  }

  export type RecipesUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recipe_ingredients?: Recipe_ingredientsUncheckedUpdateManyWithoutRecipesNestedInput
  }

  export type RecipesUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use IngredientsCountOutputTypeDefaultArgs instead
     */
    export type IngredientsCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = IngredientsCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use Ingredients_photo_uploadsCountOutputTypeDefaultArgs instead
     */
    export type Ingredients_photo_uploadsCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = Ingredients_photo_uploadsCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RecipesCountOutputTypeDefaultArgs instead
     */
    export type RecipesCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = RecipesCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UsersCountOutputTypeDefaultArgs instead
     */
    export type UsersCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = UsersCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use Ingredient_eventsDefaultArgs instead
     */
    export type Ingredient_eventsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = Ingredient_eventsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use IngredientsDefaultArgs instead
     */
    export type IngredientsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = IngredientsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use Ingredients_photo_uploadsDefaultArgs instead
     */
    export type Ingredients_photo_uploadsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = Ingredients_photo_uploadsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use Recipe_ingredientsDefaultArgs instead
     */
    export type Recipe_ingredientsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = Recipe_ingredientsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RecipesDefaultArgs instead
     */
    export type RecipesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = RecipesDefaultArgs<ExtArgs>
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