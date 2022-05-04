import { MOCK_BLOGS } from "./../mocks/store/actions";
import { fetchJsonStub } from "../mocks/ajax";
import {
	addBlogPost,
	ADD_BLOGPOST,
	deleteBlogPost,
	DELETE_BLOGPOST,
	editBlogPost,
	EDIT_BLOGPOST,
	ERROR,
	getBlogPosts,
	setEditId,
	SET_BLOGPOSTS,
	SET_EDIT_ID,
} from "./actions";
import { expect } from "@open-wc/testing";

describe("actions", () => {
	const newBlog = MOCK_BLOGS[0];

	beforeEach(() => {
		fetchJsonStub.reset();
	});

	describe("addBlogPost", () => {
		it("and succeeds", async () => {
			const action = await addBlogPost(newBlog);

			expect(action.type).to.be.equal(ADD_BLOGPOST);
			expect(action.payload).to.be.equal(newBlog);
		});

		it("and fails", async () => {
			fetchJsonStub.throws("Error");

			const action = await addBlogPost(newBlog);

			expect(action.type).to.be.equal(ERROR);
			expect(action.payload).to.be.equal(
				"Er ging iets fout bij het toevoegen"
			);
		});
	});

	describe("editBlogPost", () => {
		it("and succeeds", async () => {
			const action = await editBlogPost(1, newBlog);

			expect(action.type).to.be.equal(EDIT_BLOGPOST);
			expect(action.payload).to.deep.equal(newBlog);
		});

		it("and fails", async () => {
			fetchJsonStub.throws("Error");

			const action = await editBlogPost(1, newBlog);

			expect(action.type).to.be.equal(ERROR);
			expect(action.payload).to.be.equal(
				"Er ging iets fout bij het aanpassen"
			);
		});
	});

	describe("deleteBlogPost", () => {
		it("and succeeds", async () => {
			const action = await deleteBlogPost(1);

			expect(action.type).to.be.equal(DELETE_BLOGPOST);
			expect(action.payload).to.be.equal(1);
		});

		it("and fails", async () => {
			fetchJsonStub.throws("Error");

			const action = await deleteBlogPost(1);

			expect(action.type).to.be.equal(ERROR);
			expect(action.payload).to.be.equal(
				"Er ging iets fout bij het verwijderen"
			);
		});
	});

	describe("getBlogsPost", () => {
		it("and succeeds", async () => {
			const action = await getBlogPosts();

			expect(action.type).to.be.equal(SET_BLOGPOSTS);
			expect(action.payload).to.deep.equal(MOCK_BLOGS);
		});

		it("and fails", async () => {
			fetchJsonStub.throws("Error");

			const action = await getBlogPosts();

			expect(action.type).to.be.equal(ERROR);
			expect(action.payload).to.be.equal(
				"Er ging iets fout bij het ophalen"
			);
		});
	});

	it("sets editId", () => {
		const action = setEditId(1);

		expect(action.type).to.be.equal(SET_EDIT_ID);
		expect(action.payload).to.be.equal(1);
	});
});
