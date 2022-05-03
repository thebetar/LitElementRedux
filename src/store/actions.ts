import { BlogPost } from "../components/App/LitElementApp";
import { ajax } from "@lion/ajax";

export const ADD_BLOGPOST = "ADD_BLOGPOST";
export const EDIT_BLOGPOST = "EDIT_BLOGPOST";
export const DELETE_BLOGPOST = "DELETE_BLOGPOST";
export const SET_BLOGPOSTS = "SET_BLOGPOSTS";
export const SET_EDIT_ID = "SET_EDIT_ID";
export const ERROR = "ERROR";

const BASE_URL = "http://localhost:3000/api/blogs";

export const addBlogPost = async (post: BlogPost) => {
	try {
		const { body } = await ajax.fetchJson(BASE_URL, {
			method: "POST",
			body: post,
		});
		return {
			type: ADD_BLOGPOST,
			payload: body,
		};
	} catch (error) {
		console.error(error);
		return {
			type: ERROR,
			payload: "Er ging iets fout bij het toevoegen",
		};
	}
};

export const editBlogPost = async (id: number, post: BlogPost) => {
	try {
		const { body } = await ajax.fetchJson(`${BASE_URL}/${id}`, {
			method: "PUT",
			body: post,
		});
		return {
			type: EDIT_BLOGPOST,
			payload: body,
		};
	} catch (error) {
		console.error(error);
		return {
			type: ERROR,
			payload: "Er ging iets fout bij het aanpassen",
		};
	}
};

export const deleteBlogPost = async (id: number) => {
	try {
		await ajax.fetchJson(`${BASE_URL}/${id}`, {
			method: "DELETE",
		});
		return {
			type: DELETE_BLOGPOST,
			payload: id,
		};
	} catch (error) {
		console.error(error);
		return {
			type: ERROR,
			payload: "Er ging iets fout bij het verwijderen",
		};
	}
};

export const getBlogPosts = async () => {
	try {
		const { body } = await ajax.fetchJson(BASE_URL, {
			method: "GET",
		});
		return {
			type: SET_BLOGPOSTS,
			payload: body,
		};
	} catch (error) {
		console.error(error);
		return {
			type: ERROR,
			payload: "Er ging iets fout bij het ophalen",
		};
	}
};

export const setEditId = (id: number) => {
	return {
		type: SET_EDIT_ID,
		payload: id,
	};
};
