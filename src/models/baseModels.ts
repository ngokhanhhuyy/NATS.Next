declare global {
	type Implements<T, U extends T> = U;

	interface IClonableModel<TModel extends object> {
		from(data: Partial<TModel>): TModel;
	}
}

function create<TModel extends object>(): IClonableModel<TModel> {
	return {
		from(data: Partial<TModel>): TModel {
			const { from, ...rest } = this as any;
			return {
				...rest,
				...data
			} as TModel;
		}
	};
}

export { create as createClonableModel };