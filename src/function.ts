import type { Source } from "./doc";

export interface WgslFn<
	TArgs extends unknown[] = unknown[],
	TReturn = unknown,
> {
	readonly type: "fn";
	readonly label: string | undefined;
	readonly argTypes: TArgs;
	readonly returnType: TReturn;
	readonly body: unknown;
	readonly src?: Source;
}

export type WgslFnOptions<TArgs extends unknown[] | [], TReturn> = {
	readonly label: string | undefined;
	readonly argTypes: TArgs;
	readonly returnType: TReturn;
	readonly body: unknown;
	readonly src?: Source;
};

export const fn = <TArgs extends unknown[] | [], TReturn>(
	options: WgslFnOptions<TArgs, TReturn>,
): WgslFn<TArgs, TReturn> => ({
	type: "fn" as const,
	...options,
});

export function isWgslFn<T extends WgslFn>(value: unknown | T): value is T {
	return (value as T)?.type === "fn";
}
