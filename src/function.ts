export interface WgslFn<TArgs, TReturn> {
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
