import {
	ADD_BLOGPOST,
	EDIT_BLOGPOST,
	DELETE_BLOGPOST,
	SET_BLOGPOSTS,
	SET_EDIT_ID,
} from "./../../store/actions";
import { BlogPost } from "./../../components/App/LitElementApp";

export const MOCK_BLOGS = [
	{
		id: 1,
		title: "Test bericht",
		description: "Dit is het eerste test bericht...",
	},
	{
		id: 2,
		title: "Test bericht 2",
		description: "Dit is het tweede test bericht",
	},
	{
		id: 3,
		title: "Test bericht 3",
		description: "Dit is het derde test bericht.",
	},
];

export const addBlogPost = async (blog: BlogPost) => ({
	type: ADD_BLOGPOST,
	payload: blog,
});

export const editBlogPost = async (id: number, blog: BlogPost) => ({
	type: EDIT_BLOGPOST,
	payload: blog,
});

export const deleteBlogPost = async (id: number) => ({
	type: DELETE_BLOGPOST,
	payload: id,
});

export const getBlogsPosts = async () => ({
	type: SET_BLOGPOSTS,
	payload: MOCK_BLOGS,
});

export const setEditId = (id: number) => ({
	type: SET_EDIT_ID,
	payload: id,
});
