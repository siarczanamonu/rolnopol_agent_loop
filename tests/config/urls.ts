export const BASE_URL = "http://localhost:3000";

export const URLS = {
	home: `${BASE_URL}/`,
	alerts: `${BASE_URL}/alerts.html`,
	documentation: `${BASE_URL}/docs.html`,
	apiExplorer: `${BASE_URL}/swagger.html`,
	register: `${BASE_URL}/register.html`,
	login: `${BASE_URL}/login.html`,
	contact: `${BASE_URL}/contact.html`,
} as const;
