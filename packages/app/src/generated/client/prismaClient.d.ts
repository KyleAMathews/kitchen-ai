
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Ingredient_events
 * 
 */
export type Ingredient_events = {
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
}

/**
 * Model Ingredients
 * 
 */
export type Ingredients = {
  /**
   * @zod.string.uuid()
   */
  id: string
  name: string
  description: string
  is_reviewed: boolean
  embedding: string
  tracking_type: ingredients_tracking_type | null
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
}

/**
 * Model Ingredients_photo_uploads
 * 
 */
export type Ingredients_photo_uploads = {
  /**
   * @zod.string.uuid()
   */
  id: string
  user_id: string
  created_at: Date
  uploaded_at: Date | null
  state: ingredient_photo_upload_state
  /**
   * @zod.custom.use(z.number().or(z.nan()))
   */
  upload_duration_sec: number | null
  /**
   * @zod.custom.use(z.number().or(z.nan()))
   */
  ai_processing_duration_sec: number | null
  photo_url: string | null
}

/**
 * Model Jobs
 * 
 */
export type Jobs = {
  /**
   * @zod.string.uuid()
   */
  id: string
  state: jobs_state
  /**
   * @zod.string.uuid()
   */
  target_id: string | null
  type: string
  created_at: Date
  updated_at: Date
  error: Prisma.JsonValue | null
  result: Prisma.JsonValue | null
}

/**
 * Model Recipe_ingredients
 * 
 */
export type Recipe_ingredients = {
  /**
   * @zod.string.uuid()
   */
  id: string
  listing: string
  extracted_name: string
  embedding: string
  grocery_section: grocery_section
  /**
   * @zod.string.uuid()
   */
  recipe_id: string
}

/**
 * Model Recipes
 * 
 */
export type Recipes = {
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
}

/**
 * Model Shopping_list
 * 
 */
export type Shopping_list = {
  /**
   * @zod.string.uuid()
   */
  id: string
  /**
   * @zod.string.uuid()
   */
  recipe_id: string
  /**
   * @zod.string.uuid()
   */
  recipe_ingredient_id: string
  purchased: boolean
  created_at: Date
}

/**
 * Model Users
 * 
 */
