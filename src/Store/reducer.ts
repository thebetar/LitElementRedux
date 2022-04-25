import { BlogPost } from "./../App/LitElementApp";
import { ADD_BLOGPOST, DELETE_BLOGPOST } from "./actions";

const INITIAL_STATE = {
	blogs: [
		{
			id: 1,
			title: "Test",
			description: "Dit is een test bericht",
		},
	] as BlogPost[],
};

export const reducer = (
	state = INITIAL_STATE,
	action: { type: String; payload: any }
) => {
	switch (action.type) {
		case ADD_BLOGPOST:
			return { ...state, blogs: [...state.blogs, action.payload] };
		case DELETE_BLOGPOST:
			return {
				...state,
				blogs: state.blogs.filter((blog) => blog.id !== action.payload),
			};
		default:
			return state;
	}
};
