import { MOCK_BLOGS } from "./../mocks/store/actions";
import { BlogPost } from "./../components/App/LitElementApp";
import {
	ADD_BLOGPOST,
	DELETE_BLOGPOST,
	EDIT_BLOGPOST,
	ERROR,
	SET_BLOGPOSTS,
} from "./actions";
import { reducer, INITIAL_STATE, Store } from "./reducer";
import { expect } from "@open-wc/testing";

describe("Reducer", () => {
	let initialState: Store;

	beforeEach(() => {
		initialState = { ...INITIAL_STATE, blogs: MOCK_BLOGS };
	});

	it("adds blog", () => {
		const newBlog = {
			id: 4,
			title: "[Unit test] blog",
			description: "Unit test description",
		} as BlogPost;

		const result = reducer(initialState, {
			type: ADD_BLOGPOST,
			payload: newBlog,
		});

		expect(result).to.deep.equal({
			...initialState,
			blogs: [...initialState.blogs, newBlog],
		});
	});

	it("edits blog", () => {
		const newBlog = {
			id: 3,
			title: "[Unit test] blog",
			description: "Unit test description",
		} as BlogPost;

		const result = reducer(initialState, {
			type: EDIT_BLOGPOST,
			payload: newBlog,
		});

		expect(result).to.deep.equal({
			...initialState,
			blogs: [...initialState.blogs.slice(0, 2), newBlog],
		});
	});

	it("deletes blog", () => {
		const result = reducer(initialState, {
			type: DELETE_BLOGPOST,
			payload: 1,
		});

		expect(result).to.deep.equal({
			...initialState,
			blogs: initialState.blogs.slice(1, 3),
		});
	});

	it("sets blogs", () => {
		const result = reducer(
			{ ...initialState, blogs: [] },
			{
				type: SET_BLOGPOSTS,
				payload: initialState.blogs,
			}
		);

		expect(result).to.deep.equal(initialState);
	});

	it("sets error", () => {
		const errorMessage = "[Test] Error";

		const result = reducer(initialState, {
			type: ERROR,
			payload: errorMessage,
		});

		expect(result).to.deep.equal({
			...initialState,
			error: errorMessage,
		});
	});

	it("defaults", () => {
		const result = reducer(initialState, {
			type: "blablabla",
			payload: "test",
		});

		expect(result).to.deep.equal(initialState);
	});
});
