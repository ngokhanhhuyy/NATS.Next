export function parseJson<T>(json: string): T | null {
	try {
		const jsonValue: T = JSON.parse(json);
		return jsonValue;
	} catch {
		return null;
	}
}