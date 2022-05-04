import { store } from "./../../store/index";
import { MOCK_BLOGS } from "./../../mocks/store/actions";
import { LitElementListItem } from "./LitElementListItem";
import { fetchJsonStub } from "../../mocks/ajax";
import { expect } from "@open-wc/testing";
import sinon from "sinon";
import { SET_EDIT_ID } from "../../store/actions";

describe("LitElementListItem", () => {
	let el: LitElementListItem;

	beforeEach(async () => {
		el = new LitElementListItem();
		el.blog = MOCK_BLOGS[0];

		fetchJsonStub.reset();
	});

	it("renders", () => {
		expect(el).to.exist;
	});

	it("connectedCallback", () => {
		expect(el.connectedCallback()).to.be.equal("Blog with id 1 rendered");
	});

	it("deleteBlog", async () => {
		await el.deleteBlog();

		expect(fetchJsonStub).to.have.callCount(1);
		expect(fetchJsonStub.firstCall.args[1].method).to.be.equal("DELETE");
		expect(fetchJsonStub.firstCall.args[0].split("/").pop()).to.be.equal(
			"1"
		);
	});

	it("sets editId", () => {
		const dispatchSpy = sinon.spy(store, "dispatch");

		el.setEditId();

		expect(dispatchSpy.firstCall.args[0]).to.deep.equal({
			type: SET_EDIT_ID,
			payload: 1,
		});
	});
});
