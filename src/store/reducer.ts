import { BlogPost } from "../components/App/LitElementApp";
import {
	ADD_BLOGPOST,
	DELETE_BLOGPOST,
	SET_BLOGPOSTS,
	ERROR,
	EDIT_BLOGPOST,
	SET_EDIT_ID,
} from "./actions";

const INITIAL_STATE = {
	blogs: [] as BlogPost[],
	error: "" as string,
	editId: 0 as number,
};

export const reducer = (
	state = INITIAL_STATE,
	action: { type: String; payload: any }
) => {
	switch (action.type) {
		case ADD_BLOGPOST:
			return {
				...state,
				error: "",
				blogs: [...state.blogs, action.payload],
			};
		case EDIT_BLOGPOST:
			const index = state.blogs.findIndex(
				(blog) => blog.id === action.payload.id
			);
			const newBlogs = [...state.blogs];
			newBlogs[index] = { ...action.payload };
			return {
				...state,
				error: "",
				blogs: newBlogs,
			};
		case DELETE_BLOGPOST:
			return {
				...state,
				error: "",
				blogs: state.blogs.filter((blog) => blog.id !== action.payload),
			};
		case SET_BLOGPOSTS:
			return {
				...state,
				error: "",
				blogs: action.payload,
			};
		case SET_EDIT_ID:
			return {
				...state,
				editId: action.payload,
			};
		case ERROR:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
