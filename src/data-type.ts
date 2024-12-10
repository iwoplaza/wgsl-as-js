import type { Infer, InferRecord } from "./infer";
import type {
	v2f,
	v2i,
	v2u,
	v3f,
	v3i,
	v3u,
	v4f,
	v4i,
	v4u,
	m2x2f,
	m3x3f,
	m4x4f,
} from "./instance";

export interface BaseWgslData {
	type: string;
	/** Type-token, not available at runtime */
	readonly "~repr": unknown;
}

export type ExtractInner<T> = T extends { readonly inner: BaseWgslData }
	? T["inner"]
	: never;
export type ExtractAttribs<T> = T extends { readonly attribs: unknown[] }
	? T["attribs"]
	: [];

// #region WGSL Schema Types

/**
 * Boolean schema representing a single WGSL bool value.
 * Cannot be used inside buffers as it is not host-shareable.
 */
export interface Bool {
	readonly type: "bool";
	readonly "~repr": boolean;
}

export interface F32 {
	readonly type: "f32";
	/** Type-token, not available at runtime */
	readonly "~repr": number;
}

export interface I32 {
	readonly type: "i32";
	/** Type-token, not available at runtime */
	readonly "~repr": number;
}

export interface U32 {
	readonly type: "u32";
	/** Type-token, not available at runtime */
	readonly "~repr": number;
}

export interface Vec2f {
	readonly type: "vec2f";
	/** Type-token, not available at runtime */
	readonly "~repr": v2f;
}

export interface Vec2i {
	readonly type: "vec2i";
	/** Type-token, not available at runtime */
	readonly "~repr": v2i;
}

export interface Vec2u {
	readonly type: "vec2u";
	/** Type-token, not available at runtime */
	readonly "~repr": v2u;
}

export interface Vec3f {
	readonly type: "vec3f";
	/** Type-token, not available at runtime */
	readonly "~repr": v3f;
}

export interface Vec3i {
	readonly type: "vec3i";
	/** Type-token, not available at runtime */
	readonly "~repr": v3i;
}

export interface Vec3u {
	readonly type: "vec3u";
	/** Type-token, not available at runtime */
	readonly "~repr": v3u;
}

export interface Vec4f {
	readonly type: "vec4f";
	/** Type-token, not available at runtime */
	readonly "~repr": v4f;
}

export interface Vec4i {
	readonly type: "vec4i";
	/** Type-token, not available at runtime */
	readonly "~repr": v4i;
}

export interface Vec4u {
	readonly type: "vec4u";
	/** Type-token, not available at runtime */
	readonly "~repr": v4u;
}

export interface Mat2x2f {
	readonly type: "mat2x2f";
	/** Type-token, not available at runtime */
	readonly "~repr": m2x2f;
}

export interface Mat3x3f {
	readonly type: "mat3x3f";
	/** Type-token, not available at runtime */
	readonly "~repr": m3x3f;
}

export interface Mat4x4f {
	readonly type: "mat4x4f";
	/** Type-token, not available at runtime */
	readonly "~repr": m4x4f;
}

export interface WgslStruct<
	TProps extends Record<string, BaseWgslData> = Record<string, BaseWgslData>,
> {
	readonly type: "struct";
	readonly label?: string | undefined;
	readonly propTypes: TProps;
	/** Type-token, not available at runtime */
	readonly "~repr": InferRecord<TProps>;
}

export interface WgslArray<TElement = BaseWgslData> {
	readonly type: "array";
	readonly length: number;
	readonly elementType: TElement;
	/** Type-token, not available at runtime */
	readonly "~repr": Infer<TElement>[];
}

/**
 * Schema representing the `atomic<...>` WGSL data type.
 */
export interface Atomic<TInner extends U32 | I32 = U32 | I32> {
	readonly type: "atomic";
	readonly inner: TInner;
	/** Type-token, not available at runtime */
	readonly "~repr": Infer<TInner>;
}

export interface Align<T extends number> {
	readonly type: "@align";
	readonly value: T;
}

export interface Size<T extends number> {
	readonly type: "@size";
	readonly value: T;
}

export interface Location<T extends number> {
	readonly type: "@location";
	readonly value: T;
}

export interface Builtin<T extends string> {
	readonly type: "@builtin";
	readonly value: T;
}

export interface Decorated<
	TInner extends BaseWgslData = BaseWgslData,
	TAttribs extends unknown[] = unknown[],
> {
	readonly type: "decorated";
	readonly inner: TInner;
	readonly attribs: TAttribs;
	/** Type-token, not available at runtime */
	readonly "~repr": Infer<TInner>;
}

export const wgslTypeLiterals = [
	"bool",
	"f32",
	"i32",
	"u32",
	"vec2f",
	"vec2i",
	"vec2u",
	"vec3f",
	"vec3i",
	"vec3u",
	"vec4f",
	"vec4i",
	"vec4u",
	"mat2x2f",
	"mat3x3f",
	"mat4x4f",
	"struct",
	"array",
	"atomic",
	"decorated",
] as const;

