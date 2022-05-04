import { LitElementApp } from "./LitElementApp";
import { fetchJsonStub } from "../../mocks/ajax";
import { expect, fixture } from "@open-wc/testing";

describe("LitElementApp", () => {
	let el: LitElementApp;

	beforeEach(async () => {
		el = new LitElementApp();

		fetchJsonStub.reset();
	});

	it("renders with first update", async () => {
		await el.firstUpdated();

		expect(fetchJsonStub).to.have.callCount(1);
		expect(fetchJsonStub.firstCall.args[1].method).to.be.equal("GET");
	});

	it("render function", async () => {
		const htmlElement = await fixture(el.render());

		const h1Text = (
			htmlElement.querySelector("h1#app-title") as HTMLElement
		)?.innerText;
		expect(h1Text).to.be.equal(h1Text).to.be.equal("Super coole blog app");
	});
});
