import { MOCK_BLOGS } from "./store/actions";
import { stub } from "sinon";

const fetchJsonFakeFn = async (
	URL: string,
	{
		method,
		body,
	}: {
		method: string;
		body: any;
	}
): Promise<{ body: any }> => {
	fetchJsonStub(URL, { method, body });
	if (method === "GET") {
		return { body: MOCK_BLOGS };
	} else {
		return {
			body,
		};
	}
};

export const fetchJsonStub = stub();

export const ajax = {
	fetchJson: fetchJsonFakeFn,
};