export type Users = {
  id: string
  name: string
  avatar_url: string | null
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

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


export const jobs_state: {
  working: 'working',
  done: 'done',
  error: 'error'
};

export type jobs_state = (typeof jobs_state)[keyof typeof jobs_state]


export const grocery_section: {
  Produce: 'Produce',
  Deli: 'Deli',
  Bakery: 'Bakery',
  Meat_Seafood: 'Meat_Seafood',
  Dairy_Eggs: 'Dairy_Eggs',
  Dry_Goods: 'Dry_Goods',
  Canned_Foods: 'Canned_Foods',
  Spices_Herbs: 'Spices_Herbs',
  Snacks: 'Snacks',
  Beverages: 'Beverages',
  Frozen_Foods: 'Frozen_Foods',
  Other_Aisles: 'Other_Aisles'
};

export type grocery_section = (typeof grocery_section)[keyof typeof grocery_section]


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
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
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
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
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
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

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
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

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
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

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
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>;

  $transaction<R>(fn: (prisma: Prisma.TransactionClient) => Promise<R>, options?: {maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel}): Promise<R>;

      /**
   * `prisma.ingredient_events`: Exposes CRUD operations for the **Ingredient_events** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ingredient_events
    * const ingredient_events = await prisma.ingredient_events.findMany()
    * ```
    */
  get ingredient_events(): Prisma.Ingredient_eventsDelegate<GlobalReject>;

  /**
   * `prisma.ingredients`: Exposes CRUD operations for the **Ingredients** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ingredients
    * const ingredients = await prisma.ingredients.findMany()
    * ```
    */
  get ingredients(): Prisma.IngredientsDelegate<GlobalReject>;

  /**
   * `prisma.ingredients_photo_uploads`: Exposes CRUD operations for the **Ingredients_photo_uploads** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ingredients_photo_uploads
    * const ingredients_photo_uploads = await prisma.ingredients_photo_uploads.findMany()
    * ```
    */
  get ingredients_photo_uploads(): Prisma.Ingredients_photo_uploadsDelegate<GlobalReject>;

  /**
   * `prisma.jobs`: Exposes CRUD operations for the **Jobs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jobs
    * const jobs = await prisma.jobs.findMany()
    * ```
    */
  get jobs(): Prisma.JobsDelegate<GlobalReject>;

  /**
   * `prisma.recipe_ingredients`: Exposes CRUD operations for the **Recipe_ingredients** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Recipe_ingredients
    * const recipe_ingredients = await prisma.recipe_ingredients.findMany()
    * ```
    */
  get recipe_ingredients(): Prisma.Recipe_ingredientsDelegate<GlobalReject>;

  /**
   * `prisma.recipes`: Exposes CRUD operations for the **Recipes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Recipes
    * const recipes = await prisma.recipes.findMany()
    * ```
    */
  get recipes(): Prisma.RecipesDelegate<GlobalReject>;

  /**
   * `prisma.shopping_list`: Exposes CRUD operations for the **Shopping_list** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Shopping_lists
    * const shopping_lists = await prisma.shopping_list.findMany()
    * ```
    */
  get shopping_list(): Prisma.Shopping_listDelegate<GlobalReject>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **Users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.UsersDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

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
   * Prisma Client JS version: 4.8.1
   * Query Engine version: 23fdc5965b1e05fc54e5f26ed3de66776b93de64
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
export type InputJsonValue = null | string | number | boolean | InputJsonObject | InputJsonArray

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
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

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

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

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
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    Ingredient_events: 'Ingredient_events',
    Ingredients: 'Ingredients',
    Ingredients_photo_uploads: 'Ingredients_photo_uploads',
    Jobs: 'Jobs',
    Recipe_ingredients: 'Recipe_ingredients',
    Recipes: 'Recipes',
    Shopping_list: 'Shopping_list',
    Users: 'Users'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

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

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
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
    | 'findMany'
    | 'findFirst'
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
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

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

  export type IngredientsCountOutputTypeSelect = {
    ingredient_events?: boolean | IngredientsCountOutputTypeCountIngredient_eventsArgs
  }

  export type IngredientsCountOutputTypeGetPayload<S extends boolean | null | undefined | IngredientsCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? IngredientsCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (IngredientsCountOutputTypeArgs)
    ? IngredientsCountOutputType 
    : S extends { select: any } & (IngredientsCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof IngredientsCountOutputType ? IngredientsCountOutputType[P] : never
  } 
      : IngredientsCountOutputType




  // Custom InputTypes

  /**
   * IngredientsCountOutputType without action
   */
  export type IngredientsCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the IngredientsCountOutputType
     * 
    **/
    select?: IngredientsCountOutputTypeSelect | null
  }


  /**
   * IngredientsCountOutputType without action
   */
  export type IngredientsCountOutputTypeCountIngredient_eventsArgs = {
    where?: Ingredient_eventsWhereInput
  }



  /**
   * Count Type Ingredients_photo_uploadsCountOutputType
   */


  export type Ingredients_photo_uploadsCountOutputType = {
    ingredients: number
  }

  export type Ingredients_photo_uploadsCountOutputTypeSelect = {
    ingredients?: boolean | Ingredients_photo_uploadsCountOutputTypeCountIngredientsArgs
  }

  export type Ingredients_photo_uploadsCountOutputTypeGetPayload<S extends boolean | null | undefined | Ingredients_photo_uploadsCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Ingredients_photo_uploadsCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (Ingredients_photo_uploadsCountOutputTypeArgs)
    ? Ingredients_photo_uploadsCountOutputType 
    : S extends { select: any } & (Ingredients_photo_uploadsCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof Ingredients_photo_uploadsCountOutputType ? Ingredients_photo_uploadsCountOutputType[P] : never
  } 
      : Ingredients_photo_uploadsCountOutputType




  // Custom InputTypes

  /**
   * Ingredients_photo_uploadsCountOutputType without action
   */
  export type Ingredients_photo_uploadsCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploadsCountOutputType
     * 
    **/
    select?: Ingredients_photo_uploadsCountOutputTypeSelect | null
  }


  /**
   * Ingredients_photo_uploadsCountOutputType without action
   */
  export type Ingredients_photo_uploadsCountOutputTypeCountIngredientsArgs = {
    where?: IngredientsWhereInput
  }



  /**
   * Count Type Recipe_ingredientsCountOutputType
   */


  export type Recipe_ingredientsCountOutputType = {
    shopping_list: number
  }

  export type Recipe_ingredientsCountOutputTypeSelect = {
    shopping_list?: boolean | Recipe_ingredientsCountOutputTypeCountShopping_listArgs
  }

  export type Recipe_ingredientsCountOutputTypeGetPayload<S extends boolean | null | undefined | Recipe_ingredientsCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Recipe_ingredientsCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (Recipe_ingredientsCountOutputTypeArgs)
    ? Recipe_ingredientsCountOutputType 
    : S extends { select: any } & (Recipe_ingredientsCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof Recipe_ingredientsCountOutputType ? Recipe_ingredientsCountOutputType[P] : never
  } 
      : Recipe_ingredientsCountOutputType




  // Custom InputTypes

  /**
   * Recipe_ingredientsCountOutputType without action
   */
  export type Recipe_ingredientsCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the Recipe_ingredientsCountOutputType
     * 
    **/
    select?: Recipe_ingredientsCountOutputTypeSelect | null
  }


  /**
   * Recipe_ingredientsCountOutputType without action
   */
  export type Recipe_ingredientsCountOutputTypeCountShopping_listArgs = {
    where?: Shopping_listWhereInput
  }



  /**
   * Count Type RecipesCountOutputType
   */


  export type RecipesCountOutputType = {
    recipe_ingredients: number
    shopping_list: number
  }

  export type RecipesCountOutputTypeSelect = {
    recipe_ingredients?: boolean | RecipesCountOutputTypeCountRecipe_ingredientsArgs
    shopping_list?: boolean | RecipesCountOutputTypeCountShopping_listArgs
  }

  export type RecipesCountOutputTypeGetPayload<S extends boolean | null | undefined | RecipesCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? RecipesCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (RecipesCountOutputTypeArgs)
    ? RecipesCountOutputType 
    : S extends { select: any } & (RecipesCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof RecipesCountOutputType ? RecipesCountOutputType[P] : never
  } 
      : RecipesCountOutputType




  // Custom InputTypes

  /**
   * RecipesCountOutputType without action
   */
  export type RecipesCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the RecipesCountOutputType
     * 
    **/
    select?: RecipesCountOutputTypeSelect | null
  }


  /**
   * RecipesCountOutputType without action
   */
  export type RecipesCountOutputTypeCountRecipe_ingredientsArgs = {
    where?: Recipe_ingredientsWhereInput
  }


  /**
   * RecipesCountOutputType without action
   */
  export type RecipesCountOutputTypeCountShopping_listArgs = {
    where?: Shopping_listWhereInput
  }



  /**
   * Count Type UsersCountOutputType
   */


  export type UsersCountOutputType = {
    ingredient_events: number
    ingredients_photo_uploads: number
    recipes: number
  }

  export type UsersCountOutputTypeSelect = {
    ingredient_events?: boolean | UsersCountOutputTypeCountIngredient_eventsArgs
    ingredients_photo_uploads?: boolean | UsersCountOutputTypeCountIngredients_photo_uploadsArgs
    recipes?: boolean | UsersCountOutputTypeCountRecipesArgs
  }

  export type UsersCountOutputTypeGetPayload<S extends boolean | null | undefined | UsersCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? UsersCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (UsersCountOutputTypeArgs)
    ? UsersCountOutputType 
    : S extends { select: any } & (UsersCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof UsersCountOutputType ? UsersCountOutputType[P] : never
  } 
      : UsersCountOutputType




  // Custom InputTypes

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     * 
    **/
    select?: UsersCountOutputTypeSelect | null
  }


  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountIngredient_eventsArgs = {
    where?: Ingredient_eventsWhereInput
  }


  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountIngredients_photo_uploadsArgs = {
    where?: Ingredients_photo_uploadsWhereInput
  }


  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountRecipesArgs = {
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

  export type Ingredient_eventsAggregateArgs = {
    /**
     * Filter which Ingredient_events to aggregate.
     * 
    **/
    where?: Ingredient_eventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredient_events to fetch.
     * 
    **/
    orderBy?: Enumerable<Ingredient_eventsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: Ingredient_eventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredient_events from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredient_events.
     * 
    **/
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




  export type Ingredient_eventsGroupByArgs = {
    where?: Ingredient_eventsWhereInput
    orderBy?: Enumerable<Ingredient_eventsOrderByWithAggregationInput>
    by: Array<Ingredient_eventsScalarFieldEnum>
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

  type GetIngredient_eventsGroupByPayload<T extends Ingredient_eventsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Ingredient_eventsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Ingredient_eventsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Ingredient_eventsGroupByOutputType[P]>
            : GetScalarType<T[P], Ingredient_eventsGroupByOutputType[P]>
        }
      >
    >


  export type Ingredient_eventsSelect = {
    id?: boolean
    ingredient_id?: boolean
    user_id?: boolean
    timestamp?: boolean
    from_values?: boolean
    to_values?: boolean
    ingredients?: boolean | IngredientsArgs
    users?: boolean | UsersArgs
  }


  export type Ingredient_eventsInclude = {
    ingredients?: boolean | IngredientsArgs
    users?: boolean | UsersArgs
  } 

  export type Ingredient_eventsGetPayload<S extends boolean | null | undefined | Ingredient_eventsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Ingredient_events :
    S extends undefined ? never :
    S extends { include: any } & (Ingredient_eventsArgs | Ingredient_eventsFindManyArgs)
    ? Ingredient_events  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'ingredients' ? IngredientsGetPayload<S['include'][P]> :
        P extends 'users' ? UsersGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (Ingredient_eventsArgs | Ingredient_eventsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'ingredients' ? IngredientsGetPayload<S['select'][P]> :
        P extends 'users' ? UsersGetPayload<S['select'][P]> :  P extends keyof Ingredient_events ? Ingredient_events[P] : never
  } 
      : Ingredient_events


  type Ingredient_eventsCountArgs = Merge<
    Omit<Ingredient_eventsFindManyArgs, 'select' | 'include'> & {
      select?: Ingredient_eventsCountAggregateInputType | true
    }
  >

  export interface Ingredient_eventsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
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
    findUnique<T extends Ingredient_eventsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, Ingredient_eventsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Ingredient_events'> extends True ? Prisma__Ingredient_eventsClient<Ingredient_eventsGetPayload<T>> : Prisma__Ingredient_eventsClient<Ingredient_eventsGetPayload<T> | null, null>

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
    findUniqueOrThrow<T extends Ingredient_eventsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, Ingredient_eventsFindUniqueOrThrowArgs>
    ): Prisma__Ingredient_eventsClient<Ingredient_eventsGetPayload<T>>

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
    findFirst<T extends Ingredient_eventsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, Ingredient_eventsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Ingredient_events'> extends True ? Prisma__Ingredient_eventsClient<Ingredient_eventsGetPayload<T>> : Prisma__Ingredient_eventsClient<Ingredient_eventsGetPayload<T> | null, null>

    /**
     * Find the first Ingredient_events that matches the filter or
     * throw `NotFoundError` if no matches were found.
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
    findFirstOrThrow<T extends Ingredient_eventsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, Ingredient_eventsFindFirstOrThrowArgs>
    ): Prisma__Ingredient_eventsClient<Ingredient_eventsGetPayload<T>>

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
    findMany<T extends Ingredient_eventsFindManyArgs>(
      args?: SelectSubset<T, Ingredient_eventsFindManyArgs>
    ): PrismaPromise<Array<Ingredient_eventsGetPayload<T>>>

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
    create<T extends Ingredient_eventsCreateArgs>(
      args: SelectSubset<T, Ingredient_eventsCreateArgs>
    ): Prisma__Ingredient_eventsClient<Ingredient_eventsGetPayload<T>>

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
    createMany<T extends Ingredient_eventsCreateManyArgs>(
      args?: SelectSubset<T, Ingredient_eventsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

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
    delete<T extends Ingredient_eventsDeleteArgs>(
      args: SelectSubset<T, Ingredient_eventsDeleteArgs>
    ): Prisma__Ingredient_eventsClient<Ingredient_eventsGetPayload<T>>

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
    update<T extends Ingredient_eventsUpdateArgs>(
      args: SelectSubset<T, Ingredient_eventsUpdateArgs>
    ): Prisma__Ingredient_eventsClient<Ingredient_eventsGetPayload<T>>

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
    deleteMany<T extends Ingredient_eventsDeleteManyArgs>(
      args?: SelectSubset<T, Ingredient_eventsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

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
    updateMany<T extends Ingredient_eventsUpdateManyArgs>(
      args: SelectSubset<T, Ingredient_eventsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

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
    upsert<T extends Ingredient_eventsUpsertArgs>(
      args: SelectSubset<T, Ingredient_eventsUpsertArgs>
    ): Prisma__Ingredient_eventsClient<Ingredient_eventsGetPayload<T>>

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
    ): PrismaPromise<
      T extends _Record<'select', any>
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
    aggregate<T extends Ingredient_eventsAggregateArgs>(args: Subset<T, Ingredient_eventsAggregateArgs>): PrismaPromise<GetIngredient_eventsAggregateType<T>>

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
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, Ingredient_eventsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIngredient_eventsGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Ingredient_events.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__Ingredient_eventsClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    ingredients<T extends IngredientsArgs= {}>(args?: Subset<T, IngredientsArgs>): Prisma__IngredientsClient<IngredientsGetPayload<T> | Null>;

    users<T extends UsersArgs= {}>(args?: Subset<T, UsersArgs>): Prisma__UsersClient<UsersGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Ingredient_events base type for findUnique actions
   */
  export type Ingredient_eventsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Ingredient_events
     * 
    **/
    select?: Ingredient_eventsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Ingredient_eventsInclude | null
    /**
     * Filter, which Ingredient_events to fetch.
     * 
    **/
    where: Ingredient_eventsWhereUniqueInput
  }

  /**
   * Ingredient_events findUnique
   */
  export interface Ingredient_eventsFindUniqueArgs extends Ingredient_eventsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Ingredient_events findUniqueOrThrow
   */
  export type Ingredient_eventsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Ingredient_events
     * 
    **/
    select?: Ingredient_eventsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Ingredient_eventsInclude | null
    /**
     * Filter, which Ingredient_events to fetch.
     * 
    **/
    where: Ingredient_eventsWhereUniqueInput
  }


  /**
   * Ingredient_events base type for findFirst actions
   */
  export type Ingredient_eventsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Ingredient_events
     * 
    **/
    select?: Ingredient_eventsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Ingredient_eventsInclude | null
    /**
     * Filter, which Ingredient_events to fetch.
     * 
    **/
    where?: Ingredient_eventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredient_events to fetch.
     * 
    **/
    orderBy?: Enumerable<Ingredient_eventsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ingredient_events.
     * 
    **/
    cursor?: Ingredient_eventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredient_events from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredient_events.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ingredient_events.
     * 
    **/
    distinct?: Enumerable<Ingredient_eventsScalarFieldEnum>
  }

  /**
   * Ingredient_events findFirst
   */
  export interface Ingredient_eventsFindFirstArgs extends Ingredient_eventsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Ingredient_events findFirstOrThrow
   */
  export type Ingredient_eventsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Ingredient_events
     * 
    **/
    select?: Ingredient_eventsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Ingredient_eventsInclude | null
    /**
     * Filter, which Ingredient_events to fetch.
     * 
    **/
    where?: Ingredient_eventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredient_events to fetch.
     * 
    **/
    orderBy?: Enumerable<Ingredient_eventsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ingredient_events.
     * 
    **/
    cursor?: Ingredient_eventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredient_events from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredient_events.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ingredient_events.
     * 
    **/
    distinct?: Enumerable<Ingredient_eventsScalarFieldEnum>
  }


  /**
   * Ingredient_events findMany
   */
  export type Ingredient_eventsFindManyArgs = {
    /**
     * Select specific fields to fetch from the Ingredient_events
     * 
    **/
    select?: Ingredient_eventsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Ingredient_eventsInclude | null
    /**
     * Filter, which Ingredient_events to fetch.
     * 
    **/
    where?: Ingredient_eventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredient_events to fetch.
     * 
    **/
    orderBy?: Enumerable<Ingredient_eventsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ingredient_events.
     * 
    **/
    cursor?: Ingredient_eventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredient_events from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredient_events.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Ingredient_eventsScalarFieldEnum>
  }


  /**
   * Ingredient_events create
   */
  export type Ingredient_eventsCreateArgs = {
    /**
     * Select specific fields to fetch from the Ingredient_events
     * 
    **/
    select?: Ingredient_eventsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Ingredient_eventsInclude | null
    /**
     * The data needed to create a Ingredient_events.
     * 
    **/
    data: XOR<Ingredient_eventsCreateInput, Ingredient_eventsUncheckedCreateInput>
  }


  /**
   * Ingredient_events createMany
   */
  export type Ingredient_eventsCreateManyArgs = {
    /**
     * The data used to create many Ingredient_events.
     * 
    **/
    data: Enumerable<Ingredient_eventsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Ingredient_events update
   */
  export type Ingredient_eventsUpdateArgs = {
    /**
     * Select specific fields to fetch from the Ingredient_events
     * 
    **/
    select?: Ingredient_eventsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Ingredient_eventsInclude | null
    /**
     * The data needed to update a Ingredient_events.
     * 
    **/
    data: XOR<Ingredient_eventsUpdateInput, Ingredient_eventsUncheckedUpdateInput>
    /**
     * Choose, which Ingredient_events to update.
     * 
    **/
    where: Ingredient_eventsWhereUniqueInput
  }


  /**
   * Ingredient_events updateMany
   */
  export type Ingredient_eventsUpdateManyArgs = {
    /**
     * The data used to update Ingredient_events.
     * 
    **/
    data: XOR<Ingredient_eventsUpdateManyMutationInput, Ingredient_eventsUncheckedUpdateManyInput>
    /**
     * Filter which Ingredient_events to update
     * 
    **/
    where?: Ingredient_eventsWhereInput
  }


  /**
   * Ingredient_events upsert
   */
  export type Ingredient_eventsUpsertArgs = {
    /**
     * Select specific fields to fetch from the Ingredient_events
     * 
    **/
    select?: Ingredient_eventsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Ingredient_eventsInclude | null
    /**
     * The filter to search for the Ingredient_events to update in case it exists.
     * 
    **/
    where: Ingredient_eventsWhereUniqueInput
    /**
     * In case the Ingredient_events found by the `where` argument doesn't exist, create a new Ingredient_events with this data.
     * 
    **/
    create: XOR<Ingredient_eventsCreateInput, Ingredient_eventsUncheckedCreateInput>
    /**
     * In case the Ingredient_events was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<Ingredient_eventsUpdateInput, Ingredient_eventsUncheckedUpdateInput>
  }


  /**
   * Ingredient_events delete
   */
  export type Ingredient_eventsDeleteArgs = {
    /**
     * Select specific fields to fetch from the Ingredient_events
     * 
    **/
    select?: Ingredient_eventsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Ingredient_eventsInclude | null
    /**
     * Filter which Ingredient_events to delete.
     * 
    **/
    where: Ingredient_eventsWhereUniqueInput
  }


  /**
   * Ingredient_events deleteMany
   */
  export type Ingredient_eventsDeleteManyArgs = {
    /**
     * Filter which Ingredient_events to delete
     * 
    **/
    where?: Ingredient_eventsWhereInput
  }


  /**
   * Ingredient_events without action
   */
  export type Ingredient_eventsArgs = {
    /**
     * Select specific fields to fetch from the Ingredient_events
     * 
    **/
    select?: Ingredient_eventsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Ingredient_eventsInclude | null
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
    tracking_type: ingredients_tracking_type | null
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
    tracking_type: ingredients_tracking_type | null
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

  export type IngredientsAggregateArgs = {
    /**
     * Filter which Ingredients to aggregate.
     * 
    **/
    where?: IngredientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredients to fetch.
     * 
    **/
    orderBy?: Enumerable<IngredientsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: IngredientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredients from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredients.
     * 
    **/
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




  export type IngredientsGroupByArgs = {
    where?: IngredientsWhereInput
    orderBy?: Enumerable<IngredientsOrderByWithAggregationInput>
    by: Array<IngredientsScalarFieldEnum>
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
    tracking_type: ingredients_tracking_type | null
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

  type GetIngredientsGroupByPayload<T extends IngredientsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<IngredientsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IngredientsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IngredientsGroupByOutputType[P]>
            : GetScalarType<T[P], IngredientsGroupByOutputType[P]>
        }
      >
    >


  export type IngredientsSelect = {
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
    ingredient_events?: boolean | Ingredients$ingredient_eventsArgs
    ingredients_photo_uploads?: boolean | Ingredients$ingredients_photo_uploadsArgs
    _count?: boolean | IngredientsCountOutputTypeArgs
  }


  export type IngredientsInclude = {
    ingredient_events?: boolean | Ingredients$ingredient_eventsArgs
    ingredients_photo_uploads?: boolean | Ingredients$ingredients_photo_uploadsArgs
    _count?: boolean | IngredientsCountOutputTypeArgs
  } 

  export type IngredientsGetPayload<S extends boolean | null | undefined | IngredientsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Ingredients :
    S extends undefined ? never :
    S extends { include: any } & (IngredientsArgs | IngredientsFindManyArgs)
    ? Ingredients  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'ingredient_events' ? Array < Ingredient_eventsGetPayload<S['include'][P]>>  :
        P extends 'ingredients_photo_uploads' ? Ingredients_photo_uploadsGetPayload<S['include'][P]> | null :
        P extends '_count' ? IngredientsCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (IngredientsArgs | IngredientsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'ingredient_events' ? Array < Ingredient_eventsGetPayload<S['select'][P]>>  :
        P extends 'ingredients_photo_uploads' ? Ingredients_photo_uploadsGetPayload<S['select'][P]> | null :
        P extends '_count' ? IngredientsCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Ingredients ? Ingredients[P] : never
  } 
      : Ingredients


  type IngredientsCountArgs = Merge<
    Omit<IngredientsFindManyArgs, 'select' | 'include'> & {
      select?: IngredientsCountAggregateInputType | true
    }
  >

  export interface IngredientsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
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
    findUnique<T extends IngredientsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, IngredientsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Ingredients'> extends True ? Prisma__IngredientsClient<IngredientsGetPayload<T>> : Prisma__IngredientsClient<IngredientsGetPayload<T> | null, null>

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
    findUniqueOrThrow<T extends IngredientsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, IngredientsFindUniqueOrThrowArgs>
    ): Prisma__IngredientsClient<IngredientsGetPayload<T>>

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
    findFirst<T extends IngredientsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, IngredientsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Ingredients'> extends True ? Prisma__IngredientsClient<IngredientsGetPayload<T>> : Prisma__IngredientsClient<IngredientsGetPayload<T> | null, null>

    /**
     * Find the first Ingredients that matches the filter or
     * throw `NotFoundError` if no matches were found.
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
    findFirstOrThrow<T extends IngredientsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, IngredientsFindFirstOrThrowArgs>
    ): Prisma__IngredientsClient<IngredientsGetPayload<T>>

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
    findMany<T extends IngredientsFindManyArgs>(
      args?: SelectSubset<T, IngredientsFindManyArgs>
    ): PrismaPromise<Array<IngredientsGetPayload<T>>>

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
    create<T extends IngredientsCreateArgs>(
      args: SelectSubset<T, IngredientsCreateArgs>
    ): Prisma__IngredientsClient<IngredientsGetPayload<T>>

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
    createMany<T extends IngredientsCreateManyArgs>(
      args?: SelectSubset<T, IngredientsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

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
    delete<T extends IngredientsDeleteArgs>(
      args: SelectSubset<T, IngredientsDeleteArgs>
    ): Prisma__IngredientsClient<IngredientsGetPayload<T>>

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
    update<T extends IngredientsUpdateArgs>(
      args: SelectSubset<T, IngredientsUpdateArgs>
    ): Prisma__IngredientsClient<IngredientsGetPayload<T>>

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
    deleteMany<T extends IngredientsDeleteManyArgs>(
      args?: SelectSubset<T, IngredientsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

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
    updateMany<T extends IngredientsUpdateManyArgs>(
      args: SelectSubset<T, IngredientsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

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
    upsert<T extends IngredientsUpsertArgs>(
      args: SelectSubset<T, IngredientsUpsertArgs>
    ): Prisma__IngredientsClient<IngredientsGetPayload<T>>

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
    ): PrismaPromise<
      T extends _Record<'select', any>
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
    aggregate<T extends IngredientsAggregateArgs>(args: Subset<T, IngredientsAggregateArgs>): PrismaPromise<GetIngredientsAggregateType<T>>

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
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, IngredientsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIngredientsGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Ingredients.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__IngredientsClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    ingredient_events<T extends Ingredients$ingredient_eventsArgs= {}>(args?: Subset<T, Ingredients$ingredient_eventsArgs>): PrismaPromise<Array<Ingredient_eventsGetPayload<T>>| Null>;

    ingredients_photo_uploads<T extends Ingredients$ingredients_photo_uploadsArgs= {}>(args?: Subset<T, Ingredients$ingredients_photo_uploadsArgs>): Prisma__Ingredients_photo_uploadsClient<Ingredients_photo_uploadsGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Ingredients base type for findUnique actions
   */
  export type IngredientsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Ingredients
     * 
    **/
    select?: IngredientsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IngredientsInclude | null
    /**
     * Filter, which Ingredients to fetch.
     * 
    **/
    where: IngredientsWhereUniqueInput
  }

  /**
   * Ingredients findUnique
   */
  export interface IngredientsFindUniqueArgs extends IngredientsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Ingredients findUniqueOrThrow
   */
  export type IngredientsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Ingredients
     * 
    **/
    select?: IngredientsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IngredientsInclude | null
    /**
     * Filter, which Ingredients to fetch.
     * 
    **/
    where: IngredientsWhereUniqueInput
  }


  /**
   * Ingredients base type for findFirst actions
   */
  export type IngredientsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Ingredients
     * 
    **/
    select?: IngredientsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IngredientsInclude | null
    /**
     * Filter, which Ingredients to fetch.
     * 
    **/
    where?: IngredientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredients to fetch.
     * 
    **/
    orderBy?: Enumerable<IngredientsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ingredients.
     * 
    **/
    cursor?: IngredientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredients from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredients.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ingredients.
     * 
    **/
    distinct?: Enumerable<IngredientsScalarFieldEnum>
  }

  /**
   * Ingredients findFirst
   */
  export interface IngredientsFindFirstArgs extends IngredientsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Ingredients findFirstOrThrow
   */
  export type IngredientsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Ingredients
     * 
    **/
    select?: IngredientsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IngredientsInclude | null
    /**
     * Filter, which Ingredients to fetch.
     * 
    **/
    where?: IngredientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredients to fetch.
     * 
    **/
    orderBy?: Enumerable<IngredientsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ingredients.
     * 
    **/
    cursor?: IngredientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredients from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredients.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ingredients.
     * 
    **/
    distinct?: Enumerable<IngredientsScalarFieldEnum>
  }


  /**
   * Ingredients findMany
   */
  export type IngredientsFindManyArgs = {
    /**
     * Select specific fields to fetch from the Ingredients
     * 
    **/
    select?: IngredientsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IngredientsInclude | null
    /**
     * Filter, which Ingredients to fetch.
     * 
    **/
    where?: IngredientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredients to fetch.
     * 
    **/
    orderBy?: Enumerable<IngredientsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ingredients.
     * 
    **/
    cursor?: IngredientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredients from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredients.
     * 
    **/
    skip?: number
    distinct?: Enumerable<IngredientsScalarFieldEnum>
  }


  /**
   * Ingredients create
   */
  export type IngredientsCreateArgs = {
    /**
     * Select specific fields to fetch from the Ingredients
     * 
    **/
    select?: IngredientsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IngredientsInclude | null
    /**
     * The data needed to create a Ingredients.
     * 
    **/
    data: XOR<IngredientsCreateInput, IngredientsUncheckedCreateInput>
  }


  /**
   * Ingredients createMany
   */
  export type IngredientsCreateManyArgs = {
    /**
     * The data used to create many Ingredients.
     * 
    **/
    data: Enumerable<IngredientsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Ingredients update
   */
  export type IngredientsUpdateArgs = {
    /**
     * Select specific fields to fetch from the Ingredients
     * 
    **/
    select?: IngredientsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IngredientsInclude | null
    /**
     * The data needed to update a Ingredients.
     * 
    **/
    data: XOR<IngredientsUpdateInput, IngredientsUncheckedUpdateInput>
    /**
     * Choose, which Ingredients to update.
     * 
    **/
    where: IngredientsWhereUniqueInput
  }


  /**
   * Ingredients updateMany
   */
  export type IngredientsUpdateManyArgs = {
    /**
     * The data used to update Ingredients.
     * 
    **/
    data: XOR<IngredientsUpdateManyMutationInput, IngredientsUncheckedUpdateManyInput>
    /**
     * Filter which Ingredients to update
     * 
    **/
    where?: IngredientsWhereInput
  }


  /**
   * Ingredients upsert
   */
  export type IngredientsUpsertArgs = {
    /**
     * Select specific fields to fetch from the Ingredients
     * 
    **/
    select?: IngredientsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IngredientsInclude | null
    /**
     * The filter to search for the Ingredients to update in case it exists.
     * 
    **/
    where: IngredientsWhereUniqueInput
    /**
     * In case the Ingredients found by the `where` argument doesn't exist, create a new Ingredients with this data.
     * 
    **/
    create: XOR<IngredientsCreateInput, IngredientsUncheckedCreateInput>
    /**
     * In case the Ingredients was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<IngredientsUpdateInput, IngredientsUncheckedUpdateInput>
  }


  /**
   * Ingredients delete
   */
  export type IngredientsDeleteArgs = {
    /**
     * Select specific fields to fetch from the Ingredients
     * 
    **/
    select?: IngredientsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IngredientsInclude | null
    /**
     * Filter which Ingredients to delete.
     * 
    **/
    where: IngredientsWhereUniqueInput
  }


  /**
   * Ingredients deleteMany
   */
  export type IngredientsDeleteManyArgs = {
    /**
     * Filter which Ingredients to delete
     * 
    **/
    where?: IngredientsWhereInput
  }


  /**
   * Ingredients.ingredient_events
   */
  export type Ingredients$ingredient_eventsArgs = {
    /**
     * Select specific fields to fetch from the Ingredient_events
     * 
    **/
    select?: Ingredient_eventsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Ingredient_eventsInclude | null
    where?: Ingredient_eventsWhereInput
    orderBy?: Enumerable<Ingredient_eventsOrderByWithRelationInput>
    cursor?: Ingredient_eventsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<Ingredient_eventsScalarFieldEnum>
  }


  /**
   * Ingredients.ingredients_photo_uploads
   */
  export type Ingredients$ingredients_photo_uploadsArgs = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploads
     * 
    **/
    select?: Ingredients_photo_uploadsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Ingredients_photo_uploadsInclude | null
    where?: Ingredients_photo_uploadsWhereInput
  }


  /**
   * Ingredients without action
   */
  export type IngredientsArgs = {
    /**
     * Select specific fields to fetch from the Ingredients
     * 
    **/
    select?: IngredientsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IngredientsInclude | null
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
    state: ingredient_photo_upload_state | null
    upload_duration_sec: number | null
    ai_processing_duration_sec: number | null
    photo_url: string | null
  }

  export type Ingredients_photo_uploadsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    created_at: Date | null
    uploaded_at: Date | null
    state: ingredient_photo_upload_state | null
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

  export type Ingredients_photo_uploadsAggregateArgs = {
    /**
     * Filter which Ingredients_photo_uploads to aggregate.
     * 
    **/
    where?: Ingredients_photo_uploadsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredients_photo_uploads to fetch.
     * 
    **/
    orderBy?: Enumerable<Ingredients_photo_uploadsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: Ingredients_photo_uploadsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredients_photo_uploads from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredients_photo_uploads.
     * 
    **/
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




  export type Ingredients_photo_uploadsGroupByArgs = {
    where?: Ingredients_photo_uploadsWhereInput
    orderBy?: Enumerable<Ingredients_photo_uploadsOrderByWithAggregationInput>
    by: Array<Ingredients_photo_uploadsScalarFieldEnum>
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
    state: ingredient_photo_upload_state
    upload_duration_sec: number | null
    ai_processing_duration_sec: number | null
    photo_url: string | null
    _count: Ingredients_photo_uploadsCountAggregateOutputType | null
    _avg: Ingredients_photo_uploadsAvgAggregateOutputType | null
    _sum: Ingredients_photo_uploadsSumAggregateOutputType | null
    _min: Ingredients_photo_uploadsMinAggregateOutputType | null
    _max: Ingredients_photo_uploadsMaxAggregateOutputType | null
  }

  type GetIngredients_photo_uploadsGroupByPayload<T extends Ingredients_photo_uploadsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Ingredients_photo_uploadsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Ingredients_photo_uploadsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Ingredients_photo_uploadsGroupByOutputType[P]>
            : GetScalarType<T[P], Ingredients_photo_uploadsGroupByOutputType[P]>
        }
      >
    >


  export type Ingredients_photo_uploadsSelect = {
    id?: boolean
    user_id?: boolean
    created_at?: boolean
    uploaded_at?: boolean
    state?: boolean
    upload_duration_sec?: boolean
    ai_processing_duration_sec?: boolean
    photo_url?: boolean
    ingredients?: boolean | Ingredients_photo_uploads$ingredientsArgs
    users?: boolean | UsersArgs
    _count?: boolean | Ingredients_photo_uploadsCountOutputTypeArgs
  }


  export type Ingredients_photo_uploadsInclude = {
    ingredients?: boolean | Ingredients_photo_uploads$ingredientsArgs
    users?: boolean | UsersArgs
    _count?: boolean | Ingredients_photo_uploadsCountOutputTypeArgs
  } 

  export type Ingredients_photo_uploadsGetPayload<S extends boolean | null | undefined | Ingredients_photo_uploadsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Ingredients_photo_uploads :
    S extends undefined ? never :
    S extends { include: any } & (Ingredients_photo_uploadsArgs | Ingredients_photo_uploadsFindManyArgs)
    ? Ingredients_photo_uploads  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'ingredients' ? Array < IngredientsGetPayload<S['include'][P]>>  :
        P extends 'users' ? UsersGetPayload<S['include'][P]> :
        P extends '_count' ? Ingredients_photo_uploadsCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (Ingredients_photo_uploadsArgs | Ingredients_photo_uploadsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'ingredients' ? Array < IngredientsGetPayload<S['select'][P]>>  :
        P extends 'users' ? UsersGetPayload<S['select'][P]> :
        P extends '_count' ? Ingredients_photo_uploadsCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Ingredients_photo_uploads ? Ingredients_photo_uploads[P] : never
  } 
      : Ingredients_photo_uploads


  type Ingredients_photo_uploadsCountArgs = Merge<
    Omit<Ingredients_photo_uploadsFindManyArgs, 'select' | 'include'> & {
      select?: Ingredients_photo_uploadsCountAggregateInputType | true
    }
  >

  export interface Ingredients_photo_uploadsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
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
    findUnique<T extends Ingredients_photo_uploadsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, Ingredients_photo_uploadsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Ingredients_photo_uploads'> extends True ? Prisma__Ingredients_photo_uploadsClient<Ingredients_photo_uploadsGetPayload<T>> : Prisma__Ingredients_photo_uploadsClient<Ingredients_photo_uploadsGetPayload<T> | null, null>

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
    findUniqueOrThrow<T extends Ingredients_photo_uploadsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, Ingredients_photo_uploadsFindUniqueOrThrowArgs>
    ): Prisma__Ingredients_photo_uploadsClient<Ingredients_photo_uploadsGetPayload<T>>

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
    findFirst<T extends Ingredients_photo_uploadsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, Ingredients_photo_uploadsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Ingredients_photo_uploads'> extends True ? Prisma__Ingredients_photo_uploadsClient<Ingredients_photo_uploadsGetPayload<T>> : Prisma__Ingredients_photo_uploadsClient<Ingredients_photo_uploadsGetPayload<T> | null, null>

    /**
     * Find the first Ingredients_photo_uploads that matches the filter or
     * throw `NotFoundError` if no matches were found.
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
    findFirstOrThrow<T extends Ingredients_photo_uploadsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, Ingredients_photo_uploadsFindFirstOrThrowArgs>
    ): Prisma__Ingredients_photo_uploadsClient<Ingredients_photo_uploadsGetPayload<T>>

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
    findMany<T extends Ingredients_photo_uploadsFindManyArgs>(
      args?: SelectSubset<T, Ingredients_photo_uploadsFindManyArgs>
    ): PrismaPromise<Array<Ingredients_photo_uploadsGetPayload<T>>>

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
    create<T extends Ingredients_photo_uploadsCreateArgs>(
      args: SelectSubset<T, Ingredients_photo_uploadsCreateArgs>
    ): Prisma__Ingredients_photo_uploadsClient<Ingredients_photo_uploadsGetPayload<T>>

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
    createMany<T extends Ingredients_photo_uploadsCreateManyArgs>(
      args?: SelectSubset<T, Ingredients_photo_uploadsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

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
    delete<T extends Ingredients_photo_uploadsDeleteArgs>(
      args: SelectSubset<T, Ingredients_photo_uploadsDeleteArgs>
    ): Prisma__Ingredients_photo_uploadsClient<Ingredients_photo_uploadsGetPayload<T>>

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
    update<T extends Ingredients_photo_uploadsUpdateArgs>(
      args: SelectSubset<T, Ingredients_photo_uploadsUpdateArgs>
    ): Prisma__Ingredients_photo_uploadsClient<Ingredients_photo_uploadsGetPayload<T>>

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
    deleteMany<T extends Ingredients_photo_uploadsDeleteManyArgs>(
      args?: SelectSubset<T, Ingredients_photo_uploadsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

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
    updateMany<T extends Ingredients_photo_uploadsUpdateManyArgs>(
      args: SelectSubset<T, Ingredients_photo_uploadsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

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
    upsert<T extends Ingredients_photo_uploadsUpsertArgs>(
      args: SelectSubset<T, Ingredients_photo_uploadsUpsertArgs>
    ): Prisma__Ingredients_photo_uploadsClient<Ingredients_photo_uploadsGetPayload<T>>

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
    ): PrismaPromise<
      T extends _Record<'select', any>
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
    aggregate<T extends Ingredients_photo_uploadsAggregateArgs>(args: Subset<T, Ingredients_photo_uploadsAggregateArgs>): PrismaPromise<GetIngredients_photo_uploadsAggregateType<T>>

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
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, Ingredients_photo_uploadsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIngredients_photo_uploadsGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Ingredients_photo_uploads.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__Ingredients_photo_uploadsClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    ingredients<T extends Ingredients_photo_uploads$ingredientsArgs= {}>(args?: Subset<T, Ingredients_photo_uploads$ingredientsArgs>): PrismaPromise<Array<IngredientsGetPayload<T>>| Null>;

    users<T extends UsersArgs= {}>(args?: Subset<T, UsersArgs>): Prisma__UsersClient<UsersGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Ingredients_photo_uploads base type for findUnique actions
   */
  export type Ingredients_photo_uploadsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploads
     * 
    **/
    select?: Ingredients_photo_uploadsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Ingredients_photo_uploadsInclude | null
    /**
     * Filter, which Ingredients_photo_uploads to fetch.
     * 
    **/
    where: Ingredients_photo_uploadsWhereUniqueInput
  }

  /**
   * Ingredients_photo_uploads findUnique
   */
  export interface Ingredients_photo_uploadsFindUniqueArgs extends Ingredients_photo_uploadsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Ingredients_photo_uploads findUniqueOrThrow
   */
  export type Ingredients_photo_uploadsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploads
     * 
    **/
    select?: Ingredients_photo_uploadsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Ingredients_photo_uploadsInclude | null
    /**
     * Filter, which Ingredients_photo_uploads to fetch.
     * 
    **/
    where: Ingredients_photo_uploadsWhereUniqueInput
  }


  /**
   * Ingredients_photo_uploads base type for findFirst actions
   */
  export type Ingredients_photo_uploadsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploads
     * 
    **/
    select?: Ingredients_photo_uploadsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Ingredients_photo_uploadsInclude | null
    /**
     * Filter, which Ingredients_photo_uploads to fetch.
     * 
    **/
    where?: Ingredients_photo_uploadsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredients_photo_uploads to fetch.
     * 
    **/
    orderBy?: Enumerable<Ingredients_photo_uploadsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ingredients_photo_uploads.
     * 
    **/
    cursor?: Ingredients_photo_uploadsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredients_photo_uploads from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredients_photo_uploads.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ingredients_photo_uploads.
     * 
    **/
    distinct?: Enumerable<Ingredients_photo_uploadsScalarFieldEnum>
  }

  /**
   * Ingredients_photo_uploads findFirst
   */
  export interface Ingredients_photo_uploadsFindFirstArgs extends Ingredients_photo_uploadsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Ingredients_photo_uploads findFirstOrThrow
   */
  export type Ingredients_photo_uploadsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploads
     * 
    **/
    select?: Ingredients_photo_uploadsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Ingredients_photo_uploadsInclude | null
    /**
     * Filter, which Ingredients_photo_uploads to fetch.
     * 
    **/
    where?: Ingredients_photo_uploadsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredients_photo_uploads to fetch.
     * 
    **/
    orderBy?: Enumerable<Ingredients_photo_uploadsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ingredients_photo_uploads.
     * 
    **/
    cursor?: Ingredients_photo_uploadsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredients_photo_uploads from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredients_photo_uploads.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ingredients_photo_uploads.
     * 
    **/
    distinct?: Enumerable<Ingredients_photo_uploadsScalarFieldEnum>
  }


  /**
   * Ingredients_photo_uploads findMany
   */
  export type Ingredients_photo_uploadsFindManyArgs = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploads
     * 
    **/
    select?: Ingredients_photo_uploadsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Ingredients_photo_uploadsInclude | null
    /**
     * Filter, which Ingredients_photo_uploads to fetch.
     * 
    **/
    where?: Ingredients_photo_uploadsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ingredients_photo_uploads to fetch.
     * 
    **/
    orderBy?: Enumerable<Ingredients_photo_uploadsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ingredients_photo_uploads.
     * 
    **/
    cursor?: Ingredients_photo_uploadsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ingredients_photo_uploads from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ingredients_photo_uploads.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Ingredients_photo_uploadsScalarFieldEnum>
  }


  /**
   * Ingredients_photo_uploads create
   */
  export type Ingredients_photo_uploadsCreateArgs = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploads
     * 
    **/
    select?: Ingredients_photo_uploadsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Ingredients_photo_uploadsInclude | null
    /**
     * The data needed to create a Ingredients_photo_uploads.
     * 
    **/
    data: XOR<Ingredients_photo_uploadsCreateInput, Ingredients_photo_uploadsUncheckedCreateInput>
  }


  /**
   * Ingredients_photo_uploads createMany
   */
  export type Ingredients_photo_uploadsCreateManyArgs = {
    /**
     * The data used to create many Ingredients_photo_uploads.
     * 
    **/
    data: Enumerable<Ingredients_photo_uploadsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Ingredients_photo_uploads update
   */
  export type Ingredients_photo_uploadsUpdateArgs = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploads
     * 
    **/
    select?: Ingredients_photo_uploadsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Ingredients_photo_uploadsInclude | null
    /**
     * The data needed to update a Ingredients_photo_uploads.
     * 
    **/
    data: XOR<Ingredients_photo_uploadsUpdateInput, Ingredients_photo_uploadsUncheckedUpdateInput>
    /**
     * Choose, which Ingredients_photo_uploads to update.
     * 
    **/
    where: Ingredients_photo_uploadsWhereUniqueInput
  }


  /**
   * Ingredients_photo_uploads updateMany
   */
  export type Ingredients_photo_uploadsUpdateManyArgs = {
    /**
     * The data used to update Ingredients_photo_uploads.
     * 
    **/
    data: XOR<Ingredients_photo_uploadsUpdateManyMutationInput, Ingredients_photo_uploadsUncheckedUpdateManyInput>
    /**
     * Filter which Ingredients_photo_uploads to update
     * 
    **/
    where?: Ingredients_photo_uploadsWhereInput
  }


  /**
   * Ingredients_photo_uploads upsert
   */
  export type Ingredients_photo_uploadsUpsertArgs = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploads
     * 
    **/
    select?: Ingredients_photo_uploadsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Ingredients_photo_uploadsInclude | null
    /**
     * The filter to search for the Ingredients_photo_uploads to update in case it exists.
     * 
    **/
    where: Ingredients_photo_uploadsWhereUniqueInput
    /**
     * In case the Ingredients_photo_uploads found by the `where` argument doesn't exist, create a new Ingredients_photo_uploads with this data.
     * 
    **/
    create: XOR<Ingredients_photo_uploadsCreateInput, Ingredients_photo_uploadsUncheckedCreateInput>
    /**
     * In case the Ingredients_photo_uploads was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<Ingredients_photo_uploadsUpdateInput, Ingredients_photo_uploadsUncheckedUpdateInput>
  }


  /**
   * Ingredients_photo_uploads delete
   */
  export type Ingredients_photo_uploadsDeleteArgs = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploads
     * 
    **/
    select?: Ingredients_photo_uploadsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Ingredients_photo_uploadsInclude | null
    /**
     * Filter which Ingredients_photo_uploads to delete.
     * 
    **/
    where: Ingredients_photo_uploadsWhereUniqueInput
  }


  /**
   * Ingredients_photo_uploads deleteMany
   */
  export type Ingredients_photo_uploadsDeleteManyArgs = {
    /**
     * Filter which Ingredients_photo_uploads to delete
     * 
    **/
    where?: Ingredients_photo_uploadsWhereInput
  }


  /**
   * Ingredients_photo_uploads.ingredients
   */
  export type Ingredients_photo_uploads$ingredientsArgs = {
    /**
     * Select specific fields to fetch from the Ingredients
     * 
    **/
    select?: IngredientsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IngredientsInclude | null
    where?: IngredientsWhereInput
    orderBy?: Enumerable<IngredientsOrderByWithRelationInput>
    cursor?: IngredientsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<IngredientsScalarFieldEnum>
  }


  /**
   * Ingredients_photo_uploads without action
   */
  export type Ingredients_photo_uploadsArgs = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploads
     * 
    **/
    select?: Ingredients_photo_uploadsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Ingredients_photo_uploadsInclude | null
  }



  /**
   * Model Jobs
   */


  export type AggregateJobs = {
    _count: JobsCountAggregateOutputType | null
    _min: JobsMinAggregateOutputType | null
    _max: JobsMaxAggregateOutputType | null
  }

  export type JobsMinAggregateOutputType = {
    id: string | null
    state: jobs_state | null
    target_id: string | null
    type: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type JobsMaxAggregateOutputType = {
    id: string | null
    state: jobs_state | null
    target_id: string | null
    type: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type JobsCountAggregateOutputType = {
    id: number
    state: number
    target_id: number
    type: number
    created_at: number
    updated_at: number
    error: number
    result: number
    _all: number
  }


  export type JobsMinAggregateInputType = {
    id?: true
    state?: true
    target_id?: true
    type?: true
    created_at?: true
    updated_at?: true
  }

  export type JobsMaxAggregateInputType = {
    id?: true
    state?: true
    target_id?: true
    type?: true
    created_at?: true
    updated_at?: true
  }

  export type JobsCountAggregateInputType = {
    id?: true
    state?: true
    target_id?: true
    type?: true
    created_at?: true
    updated_at?: true
    error?: true
    result?: true
    _all?: true
  }

  export type JobsAggregateArgs = {
    /**
     * Filter which Jobs to aggregate.
     * 
    **/
    where?: JobsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     * 
    **/
    orderBy?: Enumerable<JobsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: JobsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Jobs
    **/
    _count?: true | JobsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobsMaxAggregateInputType
  }

  export type GetJobsAggregateType<T extends JobsAggregateArgs> = {
        [P in keyof T & keyof AggregateJobs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobs[P]>
      : GetScalarType<T[P], AggregateJobs[P]>
  }




  export type JobsGroupByArgs = {
    where?: JobsWhereInput
    orderBy?: Enumerable<JobsOrderByWithAggregationInput>
    by: Array<JobsScalarFieldEnum>
    having?: JobsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobsCountAggregateInputType | true
    _min?: JobsMinAggregateInputType
    _max?: JobsMaxAggregateInputType
  }


  export type JobsGroupByOutputType = {
    id: string
    state: jobs_state
    target_id: string | null
    type: string
    created_at: Date
    updated_at: Date
    error: JsonValue | null
    result: JsonValue | null
    _count: JobsCountAggregateOutputType | null
    _min: JobsMinAggregateOutputType | null
    _max: JobsMaxAggregateOutputType | null
  }

  type GetJobsGroupByPayload<T extends JobsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<JobsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobsGroupByOutputType[P]>
            : GetScalarType<T[P], JobsGroupByOutputType[P]>
        }
      >
    >


  export type JobsSelect = {
    id?: boolean
    state?: boolean
    target_id?: boolean
    type?: boolean
    created_at?: boolean
    updated_at?: boolean
    error?: boolean
    result?: boolean
  }


  export type JobsGetPayload<S extends boolean | null | undefined | JobsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Jobs :
    S extends undefined ? never :
    S extends { include: any } & (JobsArgs | JobsFindManyArgs)
    ? Jobs 
    : S extends { select: any } & (JobsArgs | JobsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof Jobs ? Jobs[P] : never
  } 
      : Jobs


  type JobsCountArgs = Merge<
    Omit<JobsFindManyArgs, 'select' | 'include'> & {
      select?: JobsCountAggregateInputType | true
    }
  >

  export interface JobsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Jobs that matches the filter.
     * @param {JobsFindUniqueArgs} args - Arguments to find a Jobs
     * @example
     * // Get one Jobs
     * const jobs = await prisma.jobs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends JobsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, JobsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Jobs'> extends True ? Prisma__JobsClient<JobsGetPayload<T>> : Prisma__JobsClient<JobsGetPayload<T> | null, null>

    /**
     * Find one Jobs that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {JobsFindUniqueOrThrowArgs} args - Arguments to find a Jobs
     * @example
     * // Get one Jobs
     * const jobs = await prisma.jobs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends JobsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, JobsFindUniqueOrThrowArgs>
    ): Prisma__JobsClient<JobsGetPayload<T>>

    /**
     * Find the first Jobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobsFindFirstArgs} args - Arguments to find a Jobs
     * @example
     * // Get one Jobs
     * const jobs = await prisma.jobs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends JobsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, JobsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Jobs'> extends True ? Prisma__JobsClient<JobsGetPayload<T>> : Prisma__JobsClient<JobsGetPayload<T> | null, null>

    /**
     * Find the first Jobs that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobsFindFirstOrThrowArgs} args - Arguments to find a Jobs
     * @example
     * // Get one Jobs
     * const jobs = await prisma.jobs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends JobsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, JobsFindFirstOrThrowArgs>
    ): Prisma__JobsClient<JobsGetPayload<T>>

    /**
     * Find zero or more Jobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jobs
     * const jobs = await prisma.jobs.findMany()
     * 
     * // Get first 10 Jobs
     * const jobs = await prisma.jobs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobsWithIdOnly = await prisma.jobs.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends JobsFindManyArgs>(
      args?: SelectSubset<T, JobsFindManyArgs>
    ): PrismaPromise<Array<JobsGetPayload<T>>>

    /**
     * Create a Jobs.
     * @param {JobsCreateArgs} args - Arguments to create a Jobs.
     * @example
     * // Create one Jobs
     * const Jobs = await prisma.jobs.create({
     *   data: {
     *     // ... data to create a Jobs
     *   }
     * })
     * 
    **/
    create<T extends JobsCreateArgs>(
      args: SelectSubset<T, JobsCreateArgs>
    ): Prisma__JobsClient<JobsGetPayload<T>>

    /**
     * Create many Jobs.
     *     @param {JobsCreateManyArgs} args - Arguments to create many Jobs.
     *     @example
     *     // Create many Jobs
     *     const jobs = await prisma.jobs.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends JobsCreateManyArgs>(
      args?: SelectSubset<T, JobsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Jobs.
     * @param {JobsDeleteArgs} args - Arguments to delete one Jobs.
     * @example
     * // Delete one Jobs
     * const Jobs = await prisma.jobs.delete({
     *   where: {
     *     // ... filter to delete one Jobs
     *   }
     * })
     * 
    **/
    delete<T extends JobsDeleteArgs>(
      args: SelectSubset<T, JobsDeleteArgs>
    ): Prisma__JobsClient<JobsGetPayload<T>>

    /**
     * Update one Jobs.
     * @param {JobsUpdateArgs} args - Arguments to update one Jobs.
     * @example
     * // Update one Jobs
     * const jobs = await prisma.jobs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends JobsUpdateArgs>(
      args: SelectSubset<T, JobsUpdateArgs>
    ): Prisma__JobsClient<JobsGetPayload<T>>

    /**
     * Delete zero or more Jobs.
     * @param {JobsDeleteManyArgs} args - Arguments to filter Jobs to delete.
     * @example
     * // Delete a few Jobs
     * const { count } = await prisma.jobs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends JobsDeleteManyArgs>(
      args?: SelectSubset<T, JobsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jobs
     * const jobs = await prisma.jobs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends JobsUpdateManyArgs>(
      args: SelectSubset<T, JobsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Jobs.
     * @param {JobsUpsertArgs} args - Arguments to update or create a Jobs.
     * @example
     * // Update or create a Jobs
     * const jobs = await prisma.jobs.upsert({
     *   create: {
     *     // ... data to create a Jobs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Jobs we want to update
     *   }
     * })
    **/
    upsert<T extends JobsUpsertArgs>(
      args: SelectSubset<T, JobsUpsertArgs>
    ): Prisma__JobsClient<JobsGetPayload<T>>

    /**
     * Count the number of Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobsCountArgs} args - Arguments to filter Jobs to count.
     * @example
     * // Count the number of Jobs
     * const count = await prisma.jobs.count({
     *   where: {
     *     // ... the filter for the Jobs we want to count
     *   }
     * })
    **/
    count<T extends JobsCountArgs>(
      args?: Subset<T, JobsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JobsAggregateArgs>(args: Subset<T, JobsAggregateArgs>): PrismaPromise<GetJobsAggregateType<T>>

    /**
     * Group by Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobsGroupByArgs} args - Group by arguments.
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
      T extends JobsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobsGroupByArgs['orderBy'] }
        : { orderBy?: JobsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, JobsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobsGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Jobs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__JobsClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Jobs base type for findUnique actions
   */
  export type JobsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Jobs
     * 
    **/
    select?: JobsSelect | null
    /**
     * Filter, which Jobs to fetch.
     * 
    **/
    where: JobsWhereUniqueInput
  }

  /**
   * Jobs findUnique
   */
  export interface JobsFindUniqueArgs extends JobsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Jobs findUniqueOrThrow
   */
  export type JobsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Jobs
     * 
    **/
    select?: JobsSelect | null
    /**
     * Filter, which Jobs to fetch.
     * 
    **/
    where: JobsWhereUniqueInput
  }


  /**
   * Jobs base type for findFirst actions
   */
  export type JobsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Jobs
     * 
    **/
    select?: JobsSelect | null
    /**
     * Filter, which Jobs to fetch.
     * 
    **/
    where?: JobsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     * 
    **/
    orderBy?: Enumerable<JobsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     * 
    **/
    cursor?: JobsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     * 
    **/
    distinct?: Enumerable<JobsScalarFieldEnum>
  }

  /**
   * Jobs findFirst
   */
  export interface JobsFindFirstArgs extends JobsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Jobs findFirstOrThrow
   */
  export type JobsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Jobs
     * 
    **/
    select?: JobsSelect | null
    /**
     * Filter, which Jobs to fetch.
     * 
    **/
    where?: JobsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     * 
    **/
    orderBy?: Enumerable<JobsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     * 
    **/
    cursor?: JobsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     * 
    **/
    distinct?: Enumerable<JobsScalarFieldEnum>
  }


  /**
   * Jobs findMany
   */
  export type JobsFindManyArgs = {
    /**
     * Select specific fields to fetch from the Jobs
     * 
    **/
    select?: JobsSelect | null
    /**
     * Filter, which Jobs to fetch.
     * 
    **/
    where?: JobsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     * 
    **/
    orderBy?: Enumerable<JobsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Jobs.
     * 
    **/
    cursor?: JobsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     * 
    **/
    skip?: number
    distinct?: Enumerable<JobsScalarFieldEnum>
  }


  /**
   * Jobs create
   */
  export type JobsCreateArgs = {
    /**
     * Select specific fields to fetch from the Jobs
     * 
    **/
    select?: JobsSelect | null
    /**
     * The data needed to create a Jobs.
     * 
    **/
    data: XOR<JobsCreateInput, JobsUncheckedCreateInput>
  }


  /**
   * Jobs createMany
   */
  export type JobsCreateManyArgs = {
    /**
     * The data used to create many Jobs.
     * 
    **/
    data: Enumerable<JobsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Jobs update
   */
  export type JobsUpdateArgs = {
    /**
     * Select specific fields to fetch from the Jobs
     * 
    **/
    select?: JobsSelect | null
    /**
     * The data needed to update a Jobs.
     * 
    **/
    data: XOR<JobsUpdateInput, JobsUncheckedUpdateInput>
    /**
     * Choose, which Jobs to update.
     * 
    **/
    where: JobsWhereUniqueInput
  }


  /**
   * Jobs updateMany
   */
  export type JobsUpdateManyArgs = {
    /**
     * The data used to update Jobs.
     * 
    **/
    data: XOR<JobsUpdateManyMutationInput, JobsUncheckedUpdateManyInput>
    /**
     * Filter which Jobs to update
     * 
    **/
    where?: JobsWhereInput
  }


  /**
   * Jobs upsert
   */
  export type JobsUpsertArgs = {
    /**
     * Select specific fields to fetch from the Jobs
     * 
    **/
    select?: JobsSelect | null
    /**
     * The filter to search for the Jobs to update in case it exists.
     * 
    **/
    where: JobsWhereUniqueInput
    /**
     * In case the Jobs found by the `where` argument doesn't exist, create a new Jobs with this data.
     * 
    **/
    create: XOR<JobsCreateInput, JobsUncheckedCreateInput>
    /**
     * In case the Jobs was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<JobsUpdateInput, JobsUncheckedUpdateInput>
  }


  /**
   * Jobs delete
   */
  export type JobsDeleteArgs = {
    /**
     * Select specific fields to fetch from the Jobs
     * 
    **/
    select?: JobsSelect | null
    /**
     * Filter which Jobs to delete.
     * 
    **/
    where: JobsWhereUniqueInput
  }


  /**
   * Jobs deleteMany
   */
  export type JobsDeleteManyArgs = {
    /**
     * Filter which Jobs to delete
     * 
    **/
    where?: JobsWhereInput
  }


  /**
   * Jobs without action
   */
  export type JobsArgs = {
    /**
     * Select specific fields to fetch from the Jobs
     * 
    **/
    select?: JobsSelect | null
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
    grocery_section: grocery_section | null
    recipe_id: string | null
  }

  export type Recipe_ingredientsMaxAggregateOutputType = {
    id: string | null
    listing: string | null
    extracted_name: string | null
    embedding: string | null
    grocery_section: grocery_section | null
    recipe_id: string | null
  }

  export type Recipe_ingredientsCountAggregateOutputType = {
    id: number
    listing: number
    extracted_name: number
    embedding: number
    grocery_section: number
    recipe_id: number
    _all: number
  }


  export type Recipe_ingredientsMinAggregateInputType = {
    id?: true
    listing?: true
    extracted_name?: true
    embedding?: true
    grocery_section?: true
    recipe_id?: true
  }

  export type Recipe_ingredientsMaxAggregateInputType = {
    id?: true
    listing?: true
    extracted_name?: true
    embedding?: true
    grocery_section?: true
    recipe_id?: true
  }

  export type Recipe_ingredientsCountAggregateInputType = {
    id?: true
    listing?: true
    extracted_name?: true
    embedding?: true
    grocery_section?: true
    recipe_id?: true
    _all?: true
  }

  export type Recipe_ingredientsAggregateArgs = {
    /**
     * Filter which Recipe_ingredients to aggregate.
     * 
    **/
    where?: Recipe_ingredientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipe_ingredients to fetch.
     * 
    **/
    orderBy?: Enumerable<Recipe_ingredientsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: Recipe_ingredientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipe_ingredients from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipe_ingredients.
     * 
    **/
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




  export type Recipe_ingredientsGroupByArgs = {
    where?: Recipe_ingredientsWhereInput
    orderBy?: Enumerable<Recipe_ingredientsOrderByWithAggregationInput>
    by: Array<Recipe_ingredientsScalarFieldEnum>
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
    grocery_section: grocery_section
    recipe_id: string
    _count: Recipe_ingredientsCountAggregateOutputType | null
    _min: Recipe_ingredientsMinAggregateOutputType | null
    _max: Recipe_ingredientsMaxAggregateOutputType | null
  }

  type GetRecipe_ingredientsGroupByPayload<T extends Recipe_ingredientsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Recipe_ingredientsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Recipe_ingredientsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Recipe_ingredientsGroupByOutputType[P]>
            : GetScalarType<T[P], Recipe_ingredientsGroupByOutputType[P]>
        }
      >
    >


  export type Recipe_ingredientsSelect = {
    id?: boolean
    listing?: boolean
    extracted_name?: boolean
    embedding?: boolean
    grocery_section?: boolean
    recipe_id?: boolean
    recipes?: boolean | RecipesArgs
    shopping_list?: boolean | Recipe_ingredients$shopping_listArgs
    _count?: boolean | Recipe_ingredientsCountOutputTypeArgs
  }


  export type Recipe_ingredientsInclude = {
    recipes?: boolean | RecipesArgs
    shopping_list?: boolean | Recipe_ingredients$shopping_listArgs
    _count?: boolean | Recipe_ingredientsCountOutputTypeArgs
  } 

  export type Recipe_ingredientsGetPayload<S extends boolean | null | undefined | Recipe_ingredientsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Recipe_ingredients :
    S extends undefined ? never :
    S extends { include: any } & (Recipe_ingredientsArgs | Recipe_ingredientsFindManyArgs)
    ? Recipe_ingredients  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'recipes' ? RecipesGetPayload<S['include'][P]> :
        P extends 'shopping_list' ? Array < Shopping_listGetPayload<S['include'][P]>>  :
        P extends '_count' ? Recipe_ingredientsCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (Recipe_ingredientsArgs | Recipe_ingredientsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'recipes' ? RecipesGetPayload<S['select'][P]> :
        P extends 'shopping_list' ? Array < Shopping_listGetPayload<S['select'][P]>>  :
        P extends '_count' ? Recipe_ingredientsCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Recipe_ingredients ? Recipe_ingredients[P] : never
  } 
      : Recipe_ingredients


  type Recipe_ingredientsCountArgs = Merge<
    Omit<Recipe_ingredientsFindManyArgs, 'select' | 'include'> & {
      select?: Recipe_ingredientsCountAggregateInputType | true
    }
  >

  export interface Recipe_ingredientsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
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
    findUnique<T extends Recipe_ingredientsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, Recipe_ingredientsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Recipe_ingredients'> extends True ? Prisma__Recipe_ingredientsClient<Recipe_ingredientsGetPayload<T>> : Prisma__Recipe_ingredientsClient<Recipe_ingredientsGetPayload<T> | null, null>

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
    findUniqueOrThrow<T extends Recipe_ingredientsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, Recipe_ingredientsFindUniqueOrThrowArgs>
    ): Prisma__Recipe_ingredientsClient<Recipe_ingredientsGetPayload<T>>

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
    findFirst<T extends Recipe_ingredientsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, Recipe_ingredientsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Recipe_ingredients'> extends True ? Prisma__Recipe_ingredientsClient<Recipe_ingredientsGetPayload<T>> : Prisma__Recipe_ingredientsClient<Recipe_ingredientsGetPayload<T> | null, null>

    /**
     * Find the first Recipe_ingredients that matches the filter or
     * throw `NotFoundError` if no matches were found.
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
    findFirstOrThrow<T extends Recipe_ingredientsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, Recipe_ingredientsFindFirstOrThrowArgs>
    ): Prisma__Recipe_ingredientsClient<Recipe_ingredientsGetPayload<T>>

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
    findMany<T extends Recipe_ingredientsFindManyArgs>(
      args?: SelectSubset<T, Recipe_ingredientsFindManyArgs>
    ): PrismaPromise<Array<Recipe_ingredientsGetPayload<T>>>

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
    create<T extends Recipe_ingredientsCreateArgs>(
      args: SelectSubset<T, Recipe_ingredientsCreateArgs>
    ): Prisma__Recipe_ingredientsClient<Recipe_ingredientsGetPayload<T>>

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
    createMany<T extends Recipe_ingredientsCreateManyArgs>(
      args?: SelectSubset<T, Recipe_ingredientsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

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
    delete<T extends Recipe_ingredientsDeleteArgs>(
      args: SelectSubset<T, Recipe_ingredientsDeleteArgs>
    ): Prisma__Recipe_ingredientsClient<Recipe_ingredientsGetPayload<T>>

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
    update<T extends Recipe_ingredientsUpdateArgs>(
      args: SelectSubset<T, Recipe_ingredientsUpdateArgs>
    ): Prisma__Recipe_ingredientsClient<Recipe_ingredientsGetPayload<T>>

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
    deleteMany<T extends Recipe_ingredientsDeleteManyArgs>(
      args?: SelectSubset<T, Recipe_ingredientsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

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
    updateMany<T extends Recipe_ingredientsUpdateManyArgs>(
      args: SelectSubset<T, Recipe_ingredientsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

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
    upsert<T extends Recipe_ingredientsUpsertArgs>(
      args: SelectSubset<T, Recipe_ingredientsUpsertArgs>
    ): Prisma__Recipe_ingredientsClient<Recipe_ingredientsGetPayload<T>>

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
    ): PrismaPromise<
      T extends _Record<'select', any>
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
    aggregate<T extends Recipe_ingredientsAggregateArgs>(args: Subset<T, Recipe_ingredientsAggregateArgs>): PrismaPromise<GetRecipe_ingredientsAggregateType<T>>

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
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, Recipe_ingredientsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecipe_ingredientsGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Recipe_ingredients.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__Recipe_ingredientsClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    recipes<T extends RecipesArgs= {}>(args?: Subset<T, RecipesArgs>): Prisma__RecipesClient<RecipesGetPayload<T> | Null>;

    shopping_list<T extends Recipe_ingredients$shopping_listArgs= {}>(args?: Subset<T, Recipe_ingredients$shopping_listArgs>): PrismaPromise<Array<Shopping_listGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Recipe_ingredients base type for findUnique actions
   */
  export type Recipe_ingredientsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Recipe_ingredients
     * 
    **/
    select?: Recipe_ingredientsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Recipe_ingredientsInclude | null
    /**
     * Filter, which Recipe_ingredients to fetch.
     * 
    **/
    where: Recipe_ingredientsWhereUniqueInput
  }

  /**
   * Recipe_ingredients findUnique
   */
  export interface Recipe_ingredientsFindUniqueArgs extends Recipe_ingredientsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Recipe_ingredients findUniqueOrThrow
   */
  export type Recipe_ingredientsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Recipe_ingredients
     * 
    **/
    select?: Recipe_ingredientsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Recipe_ingredientsInclude | null
    /**
     * Filter, which Recipe_ingredients to fetch.
     * 
    **/
    where: Recipe_ingredientsWhereUniqueInput
  }


  /**
   * Recipe_ingredients base type for findFirst actions
   */
  export type Recipe_ingredientsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Recipe_ingredients
     * 
    **/
    select?: Recipe_ingredientsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Recipe_ingredientsInclude | null
    /**
     * Filter, which Recipe_ingredients to fetch.
     * 
    **/
    where?: Recipe_ingredientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipe_ingredients to fetch.
     * 
    **/
    orderBy?: Enumerable<Recipe_ingredientsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recipe_ingredients.
     * 
    **/
    cursor?: Recipe_ingredientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipe_ingredients from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipe_ingredients.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recipe_ingredients.
     * 
    **/
    distinct?: Enumerable<Recipe_ingredientsScalarFieldEnum>
  }

  /**
   * Recipe_ingredients findFirst
   */
  export interface Recipe_ingredientsFindFirstArgs extends Recipe_ingredientsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Recipe_ingredients findFirstOrThrow
   */
  export type Recipe_ingredientsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Recipe_ingredients
     * 
    **/
    select?: Recipe_ingredientsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Recipe_ingredientsInclude | null
    /**
     * Filter, which Recipe_ingredients to fetch.
     * 
    **/
    where?: Recipe_ingredientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipe_ingredients to fetch.
     * 
    **/
    orderBy?: Enumerable<Recipe_ingredientsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recipe_ingredients.
     * 
    **/
    cursor?: Recipe_ingredientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipe_ingredients from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipe_ingredients.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recipe_ingredients.
     * 
    **/
    distinct?: Enumerable<Recipe_ingredientsScalarFieldEnum>
  }


  /**
   * Recipe_ingredients findMany
   */
  export type Recipe_ingredientsFindManyArgs = {
    /**
     * Select specific fields to fetch from the Recipe_ingredients
     * 
    **/
    select?: Recipe_ingredientsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Recipe_ingredientsInclude | null
    /**
     * Filter, which Recipe_ingredients to fetch.
     * 
    **/
    where?: Recipe_ingredientsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipe_ingredients to fetch.
     * 
    **/
    orderBy?: Enumerable<Recipe_ingredientsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Recipe_ingredients.
     * 
    **/
    cursor?: Recipe_ingredientsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipe_ingredients from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipe_ingredients.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Recipe_ingredientsScalarFieldEnum>
  }


  /**
   * Recipe_ingredients create
   */
  export type Recipe_ingredientsCreateArgs = {
    /**
     * Select specific fields to fetch from the Recipe_ingredients
     * 
    **/
    select?: Recipe_ingredientsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Recipe_ingredientsInclude | null
    /**
     * The data needed to create a Recipe_ingredients.
     * 
    **/
    data: XOR<Recipe_ingredientsCreateInput, Recipe_ingredientsUncheckedCreateInput>
  }


  /**
   * Recipe_ingredients createMany
   */
  export type Recipe_ingredientsCreateManyArgs = {
    /**
     * The data used to create many Recipe_ingredients.
     * 
    **/
    data: Enumerable<Recipe_ingredientsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Recipe_ingredients update
   */
  export type Recipe_ingredientsUpdateArgs = {
    /**
     * Select specific fields to fetch from the Recipe_ingredients
     * 
    **/
    select?: Recipe_ingredientsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Recipe_ingredientsInclude | null
    /**
     * The data needed to update a Recipe_ingredients.
     * 
    **/
    data: XOR<Recipe_ingredientsUpdateInput, Recipe_ingredientsUncheckedUpdateInput>
    /**
     * Choose, which Recipe_ingredients to update.
     * 
    **/
    where: Recipe_ingredientsWhereUniqueInput
  }


  /**
   * Recipe_ingredients updateMany
   */
  export type Recipe_ingredientsUpdateManyArgs = {
    /**
     * The data used to update Recipe_ingredients.
     * 
    **/
    data: XOR<Recipe_ingredientsUpdateManyMutationInput, Recipe_ingredientsUncheckedUpdateManyInput>
    /**
     * Filter which Recipe_ingredients to update
     * 
    **/
    where?: Recipe_ingredientsWhereInput
  }


  /**
   * Recipe_ingredients upsert
   */
  export type Recipe_ingredientsUpsertArgs = {
    /**
     * Select specific fields to fetch from the Recipe_ingredients
     * 
    **/
    select?: Recipe_ingredientsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Recipe_ingredientsInclude | null
    /**
     * The filter to search for the Recipe_ingredients to update in case it exists.
     * 
    **/
    where: Recipe_ingredientsWhereUniqueInput
    /**
     * In case the Recipe_ingredients found by the `where` argument doesn't exist, create a new Recipe_ingredients with this data.
     * 
    **/
    create: XOR<Recipe_ingredientsCreateInput, Recipe_ingredientsUncheckedCreateInput>
    /**
     * In case the Recipe_ingredients was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<Recipe_ingredientsUpdateInput, Recipe_ingredientsUncheckedUpdateInput>
  }


  /**
   * Recipe_ingredients delete
   */
  export type Recipe_ingredientsDeleteArgs = {
    /**
     * Select specific fields to fetch from the Recipe_ingredients
     * 
    **/
    select?: Recipe_ingredientsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Recipe_ingredientsInclude | null
    /**
     * Filter which Recipe_ingredients to delete.
     * 
    **/
    where: Recipe_ingredientsWhereUniqueInput
  }


  /**
   * Recipe_ingredients deleteMany
   */
  export type Recipe_ingredientsDeleteManyArgs = {
    /**
     * Filter which Recipe_ingredients to delete
     * 
    **/
    where?: Recipe_ingredientsWhereInput
  }


  /**
   * Recipe_ingredients.shopping_list
   */
  export type Recipe_ingredients$shopping_listArgs = {
    /**
     * Select specific fields to fetch from the Shopping_list
     * 
    **/
    select?: Shopping_listSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Shopping_listInclude | null
    where?: Shopping_listWhereInput
    orderBy?: Enumerable<Shopping_listOrderByWithRelationInput>
    cursor?: Shopping_listWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<Shopping_listScalarFieldEnum>
  }


  /**
   * Recipe_ingredients without action
   */
  export type Recipe_ingredientsArgs = {
    /**
     * Select specific fields to fetch from the Recipe_ingredients
     * 
    **/
    select?: Recipe_ingredientsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Recipe_ingredientsInclude | null
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

  export type RecipesAggregateArgs = {
    /**
     * Filter which Recipes to aggregate.
     * 
    **/
    where?: RecipesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     * 
    **/
    orderBy?: Enumerable<RecipesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: RecipesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     * 
    **/
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




  export type RecipesGroupByArgs = {
    where?: RecipesWhereInput
    orderBy?: Enumerable<RecipesOrderByWithAggregationInput>
    by: Array<RecipesScalarFieldEnum>
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

  type GetRecipesGroupByPayload<T extends RecipesGroupByArgs> = PrismaPromise<
    Array<
      PickArray<RecipesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecipesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecipesGroupByOutputType[P]>
            : GetScalarType<T[P], RecipesGroupByOutputType[P]>
        }
      >
    >


  export type RecipesSelect = {
    id?: boolean
    name?: boolean
    description?: boolean
    url?: boolean
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    recipe_ingredients?: boolean | Recipes$recipe_ingredientsArgs
    users?: boolean | UsersArgs
    shopping_list?: boolean | Recipes$shopping_listArgs
    _count?: boolean | RecipesCountOutputTypeArgs
  }


  export type RecipesInclude = {
    recipe_ingredients?: boolean | Recipes$recipe_ingredientsArgs
    users?: boolean | UsersArgs
    shopping_list?: boolean | Recipes$shopping_listArgs
    _count?: boolean | RecipesCountOutputTypeArgs
  } 

  export type RecipesGetPayload<S extends boolean | null | undefined | RecipesArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Recipes :
    S extends undefined ? never :
    S extends { include: any } & (RecipesArgs | RecipesFindManyArgs)
    ? Recipes  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'recipe_ingredients' ? Array < Recipe_ingredientsGetPayload<S['include'][P]>>  :
        P extends 'users' ? UsersGetPayload<S['include'][P]> :
        P extends 'shopping_list' ? Array < Shopping_listGetPayload<S['include'][P]>>  :
        P extends '_count' ? RecipesCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (RecipesArgs | RecipesFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'recipe_ingredients' ? Array < Recipe_ingredientsGetPayload<S['select'][P]>>  :
        P extends 'users' ? UsersGetPayload<S['select'][P]> :
        P extends 'shopping_list' ? Array < Shopping_listGetPayload<S['select'][P]>>  :
        P extends '_count' ? RecipesCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Recipes ? Recipes[P] : never
  } 
      : Recipes


  type RecipesCountArgs = Merge<
    Omit<RecipesFindManyArgs, 'select' | 'include'> & {
      select?: RecipesCountAggregateInputType | true
    }
  >

  export interface RecipesDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
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
    findUnique<T extends RecipesFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, RecipesFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Recipes'> extends True ? Prisma__RecipesClient<RecipesGetPayload<T>> : Prisma__RecipesClient<RecipesGetPayload<T> | null, null>

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
    findUniqueOrThrow<T extends RecipesFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, RecipesFindUniqueOrThrowArgs>
    ): Prisma__RecipesClient<RecipesGetPayload<T>>

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
    findFirst<T extends RecipesFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, RecipesFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Recipes'> extends True ? Prisma__RecipesClient<RecipesGetPayload<T>> : Prisma__RecipesClient<RecipesGetPayload<T> | null, null>

    /**
     * Find the first Recipes that matches the filter or
     * throw `NotFoundError` if no matches were found.
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
    findFirstOrThrow<T extends RecipesFindFirstOrThrowArgs>(
      args?: SelectSubset<T, RecipesFindFirstOrThrowArgs>
    ): Prisma__RecipesClient<RecipesGetPayload<T>>

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
    findMany<T extends RecipesFindManyArgs>(
      args?: SelectSubset<T, RecipesFindManyArgs>
    ): PrismaPromise<Array<RecipesGetPayload<T>>>

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
    create<T extends RecipesCreateArgs>(
      args: SelectSubset<T, RecipesCreateArgs>
    ): Prisma__RecipesClient<RecipesGetPayload<T>>

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
    createMany<T extends RecipesCreateManyArgs>(
      args?: SelectSubset<T, RecipesCreateManyArgs>
    ): PrismaPromise<BatchPayload>

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
    delete<T extends RecipesDeleteArgs>(
      args: SelectSubset<T, RecipesDeleteArgs>
    ): Prisma__RecipesClient<RecipesGetPayload<T>>

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
    update<T extends RecipesUpdateArgs>(
      args: SelectSubset<T, RecipesUpdateArgs>
    ): Prisma__RecipesClient<RecipesGetPayload<T>>

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
    deleteMany<T extends RecipesDeleteManyArgs>(
      args?: SelectSubset<T, RecipesDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

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
    updateMany<T extends RecipesUpdateManyArgs>(
      args: SelectSubset<T, RecipesUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

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
    upsert<T extends RecipesUpsertArgs>(
      args: SelectSubset<T, RecipesUpsertArgs>
    ): Prisma__RecipesClient<RecipesGetPayload<T>>

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
    ): PrismaPromise<
      T extends _Record<'select', any>
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
    aggregate<T extends RecipesAggregateArgs>(args: Subset<T, RecipesAggregateArgs>): PrismaPromise<GetRecipesAggregateType<T>>

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
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, RecipesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecipesGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Recipes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__RecipesClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    recipe_ingredients<T extends Recipes$recipe_ingredientsArgs= {}>(args?: Subset<T, Recipes$recipe_ingredientsArgs>): PrismaPromise<Array<Recipe_ingredientsGetPayload<T>>| Null>;

    users<T extends UsersArgs= {}>(args?: Subset<T, UsersArgs>): Prisma__UsersClient<UsersGetPayload<T> | Null>;

    shopping_list<T extends Recipes$shopping_listArgs= {}>(args?: Subset<T, Recipes$shopping_listArgs>): PrismaPromise<Array<Shopping_listGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Recipes base type for findUnique actions
   */
  export type RecipesFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Recipes
     * 
    **/
    select?: RecipesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RecipesInclude | null
    /**
     * Filter, which Recipes to fetch.
     * 
    **/
    where: RecipesWhereUniqueInput
  }

  /**
   * Recipes findUnique
   */
  export interface RecipesFindUniqueArgs extends RecipesFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Recipes findUniqueOrThrow
   */
  export type RecipesFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Recipes
     * 
    **/
    select?: RecipesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RecipesInclude | null
    /**
     * Filter, which Recipes to fetch.
     * 
    **/
    where: RecipesWhereUniqueInput
  }


  /**
   * Recipes base type for findFirst actions
   */
  export type RecipesFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Recipes
     * 
    **/
    select?: RecipesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RecipesInclude | null
    /**
     * Filter, which Recipes to fetch.
     * 
    **/
    where?: RecipesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     * 
    **/
    orderBy?: Enumerable<RecipesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recipes.
     * 
    **/
    cursor?: RecipesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recipes.
     * 
    **/
    distinct?: Enumerable<RecipesScalarFieldEnum>
  }

  /**
   * Recipes findFirst
   */
  export interface RecipesFindFirstArgs extends RecipesFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Recipes findFirstOrThrow
   */
  export type RecipesFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Recipes
     * 
    **/
    select?: RecipesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RecipesInclude | null
    /**
     * Filter, which Recipes to fetch.
     * 
    **/
    where?: RecipesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     * 
    **/
    orderBy?: Enumerable<RecipesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recipes.
     * 
    **/
    cursor?: RecipesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recipes.
     * 
    **/
    distinct?: Enumerable<RecipesScalarFieldEnum>
  }


  /**
   * Recipes findMany
   */
  export type RecipesFindManyArgs = {
    /**
     * Select specific fields to fetch from the Recipes
     * 
    **/
    select?: RecipesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RecipesInclude | null
    /**
     * Filter, which Recipes to fetch.
     * 
    **/
    where?: RecipesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     * 
    **/
    orderBy?: Enumerable<RecipesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Recipes.
     * 
    **/
    cursor?: RecipesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     * 
    **/
    skip?: number
    distinct?: Enumerable<RecipesScalarFieldEnum>
  }


  /**
   * Recipes create
   */
  export type RecipesCreateArgs = {
    /**
     * Select specific fields to fetch from the Recipes
     * 
    **/
    select?: RecipesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RecipesInclude | null
    /**
     * The data needed to create a Recipes.
     * 
    **/
    data: XOR<RecipesCreateInput, RecipesUncheckedCreateInput>
  }


  /**
   * Recipes createMany
   */
  export type RecipesCreateManyArgs = {
    /**
     * The data used to create many Recipes.
     * 
    **/
    data: Enumerable<RecipesCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Recipes update
   */
  export type RecipesUpdateArgs = {
    /**
     * Select specific fields to fetch from the Recipes
     * 
    **/
    select?: RecipesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RecipesInclude | null
    /**
     * The data needed to update a Recipes.
     * 
    **/
    data: XOR<RecipesUpdateInput, RecipesUncheckedUpdateInput>
    /**
     * Choose, which Recipes to update.
     * 
    **/
    where: RecipesWhereUniqueInput
  }


  /**
   * Recipes updateMany
   */
  export type RecipesUpdateManyArgs = {
    /**
     * The data used to update Recipes.
     * 
    **/
    data: XOR<RecipesUpdateManyMutationInput, RecipesUncheckedUpdateManyInput>
    /**
     * Filter which Recipes to update
     * 
    **/
    where?: RecipesWhereInput
  }


  /**
   * Recipes upsert
   */
  export type RecipesUpsertArgs = {
    /**
     * Select specific fields to fetch from the Recipes
     * 
    **/
    select?: RecipesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RecipesInclude | null
    /**
     * The filter to search for the Recipes to update in case it exists.
     * 
    **/
    where: RecipesWhereUniqueInput
    /**
     * In case the Recipes found by the `where` argument doesn't exist, create a new Recipes with this data.
     * 
    **/
    create: XOR<RecipesCreateInput, RecipesUncheckedCreateInput>
    /**
     * In case the Recipes was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<RecipesUpdateInput, RecipesUncheckedUpdateInput>
  }


  /**
   * Recipes delete
   */
  export type RecipesDeleteArgs = {
    /**
     * Select specific fields to fetch from the Recipes
     * 
    **/
    select?: RecipesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RecipesInclude | null
    /**
     * Filter which Recipes to delete.
     * 
    **/
    where: RecipesWhereUniqueInput
  }


  /**
   * Recipes deleteMany
   */
  export type RecipesDeleteManyArgs = {
    /**
     * Filter which Recipes to delete
     * 
    **/
    where?: RecipesWhereInput
  }


  /**
   * Recipes.recipe_ingredients
   */
  export type Recipes$recipe_ingredientsArgs = {
    /**
     * Select specific fields to fetch from the Recipe_ingredients
     * 
    **/
    select?: Recipe_ingredientsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Recipe_ingredientsInclude | null
    where?: Recipe_ingredientsWhereInput
    orderBy?: Enumerable<Recipe_ingredientsOrderByWithRelationInput>
    cursor?: Recipe_ingredientsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<Recipe_ingredientsScalarFieldEnum>
  }


  /**
   * Recipes.shopping_list
   */
  export type Recipes$shopping_listArgs = {
    /**
     * Select specific fields to fetch from the Shopping_list
     * 
    **/
    select?: Shopping_listSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Shopping_listInclude | null
    where?: Shopping_listWhereInput
    orderBy?: Enumerable<Shopping_listOrderByWithRelationInput>
    cursor?: Shopping_listWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<Shopping_listScalarFieldEnum>
  }


  /**
   * Recipes without action
   */
  export type RecipesArgs = {
    /**
     * Select specific fields to fetch from the Recipes
     * 
    **/
    select?: RecipesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RecipesInclude | null
  }



  /**
   * Model Shopping_list
   */


  export type AggregateShopping_list = {
    _count: Shopping_listCountAggregateOutputType | null
    _min: Shopping_listMinAggregateOutputType | null
    _max: Shopping_listMaxAggregateOutputType | null
  }

  export type Shopping_listMinAggregateOutputType = {
    id: string | null
    recipe_id: string | null
    recipe_ingredient_id: string | null
    purchased: boolean | null
    created_at: Date | null
  }

  export type Shopping_listMaxAggregateOutputType = {
    id: string | null
    recipe_id: string | null
    recipe_ingredient_id: string | null
    purchased: boolean | null
    created_at: Date | null
  }

  export type Shopping_listCountAggregateOutputType = {
    id: number
    recipe_id: number
    recipe_ingredient_id: number
    purchased: number
    created_at: number
    _all: number
  }


  export type Shopping_listMinAggregateInputType = {
    id?: true
    recipe_id?: true
    recipe_ingredient_id?: true
    purchased?: true
    created_at?: true
  }

  export type Shopping_listMaxAggregateInputType = {
    id?: true
    recipe_id?: true
    recipe_ingredient_id?: true
    purchased?: true
    created_at?: true
  }

  export type Shopping_listCountAggregateInputType = {
    id?: true
    recipe_id?: true
    recipe_ingredient_id?: true
    purchased?: true
    created_at?: true
    _all?: true
  }

  export type Shopping_listAggregateArgs = {
    /**
     * Filter which Shopping_list to aggregate.
     * 
    **/
    where?: Shopping_listWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shopping_lists to fetch.
     * 
    **/
    orderBy?: Enumerable<Shopping_listOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: Shopping_listWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shopping_lists from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shopping_lists.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Shopping_lists
    **/
    _count?: true | Shopping_listCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Shopping_listMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Shopping_listMaxAggregateInputType
  }

  export type GetShopping_listAggregateType<T extends Shopping_listAggregateArgs> = {
        [P in keyof T & keyof AggregateShopping_list]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShopping_list[P]>
      : GetScalarType<T[P], AggregateShopping_list[P]>
  }




  export type Shopping_listGroupByArgs = {
    where?: Shopping_listWhereInput
    orderBy?: Enumerable<Shopping_listOrderByWithAggregationInput>
    by: Array<Shopping_listScalarFieldEnum>
    having?: Shopping_listScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Shopping_listCountAggregateInputType | true
    _min?: Shopping_listMinAggregateInputType
    _max?: Shopping_listMaxAggregateInputType
  }


  export type Shopping_listGroupByOutputType = {
    id: string
    recipe_id: string
    recipe_ingredient_id: string
    purchased: boolean
    created_at: Date
    _count: Shopping_listCountAggregateOutputType | null
    _min: Shopping_listMinAggregateOutputType | null
    _max: Shopping_listMaxAggregateOutputType | null
  }

  type GetShopping_listGroupByPayload<T extends Shopping_listGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Shopping_listGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Shopping_listGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Shopping_listGroupByOutputType[P]>
            : GetScalarType<T[P], Shopping_listGroupByOutputType[P]>
        }
      >
    >


  export type Shopping_listSelect = {
    id?: boolean
    recipe_id?: boolean
    recipe_ingredient_id?: boolean
    purchased?: boolean
    created_at?: boolean
    recipes?: boolean | RecipesArgs
    recipe_ingredients?: boolean | Recipe_ingredientsArgs
  }


  export type Shopping_listInclude = {
    recipes?: boolean | RecipesArgs
    recipe_ingredients?: boolean | Recipe_ingredientsArgs
  } 

  export type Shopping_listGetPayload<S extends boolean | null | undefined | Shopping_listArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Shopping_list :
    S extends undefined ? never :
    S extends { include: any } & (Shopping_listArgs | Shopping_listFindManyArgs)
    ? Shopping_list  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'recipes' ? RecipesGetPayload<S['include'][P]> :
        P extends 'recipe_ingredients' ? Recipe_ingredientsGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (Shopping_listArgs | Shopping_listFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'recipes' ? RecipesGetPayload<S['select'][P]> :
        P extends 'recipe_ingredients' ? Recipe_ingredientsGetPayload<S['select'][P]> :  P extends keyof Shopping_list ? Shopping_list[P] : never
  } 
      : Shopping_list


  type Shopping_listCountArgs = Merge<
    Omit<Shopping_listFindManyArgs, 'select' | 'include'> & {
      select?: Shopping_listCountAggregateInputType | true
    }
  >

  export interface Shopping_listDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Shopping_list that matches the filter.
     * @param {Shopping_listFindUniqueArgs} args - Arguments to find a Shopping_list
     * @example
     * // Get one Shopping_list
     * const shopping_list = await prisma.shopping_list.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends Shopping_listFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, Shopping_listFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Shopping_list'> extends True ? Prisma__Shopping_listClient<Shopping_listGetPayload<T>> : Prisma__Shopping_listClient<Shopping_listGetPayload<T> | null, null>

    /**
     * Find one Shopping_list that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {Shopping_listFindUniqueOrThrowArgs} args - Arguments to find a Shopping_list
     * @example
     * // Get one Shopping_list
     * const shopping_list = await prisma.shopping_list.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends Shopping_listFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, Shopping_listFindUniqueOrThrowArgs>
    ): Prisma__Shopping_listClient<Shopping_listGetPayload<T>>

    /**
     * Find the first Shopping_list that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Shopping_listFindFirstArgs} args - Arguments to find a Shopping_list
     * @example
     * // Get one Shopping_list
     * const shopping_list = await prisma.shopping_list.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends Shopping_listFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, Shopping_listFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Shopping_list'> extends True ? Prisma__Shopping_listClient<Shopping_listGetPayload<T>> : Prisma__Shopping_listClient<Shopping_listGetPayload<T> | null, null>

    /**
     * Find the first Shopping_list that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Shopping_listFindFirstOrThrowArgs} args - Arguments to find a Shopping_list
     * @example
     * // Get one Shopping_list
     * const shopping_list = await prisma.shopping_list.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends Shopping_listFindFirstOrThrowArgs>(
      args?: SelectSubset<T, Shopping_listFindFirstOrThrowArgs>
    ): Prisma__Shopping_listClient<Shopping_listGetPayload<T>>

    /**
     * Find zero or more Shopping_lists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Shopping_listFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Shopping_lists
     * const shopping_lists = await prisma.shopping_list.findMany()
     * 
     * // Get first 10 Shopping_lists
     * const shopping_lists = await prisma.shopping_list.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shopping_listWithIdOnly = await prisma.shopping_list.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends Shopping_listFindManyArgs>(
      args?: SelectSubset<T, Shopping_listFindManyArgs>
    ): PrismaPromise<Array<Shopping_listGetPayload<T>>>

    /**
     * Create a Shopping_list.
     * @param {Shopping_listCreateArgs} args - Arguments to create a Shopping_list.
     * @example
     * // Create one Shopping_list
     * const Shopping_list = await prisma.shopping_list.create({
     *   data: {
     *     // ... data to create a Shopping_list
     *   }
     * })
     * 
    **/
    create<T extends Shopping_listCreateArgs>(
      args: SelectSubset<T, Shopping_listCreateArgs>
    ): Prisma__Shopping_listClient<Shopping_listGetPayload<T>>

    /**
     * Create many Shopping_lists.
     *     @param {Shopping_listCreateManyArgs} args - Arguments to create many Shopping_lists.
     *     @example
     *     // Create many Shopping_lists
     *     const shopping_list = await prisma.shopping_list.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends Shopping_listCreateManyArgs>(
      args?: SelectSubset<T, Shopping_listCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Shopping_list.
     * @param {Shopping_listDeleteArgs} args - Arguments to delete one Shopping_list.
     * @example
     * // Delete one Shopping_list
     * const Shopping_list = await prisma.shopping_list.delete({
     *   where: {
     *     // ... filter to delete one Shopping_list
     *   }
     * })
     * 
    **/
    delete<T extends Shopping_listDeleteArgs>(
      args: SelectSubset<T, Shopping_listDeleteArgs>
    ): Prisma__Shopping_listClient<Shopping_listGetPayload<T>>

    /**
     * Update one Shopping_list.
     * @param {Shopping_listUpdateArgs} args - Arguments to update one Shopping_list.
     * @example
     * // Update one Shopping_list
     * const shopping_list = await prisma.shopping_list.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends Shopping_listUpdateArgs>(
      args: SelectSubset<T, Shopping_listUpdateArgs>
    ): Prisma__Shopping_listClient<Shopping_listGetPayload<T>>

    /**
     * Delete zero or more Shopping_lists.
     * @param {Shopping_listDeleteManyArgs} args - Arguments to filter Shopping_lists to delete.
     * @example
     * // Delete a few Shopping_lists
     * const { count } = await prisma.shopping_list.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends Shopping_listDeleteManyArgs>(
      args?: SelectSubset<T, Shopping_listDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shopping_lists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Shopping_listUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Shopping_lists
     * const shopping_list = await prisma.shopping_list.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends Shopping_listUpdateManyArgs>(
      args: SelectSubset<T, Shopping_listUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Shopping_list.
     * @param {Shopping_listUpsertArgs} args - Arguments to update or create a Shopping_list.
     * @example
     * // Update or create a Shopping_list
     * const shopping_list = await prisma.shopping_list.upsert({
     *   create: {
     *     // ... data to create a Shopping_list
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Shopping_list we want to update
     *   }
     * })
    **/
    upsert<T extends Shopping_listUpsertArgs>(
      args: SelectSubset<T, Shopping_listUpsertArgs>
    ): Prisma__Shopping_listClient<Shopping_listGetPayload<T>>

    /**
     * Count the number of Shopping_lists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Shopping_listCountArgs} args - Arguments to filter Shopping_lists to count.
     * @example
     * // Count the number of Shopping_lists
     * const count = await prisma.shopping_list.count({
     *   where: {
     *     // ... the filter for the Shopping_lists we want to count
     *   }
     * })
    **/
    count<T extends Shopping_listCountArgs>(
      args?: Subset<T, Shopping_listCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Shopping_listCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Shopping_list.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Shopping_listAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Shopping_listAggregateArgs>(args: Subset<T, Shopping_listAggregateArgs>): PrismaPromise<GetShopping_listAggregateType<T>>

    /**
     * Group by Shopping_list.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Shopping_listGroupByArgs} args - Group by arguments.
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
      T extends Shopping_listGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Shopping_listGroupByArgs['orderBy'] }
        : { orderBy?: Shopping_listGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, Shopping_listGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShopping_listGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Shopping_list.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__Shopping_listClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    recipes<T extends RecipesArgs= {}>(args?: Subset<T, RecipesArgs>): Prisma__RecipesClient<RecipesGetPayload<T> | Null>;

    recipe_ingredients<T extends Recipe_ingredientsArgs= {}>(args?: Subset<T, Recipe_ingredientsArgs>): Prisma__Recipe_ingredientsClient<Recipe_ingredientsGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Shopping_list base type for findUnique actions
   */
  export type Shopping_listFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Shopping_list
     * 
    **/
    select?: Shopping_listSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Shopping_listInclude | null
    /**
     * Filter, which Shopping_list to fetch.
     * 
    **/
    where: Shopping_listWhereUniqueInput
  }

  /**
   * Shopping_list findUnique
   */
  export interface Shopping_listFindUniqueArgs extends Shopping_listFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Shopping_list findUniqueOrThrow
   */
  export type Shopping_listFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Shopping_list
     * 
    **/
    select?: Shopping_listSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Shopping_listInclude | null
    /**
     * Filter, which Shopping_list to fetch.
     * 
    **/
    where: Shopping_listWhereUniqueInput
  }


  /**
   * Shopping_list base type for findFirst actions
   */
  export type Shopping_listFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Shopping_list
     * 
    **/
    select?: Shopping_listSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Shopping_listInclude | null
    /**
     * Filter, which Shopping_list to fetch.
     * 
    **/
    where?: Shopping_listWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shopping_lists to fetch.
     * 
    **/
    orderBy?: Enumerable<Shopping_listOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shopping_lists.
     * 
    **/
    cursor?: Shopping_listWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shopping_lists from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shopping_lists.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shopping_lists.
     * 
    **/
    distinct?: Enumerable<Shopping_listScalarFieldEnum>
  }

  /**
   * Shopping_list findFirst
   */
  export interface Shopping_listFindFirstArgs extends Shopping_listFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Shopping_list findFirstOrThrow
   */
  export type Shopping_listFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Shopping_list
     * 
    **/
    select?: Shopping_listSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Shopping_listInclude | null
    /**
     * Filter, which Shopping_list to fetch.
     * 
    **/
    where?: Shopping_listWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shopping_lists to fetch.
     * 
    **/
    orderBy?: Enumerable<Shopping_listOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shopping_lists.
     * 
    **/
    cursor?: Shopping_listWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shopping_lists from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shopping_lists.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shopping_lists.
     * 
    **/
    distinct?: Enumerable<Shopping_listScalarFieldEnum>
  }


  /**
   * Shopping_list findMany
   */
  export type Shopping_listFindManyArgs = {
    /**
     * Select specific fields to fetch from the Shopping_list
     * 
    **/
    select?: Shopping_listSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Shopping_listInclude | null
    /**
     * Filter, which Shopping_lists to fetch.
     * 
    **/
    where?: Shopping_listWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shopping_lists to fetch.
     * 
    **/
    orderBy?: Enumerable<Shopping_listOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Shopping_lists.
     * 
    **/
    cursor?: Shopping_listWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shopping_lists from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shopping_lists.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Shopping_listScalarFieldEnum>
  }


  /**
   * Shopping_list create
   */
  export type Shopping_listCreateArgs = {
    /**
     * Select specific fields to fetch from the Shopping_list
     * 
    **/
    select?: Shopping_listSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Shopping_listInclude | null
    /**
     * The data needed to create a Shopping_list.
     * 
    **/
    data: XOR<Shopping_listCreateInput, Shopping_listUncheckedCreateInput>
  }


  /**
   * Shopping_list createMany
   */
  export type Shopping_listCreateManyArgs = {
    /**
     * The data used to create many Shopping_lists.
     * 
    **/
    data: Enumerable<Shopping_listCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Shopping_list update
   */
  export type Shopping_listUpdateArgs = {
    /**
     * Select specific fields to fetch from the Shopping_list
     * 
    **/
    select?: Shopping_listSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Shopping_listInclude | null
    /**
     * The data needed to update a Shopping_list.
     * 
    **/
    data: XOR<Shopping_listUpdateInput, Shopping_listUncheckedUpdateInput>
    /**
     * Choose, which Shopping_list to update.
     * 
    **/
    where: Shopping_listWhereUniqueInput
  }


  /**
   * Shopping_list updateMany
   */
  export type Shopping_listUpdateManyArgs = {
    /**
     * The data used to update Shopping_lists.
     * 
    **/
    data: XOR<Shopping_listUpdateManyMutationInput, Shopping_listUncheckedUpdateManyInput>
    /**
     * Filter which Shopping_lists to update
     * 
    **/
    where?: Shopping_listWhereInput
  }


  /**
   * Shopping_list upsert
   */
  export type Shopping_listUpsertArgs = {
    /**
     * Select specific fields to fetch from the Shopping_list
     * 
    **/
    select?: Shopping_listSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Shopping_listInclude | null
    /**
     * The filter to search for the Shopping_list to update in case it exists.
     * 
    **/
    where: Shopping_listWhereUniqueInput
    /**
     * In case the Shopping_list found by the `where` argument doesn't exist, create a new Shopping_list with this data.
     * 
    **/
    create: XOR<Shopping_listCreateInput, Shopping_listUncheckedCreateInput>
    /**
     * In case the Shopping_list was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<Shopping_listUpdateInput, Shopping_listUncheckedUpdateInput>
  }


  /**
   * Shopping_list delete
   */
  export type Shopping_listDeleteArgs = {
    /**
     * Select specific fields to fetch from the Shopping_list
     * 
    **/
    select?: Shopping_listSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Shopping_listInclude | null
    /**
     * Filter which Shopping_list to delete.
     * 
    **/
    where: Shopping_listWhereUniqueInput
  }


  /**
   * Shopping_list deleteMany
   */
  export type Shopping_listDeleteManyArgs = {
    /**
     * Filter which Shopping_lists to delete
     * 
    **/
    where?: Shopping_listWhereInput
  }


  /**
   * Shopping_list without action
   */
  export type Shopping_listArgs = {
    /**
     * Select specific fields to fetch from the Shopping_list
     * 
    **/
    select?: Shopping_listSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Shopping_listInclude | null
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

  export type UsersAggregateArgs = {
    /**
     * Filter which Users to aggregate.
     * 
    **/
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UsersOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
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




  export type UsersGroupByArgs = {
    where?: UsersWhereInput
    orderBy?: Enumerable<UsersOrderByWithAggregationInput>
    by: Array<UsersScalarFieldEnum>
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

  type GetUsersGroupByPayload<T extends UsersGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type UsersSelect = {
    id?: boolean
    name?: boolean
    avatar_url?: boolean
    ingredient_events?: boolean | Users$ingredient_eventsArgs
    ingredients_photo_uploads?: boolean | Users$ingredients_photo_uploadsArgs
    recipes?: boolean | Users$recipesArgs
    _count?: boolean | UsersCountOutputTypeArgs
  }


  export type UsersInclude = {
    ingredient_events?: boolean | Users$ingredient_eventsArgs
    ingredients_photo_uploads?: boolean | Users$ingredients_photo_uploadsArgs
    recipes?: boolean | Users$recipesArgs
    _count?: boolean | UsersCountOutputTypeArgs
  } 

  export type UsersGetPayload<S extends boolean | null | undefined | UsersArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Users :
    S extends undefined ? never :
    S extends { include: any } & (UsersArgs | UsersFindManyArgs)
    ? Users  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'ingredient_events' ? Array < Ingredient_eventsGetPayload<S['include'][P]>>  :
        P extends 'ingredients_photo_uploads' ? Array < Ingredients_photo_uploadsGetPayload<S['include'][P]>>  :
        P extends 'recipes' ? Array < RecipesGetPayload<S['include'][P]>>  :
        P extends '_count' ? UsersCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (UsersArgs | UsersFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'ingredient_events' ? Array < Ingredient_eventsGetPayload<S['select'][P]>>  :
        P extends 'ingredients_photo_uploads' ? Array < Ingredients_photo_uploadsGetPayload<S['select'][P]>>  :
        P extends 'recipes' ? Array < RecipesGetPayload<S['select'][P]>>  :
        P extends '_count' ? UsersCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Users ? Users[P] : never
  } 
      : Users


  type UsersCountArgs = Merge<
    Omit<UsersFindManyArgs, 'select' | 'include'> & {
      select?: UsersCountAggregateInputType | true
    }
  >

  export interface UsersDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
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
    findUnique<T extends UsersFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UsersFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Users'> extends True ? Prisma__UsersClient<UsersGetPayload<T>> : Prisma__UsersClient<UsersGetPayload<T> | null, null>

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
    findUniqueOrThrow<T extends UsersFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UsersFindUniqueOrThrowArgs>
    ): Prisma__UsersClient<UsersGetPayload<T>>

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
    findFirst<T extends UsersFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UsersFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Users'> extends True ? Prisma__UsersClient<UsersGetPayload<T>> : Prisma__UsersClient<UsersGetPayload<T> | null, null>

    /**
     * Find the first Users that matches the filter or
     * throw `NotFoundError` if no matches were found.
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
    findFirstOrThrow<T extends UsersFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UsersFindFirstOrThrowArgs>
    ): Prisma__UsersClient<UsersGetPayload<T>>

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
    findMany<T extends UsersFindManyArgs>(
      args?: SelectSubset<T, UsersFindManyArgs>
    ): PrismaPromise<Array<UsersGetPayload<T>>>

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
    create<T extends UsersCreateArgs>(
      args: SelectSubset<T, UsersCreateArgs>
    ): Prisma__UsersClient<UsersGetPayload<T>>

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
    createMany<T extends UsersCreateManyArgs>(
      args?: SelectSubset<T, UsersCreateManyArgs>
    ): PrismaPromise<BatchPayload>

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
    delete<T extends UsersDeleteArgs>(
      args: SelectSubset<T, UsersDeleteArgs>
    ): Prisma__UsersClient<UsersGetPayload<T>>

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
    update<T extends UsersUpdateArgs>(
      args: SelectSubset<T, UsersUpdateArgs>
    ): Prisma__UsersClient<UsersGetPayload<T>>

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
    deleteMany<T extends UsersDeleteManyArgs>(
      args?: SelectSubset<T, UsersDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

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
    updateMany<T extends UsersUpdateManyArgs>(
      args: SelectSubset<T, UsersUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

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
    upsert<T extends UsersUpsertArgs>(
      args: SelectSubset<T, UsersUpsertArgs>
    ): Prisma__UsersClient<UsersGetPayload<T>>

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
    ): PrismaPromise<
      T extends _Record<'select', any>
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
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): PrismaPromise<GetUsersAggregateType<T>>

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
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, UsersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UsersClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    ingredient_events<T extends Users$ingredient_eventsArgs= {}>(args?: Subset<T, Users$ingredient_eventsArgs>): PrismaPromise<Array<Ingredient_eventsGetPayload<T>>| Null>;

    ingredients_photo_uploads<T extends Users$ingredients_photo_uploadsArgs= {}>(args?: Subset<T, Users$ingredients_photo_uploadsArgs>): PrismaPromise<Array<Ingredients_photo_uploadsGetPayload<T>>| Null>;

    recipes<T extends Users$recipesArgs= {}>(args?: Subset<T, Users$recipesArgs>): PrismaPromise<Array<RecipesGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Users base type for findUnique actions
   */
  export type UsersFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Users
     * 
    **/
    select?: UsersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsersInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where: UsersWhereUniqueInput
  }

  /**
   * Users findUnique
   */
  export interface UsersFindUniqueArgs extends UsersFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Users findUniqueOrThrow
   */
  export type UsersFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Users
     * 
    **/
    select?: UsersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsersInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where: UsersWhereUniqueInput
  }


  /**
   * Users base type for findFirst actions
   */
  export type UsersFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Users
     * 
    **/
    select?: UsersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsersInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UsersOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UsersScalarFieldEnum>
  }

  /**
   * Users findFirst
   */
  export interface UsersFindFirstArgs extends UsersFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Users findFirstOrThrow
   */
  export type UsersFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Users
     * 
    **/
    select?: UsersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsersInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UsersOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UsersScalarFieldEnum>
  }


  /**
   * Users findMany
   */
  export type UsersFindManyArgs = {
    /**
     * Select specific fields to fetch from the Users
     * 
    **/
    select?: UsersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsersInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UsersOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     * 
    **/
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UsersScalarFieldEnum>
  }


  /**
   * Users create
   */
  export type UsersCreateArgs = {
    /**
     * Select specific fields to fetch from the Users
     * 
    **/
    select?: UsersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsersInclude | null
    /**
     * The data needed to create a Users.
     * 
    **/
    data: XOR<UsersCreateInput, UsersUncheckedCreateInput>
  }


  /**
   * Users createMany
   */
  export type UsersCreateManyArgs = {
    /**
     * The data used to create many Users.
     * 
    **/
    data: Enumerable<UsersCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Users update
   */
  export type UsersUpdateArgs = {
    /**
     * Select specific fields to fetch from the Users
     * 
    **/
    select?: UsersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsersInclude | null
    /**
     * The data needed to update a Users.
     * 
    **/
    data: XOR<UsersUpdateInput, UsersUncheckedUpdateInput>
    /**
     * Choose, which Users to update.
     * 
    **/
    where: UsersWhereUniqueInput
  }


  /**
   * Users updateMany
   */
  export type UsersUpdateManyArgs = {
    /**
     * The data used to update Users.
     * 
    **/
    data: XOR<UsersUpdateManyMutationInput, UsersUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     * 
    **/
    where?: UsersWhereInput
  }


  /**
   * Users upsert
   */
  export type UsersUpsertArgs = {
    /**
     * Select specific fields to fetch from the Users
     * 
    **/
    select?: UsersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsersInclude | null
    /**
     * The filter to search for the Users to update in case it exists.
     * 
    **/
    where: UsersWhereUniqueInput
    /**
     * In case the Users found by the `where` argument doesn't exist, create a new Users with this data.
     * 
    **/
    create: XOR<UsersCreateInput, UsersUncheckedCreateInput>
    /**
     * In case the Users was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UsersUpdateInput, UsersUncheckedUpdateInput>
  }


  /**
   * Users delete
   */
  export type UsersDeleteArgs = {
    /**
     * Select specific fields to fetch from the Users
     * 
    **/
    select?: UsersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsersInclude | null
    /**
     * Filter which Users to delete.
     * 
    **/
    where: UsersWhereUniqueInput
  }


  /**
   * Users deleteMany
   */
  export type UsersDeleteManyArgs = {
    /**
     * Filter which Users to delete
     * 
    **/
    where?: UsersWhereInput
  }


  /**
   * Users.ingredient_events
   */
  export type Users$ingredient_eventsArgs = {
    /**
     * Select specific fields to fetch from the Ingredient_events
     * 
    **/
    select?: Ingredient_eventsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Ingredient_eventsInclude | null
    where?: Ingredient_eventsWhereInput
    orderBy?: Enumerable<Ingredient_eventsOrderByWithRelationInput>
    cursor?: Ingredient_eventsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<Ingredient_eventsScalarFieldEnum>
  }


  /**
   * Users.ingredients_photo_uploads
   */
  export type Users$ingredients_photo_uploadsArgs = {
    /**
     * Select specific fields to fetch from the Ingredients_photo_uploads
     * 
    **/
    select?: Ingredients_photo_uploadsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: Ingredients_photo_uploadsInclude | null
    where?: Ingredients_photo_uploadsWhereInput
    orderBy?: Enumerable<Ingredients_photo_uploadsOrderByWithRelationInput>
    cursor?: Ingredients_photo_uploadsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<Ingredients_photo_uploadsScalarFieldEnum>
  }


  /**
   * Users.recipes
   */
  export type Users$recipesArgs = {
    /**
     * Select specific fields to fetch from the Recipes
     * 
    **/
    select?: RecipesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RecipesInclude | null
    where?: RecipesWhereInput
    orderBy?: Enumerable<RecipesOrderByWithRelationInput>
    cursor?: RecipesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<RecipesScalarFieldEnum>
  }


  /**
   * Users without action
   */
  export type UsersArgs = {
    /**
     * Select specific fields to fetch from the Users
     * 
    **/
    select?: UsersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsersInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

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


  export const JobsScalarFieldEnum: {
    id: 'id',
    state: 'state',
    target_id: 'target_id',
    type: 'type',
    created_at: 'created_at',
    updated_at: 'updated_at',
    error: 'error',
    result: 'result'
  };

  export type JobsScalarFieldEnum = (typeof JobsScalarFieldEnum)[keyof typeof JobsScalarFieldEnum]


  export const Recipe_ingredientsScalarFieldEnum: {
    id: 'id',
    listing: 'listing',
    extracted_name: 'extracted_name',
    embedding: 'embedding',
    grocery_section: 'grocery_section',
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


  export const Shopping_listScalarFieldEnum: {
    id: 'id',
    recipe_id: 'recipe_id',
    recipe_ingredient_id: 'recipe_ingredient_id',
    purchased: 'purchased',
    created_at: 'created_at'
  };

  export type Shopping_listScalarFieldEnum = (typeof Shopping_listScalarFieldEnum)[keyof typeof Shopping_listScalarFieldEnum]


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
   * Reference to a field of type 'jobs_state'
   */
  export type Enumjobs_stateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'jobs_state'>
    


  /**
   * Reference to a field of type 'jobs_state[]'
   */
  export type ListEnumjobs_stateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'jobs_state[]'>
    


  /**
   * Reference to a field of type 'grocery_section'
   */
  export type Enumgrocery_sectionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'grocery_section'>
    


  /**
   * Reference to a field of type 'grocery_section[]'
   */
  export type ListEnumgrocery_sectionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'grocery_section[]'>
    
  /**
   * Deep Input Types
   */


  export type Ingredient_eventsWhereInput = {
    AND?: Enumerable<Ingredient_eventsWhereInput>
    OR?: Enumerable<Ingredient_eventsWhereInput>
    NOT?: Enumerable<Ingredient_eventsWhereInput>
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
    AND?: Enumerable<Ingredient_eventsWhereInput>
    OR?: Enumerable<Ingredient_eventsWhereInput>
    NOT?: Enumerable<Ingredient_eventsWhereInput>
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
    AND?: Enumerable<Ingredient_eventsScalarWhereWithAggregatesInput>
    OR?: Enumerable<Ingredient_eventsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<Ingredient_eventsScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter<"Ingredient_events"> | string
    ingredient_id?: UuidWithAggregatesFilter<"Ingredient_events"> | string
    user_id?: StringWithAggregatesFilter<"Ingredient_events"> | string
    timestamp?: DateTimeWithAggregatesFilter<"Ingredient_events"> | Date | string
    from_values?: JsonNullableWithAggregatesFilter<"Ingredient_events">
    to_values?: JsonNullableWithAggregatesFilter<"Ingredient_events">
  }

  export type IngredientsWhereInput = {
    AND?: Enumerable<IngredientsWhereInput>
    OR?: Enumerable<IngredientsWhereInput>
    NOT?: Enumerable<IngredientsWhereInput>
    id?: UuidFilter<"Ingredients"> | string
    name?: StringFilter<"Ingredients"> | string
    description?: StringFilter<"Ingredients"> | string
    is_reviewed?: BoolFilter<"Ingredients"> | boolean
    embedding?: StringFilter<"Ingredients"> | string
    tracking_type?: Enumingredients_tracking_typeNullableFilter<"Ingredients"> | ingredients_tracking_type | null
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
    AND?: Enumerable<IngredientsWhereInput>
    OR?: Enumerable<IngredientsWhereInput>
    NOT?: Enumerable<IngredientsWhereInput>
    name?: StringFilter<"Ingredients"> | string
    description?: StringFilter<"Ingredients"> | string
    is_reviewed?: BoolFilter<"Ingredients"> | boolean
    embedding?: StringFilter<"Ingredients"> | string
    tracking_type?: Enumingredients_tracking_typeNullableFilter<"Ingredients"> | ingredients_tracking_type | null
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
    AND?: Enumerable<IngredientsScalarWhereWithAggregatesInput>
    OR?: Enumerable<IngredientsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<IngredientsScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter<"Ingredients"> | string
    name?: StringWithAggregatesFilter<"Ingredients"> | string
    description?: StringWithAggregatesFilter<"Ingredients"> | string
    is_reviewed?: BoolWithAggregatesFilter<"Ingredients"> | boolean
    embedding?: StringWithAggregatesFilter<"Ingredients"> | string
    tracking_type?: Enumingredients_tracking_typeNullableWithAggregatesFilter<"Ingredients"> | ingredients_tracking_type | null
    fill_level?: IntWithAggregatesFilter<"Ingredients"> | number
    count?: IntWithAggregatesFilter<"Ingredients"> | number
    shelf_life_months?: IntWithAggregatesFilter<"Ingredients"> | number
    fill_date?: StringWithAggregatesFilter<"Ingredients"> | string
    is_ground?: BoolNullableWithAggregatesFilter<"Ingredients"> | boolean | null
    ingredients_photo_uploads_id?: UuidNullableWithAggregatesFilter<"Ingredients"> | string | null
  }

  export type Ingredients_photo_uploadsWhereInput = {
    AND?: Enumerable<Ingredients_photo_uploadsWhereInput>
    OR?: Enumerable<Ingredients_photo_uploadsWhereInput>
    NOT?: Enumerable<Ingredients_photo_uploadsWhereInput>
    id?: UuidFilter<"Ingredients_photo_uploads"> | string
    user_id?: StringFilter<"Ingredients_photo_uploads"> | string
    created_at?: DateTimeFilter<"Ingredients_photo_uploads"> | Date | string
    uploaded_at?: DateTimeNullableFilter<"Ingredients_photo_uploads"> | Date | string | null
    state?: Enumingredient_photo_upload_stateFilter<"Ingredients_photo_uploads"> | ingredient_photo_upload_state
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
    AND?: Enumerable<Ingredients_photo_uploadsWhereInput>
    OR?: Enumerable<Ingredients_photo_uploadsWhereInput>
    NOT?: Enumerable<Ingredients_photo_uploadsWhereInput>
    user_id?: StringFilter<"Ingredients_photo_uploads"> | string
    created_at?: DateTimeFilter<"Ingredients_photo_uploads"> | Date | string
    uploaded_at?: DateTimeNullableFilter<"Ingredients_photo_uploads"> | Date | string | null
    state?: Enumingredient_photo_upload_stateFilter<"Ingredients_photo_uploads"> | ingredient_photo_upload_state
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
    AND?: Enumerable<Ingredients_photo_uploadsScalarWhereWithAggregatesInput>
    OR?: Enumerable<Ingredients_photo_uploadsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<Ingredients_photo_uploadsScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter<"Ingredients_photo_uploads"> | string
    user_id?: StringWithAggregatesFilter<"Ingredients_photo_uploads"> | string
    created_at?: DateTimeWithAggregatesFilter<"Ingredients_photo_uploads"> | Date | string
    uploaded_at?: DateTimeNullableWithAggregatesFilter<"Ingredients_photo_uploads"> | Date | string | null
    state?: Enumingredient_photo_upload_stateWithAggregatesFilter<"Ingredients_photo_uploads"> | ingredient_photo_upload_state
    upload_duration_sec?: FloatNullableWithAggregatesFilter<"Ingredients_photo_uploads"> | number | null
    ai_processing_duration_sec?: FloatNullableWithAggregatesFilter<"Ingredients_photo_uploads"> | number | null
    photo_url?: StringNullableWithAggregatesFilter<"Ingredients_photo_uploads"> | string | null
  }

  export type JobsWhereInput = {
    AND?: Enumerable<JobsWhereInput>
    OR?: Enumerable<JobsWhereInput>
    NOT?: Enumerable<JobsWhereInput>
    id?: UuidFilter<"Jobs"> | string
    state?: Enumjobs_stateFilter<"Jobs"> | jobs_state
    target_id?: UuidNullableFilter<"Jobs"> | string | null
    type?: StringFilter<"Jobs"> | string
    created_at?: DateTimeFilter<"Jobs"> | Date | string
    updated_at?: DateTimeFilter<"Jobs"> | Date | string
    error?: JsonNullableFilter<"Jobs">
    result?: JsonNullableFilter<"Jobs">
  }

  export type JobsOrderByWithRelationInput = {
    id?: SortOrder
    state?: SortOrder
    target_id?: SortOrderInput | SortOrder
    type?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    error?: SortOrderInput | SortOrder
    result?: SortOrderInput | SortOrder
  }

  export type JobsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: Enumerable<JobsWhereInput>
    OR?: Enumerable<JobsWhereInput>
    NOT?: Enumerable<JobsWhereInput>
    state?: Enumjobs_stateFilter<"Jobs"> | jobs_state
    target_id?: UuidNullableFilter<"Jobs"> | string | null
    type?: StringFilter<"Jobs"> | string
    created_at?: DateTimeFilter<"Jobs"> | Date | string
    updated_at?: DateTimeFilter<"Jobs"> | Date | string
    error?: JsonNullableFilter<"Jobs">
    result?: JsonNullableFilter<"Jobs">
  }, "id">

  export type JobsOrderByWithAggregationInput = {
    id?: SortOrder
    state?: SortOrder
    target_id?: SortOrderInput | SortOrder
    type?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    error?: SortOrderInput | SortOrder
    result?: SortOrderInput | SortOrder
    _count?: JobsCountOrderByAggregateInput
    _max?: JobsMaxOrderByAggregateInput
    _min?: JobsMinOrderByAggregateInput
  }

  export type JobsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<JobsScalarWhereWithAggregatesInput>
    OR?: Enumerable<JobsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<JobsScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter<"Jobs"> | string
    state?: Enumjobs_stateWithAggregatesFilter<"Jobs"> | jobs_state
    target_id?: UuidNullableWithAggregatesFilter<"Jobs"> | string | null
    type?: StringWithAggregatesFilter<"Jobs"> | string
    created_at?: DateTimeWithAggregatesFilter<"Jobs"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Jobs"> | Date | string
    error?: JsonNullableWithAggregatesFilter<"Jobs">
    result?: JsonNullableWithAggregatesFilter<"Jobs">
  }

  export type Recipe_ingredientsWhereInput = {
    AND?: Enumerable<Recipe_ingredientsWhereInput>
    OR?: Enumerable<Recipe_ingredientsWhereInput>
    NOT?: Enumerable<Recipe_ingredientsWhereInput>
    id?: UuidFilter<"Recipe_ingredients"> | string
    listing?: StringFilter<"Recipe_ingredients"> | string
    extracted_name?: StringFilter<"Recipe_ingredients"> | string
    embedding?: StringFilter<"Recipe_ingredients"> | string
    grocery_section?: Enumgrocery_sectionFilter<"Recipe_ingredients"> | grocery_section
    recipe_id?: UuidFilter<"Recipe_ingredients"> | string
    recipes?: XOR<RecipesRelationFilter, RecipesWhereInput>
    shopping_list?: Shopping_listListRelationFilter
  }

  export type Recipe_ingredientsOrderByWithRelationInput = {
    id?: SortOrder
    listing?: SortOrder
    extracted_name?: SortOrder
    embedding?: SortOrder
    grocery_section?: SortOrder
    recipe_id?: SortOrder
    recipes?: RecipesOrderByWithRelationInput
    shopping_list?: Shopping_listOrderByRelationAggregateInput
  }

  export type Recipe_ingredientsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: Enumerable<Recipe_ingredientsWhereInput>
    OR?: Enumerable<Recipe_ingredientsWhereInput>
    NOT?: Enumerable<Recipe_ingredientsWhereInput>
    listing?: StringFilter<"Recipe_ingredients"> | string
    extracted_name?: StringFilter<"Recipe_ingredients"> | string
    embedding?: StringFilter<"Recipe_ingredients"> | string
    grocery_section?: Enumgrocery_sectionFilter<"Recipe_ingredients"> | grocery_section
    recipe_id?: UuidFilter<"Recipe_ingredients"> | string
    recipes?: XOR<RecipesRelationFilter, RecipesWhereInput>
    shopping_list?: Shopping_listListRelationFilter
  }, "id">

  export type Recipe_ingredientsOrderByWithAggregationInput = {
    id?: SortOrder
    listing?: SortOrder
    extracted_name?: SortOrder
    embedding?: SortOrder
    grocery_section?: SortOrder
    recipe_id?: SortOrder
    _count?: Recipe_ingredientsCountOrderByAggregateInput
    _max?: Recipe_ingredientsMaxOrderByAggregateInput
    _min?: Recipe_ingredientsMinOrderByAggregateInput
  }

  export type Recipe_ingredientsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<Recipe_ingredientsScalarWhereWithAggregatesInput>
    OR?: Enumerable<Recipe_ingredientsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<Recipe_ingredientsScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter<"Recipe_ingredients"> | string
    listing?: StringWithAggregatesFilter<"Recipe_ingredients"> | string
    extracted_name?: StringWithAggregatesFilter<"Recipe_ingredients"> | string
    embedding?: StringWithAggregatesFilter<"Recipe_ingredients"> | string
    grocery_section?: Enumgrocery_sectionWithAggregatesFilter<"Recipe_ingredients"> | grocery_section
    recipe_id?: UuidWithAggregatesFilter<"Recipe_ingredients"> | string
  }

  export type RecipesWhereInput = {
    AND?: Enumerable<RecipesWhereInput>
    OR?: Enumerable<RecipesWhereInput>
    NOT?: Enumerable<RecipesWhereInput>
    id?: UuidFilter<"Recipes"> | string
    name?: StringFilter<"Recipes"> | string
    description?: StringFilter<"Recipes"> | string
    url?: StringFilter<"Recipes"> | string
    user_id?: StringFilter<"Recipes"> | string
    created_at?: DateTimeFilter<"Recipes"> | Date | string
    updated_at?: DateTimeFilter<"Recipes"> | Date | string
    recipe_ingredients?: Recipe_ingredientsListRelationFilter
    users?: XOR<UsersRelationFilter, UsersWhereInput>
    shopping_list?: Shopping_listListRelationFilter
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
    shopping_list?: Shopping_listOrderByRelationAggregateInput
  }

  export type RecipesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: Enumerable<RecipesWhereInput>
    OR?: Enumerable<RecipesWhereInput>
    NOT?: Enumerable<RecipesWhereInput>
    name?: StringFilter<"Recipes"> | string
    description?: StringFilter<"Recipes"> | string
    url?: StringFilter<"Recipes"> | string
    user_id?: StringFilter<"Recipes"> | string
    created_at?: DateTimeFilter<"Recipes"> | Date | string
    updated_at?: DateTimeFilter<"Recipes"> | Date | string
    recipe_ingredients?: Recipe_ingredientsListRelationFilter
    users?: XOR<UsersRelationFilter, UsersWhereInput>
    shopping_list?: Shopping_listListRelationFilter
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
    AND?: Enumerable<RecipesScalarWhereWithAggregatesInput>
    OR?: Enumerable<RecipesScalarWhereWithAggregatesInput>
    NOT?: Enumerable<RecipesScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter<"Recipes"> | string
    name?: StringWithAggregatesFilter<"Recipes"> | string
    description?: StringWithAggregatesFilter<"Recipes"> | string
    url?: StringWithAggregatesFilter<"Recipes"> | string
    user_id?: StringWithAggregatesFilter<"Recipes"> | string
    created_at?: DateTimeWithAggregatesFilter<"Recipes"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Recipes"> | Date | string
  }

  export type Shopping_listWhereInput = {
    AND?: Enumerable<Shopping_listWhereInput>
    OR?: Enumerable<Shopping_listWhereInput>
    NOT?: Enumerable<Shopping_listWhereInput>
    id?: UuidFilter<"Shopping_list"> | string
    recipe_id?: UuidFilter<"Shopping_list"> | string
    recipe_ingredient_id?: UuidFilter<"Shopping_list"> | string
    purchased?: BoolFilter<"Shopping_list"> | boolean
    created_at?: DateTimeFilter<"Shopping_list"> | Date | string
    recipes?: XOR<RecipesRelationFilter, RecipesWhereInput>
    recipe_ingredients?: XOR<Recipe_ingredientsRelationFilter, Recipe_ingredientsWhereInput>
  }

  export type Shopping_listOrderByWithRelationInput = {
    id?: SortOrder
    recipe_id?: SortOrder
    recipe_ingredient_id?: SortOrder
    purchased?: SortOrder
    created_at?: SortOrder
    recipes?: RecipesOrderByWithRelationInput
    recipe_ingredients?: Recipe_ingredientsOrderByWithRelationInput
  }

  export type Shopping_listWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: Enumerable<Shopping_listWhereInput>
    OR?: Enumerable<Shopping_listWhereInput>
    NOT?: Enumerable<Shopping_listWhereInput>
    recipe_id?: UuidFilter<"Shopping_list"> | string
    recipe_ingredient_id?: UuidFilter<"Shopping_list"> | string
    purchased?: BoolFilter<"Shopping_list"> | boolean
    created_at?: DateTimeFilter<"Shopping_list"> | Date | string
    recipes?: XOR<RecipesRelationFilter, RecipesWhereInput>
    recipe_ingredients?: XOR<Recipe_ingredientsRelationFilter, Recipe_ingredientsWhereInput>
  }, "id">

  export type Shopping_listOrderByWithAggregationInput = {
    id?: SortOrder
    recipe_id?: SortOrder
    recipe_ingredient_id?: SortOrder
    purchased?: SortOrder
    created_at?: SortOrder
    _count?: Shopping_listCountOrderByAggregateInput
    _max?: Shopping_listMaxOrderByAggregateInput
    _min?: Shopping_listMinOrderByAggregateInput
  }

  export type Shopping_listScalarWhereWithAggregatesInput = {
    AND?: Enumerable<Shopping_listScalarWhereWithAggregatesInput>
    OR?: Enumerable<Shopping_listScalarWhereWithAggregatesInput>
    NOT?: Enumerable<Shopping_listScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter<"Shopping_list"> | string
    recipe_id?: UuidWithAggregatesFilter<"Shopping_list"> | string
    recipe_ingredient_id?: UuidWithAggregatesFilter<"Shopping_list"> | string
    purchased?: BoolWithAggregatesFilter<"Shopping_list"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Shopping_list"> | Date | string
  }

  export type UsersWhereInput = {
    AND?: Enumerable<UsersWhereInput>
    OR?: Enumerable<UsersWhereInput>
    NOT?: Enumerable<UsersWhereInput>
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
    AND?: Enumerable<UsersWhereInput>
    OR?: Enumerable<UsersWhereInput>
    NOT?: Enumerable<UsersWhereInput>
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
    AND?: Enumerable<UsersScalarWhereWithAggregatesInput>
    OR?: Enumerable<UsersScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UsersScalarWhereWithAggregatesInput>
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
    tracking_type?: ingredients_tracking_type | null
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
    tracking_type?: ingredients_tracking_type | null
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
    tracking_type?: NullableEnumingredients_tracking_typeFieldUpdateOperationsInput | ingredients_tracking_type | null
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
    tracking_type?: NullableEnumingredients_tracking_typeFieldUpdateOperationsInput | ingredients_tracking_type | null
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
    tracking_type?: ingredients_tracking_type | null
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
    tracking_type?: NullableEnumingredients_tracking_typeFieldUpdateOperationsInput | ingredients_tracking_type | null
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
    tracking_type?: NullableEnumingredients_tracking_typeFieldUpdateOperationsInput | ingredients_tracking_type | null
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
    state: ingredient_photo_upload_state
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
    state: ingredient_photo_upload_state
    upload_duration_sec?: number | null
    ai_processing_duration_sec?: number | null
    photo_url?: string | null
    ingredients?: IngredientsUncheckedCreateNestedManyWithoutIngredients_photo_uploadsInput
  }

  export type Ingredients_photo_uploadsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    state?: Enumingredient_photo_upload_stateFieldUpdateOperationsInput | ingredient_photo_upload_state
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
    state?: Enumingredient_photo_upload_stateFieldUpdateOperationsInput | ingredient_photo_upload_state
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
    state: ingredient_photo_upload_state
    upload_duration_sec?: number | null
    ai_processing_duration_sec?: number | null
    photo_url?: string | null
  }

  export type Ingredients_photo_uploadsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    state?: Enumingredient_photo_upload_stateFieldUpdateOperationsInput | ingredient_photo_upload_state
    upload_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    ai_processing_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Ingredients_photo_uploadsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    state?: Enumingredient_photo_upload_stateFieldUpdateOperationsInput | ingredient_photo_upload_state
    upload_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    ai_processing_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobsCreateInput = {
    id: string
    state: jobs_state
    target_id?: string | null
    type: string
    created_at: Date | string
    updated_at: Date | string
    error?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
  }

  export type JobsUncheckedCreateInput = {
    id: string
    state: jobs_state
    target_id?: string | null
    type: string
    created_at: Date | string
    updated_at: Date | string
    error?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
  }

  export type JobsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    state?: Enumjobs_stateFieldUpdateOperationsInput | jobs_state
    target_id?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
  }

  export type JobsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    state?: Enumjobs_stateFieldUpdateOperationsInput | jobs_state
    target_id?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
  }

  export type JobsCreateManyInput = {
    id: string
    state: jobs_state
    target_id?: string | null
    type: string
    created_at: Date | string
    updated_at: Date | string
    error?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
  }

  export type JobsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    state?: Enumjobs_stateFieldUpdateOperationsInput | jobs_state
    target_id?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
  }

  export type JobsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    state?: Enumjobs_stateFieldUpdateOperationsInput | jobs_state
    target_id?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    error?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
  }

  export type Recipe_ingredientsCreateInput = {
    id: string
    listing: string
    extracted_name: string
    embedding: string
    grocery_section: grocery_section
    recipes: RecipesCreateNestedOneWithoutRecipe_ingredientsInput
    shopping_list?: Shopping_listCreateNestedManyWithoutRecipe_ingredientsInput
  }

  export type Recipe_ingredientsUncheckedCreateInput = {
    id: string
    listing: string
    extracted_name: string
    embedding: string
    grocery_section: grocery_section
    recipe_id: string
    shopping_list?: Shopping_listUncheckedCreateNestedManyWithoutRecipe_ingredientsInput
  }

  export type Recipe_ingredientsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    listing?: StringFieldUpdateOperationsInput | string
    extracted_name?: StringFieldUpdateOperationsInput | string
    embedding?: StringFieldUpdateOperationsInput | string
    grocery_section?: Enumgrocery_sectionFieldUpdateOperationsInput | grocery_section
    recipes?: RecipesUpdateOneRequiredWithoutRecipe_ingredientsNestedInput
    shopping_list?: Shopping_listUpdateManyWithoutRecipe_ingredientsNestedInput
  }

  export type Recipe_ingredientsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    listing?: StringFieldUpdateOperationsInput | string
    extracted_name?: StringFieldUpdateOperationsInput | string
    embedding?: StringFieldUpdateOperationsInput | string
    grocery_section?: Enumgrocery_sectionFieldUpdateOperationsInput | grocery_section
    recipe_id?: StringFieldUpdateOperationsInput | string
    shopping_list?: Shopping_listUncheckedUpdateManyWithoutRecipe_ingredientsNestedInput
  }

  export type Recipe_ingredientsCreateManyInput = {
    id: string
    listing: string
    extracted_name: string
    embedding: string
    grocery_section: grocery_section
    recipe_id: string
  }

  export type Recipe_ingredientsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    listing?: StringFieldUpdateOperationsInput | string
    extracted_name?: StringFieldUpdateOperationsInput | string
    embedding?: StringFieldUpdateOperationsInput | string
    grocery_section?: Enumgrocery_sectionFieldUpdateOperationsInput | grocery_section
  }

  export type Recipe_ingredientsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    listing?: StringFieldUpdateOperationsInput | string
    extracted_name?: StringFieldUpdateOperationsInput | string
    embedding?: StringFieldUpdateOperationsInput | string
    grocery_section?: Enumgrocery_sectionFieldUpdateOperationsInput | grocery_section
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
    shopping_list?: Shopping_listCreateNestedManyWithoutRecipesInput
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
    shopping_list?: Shopping_listUncheckedCreateNestedManyWithoutRecipesInput
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
    shopping_list?: Shopping_listUpdateManyWithoutRecipesNestedInput
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
    shopping_list?: Shopping_listUncheckedUpdateManyWithoutRecipesNestedInput
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

  export type Shopping_listCreateInput = {
    id: string
    purchased: boolean
    created_at: Date | string
    recipes: RecipesCreateNestedOneWithoutShopping_listInput
    recipe_ingredients: Recipe_ingredientsCreateNestedOneWithoutShopping_listInput
  }

  export type Shopping_listUncheckedCreateInput = {
    id: string
    recipe_id: string
    recipe_ingredient_id: string
    purchased: boolean
    created_at: Date | string
  }

  export type Shopping_listUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchased?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recipes?: RecipesUpdateOneRequiredWithoutShopping_listNestedInput
    recipe_ingredients?: Recipe_ingredientsUpdateOneRequiredWithoutShopping_listNestedInput
  }

  export type Shopping_listUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    recipe_id?: StringFieldUpdateOperationsInput | string
    recipe_ingredient_id?: StringFieldUpdateOperationsInput | string
    purchased?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Shopping_listCreateManyInput = {
    id: string
    recipe_id: string
    recipe_ingredient_id: string
    purchased: boolean
    created_at: Date | string
  }

  export type Shopping_listUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchased?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Shopping_listUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    recipe_id?: StringFieldUpdateOperationsInput | string
    recipe_ingredient_id?: StringFieldUpdateOperationsInput | string
    purchased?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
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
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
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
    in?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel>
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
    path?: Array<string>
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
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
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
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
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
    in?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel>
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
    path?: Array<string>
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
    equals?: ingredients_tracking_type | Enumingredients_tracking_typeFieldRefInput<$PrismaModel> | null
    in?: Enumerable<ingredients_tracking_type> | ListEnumingredients_tracking_typeFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<ingredients_tracking_type> | ListEnumingredients_tracking_typeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumingredients_tracking_typeNullableFilter<$PrismaModel> | ingredients_tracking_type | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel>
    notIn?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel>
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
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
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
    equals?: ingredients_tracking_type | Enumingredients_tracking_typeFieldRefInput<$PrismaModel> | null
    in?: Enumerable<ingredients_tracking_type> | ListEnumingredients_tracking_typeFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<ingredients_tracking_type> | ListEnumingredients_tracking_typeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumingredients_tracking_typeNullableWithAggregatesFilter<$PrismaModel> | ingredients_tracking_type | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumingredients_tracking_typeNullableFilter<$PrismaModel>
    _max?: NestedEnumingredients_tracking_typeNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel>
    notIn?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel>
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
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
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
    in?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type Enumingredient_photo_upload_stateFilter<$PrismaModel = never> = {
    equals?: ingredient_photo_upload_state | Enumingredient_photo_upload_stateFieldRefInput<$PrismaModel>
    in?: Enumerable<ingredient_photo_upload_state> | ListEnumingredient_photo_upload_stateFieldRefInput<$PrismaModel>
    notIn?: Enumerable<ingredient_photo_upload_state> | ListEnumingredient_photo_upload_stateFieldRefInput<$PrismaModel>
    not?: NestedEnumingredient_photo_upload_stateFilter<$PrismaModel> | ingredient_photo_upload_state
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: Enumerable<number> | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<number> | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
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
    in?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel> | null
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
    equals?: ingredient_photo_upload_state | Enumingredient_photo_upload_stateFieldRefInput<$PrismaModel>
    in?: Enumerable<ingredient_photo_upload_state> | ListEnumingredient_photo_upload_stateFieldRefInput<$PrismaModel>
    notIn?: Enumerable<ingredient_photo_upload_state> | ListEnumingredient_photo_upload_stateFieldRefInput<$PrismaModel>
    not?: NestedEnumingredient_photo_upload_stateWithAggregatesFilter<$PrismaModel> | ingredient_photo_upload_state
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumingredient_photo_upload_stateFilter<$PrismaModel>
    _max?: NestedEnumingredient_photo_upload_stateFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: Enumerable<number> | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<number> | ListFloatFieldRefInput<$PrismaModel> | null
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
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
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

  export type Enumjobs_stateFilter<$PrismaModel = never> = {
    equals?: jobs_state | Enumjobs_stateFieldRefInput<$PrismaModel>
    in?: Enumerable<jobs_state> | ListEnumjobs_stateFieldRefInput<$PrismaModel>
    notIn?: Enumerable<jobs_state> | ListEnumjobs_stateFieldRefInput<$PrismaModel>
    not?: NestedEnumjobs_stateFilter<$PrismaModel> | jobs_state
  }

  export type JobsCountOrderByAggregateInput = {
    id?: SortOrder
    state?: SortOrder
    target_id?: SortOrder
    type?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    error?: SortOrder
    result?: SortOrder
  }

  export type JobsMaxOrderByAggregateInput = {
    id?: SortOrder
    state?: SortOrder
    target_id?: SortOrder
    type?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type JobsMinOrderByAggregateInput = {
    id?: SortOrder
    state?: SortOrder
    target_id?: SortOrder
    type?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type Enumjobs_stateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: jobs_state | Enumjobs_stateFieldRefInput<$PrismaModel>
    in?: Enumerable<jobs_state> | ListEnumjobs_stateFieldRefInput<$PrismaModel>
    notIn?: Enumerable<jobs_state> | ListEnumjobs_stateFieldRefInput<$PrismaModel>
    not?: NestedEnumjobs_stateWithAggregatesFilter<$PrismaModel> | jobs_state
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumjobs_stateFilter<$PrismaModel>
    _max?: NestedEnumjobs_stateFilter<$PrismaModel>
  }

  export type Enumgrocery_sectionFilter<$PrismaModel = never> = {
    equals?: grocery_section | Enumgrocery_sectionFieldRefInput<$PrismaModel>
    in?: Enumerable<grocery_section> | ListEnumgrocery_sectionFieldRefInput<$PrismaModel>
    notIn?: Enumerable<grocery_section> | ListEnumgrocery_sectionFieldRefInput<$PrismaModel>
    not?: NestedEnumgrocery_sectionFilter<$PrismaModel> | grocery_section
  }

  export type RecipesRelationFilter = {
    is?: RecipesWhereInput
    isNot?: RecipesWhereInput
  }

  export type Shopping_listListRelationFilter = {
    every?: Shopping_listWhereInput
    some?: Shopping_listWhereInput
    none?: Shopping_listWhereInput
  }

  export type Shopping_listOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type Recipe_ingredientsCountOrderByAggregateInput = {
    id?: SortOrder
    listing?: SortOrder
    extracted_name?: SortOrder
    embedding?: SortOrder
    grocery_section?: SortOrder
    recipe_id?: SortOrder
  }

  export type Recipe_ingredientsMaxOrderByAggregateInput = {
    id?: SortOrder
    listing?: SortOrder
    extracted_name?: SortOrder
    embedding?: SortOrder
    grocery_section?: SortOrder
    recipe_id?: SortOrder
  }

  export type Recipe_ingredientsMinOrderByAggregateInput = {
    id?: SortOrder
    listing?: SortOrder
    extracted_name?: SortOrder
    embedding?: SortOrder
    grocery_section?: SortOrder
    recipe_id?: SortOrder
  }

  export type Enumgrocery_sectionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: grocery_section | Enumgrocery_sectionFieldRefInput<$PrismaModel>
    in?: Enumerable<grocery_section> | ListEnumgrocery_sectionFieldRefInput<$PrismaModel>
    notIn?: Enumerable<grocery_section> | ListEnumgrocery_sectionFieldRefInput<$PrismaModel>
    not?: NestedEnumgrocery_sectionWithAggregatesFilter<$PrismaModel> | grocery_section
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumgrocery_sectionFilter<$PrismaModel>
    _max?: NestedEnumgrocery_sectionFilter<$PrismaModel>
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

  export type Recipe_ingredientsRelationFilter = {
    is?: Recipe_ingredientsWhereInput
    isNot?: Recipe_ingredientsWhereInput
  }

  export type Shopping_listCountOrderByAggregateInput = {
    id?: SortOrder
    recipe_id?: SortOrder
    recipe_ingredient_id?: SortOrder
    purchased?: SortOrder
    created_at?: SortOrder
  }

  export type Shopping_listMaxOrderByAggregateInput = {
    id?: SortOrder
    recipe_id?: SortOrder
    recipe_ingredient_id?: SortOrder
    purchased?: SortOrder
    created_at?: SortOrder
  }

  export type Shopping_listMinOrderByAggregateInput = {
    id?: SortOrder
    recipe_id?: SortOrder
    recipe_ingredient_id?: SortOrder
    purchased?: SortOrder
    created_at?: SortOrder
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
    create?: XOR<Enumerable<Ingredient_eventsCreateWithoutIngredientsInput>, Enumerable<Ingredient_eventsUncheckedCreateWithoutIngredientsInput>>
    connectOrCreate?: Enumerable<Ingredient_eventsCreateOrConnectWithoutIngredientsInput>
    createMany?: Ingredient_eventsCreateManyIngredientsInputEnvelope
    connect?: Enumerable<Ingredient_eventsWhereUniqueInput>
  }

  export type Ingredients_photo_uploadsCreateNestedOneWithoutIngredientsInput = {
    create?: XOR<Ingredients_photo_uploadsCreateWithoutIngredientsInput, Ingredients_photo_uploadsUncheckedCreateWithoutIngredientsInput>
    connectOrCreate?: Ingredients_photo_uploadsCreateOrConnectWithoutIngredientsInput
    connect?: Ingredients_photo_uploadsWhereUniqueInput
  }

  export type Ingredient_eventsUncheckedCreateNestedManyWithoutIngredientsInput = {
    create?: XOR<Enumerable<Ingredient_eventsCreateWithoutIngredientsInput>, Enumerable<Ingredient_eventsUncheckedCreateWithoutIngredientsInput>>
    connectOrCreate?: Enumerable<Ingredient_eventsCreateOrConnectWithoutIngredientsInput>
    createMany?: Ingredient_eventsCreateManyIngredientsInputEnvelope
    connect?: Enumerable<Ingredient_eventsWhereUniqueInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableEnumingredients_tracking_typeFieldUpdateOperationsInput = {
    set?: ingredients_tracking_type | null
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
    create?: XOR<Enumerable<Ingredient_eventsCreateWithoutIngredientsInput>, Enumerable<Ingredient_eventsUncheckedCreateWithoutIngredientsInput>>
    connectOrCreate?: Enumerable<Ingredient_eventsCreateOrConnectWithoutIngredientsInput>
    upsert?: Enumerable<Ingredient_eventsUpsertWithWhereUniqueWithoutIngredientsInput>
    createMany?: Ingredient_eventsCreateManyIngredientsInputEnvelope
    set?: Enumerable<Ingredient_eventsWhereUniqueInput>
    disconnect?: Enumerable<Ingredient_eventsWhereUniqueInput>
    delete?: Enumerable<Ingredient_eventsWhereUniqueInput>
    connect?: Enumerable<Ingredient_eventsWhereUniqueInput>
    update?: Enumerable<Ingredient_eventsUpdateWithWhereUniqueWithoutIngredientsInput>
    updateMany?: Enumerable<Ingredient_eventsUpdateManyWithWhereWithoutIngredientsInput>
    deleteMany?: Enumerable<Ingredient_eventsScalarWhereInput>
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
    create?: XOR<Enumerable<Ingredient_eventsCreateWithoutIngredientsInput>, Enumerable<Ingredient_eventsUncheckedCreateWithoutIngredientsInput>>
    connectOrCreate?: Enumerable<Ingredient_eventsCreateOrConnectWithoutIngredientsInput>
    upsert?: Enumerable<Ingredient_eventsUpsertWithWhereUniqueWithoutIngredientsInput>
    createMany?: Ingredient_eventsCreateManyIngredientsInputEnvelope
    set?: Enumerable<Ingredient_eventsWhereUniqueInput>
    disconnect?: Enumerable<Ingredient_eventsWhereUniqueInput>
    delete?: Enumerable<Ingredient_eventsWhereUniqueInput>
    connect?: Enumerable<Ingredient_eventsWhereUniqueInput>
    update?: Enumerable<Ingredient_eventsUpdateWithWhereUniqueWithoutIngredientsInput>
    updateMany?: Enumerable<Ingredient_eventsUpdateManyWithWhereWithoutIngredientsInput>
    deleteMany?: Enumerable<Ingredient_eventsScalarWhereInput>
  }

  export type IngredientsCreateNestedManyWithoutIngredients_photo_uploadsInput = {
    create?: XOR<Enumerable<IngredientsCreateWithoutIngredients_photo_uploadsInput>, Enumerable<IngredientsUncheckedCreateWithoutIngredients_photo_uploadsInput>>
    connectOrCreate?: Enumerable<IngredientsCreateOrConnectWithoutIngredients_photo_uploadsInput>
    createMany?: IngredientsCreateManyIngredients_photo_uploadsInputEnvelope
    connect?: Enumerable<IngredientsWhereUniqueInput>
  }

  export type UsersCreateNestedOneWithoutIngredients_photo_uploadsInput = {
    create?: XOR<UsersCreateWithoutIngredients_photo_uploadsInput, UsersUncheckedCreateWithoutIngredients_photo_uploadsInput>
    connectOrCreate?: UsersCreateOrConnectWithoutIngredients_photo_uploadsInput
    connect?: UsersWhereUniqueInput
  }

  export type IngredientsUncheckedCreateNestedManyWithoutIngredients_photo_uploadsInput = {
    create?: XOR<Enumerable<IngredientsCreateWithoutIngredients_photo_uploadsInput>, Enumerable<IngredientsUncheckedCreateWithoutIngredients_photo_uploadsInput>>
    connectOrCreate?: Enumerable<IngredientsCreateOrConnectWithoutIngredients_photo_uploadsInput>
    createMany?: IngredientsCreateManyIngredients_photo_uploadsInputEnvelope
    connect?: Enumerable<IngredientsWhereUniqueInput>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type Enumingredient_photo_upload_stateFieldUpdateOperationsInput = {
    set?: ingredient_photo_upload_state
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IngredientsUpdateManyWithoutIngredients_photo_uploadsNestedInput = {
    create?: XOR<Enumerable<IngredientsCreateWithoutIngredients_photo_uploadsInput>, Enumerable<IngredientsUncheckedCreateWithoutIngredients_photo_uploadsInput>>
    connectOrCreate?: Enumerable<IngredientsCreateOrConnectWithoutIngredients_photo_uploadsInput>
    upsert?: Enumerable<IngredientsUpsertWithWhereUniqueWithoutIngredients_photo_uploadsInput>
    createMany?: IngredientsCreateManyIngredients_photo_uploadsInputEnvelope
    set?: Enumerable<IngredientsWhereUniqueInput>
    disconnect?: Enumerable<IngredientsWhereUniqueInput>
    delete?: Enumerable<IngredientsWhereUniqueInput>
    connect?: Enumerable<IngredientsWhereUniqueInput>
    update?: Enumerable<IngredientsUpdateWithWhereUniqueWithoutIngredients_photo_uploadsInput>
    updateMany?: Enumerable<IngredientsUpdateManyWithWhereWithoutIngredients_photo_uploadsInput>
    deleteMany?: Enumerable<IngredientsScalarWhereInput>
  }

  export type UsersUpdateOneRequiredWithoutIngredients_photo_uploadsNestedInput = {
    create?: XOR<UsersCreateWithoutIngredients_photo_uploadsInput, UsersUncheckedCreateWithoutIngredients_photo_uploadsInput>
    connectOrCreate?: UsersCreateOrConnectWithoutIngredients_photo_uploadsInput
    upsert?: UsersUpsertWithoutIngredients_photo_uploadsInput
    connect?: UsersWhereUniqueInput
    update?: XOR<XOR<UsersUpdateToOneWithWhereWithoutIngredients_photo_uploadsInput, UsersUpdateWithoutIngredients_photo_uploadsInput>, UsersUncheckedUpdateWithoutIngredients_photo_uploadsInput>
  }

  export type IngredientsUncheckedUpdateManyWithoutIngredients_photo_uploadsNestedInput = {
    create?: XOR<Enumerable<IngredientsCreateWithoutIngredients_photo_uploadsInput>, Enumerable<IngredientsUncheckedCreateWithoutIngredients_photo_uploadsInput>>
    connectOrCreate?: Enumerable<IngredientsCreateOrConnectWithoutIngredients_photo_uploadsInput>
    upsert?: Enumerable<IngredientsUpsertWithWhereUniqueWithoutIngredients_photo_uploadsInput>
    createMany?: IngredientsCreateManyIngredients_photo_uploadsInputEnvelope
    set?: Enumerable<IngredientsWhereUniqueInput>
    disconnect?: Enumerable<IngredientsWhereUniqueInput>
    delete?: Enumerable<IngredientsWhereUniqueInput>
    connect?: Enumerable<IngredientsWhereUniqueInput>
    update?: Enumerable<IngredientsUpdateWithWhereUniqueWithoutIngredients_photo_uploadsInput>
    updateMany?: Enumerable<IngredientsUpdateManyWithWhereWithoutIngredients_photo_uploadsInput>
    deleteMany?: Enumerable<IngredientsScalarWhereInput>
  }

  export type Enumjobs_stateFieldUpdateOperationsInput = {
    set?: jobs_state
  }

  export type RecipesCreateNestedOneWithoutRecipe_ingredientsInput = {
    create?: XOR<RecipesCreateWithoutRecipe_ingredientsInput, RecipesUncheckedCreateWithoutRecipe_ingredientsInput>
    connectOrCreate?: RecipesCreateOrConnectWithoutRecipe_ingredientsInput
    connect?: RecipesWhereUniqueInput
  }

  export type Shopping_listCreateNestedManyWithoutRecipe_ingredientsInput = {
    create?: XOR<Enumerable<Shopping_listCreateWithoutRecipe_ingredientsInput>, Enumerable<Shopping_listUncheckedCreateWithoutRecipe_ingredientsInput>>
    connectOrCreate?: Enumerable<Shopping_listCreateOrConnectWithoutRecipe_ingredientsInput>
    createMany?: Shopping_listCreateManyRecipe_ingredientsInputEnvelope
    connect?: Enumerable<Shopping_listWhereUniqueInput>
  }

  export type Shopping_listUncheckedCreateNestedManyWithoutRecipe_ingredientsInput = {
    create?: XOR<Enumerable<Shopping_listCreateWithoutRecipe_ingredientsInput>, Enumerable<Shopping_listUncheckedCreateWithoutRecipe_ingredientsInput>>
    connectOrCreate?: Enumerable<Shopping_listCreateOrConnectWithoutRecipe_ingredientsInput>
    createMany?: Shopping_listCreateManyRecipe_ingredientsInputEnvelope
    connect?: Enumerable<Shopping_listWhereUniqueInput>
  }

  export type Enumgrocery_sectionFieldUpdateOperationsInput = {
    set?: grocery_section
  }

  export type RecipesUpdateOneRequiredWithoutRecipe_ingredientsNestedInput = {
    create?: XOR<RecipesCreateWithoutRecipe_ingredientsInput, RecipesUncheckedCreateWithoutRecipe_ingredientsInput>
    connectOrCreate?: RecipesCreateOrConnectWithoutRecipe_ingredientsInput
    upsert?: RecipesUpsertWithoutRecipe_ingredientsInput
    connect?: RecipesWhereUniqueInput
    update?: XOR<XOR<RecipesUpdateToOneWithWhereWithoutRecipe_ingredientsInput, RecipesUpdateWithoutRecipe_ingredientsInput>, RecipesUncheckedUpdateWithoutRecipe_ingredientsInput>
  }

  export type Shopping_listUpdateManyWithoutRecipe_ingredientsNestedInput = {
    create?: XOR<Enumerable<Shopping_listCreateWithoutRecipe_ingredientsInput>, Enumerable<Shopping_listUncheckedCreateWithoutRecipe_ingredientsInput>>
    connectOrCreate?: Enumerable<Shopping_listCreateOrConnectWithoutRecipe_ingredientsInput>
    upsert?: Enumerable<Shopping_listUpsertWithWhereUniqueWithoutRecipe_ingredientsInput>
    createMany?: Shopping_listCreateManyRecipe_ingredientsInputEnvelope
    set?: Enumerable<Shopping_listWhereUniqueInput>
    disconnect?: Enumerable<Shopping_listWhereUniqueInput>
    delete?: Enumerable<Shopping_listWhereUniqueInput>
    connect?: Enumerable<Shopping_listWhereUniqueInput>
    update?: Enumerable<Shopping_listUpdateWithWhereUniqueWithoutRecipe_ingredientsInput>
    updateMany?: Enumerable<Shopping_listUpdateManyWithWhereWithoutRecipe_ingredientsInput>
    deleteMany?: Enumerable<Shopping_listScalarWhereInput>
  }

  export type Shopping_listUncheckedUpdateManyWithoutRecipe_ingredientsNestedInput = {
    create?: XOR<Enumerable<Shopping_listCreateWithoutRecipe_ingredientsInput>, Enumerable<Shopping_listUncheckedCreateWithoutRecipe_ingredientsInput>>
    connectOrCreate?: Enumerable<Shopping_listCreateOrConnectWithoutRecipe_ingredientsInput>
    upsert?: Enumerable<Shopping_listUpsertWithWhereUniqueWithoutRecipe_ingredientsInput>
    createMany?: Shopping_listCreateManyRecipe_ingredientsInputEnvelope
    set?: Enumerable<Shopping_listWhereUniqueInput>
    disconnect?: Enumerable<Shopping_listWhereUniqueInput>
    delete?: Enumerable<Shopping_listWhereUniqueInput>
    connect?: Enumerable<Shopping_listWhereUniqueInput>
    update?: Enumerable<Shopping_listUpdateWithWhereUniqueWithoutRecipe_ingredientsInput>
    updateMany?: Enumerable<Shopping_listUpdateManyWithWhereWithoutRecipe_ingredientsInput>
    deleteMany?: Enumerable<Shopping_listScalarWhereInput>
  }

  export type Recipe_ingredientsCreateNestedManyWithoutRecipesInput = {
    create?: XOR<Enumerable<Recipe_ingredientsCreateWithoutRecipesInput>, Enumerable<Recipe_ingredientsUncheckedCreateWithoutRecipesInput>>
    connectOrCreate?: Enumerable<Recipe_ingredientsCreateOrConnectWithoutRecipesInput>
    createMany?: Recipe_ingredientsCreateManyRecipesInputEnvelope
    connect?: Enumerable<Recipe_ingredientsWhereUniqueInput>
  }

  export type UsersCreateNestedOneWithoutRecipesInput = {
    create?: XOR<UsersCreateWithoutRecipesInput, UsersUncheckedCreateWithoutRecipesInput>
    connectOrCreate?: UsersCreateOrConnectWithoutRecipesInput
    connect?: UsersWhereUniqueInput
  }

  export type Shopping_listCreateNestedManyWithoutRecipesInput = {
    create?: XOR<Enumerable<Shopping_listCreateWithoutRecipesInput>, Enumerable<Shopping_listUncheckedCreateWithoutRecipesInput>>
    connectOrCreate?: Enumerable<Shopping_listCreateOrConnectWithoutRecipesInput>
    createMany?: Shopping_listCreateManyRecipesInputEnvelope
    connect?: Enumerable<Shopping_listWhereUniqueInput>
  }

  export type Recipe_ingredientsUncheckedCreateNestedManyWithoutRecipesInput = {
    create?: XOR<Enumerable<Recipe_ingredientsCreateWithoutRecipesInput>, Enumerable<Recipe_ingredientsUncheckedCreateWithoutRecipesInput>>
    connectOrCreate?: Enumerable<Recipe_ingredientsCreateOrConnectWithoutRecipesInput>
    createMany?: Recipe_ingredientsCreateManyRecipesInputEnvelope
    connect?: Enumerable<Recipe_ingredientsWhereUniqueInput>
  }

  export type Shopping_listUncheckedCreateNestedManyWithoutRecipesInput = {
    create?: XOR<Enumerable<Shopping_listCreateWithoutRecipesInput>, Enumerable<Shopping_listUncheckedCreateWithoutRecipesInput>>
    connectOrCreate?: Enumerable<Shopping_listCreateOrConnectWithoutRecipesInput>
    createMany?: Shopping_listCreateManyRecipesInputEnvelope
    connect?: Enumerable<Shopping_listWhereUniqueInput>
  }

  export type Recipe_ingredientsUpdateManyWithoutRecipesNestedInput = {
    create?: XOR<Enumerable<Recipe_ingredientsCreateWithoutRecipesInput>, Enumerable<Recipe_ingredientsUncheckedCreateWithoutRecipesInput>>
    connectOrCreate?: Enumerable<Recipe_ingredientsCreateOrConnectWithoutRecipesInput>
    upsert?: Enumerable<Recipe_ingredientsUpsertWithWhereUniqueWithoutRecipesInput>
    createMany?: Recipe_ingredientsCreateManyRecipesInputEnvelope
    set?: Enumerable<Recipe_ingredientsWhereUniqueInput>
    disconnect?: Enumerable<Recipe_ingredientsWhereUniqueInput>
    delete?: Enumerable<Recipe_ingredientsWhereUniqueInput>
    connect?: Enumerable<Recipe_ingredientsWhereUniqueInput>
    update?: Enumerable<Recipe_ingredientsUpdateWithWhereUniqueWithoutRecipesInput>
    updateMany?: Enumerable<Recipe_ingredientsUpdateManyWithWhereWithoutRecipesInput>
    deleteMany?: Enumerable<Recipe_ingredientsScalarWhereInput>
  }

  export type UsersUpdateOneRequiredWithoutRecipesNestedInput = {
    create?: XOR<UsersCreateWithoutRecipesInput, UsersUncheckedCreateWithoutRecipesInput>
    connectOrCreate?: UsersCreateOrConnectWithoutRecipesInput
    upsert?: UsersUpsertWithoutRecipesInput
    connect?: UsersWhereUniqueInput
    update?: XOR<XOR<UsersUpdateToOneWithWhereWithoutRecipesInput, UsersUpdateWithoutRecipesInput>, UsersUncheckedUpdateWithoutRecipesInput>
  }

  export type Shopping_listUpdateManyWithoutRecipesNestedInput = {
    create?: XOR<Enumerable<Shopping_listCreateWithoutRecipesInput>, Enumerable<Shopping_listUncheckedCreateWithoutRecipesInput>>
    connectOrCreate?: Enumerable<Shopping_listCreateOrConnectWithoutRecipesInput>
    upsert?: Enumerable<Shopping_listUpsertWithWhereUniqueWithoutRecipesInput>
    createMany?: Shopping_listCreateManyRecipesInputEnvelope
    set?: Enumerable<Shopping_listWhereUniqueInput>
    disconnect?: Enumerable<Shopping_listWhereUniqueInput>
    delete?: Enumerable<Shopping_listWhereUniqueInput>
    connect?: Enumerable<Shopping_listWhereUniqueInput>
    update?: Enumerable<Shopping_listUpdateWithWhereUniqueWithoutRecipesInput>
    updateMany?: Enumerable<Shopping_listUpdateManyWithWhereWithoutRecipesInput>
    deleteMany?: Enumerable<Shopping_listScalarWhereInput>
  }

  export type Recipe_ingredientsUncheckedUpdateManyWithoutRecipesNestedInput = {
    create?: XOR<Enumerable<Recipe_ingredientsCreateWithoutRecipesInput>, Enumerable<Recipe_ingredientsUncheckedCreateWithoutRecipesInput>>
    connectOrCreate?: Enumerable<Recipe_ingredientsCreateOrConnectWithoutRecipesInput>
    upsert?: Enumerable<Recipe_ingredientsUpsertWithWhereUniqueWithoutRecipesInput>
    createMany?: Recipe_ingredientsCreateManyRecipesInputEnvelope
    set?: Enumerable<Recipe_ingredientsWhereUniqueInput>
    disconnect?: Enumerable<Recipe_ingredientsWhereUniqueInput>
    delete?: Enumerable<Recipe_ingredientsWhereUniqueInput>
    connect?: Enumerable<Recipe_ingredientsWhereUniqueInput>
    update?: Enumerable<Recipe_ingredientsUpdateWithWhereUniqueWithoutRecipesInput>
    updateMany?: Enumerable<Recipe_ingredientsUpdateManyWithWhereWithoutRecipesInput>
    deleteMany?: Enumerable<Recipe_ingredientsScalarWhereInput>
  }

  export type Shopping_listUncheckedUpdateManyWithoutRecipesNestedInput = {
    create?: XOR<Enumerable<Shopping_listCreateWithoutRecipesInput>, Enumerable<Shopping_listUncheckedCreateWithoutRecipesInput>>
    connectOrCreate?: Enumerable<Shopping_listCreateOrConnectWithoutRecipesInput>
    upsert?: Enumerable<Shopping_listUpsertWithWhereUniqueWithoutRecipesInput>
    createMany?: Shopping_listCreateManyRecipesInputEnvelope
    set?: Enumerable<Shopping_listWhereUniqueInput>
    disconnect?: Enumerable<Shopping_listWhereUniqueInput>
    delete?: Enumerable<Shopping_listWhereUniqueInput>
    connect?: Enumerable<Shopping_listWhereUniqueInput>
    update?: Enumerable<Shopping_listUpdateWithWhereUniqueWithoutRecipesInput>
    updateMany?: Enumerable<Shopping_listUpdateManyWithWhereWithoutRecipesInput>
    deleteMany?: Enumerable<Shopping_listScalarWhereInput>
  }

  export type RecipesCreateNestedOneWithoutShopping_listInput = {
    create?: XOR<RecipesCreateWithoutShopping_listInput, RecipesUncheckedCreateWithoutShopping_listInput>
    connectOrCreate?: RecipesCreateOrConnectWithoutShopping_listInput
    connect?: RecipesWhereUniqueInput
  }

  export type Recipe_ingredientsCreateNestedOneWithoutShopping_listInput = {
    create?: XOR<Recipe_ingredientsCreateWithoutShopping_listInput, Recipe_ingredientsUncheckedCreateWithoutShopping_listInput>
    connectOrCreate?: Recipe_ingredientsCreateOrConnectWithoutShopping_listInput
    connect?: Recipe_ingredientsWhereUniqueInput
  }

  export type RecipesUpdateOneRequiredWithoutShopping_listNestedInput = {
    create?: XOR<RecipesCreateWithoutShopping_listInput, RecipesUncheckedCreateWithoutShopping_listInput>
    connectOrCreate?: RecipesCreateOrConnectWithoutShopping_listInput
    upsert?: RecipesUpsertWithoutShopping_listInput
    connect?: RecipesWhereUniqueInput
    update?: XOR<XOR<RecipesUpdateToOneWithWhereWithoutShopping_listInput, RecipesUpdateWithoutShopping_listInput>, RecipesUncheckedUpdateWithoutShopping_listInput>
  }

  export type Recipe_ingredientsUpdateOneRequiredWithoutShopping_listNestedInput = {
    create?: XOR<Recipe_ingredientsCreateWithoutShopping_listInput, Recipe_ingredientsUncheckedCreateWithoutShopping_listInput>
    connectOrCreate?: Recipe_ingredientsCreateOrConnectWithoutShopping_listInput
    upsert?: Recipe_ingredientsUpsertWithoutShopping_listInput
    connect?: Recipe_ingredientsWhereUniqueInput
    update?: XOR<XOR<Recipe_ingredientsUpdateToOneWithWhereWithoutShopping_listInput, Recipe_ingredientsUpdateWithoutShopping_listInput>, Recipe_ingredientsUncheckedUpdateWithoutShopping_listInput>
  }

  export type Ingredient_eventsCreateNestedManyWithoutUsersInput = {
    create?: XOR<Enumerable<Ingredient_eventsCreateWithoutUsersInput>, Enumerable<Ingredient_eventsUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<Ingredient_eventsCreateOrConnectWithoutUsersInput>
    createMany?: Ingredient_eventsCreateManyUsersInputEnvelope
    connect?: Enumerable<Ingredient_eventsWhereUniqueInput>
  }

  export type Ingredients_photo_uploadsCreateNestedManyWithoutUsersInput = {
    create?: XOR<Enumerable<Ingredients_photo_uploadsCreateWithoutUsersInput>, Enumerable<Ingredients_photo_uploadsUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<Ingredients_photo_uploadsCreateOrConnectWithoutUsersInput>
    createMany?: Ingredients_photo_uploadsCreateManyUsersInputEnvelope
    connect?: Enumerable<Ingredients_photo_uploadsWhereUniqueInput>
  }

  export type RecipesCreateNestedManyWithoutUsersInput = {
    create?: XOR<Enumerable<RecipesCreateWithoutUsersInput>, Enumerable<RecipesUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<RecipesCreateOrConnectWithoutUsersInput>
    createMany?: RecipesCreateManyUsersInputEnvelope
    connect?: Enumerable<RecipesWhereUniqueInput>
  }

  export type Ingredient_eventsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<Enumerable<Ingredient_eventsCreateWithoutUsersInput>, Enumerable<Ingredient_eventsUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<Ingredient_eventsCreateOrConnectWithoutUsersInput>
    createMany?: Ingredient_eventsCreateManyUsersInputEnvelope
    connect?: Enumerable<Ingredient_eventsWhereUniqueInput>
  }

  export type Ingredients_photo_uploadsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<Enumerable<Ingredients_photo_uploadsCreateWithoutUsersInput>, Enumerable<Ingredients_photo_uploadsUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<Ingredients_photo_uploadsCreateOrConnectWithoutUsersInput>
    createMany?: Ingredients_photo_uploadsCreateManyUsersInputEnvelope
    connect?: Enumerable<Ingredients_photo_uploadsWhereUniqueInput>
  }

  export type RecipesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<Enumerable<RecipesCreateWithoutUsersInput>, Enumerable<RecipesUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<RecipesCreateOrConnectWithoutUsersInput>
    createMany?: RecipesCreateManyUsersInputEnvelope
    connect?: Enumerable<RecipesWhereUniqueInput>
  }

  export type Ingredient_eventsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<Enumerable<Ingredient_eventsCreateWithoutUsersInput>, Enumerable<Ingredient_eventsUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<Ingredient_eventsCreateOrConnectWithoutUsersInput>
    upsert?: Enumerable<Ingredient_eventsUpsertWithWhereUniqueWithoutUsersInput>
    createMany?: Ingredient_eventsCreateManyUsersInputEnvelope
    set?: Enumerable<Ingredient_eventsWhereUniqueInput>
    disconnect?: Enumerable<Ingredient_eventsWhereUniqueInput>
    delete?: Enumerable<Ingredient_eventsWhereUniqueInput>
    connect?: Enumerable<Ingredient_eventsWhereUniqueInput>
    update?: Enumerable<Ingredient_eventsUpdateWithWhereUniqueWithoutUsersInput>
    updateMany?: Enumerable<Ingredient_eventsUpdateManyWithWhereWithoutUsersInput>
    deleteMany?: Enumerable<Ingredient_eventsScalarWhereInput>
  }

  export type Ingredients_photo_uploadsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<Enumerable<Ingredients_photo_uploadsCreateWithoutUsersInput>, Enumerable<Ingredients_photo_uploadsUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<Ingredients_photo_uploadsCreateOrConnectWithoutUsersInput>
    upsert?: Enumerable<Ingredients_photo_uploadsUpsertWithWhereUniqueWithoutUsersInput>
    createMany?: Ingredients_photo_uploadsCreateManyUsersInputEnvelope
    set?: Enumerable<Ingredients_photo_uploadsWhereUniqueInput>
    disconnect?: Enumerable<Ingredients_photo_uploadsWhereUniqueInput>
    delete?: Enumerable<Ingredients_photo_uploadsWhereUniqueInput>
    connect?: Enumerable<Ingredients_photo_uploadsWhereUniqueInput>
    update?: Enumerable<Ingredients_photo_uploadsUpdateWithWhereUniqueWithoutUsersInput>
    updateMany?: Enumerable<Ingredients_photo_uploadsUpdateManyWithWhereWithoutUsersInput>
    deleteMany?: Enumerable<Ingredients_photo_uploadsScalarWhereInput>
  }

  export type RecipesUpdateManyWithoutUsersNestedInput = {
    create?: XOR<Enumerable<RecipesCreateWithoutUsersInput>, Enumerable<RecipesUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<RecipesCreateOrConnectWithoutUsersInput>
    upsert?: Enumerable<RecipesUpsertWithWhereUniqueWithoutUsersInput>
    createMany?: RecipesCreateManyUsersInputEnvelope
    set?: Enumerable<RecipesWhereUniqueInput>
    disconnect?: Enumerable<RecipesWhereUniqueInput>
    delete?: Enumerable<RecipesWhereUniqueInput>
    connect?: Enumerable<RecipesWhereUniqueInput>
    update?: Enumerable<RecipesUpdateWithWhereUniqueWithoutUsersInput>
    updateMany?: Enumerable<RecipesUpdateManyWithWhereWithoutUsersInput>
    deleteMany?: Enumerable<RecipesScalarWhereInput>
  }

  export type Ingredient_eventsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<Enumerable<Ingredient_eventsCreateWithoutUsersInput>, Enumerable<Ingredient_eventsUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<Ingredient_eventsCreateOrConnectWithoutUsersInput>
    upsert?: Enumerable<Ingredient_eventsUpsertWithWhereUniqueWithoutUsersInput>
    createMany?: Ingredient_eventsCreateManyUsersInputEnvelope
    set?: Enumerable<Ingredient_eventsWhereUniqueInput>
    disconnect?: Enumerable<Ingredient_eventsWhereUniqueInput>
    delete?: Enumerable<Ingredient_eventsWhereUniqueInput>
    connect?: Enumerable<Ingredient_eventsWhereUniqueInput>
    update?: Enumerable<Ingredient_eventsUpdateWithWhereUniqueWithoutUsersInput>
    updateMany?: Enumerable<Ingredient_eventsUpdateManyWithWhereWithoutUsersInput>
    deleteMany?: Enumerable<Ingredient_eventsScalarWhereInput>
  }

  export type Ingredients_photo_uploadsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<Enumerable<Ingredients_photo_uploadsCreateWithoutUsersInput>, Enumerable<Ingredients_photo_uploadsUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<Ingredients_photo_uploadsCreateOrConnectWithoutUsersInput>
    upsert?: Enumerable<Ingredients_photo_uploadsUpsertWithWhereUniqueWithoutUsersInput>
    createMany?: Ingredients_photo_uploadsCreateManyUsersInputEnvelope
    set?: Enumerable<Ingredients_photo_uploadsWhereUniqueInput>
    disconnect?: Enumerable<Ingredients_photo_uploadsWhereUniqueInput>
    delete?: Enumerable<Ingredients_photo_uploadsWhereUniqueInput>
    connect?: Enumerable<Ingredients_photo_uploadsWhereUniqueInput>
    update?: Enumerable<Ingredients_photo_uploadsUpdateWithWhereUniqueWithoutUsersInput>
    updateMany?: Enumerable<Ingredients_photo_uploadsUpdateManyWithWhereWithoutUsersInput>
    deleteMany?: Enumerable<Ingredients_photo_uploadsScalarWhereInput>
  }

  export type RecipesUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<Enumerable<RecipesCreateWithoutUsersInput>, Enumerable<RecipesUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<RecipesCreateOrConnectWithoutUsersInput>
    upsert?: Enumerable<RecipesUpsertWithWhereUniqueWithoutUsersInput>
    createMany?: RecipesCreateManyUsersInputEnvelope
    set?: Enumerable<RecipesWhereUniqueInput>
    disconnect?: Enumerable<RecipesWhereUniqueInput>
    delete?: Enumerable<RecipesWhereUniqueInput>
    connect?: Enumerable<RecipesWhereUniqueInput>
    update?: Enumerable<RecipesUpdateWithWhereUniqueWithoutUsersInput>
    updateMany?: Enumerable<RecipesUpdateManyWithWhereWithoutUsersInput>
    deleteMany?: Enumerable<RecipesScalarWhereInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
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
    in?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
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
    in?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel>
    notIn?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel>
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
    in?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel>
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
    in?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel> | null
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
    path?: Array<string>
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
    equals?: ingredients_tracking_type | Enumingredients_tracking_typeFieldRefInput<$PrismaModel> | null
    in?: Enumerable<ingredients_tracking_type> | ListEnumingredients_tracking_typeFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<ingredients_tracking_type> | ListEnumingredients_tracking_typeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumingredients_tracking_typeNullableFilter<$PrismaModel> | ingredients_tracking_type | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
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
    equals?: ingredients_tracking_type | Enumingredients_tracking_typeFieldRefInput<$PrismaModel> | null
    in?: Enumerable<ingredients_tracking_type> | ListEnumingredients_tracking_typeFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<ingredients_tracking_type> | ListEnumingredients_tracking_typeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumingredients_tracking_typeNullableWithAggregatesFilter<$PrismaModel> | ingredients_tracking_type | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumingredients_tracking_typeNullableFilter<$PrismaModel>
    _max?: NestedEnumingredients_tracking_typeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel>
    notIn?: Enumerable<number> | ListIntFieldRefInput<$PrismaModel>
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
    in?: Enumerable<number> | ListFloatFieldRefInput<$PrismaModel>
    notIn?: Enumerable<number> | ListFloatFieldRefInput<$PrismaModel>
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
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
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
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
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
    in?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumingredient_photo_upload_stateFilter<$PrismaModel = never> = {
    equals?: ingredient_photo_upload_state | Enumingredient_photo_upload_stateFieldRefInput<$PrismaModel>
    in?: Enumerable<ingredient_photo_upload_state> | ListEnumingredient_photo_upload_stateFieldRefInput<$PrismaModel>
    notIn?: Enumerable<ingredient_photo_upload_state> | ListEnumingredient_photo_upload_stateFieldRefInput<$PrismaModel>
    not?: NestedEnumingredient_photo_upload_stateFilter<$PrismaModel> | ingredient_photo_upload_state
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: Enumerable<number> | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<number> | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<Date> | Enumerable<string> | ListDateTimeFieldRefInput<$PrismaModel> | null
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
    equals?: ingredient_photo_upload_state | Enumingredient_photo_upload_stateFieldRefInput<$PrismaModel>
    in?: Enumerable<ingredient_photo_upload_state> | ListEnumingredient_photo_upload_stateFieldRefInput<$PrismaModel>
    notIn?: Enumerable<ingredient_photo_upload_state> | ListEnumingredient_photo_upload_stateFieldRefInput<$PrismaModel>
    not?: NestedEnumingredient_photo_upload_stateWithAggregatesFilter<$PrismaModel> | ingredient_photo_upload_state
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumingredient_photo_upload_stateFilter<$PrismaModel>
    _max?: NestedEnumingredient_photo_upload_stateFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: Enumerable<number> | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<number> | ListFloatFieldRefInput<$PrismaModel> | null
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
    in?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: Enumerable<string> | ListStringFieldRefInput<$PrismaModel> | null
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

  export type NestedEnumjobs_stateFilter<$PrismaModel = never> = {
    equals?: jobs_state | Enumjobs_stateFieldRefInput<$PrismaModel>
    in?: Enumerable<jobs_state> | ListEnumjobs_stateFieldRefInput<$PrismaModel>
    notIn?: Enumerable<jobs_state> | ListEnumjobs_stateFieldRefInput<$PrismaModel>
    not?: NestedEnumjobs_stateFilter<$PrismaModel> | jobs_state
  }

  export type NestedEnumjobs_stateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: jobs_state | Enumjobs_stateFieldRefInput<$PrismaModel>
    in?: Enumerable<jobs_state> | ListEnumjobs_stateFieldRefInput<$PrismaModel>
    notIn?: Enumerable<jobs_state> | ListEnumjobs_stateFieldRefInput<$PrismaModel>
    not?: NestedEnumjobs_stateWithAggregatesFilter<$PrismaModel> | jobs_state
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumjobs_stateFilter<$PrismaModel>
    _max?: NestedEnumjobs_stateFilter<$PrismaModel>
  }

  export type NestedEnumgrocery_sectionFilter<$PrismaModel = never> = {
    equals?: grocery_section | Enumgrocery_sectionFieldRefInput<$PrismaModel>
    in?: Enumerable<grocery_section> | ListEnumgrocery_sectionFieldRefInput<$PrismaModel>
    notIn?: Enumerable<grocery_section> | ListEnumgrocery_sectionFieldRefInput<$PrismaModel>
    not?: NestedEnumgrocery_sectionFilter<$PrismaModel> | grocery_section
  }

  export type NestedEnumgrocery_sectionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: grocery_section | Enumgrocery_sectionFieldRefInput<$PrismaModel>
    in?: Enumerable<grocery_section> | ListEnumgrocery_sectionFieldRefInput<$PrismaModel>
    notIn?: Enumerable<grocery_section> | ListEnumgrocery_sectionFieldRefInput<$PrismaModel>
    not?: NestedEnumgrocery_sectionWithAggregatesFilter<$PrismaModel> | grocery_section
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumgrocery_sectionFilter<$PrismaModel>
    _max?: NestedEnumgrocery_sectionFilter<$PrismaModel>
  }

  export type IngredientsCreateWithoutIngredient_eventsInput = {
    id: string
    name: string
    description: string
    is_reviewed: boolean
    embedding: string
    tracking_type?: ingredients_tracking_type | null
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
    tracking_type?: ingredients_tracking_type | null
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
    tracking_type?: NullableEnumingredients_tracking_typeFieldUpdateOperationsInput | ingredients_tracking_type | null
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
    tracking_type?: NullableEnumingredients_tracking_typeFieldUpdateOperationsInput | ingredients_tracking_type | null
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
    data: Enumerable<Ingredient_eventsCreateManyIngredientsInput>
    skipDuplicates?: boolean
  }

  export type Ingredients_photo_uploadsCreateWithoutIngredientsInput = {
    id: string
    created_at: Date | string
    uploaded_at?: Date | string | null
    state: ingredient_photo_upload_state
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
    state: ingredient_photo_upload_state
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
    AND?: Enumerable<Ingredient_eventsScalarWhereInput>
    OR?: Enumerable<Ingredient_eventsScalarWhereInput>
    NOT?: Enumerable<Ingredient_eventsScalarWhereInput>
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
    state?: Enumingredient_photo_upload_stateFieldUpdateOperationsInput | ingredient_photo_upload_state
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
    state?: Enumingredient_photo_upload_stateFieldUpdateOperationsInput | ingredient_photo_upload_state
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
    tracking_type?: ingredients_tracking_type | null
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
    tracking_type?: ingredients_tracking_type | null
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
    data: Enumerable<IngredientsCreateManyIngredients_photo_uploadsInput>
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
    AND?: Enumerable<IngredientsScalarWhereInput>
    OR?: Enumerable<IngredientsScalarWhereInput>
    NOT?: Enumerable<IngredientsScalarWhereInput>
    id?: UuidFilter<"Ingredients"> | string
    name?: StringFilter<"Ingredients"> | string
    description?: StringFilter<"Ingredients"> | string
    is_reviewed?: BoolFilter<"Ingredients"> | boolean
    embedding?: StringFilter<"Ingredients"> | string
    tracking_type?: Enumingredients_tracking_typeNullableFilter<"Ingredients"> | ingredients_tracking_type | null
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
    shopping_list?: Shopping_listCreateNestedManyWithoutRecipesInput
  }

  export type RecipesUncheckedCreateWithoutRecipe_ingredientsInput = {
    id: string
    name: string
    description: string
    url: string
    user_id: string
    created_at: Date | string
    updated_at: Date | string
    shopping_list?: Shopping_listUncheckedCreateNestedManyWithoutRecipesInput
  }

  export type RecipesCreateOrConnectWithoutRecipe_ingredientsInput = {
    where: RecipesWhereUniqueInput
    create: XOR<RecipesCreateWithoutRecipe_ingredientsInput, RecipesUncheckedCreateWithoutRecipe_ingredientsInput>
  }

  export type Shopping_listCreateWithoutRecipe_ingredientsInput = {
    id: string
    purchased: boolean
    created_at: Date | string
    recipes: RecipesCreateNestedOneWithoutShopping_listInput
  }

  export type Shopping_listUncheckedCreateWithoutRecipe_ingredientsInput = {
    id: string
    recipe_id: string
    purchased: boolean
    created_at: Date | string
  }

  export type Shopping_listCreateOrConnectWithoutRecipe_ingredientsInput = {
    where: Shopping_listWhereUniqueInput
    create: XOR<Shopping_listCreateWithoutRecipe_ingredientsInput, Shopping_listUncheckedCreateWithoutRecipe_ingredientsInput>
  }

  export type Shopping_listCreateManyRecipe_ingredientsInputEnvelope = {
    data: Enumerable<Shopping_listCreateManyRecipe_ingredientsInput>
    skipDuplicates?: boolean
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
    shopping_list?: Shopping_listUpdateManyWithoutRecipesNestedInput
  }

  export type RecipesUncheckedUpdateWithoutRecipe_ingredientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    shopping_list?: Shopping_listUncheckedUpdateManyWithoutRecipesNestedInput
  }

  export type Shopping_listUpsertWithWhereUniqueWithoutRecipe_ingredientsInput = {
    where: Shopping_listWhereUniqueInput
    update: XOR<Shopping_listUpdateWithoutRecipe_ingredientsInput, Shopping_listUncheckedUpdateWithoutRecipe_ingredientsInput>
    create: XOR<Shopping_listCreateWithoutRecipe_ingredientsInput, Shopping_listUncheckedCreateWithoutRecipe_ingredientsInput>
  }

  export type Shopping_listUpdateWithWhereUniqueWithoutRecipe_ingredientsInput = {
    where: Shopping_listWhereUniqueInput
    data: XOR<Shopping_listUpdateWithoutRecipe_ingredientsInput, Shopping_listUncheckedUpdateWithoutRecipe_ingredientsInput>
  }

  export type Shopping_listUpdateManyWithWhereWithoutRecipe_ingredientsInput = {
    where: Shopping_listScalarWhereInput
    data: XOR<Shopping_listUpdateManyMutationInput, Shopping_listUncheckedUpdateManyWithoutRecipe_ingredientsInput>
  }

  export type Shopping_listScalarWhereInput = {
    AND?: Enumerable<Shopping_listScalarWhereInput>
    OR?: Enumerable<Shopping_listScalarWhereInput>
    NOT?: Enumerable<Shopping_listScalarWhereInput>
    id?: UuidFilter<"Shopping_list"> | string
    recipe_id?: UuidFilter<"Shopping_list"> | string
    recipe_ingredient_id?: UuidFilter<"Shopping_list"> | string
    purchased?: BoolFilter<"Shopping_list"> | boolean
    created_at?: DateTimeFilter<"Shopping_list"> | Date | string
  }

  export type Recipe_ingredientsCreateWithoutRecipesInput = {
    id: string
    listing: string
    extracted_name: string
    embedding: string
    grocery_section: grocery_section
    shopping_list?: Shopping_listCreateNestedManyWithoutRecipe_ingredientsInput
  }

  export type Recipe_ingredientsUncheckedCreateWithoutRecipesInput = {
    id: string
    listing: string
    extracted_name: string
    embedding: string
    grocery_section: grocery_section
    shopping_list?: Shopping_listUncheckedCreateNestedManyWithoutRecipe_ingredientsInput
  }

  export type Recipe_ingredientsCreateOrConnectWithoutRecipesInput = {
    where: Recipe_ingredientsWhereUniqueInput
    create: XOR<Recipe_ingredientsCreateWithoutRecipesInput, Recipe_ingredientsUncheckedCreateWithoutRecipesInput>
  }

  export type Recipe_ingredientsCreateManyRecipesInputEnvelope = {
    data: Enumerable<Recipe_ingredientsCreateManyRecipesInput>
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

  export type Shopping_listCreateWithoutRecipesInput = {
    id: string
    purchased: boolean
    created_at: Date | string
    recipe_ingredients: Recipe_ingredientsCreateNestedOneWithoutShopping_listInput
  }

  export type Shopping_listUncheckedCreateWithoutRecipesInput = {
    id: string
    recipe_ingredient_id: string
    purchased: boolean
    created_at: Date | string
  }

  export type Shopping_listCreateOrConnectWithoutRecipesInput = {
    where: Shopping_listWhereUniqueInput
    create: XOR<Shopping_listCreateWithoutRecipesInput, Shopping_listUncheckedCreateWithoutRecipesInput>
  }

  export type Shopping_listCreateManyRecipesInputEnvelope = {
    data: Enumerable<Shopping_listCreateManyRecipesInput>
    skipDuplicates?: boolean
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
    AND?: Enumerable<Recipe_ingredientsScalarWhereInput>
    OR?: Enumerable<Recipe_ingredientsScalarWhereInput>
    NOT?: Enumerable<Recipe_ingredientsScalarWhereInput>
    id?: UuidFilter<"Recipe_ingredients"> | string
    listing?: StringFilter<"Recipe_ingredients"> | string
    extracted_name?: StringFilter<"Recipe_ingredients"> | string
    embedding?: StringFilter<"Recipe_ingredients"> | string
    grocery_section?: Enumgrocery_sectionFilter<"Recipe_ingredients"> | grocery_section
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

  export type Shopping_listUpsertWithWhereUniqueWithoutRecipesInput = {
    where: Shopping_listWhereUniqueInput
    update: XOR<Shopping_listUpdateWithoutRecipesInput, Shopping_listUncheckedUpdateWithoutRecipesInput>
    create: XOR<Shopping_listCreateWithoutRecipesInput, Shopping_listUncheckedCreateWithoutRecipesInput>
  }

  export type Shopping_listUpdateWithWhereUniqueWithoutRecipesInput = {
    where: Shopping_listWhereUniqueInput
    data: XOR<Shopping_listUpdateWithoutRecipesInput, Shopping_listUncheckedUpdateWithoutRecipesInput>
  }

  export type Shopping_listUpdateManyWithWhereWithoutRecipesInput = {
    where: Shopping_listScalarWhereInput
    data: XOR<Shopping_listUpdateManyMutationInput, Shopping_listUncheckedUpdateManyWithoutRecipesInput>
  }

  export type RecipesCreateWithoutShopping_listInput = {
    id: string
    name: string
    description: string
    url: string
    created_at: Date | string
    updated_at: Date | string
    recipe_ingredients?: Recipe_ingredientsCreateNestedManyWithoutRecipesInput
    users: UsersCreateNestedOneWithoutRecipesInput
  }

  export type RecipesUncheckedCreateWithoutShopping_listInput = {
    id: string
    name: string
    description: string
    url: string
    user_id: string
    created_at: Date | string
    updated_at: Date | string
    recipe_ingredients?: Recipe_ingredientsUncheckedCreateNestedManyWithoutRecipesInput
  }

  export type RecipesCreateOrConnectWithoutShopping_listInput = {
    where: RecipesWhereUniqueInput
    create: XOR<RecipesCreateWithoutShopping_listInput, RecipesUncheckedCreateWithoutShopping_listInput>
  }

  export type Recipe_ingredientsCreateWithoutShopping_listInput = {
    id: string
    listing: string
    extracted_name: string
    embedding: string
    grocery_section: grocery_section
    recipes: RecipesCreateNestedOneWithoutRecipe_ingredientsInput
  }

  export type Recipe_ingredientsUncheckedCreateWithoutShopping_listInput = {
    id: string
    listing: string
    extracted_name: string
    embedding: string
    grocery_section: grocery_section
    recipe_id: string
  }

  export type Recipe_ingredientsCreateOrConnectWithoutShopping_listInput = {
    where: Recipe_ingredientsWhereUniqueInput
    create: XOR<Recipe_ingredientsCreateWithoutShopping_listInput, Recipe_ingredientsUncheckedCreateWithoutShopping_listInput>
  }

  export type RecipesUpsertWithoutShopping_listInput = {
    update: XOR<RecipesUpdateWithoutShopping_listInput, RecipesUncheckedUpdateWithoutShopping_listInput>
    create: XOR<RecipesCreateWithoutShopping_listInput, RecipesUncheckedCreateWithoutShopping_listInput>
    where?: RecipesWhereInput
  }

  export type RecipesUpdateToOneWithWhereWithoutShopping_listInput = {
    where?: RecipesWhereInput
    data: XOR<RecipesUpdateWithoutShopping_listInput, RecipesUncheckedUpdateWithoutShopping_listInput>
  }

  export type RecipesUpdateWithoutShopping_listInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recipe_ingredients?: Recipe_ingredientsUpdateManyWithoutRecipesNestedInput
    users?: UsersUpdateOneRequiredWithoutRecipesNestedInput
  }

  export type RecipesUncheckedUpdateWithoutShopping_listInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recipe_ingredients?: Recipe_ingredientsUncheckedUpdateManyWithoutRecipesNestedInput
  }

  export type Recipe_ingredientsUpsertWithoutShopping_listInput = {
    update: XOR<Recipe_ingredientsUpdateWithoutShopping_listInput, Recipe_ingredientsUncheckedUpdateWithoutShopping_listInput>
    create: XOR<Recipe_ingredientsCreateWithoutShopping_listInput, Recipe_ingredientsUncheckedCreateWithoutShopping_listInput>
    where?: Recipe_ingredientsWhereInput
  }

  export type Recipe_ingredientsUpdateToOneWithWhereWithoutShopping_listInput = {
    where?: Recipe_ingredientsWhereInput
    data: XOR<Recipe_ingredientsUpdateWithoutShopping_listInput, Recipe_ingredientsUncheckedUpdateWithoutShopping_listInput>
  }

  export type Recipe_ingredientsUpdateWithoutShopping_listInput = {
    id?: StringFieldUpdateOperationsInput | string
    listing?: StringFieldUpdateOperationsInput | string
    extracted_name?: StringFieldUpdateOperationsInput | string
    embedding?: StringFieldUpdateOperationsInput | string
    grocery_section?: Enumgrocery_sectionFieldUpdateOperationsInput | grocery_section
    recipes?: RecipesUpdateOneRequiredWithoutRecipe_ingredientsNestedInput
  }

  export type Recipe_ingredientsUncheckedUpdateWithoutShopping_listInput = {
    id?: StringFieldUpdateOperationsInput | string
    listing?: StringFieldUpdateOperationsInput | string
    extracted_name?: StringFieldUpdateOperationsInput | string
    embedding?: StringFieldUpdateOperationsInput | string
    grocery_section?: Enumgrocery_sectionFieldUpdateOperationsInput | grocery_section
    recipe_id?: StringFieldUpdateOperationsInput | string
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
    data: Enumerable<Ingredient_eventsCreateManyUsersInput>
    skipDuplicates?: boolean
  }

  export type Ingredients_photo_uploadsCreateWithoutUsersInput = {
    id: string
    created_at: Date | string
    uploaded_at?: Date | string | null
    state: ingredient_photo_upload_state
    upload_duration_sec?: number | null
    ai_processing_duration_sec?: number | null
    photo_url?: string | null
    ingredients?: IngredientsCreateNestedManyWithoutIngredients_photo_uploadsInput
  }

  export type Ingredients_photo_uploadsUncheckedCreateWithoutUsersInput = {
    id: string
    created_at: Date | string
    uploaded_at?: Date | string | null
    state: ingredient_photo_upload_state
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
    data: Enumerable<Ingredients_photo_uploadsCreateManyUsersInput>
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
    shopping_list?: Shopping_listCreateNestedManyWithoutRecipesInput
  }

  export type RecipesUncheckedCreateWithoutUsersInput = {
    id: string
    name: string
    description: string
    url: string
    created_at: Date | string
    updated_at: Date | string
    recipe_ingredients?: Recipe_ingredientsUncheckedCreateNestedManyWithoutRecipesInput
    shopping_list?: Shopping_listUncheckedCreateNestedManyWithoutRecipesInput
  }

  export type RecipesCreateOrConnectWithoutUsersInput = {
    where: RecipesWhereUniqueInput
    create: XOR<RecipesCreateWithoutUsersInput, RecipesUncheckedCreateWithoutUsersInput>
  }

  export type RecipesCreateManyUsersInputEnvelope = {
    data: Enumerable<RecipesCreateManyUsersInput>
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
    AND?: Enumerable<Ingredients_photo_uploadsScalarWhereInput>
    OR?: Enumerable<Ingredients_photo_uploadsScalarWhereInput>
    NOT?: Enumerable<Ingredients_photo_uploadsScalarWhereInput>
    id?: UuidFilter<"Ingredients_photo_uploads"> | string
    user_id?: StringFilter<"Ingredients_photo_uploads"> | string
    created_at?: DateTimeFilter<"Ingredients_photo_uploads"> | Date | string
    uploaded_at?: DateTimeNullableFilter<"Ingredients_photo_uploads"> | Date | string | null
    state?: Enumingredient_photo_upload_stateFilter<"Ingredients_photo_uploads"> | ingredient_photo_upload_state
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
    AND?: Enumerable<RecipesScalarWhereInput>
    OR?: Enumerable<RecipesScalarWhereInput>
    NOT?: Enumerable<RecipesScalarWhereInput>
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
    tracking_type?: ingredients_tracking_type | null
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
    tracking_type?: NullableEnumingredients_tracking_typeFieldUpdateOperationsInput | ingredients_tracking_type | null
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
    tracking_type?: NullableEnumingredients_tracking_typeFieldUpdateOperationsInput | ingredients_tracking_type | null
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
    tracking_type?: NullableEnumingredients_tracking_typeFieldUpdateOperationsInput | ingredients_tracking_type | null
    fill_level?: IntFieldUpdateOperationsInput | number
    count?: IntFieldUpdateOperationsInput | number
    shelf_life_months?: IntFieldUpdateOperationsInput | number
    fill_date?: StringFieldUpdateOperationsInput | string
    is_ground?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type Shopping_listCreateManyRecipe_ingredientsInput = {
    id: string
    recipe_id: string
    purchased: boolean
    created_at: Date | string
  }

  export type Shopping_listUpdateWithoutRecipe_ingredientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchased?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recipes?: RecipesUpdateOneRequiredWithoutShopping_listNestedInput
  }

  export type Shopping_listUncheckedUpdateWithoutRecipe_ingredientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    recipe_id?: StringFieldUpdateOperationsInput | string
    purchased?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Shopping_listUncheckedUpdateManyWithoutRecipe_ingredientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    recipe_id?: StringFieldUpdateOperationsInput | string
    purchased?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Recipe_ingredientsCreateManyRecipesInput = {
    id: string
    listing: string
    extracted_name: string
    embedding: string
    grocery_section: grocery_section
  }

  export type Shopping_listCreateManyRecipesInput = {
    id: string
    recipe_ingredient_id: string
    purchased: boolean
    created_at: Date | string
  }

  export type Recipe_ingredientsUpdateWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    listing?: StringFieldUpdateOperationsInput | string
    extracted_name?: StringFieldUpdateOperationsInput | string
    embedding?: StringFieldUpdateOperationsInput | string
    grocery_section?: Enumgrocery_sectionFieldUpdateOperationsInput | grocery_section
    shopping_list?: Shopping_listUpdateManyWithoutRecipe_ingredientsNestedInput
  }

  export type Recipe_ingredientsUncheckedUpdateWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    listing?: StringFieldUpdateOperationsInput | string
    extracted_name?: StringFieldUpdateOperationsInput | string
    embedding?: StringFieldUpdateOperationsInput | string
    grocery_section?: Enumgrocery_sectionFieldUpdateOperationsInput | grocery_section
    shopping_list?: Shopping_listUncheckedUpdateManyWithoutRecipe_ingredientsNestedInput
  }

  export type Recipe_ingredientsUncheckedUpdateManyWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    listing?: StringFieldUpdateOperationsInput | string
    extracted_name?: StringFieldUpdateOperationsInput | string
    embedding?: StringFieldUpdateOperationsInput | string
    grocery_section?: Enumgrocery_sectionFieldUpdateOperationsInput | grocery_section
  }

  export type Shopping_listUpdateWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    purchased?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recipe_ingredients?: Recipe_ingredientsUpdateOneRequiredWithoutShopping_listNestedInput
  }

  export type Shopping_listUncheckedUpdateWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    recipe_ingredient_id?: StringFieldUpdateOperationsInput | string
    purchased?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Shopping_listUncheckedUpdateManyWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    recipe_ingredient_id?: StringFieldUpdateOperationsInput | string
    purchased?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
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
    state: ingredient_photo_upload_state
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
    state?: Enumingredient_photo_upload_stateFieldUpdateOperationsInput | ingredient_photo_upload_state
    upload_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    ai_processing_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    ingredients?: IngredientsUpdateManyWithoutIngredients_photo_uploadsNestedInput
  }

  export type Ingredients_photo_uploadsUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    state?: Enumingredient_photo_upload_stateFieldUpdateOperationsInput | ingredient_photo_upload_state
    upload_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    ai_processing_duration_sec?: NullableFloatFieldUpdateOperationsInput | number | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    ingredients?: IngredientsUncheckedUpdateManyWithoutIngredients_photo_uploadsNestedInput
  }

  export type Ingredients_photo_uploadsUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uploaded_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    state?: Enumingredient_photo_upload_stateFieldUpdateOperationsInput | ingredient_photo_upload_state
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
    shopping_list?: Shopping_listUpdateManyWithoutRecipesNestedInput
  }

  export type RecipesUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recipe_ingredients?: Recipe_ingredientsUncheckedUpdateManyWithoutRecipesNestedInput
    shopping_list?: Shopping_listUncheckedUpdateManyWithoutRecipesNestedInput
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