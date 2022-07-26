export default async function defaultImport<T>(path: string) {
	return await import(path).then((result) => result.default as T)
}