export type WgslTypeLiteral = (typeof wgslTypeLiterals)[number];

export type AnyWgslData =
	| Bool
	| F32
	| I32
	| U32
	| Vec2f
	| Vec2i
	| Vec2u
	| Vec3f
	| Vec3i
	| Vec3u
	| Vec4f
	| Vec4i
	| Vec4u
	| Mat2x2f
	| Mat3x3f
	| Mat4x4f
	| WgslStruct
	| WgslArray
	| Atomic
	| Decorated;

// #endregion

// #region Type Narrowing Functions

export function isWgslData(value: unknown): value is AnyWgslData {
	return wgslTypeLiterals.includes((value as AnyWgslData)?.type);
}

/**
 * Checks whether passed in value is an array schema,
 * as opposed to, e.g., a looseArray schema.
 *
 * Array schemas can be used to describe uniform and storage buffers,
 * whereas looseArray schemas cannot.
 *
 * @example
 * isWgslArray(d.arrayOf(d.u32, 4)) // true
 * isWgslArray(d.looseArrayOf(d.u32, 4)) // false
 * isWgslArray(d.vec3f) // false
 */
export function isWgslArray<T extends WgslArray>(
	schema: T | unknown,
): schema is T {
	return (schema as T)?.type === "array";
}

/**
 * Checks whether passed in value is a struct schema,
 * as opposed to, e.g., a looseStruct schema.
 *
 * Struct schemas can be used to describe uniform and storage buffers,
 * whereas looseStruct schemas cannot.
 *
 * @example
 * isWgslStruct(d.struct({ a: d.u32 })) // true
 * isWgslStruct(d.looseStruct({ a: d.u32 })) // false
 * isWgslStruct(d.vec3f) // false
 */
export function isWgslStruct<T extends WgslStruct>(
	schema: T | unknown,
): schema is T {
	return (schema as T)?.type === "struct";
}

/**
 * Checks whether the passed in value is an atomic schema.
 *
 * @example
 * isAtomic(d.atomic(d.u32)) // true
 * isAtomic(d.u32) // false
 */
export function isAtomic<T extends Atomic<U32 | I32>>(
	schema: T | unknown,
): schema is T {
	return (schema as T)?.type === "atomic";
}

export function isAlignAttrib<T extends Align<number>>(
	value: unknown | T,
): value is T {
	return (value as T)?.type === "@align";
}

export function isSizeAttrib<T extends Size<number>>(
	value: unknown | T,
): value is T {
	return (value as T)?.type === "@size";
}

export function isLocationAttrib<T extends Location<number>>(
	value: unknown | T,
): value is T {
	return (value as T)?.type === "@location";
}

export function isBuiltinAttrib<T extends Builtin<string>>(
	value: unknown | T,
): value is T {
	return (value as T)?.type === "@builtin";
}

export function isDecorated<T extends Decorated>(
	value: unknown | T,
): value is T {
	return (value as T)?.type === "decorated";
}

// #endregion

// #region Schemas / Schema Constructors

export const bool = { type: "bool" } as Bool;
export const f32 = { type: "f32" } as F32;
export const i32 = { type: "i32" } as I32;
export const u32 = { type: "u32" } as U32;
export const vec2f = { type: "vec2f" } as Vec2f;
export const vec2i = { type: "vec2i" } as Vec2i;
export const vec2u = { type: "vec2u" } as Vec2u;
export const vec3f = { type: "vec3f" } as Vec3f;
export const vec3i = { type: "vec3i" } as Vec3i;
export const vec3u = { type: "vec3u" } as Vec3u;
export const vec4f = { type: "vec4f" } as Vec4f;
export const vec4i = { type: "vec4i" } as Vec4i;
export const vec4u = { type: "vec3u" } as Vec3u;
export const mat2x2f = { type: "mat2x2f" } as Mat2x2f;
export const mat3x3f = { type: "mat3x3f" } as Mat3x3f;
export const mat4x4f = { type: "mat4x4f" } as Mat4x4f;

export const struct = <TProps extends Record<string, BaseWgslData>>(
	label: string | undefined,
	propTypes: TProps,
): WgslStruct<TProps> =>
	({ type: "struct", label, propTypes }) as WgslStruct<TProps>;

export const array = <TElement>(
	elementType: TElement,
	length: number,
): WgslArray<TElement> =>
	({ type: "array", elementType, length }) as WgslArray<TElement>;

const knownAtomics = {
	i32: { type: "atomic", inner: i32 } as Atomic<I32>,
	u32: { type: "atomic", inner: u32 } as Atomic<U32>,
};

export const atomic = (inner: U32 | I32) => knownAtomics[inner.type];

export const decorated = <TData extends BaseWgslData, TAttrib>(
	inner: TData,
	attrib: TAttrib,
): Decorated<ExtractInner<TData>, [...ExtractAttribs<TData>, TAttrib]> =>
	({
		type: "decorated",
		inner,
		attribs: [...((inner as any)?.attribs ?? []), attrib],
	}) as any;

// #endregion
