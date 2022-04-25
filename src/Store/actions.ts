import { BlogPost } from "../App/LitElementApp";

export const ADD_BLOGPOST = "ADD_BLOGPOST";
export const DELETE_BLOGPOST = "DELETE_BLOGPOST";

export const addBlogPost = (post: BlogPost) => {
	return {
		type: ADD_BLOGPOST,
		payload: post,
	};
};

export const deleteBlogPost = (id: Number) => {
	return {
		type: DELETE_BLOGPOST,
		payload: id,
	};
};
