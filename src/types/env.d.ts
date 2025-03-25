declare global {
	namespace NodeJS {
		interface ProcessEnv {
			API_URL: string;
			IMG_URL: string;
		}
	}
}
