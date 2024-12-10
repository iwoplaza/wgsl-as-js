export interface WgslFn<
	TArgs extends unknown[] = unknown[],
	TReturn = unknown,
> {
	readonly type: "fn";
	readonly label: string | undefined;
	readonly argTypes: TArgs;
	readonly returnType: TReturn;
	readonly body: unknown;
}

export const fn = <TArgs extends unknown[] | [], TReturn>(
	label: string | undefined,
	argTypes: TArgs,
	returnType: TReturn,
	body: unknown,
) => ({
	type: "fn",
	label,
	argTypes,
	returnType,
	body,
});

export function isWgslFn<T extends WgslFn>(value: unknown | T): value is T {
	return (value as T)?.type === "fn";
}
