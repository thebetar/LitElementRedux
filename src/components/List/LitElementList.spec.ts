import { MOCK_BLOGS } from "./../../mocks/store/actions";
import { LitElementList } from "./LitElementList";
import { fetchJsonStub } from "../../mocks/ajax";
import { expect, fixture } from "@open-wc/testing";
import { objectTraps } from "immer/dist/internal";

describe("LitElementList", () => {
	let el: LitElementList;

	beforeEach(async () => {
		el = new LitElementList();

		fetchJsonStub.reset();
	});

	it("renders", () => {
		expect(el).to.exist;
	});

	it("stateChanged", () => {
		el.stateChanged({
			blogs: MOCK_BLOGS,
		});
		expect(el.blogs).to.deep.equal(MOCK_BLOGS);
	});

	describe("render function", () => {
		const list = [0, 1, 2, 3];
		list.forEach((num) => {
			it(`with list of ${num}`, async () => {
				el.blogs = MOCK_BLOGS.slice(0, num);

				const htmlElement = await fixture(el.render());

				expect(
					htmlElement.querySelectorAll("lit-element-list-item").length
				).to.be.equal(num);
			});
		});
	});
});
