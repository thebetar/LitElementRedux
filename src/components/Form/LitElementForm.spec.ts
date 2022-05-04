import { fetchJsonStub } from "./../../mocks/ajax";
import { LitElementForm } from "./LitElementForm";
import { elementUpdated, expect, fixture } from "@open-wc/testing";
import { MOCK_BLOGS } from "../../mocks/store/actions";

describe("LitElementForm", () => {
	let el: LitElementForm;

	beforeEach(async () => {
		el = new LitElementForm();

		fetchJsonStub.reset();
	});

	it("renders", async () => {
		expect(el).to.be.exist;
	});

	it("uses form", () => {
		const titleTarget = {
			value: "[Unit test] title",
		};
		const descTarget = {
			value: "Unit test description",
		};

		el.handleChange(titleTarget, "title");
		el.handleChange(descTarget, "description");

		expect(el.title).to.be.equal(titleTarget.value);
		expect(el.description).to.be.equal(descTarget.value);
	});

	describe("submits form", () => {
		it("without editId", async () => {
			const titleTarget = {
				value: "[Unit test] title",
			};
			const descTarget = {
				value: "Unit test description",
			};

			el.handleChange(titleTarget, "title");
			el.handleChange(descTarget, "description");

			await el.handleSubmit();

			expect(fetchJsonStub).to.have.callCount(1);
			expect(fetchJsonStub.firstCall.args[1].method).to.be.equal("POST");
			expect(fetchJsonStub.firstCall.args[1].body).to.deep.equal({
				title: titleTarget.value,
				description: descTarget.value,
			});
		});

		it("with editId", async () => {
			const EDIT_ID = 1;
			el.editId = EDIT_ID;

			const titleTarget = {
				value: "[Unit test] title",
			};
			const descTarget = {
				value: "Unit test description",
			};

			el.handleChange(titleTarget, "title");
			el.handleChange(descTarget, "description");

			await el.handleSubmit();

			expect(fetchJsonStub).to.have.callCount(1);
			expect(fetchJsonStub.firstCall.args[1].method).to.be.equal("PUT");
			expect(fetchJsonStub.firstCall.args[1].body).to.deep.equal({
				id: EDIT_ID,
				title: titleTarget.value,
				description: descTarget.value,
			});
		});

		it("with empty form", async () => {
			await el.handleSubmit();

			expect(el.errorMessage).to.be.equal("Niet alle waardes gevuld");
		});
	});

	describe("stateChanged", () => {
		it("with editId", () => {
			el.stateChanged({
				error: "",
				editId: 1,
				blogs: MOCK_BLOGS,
			});

			el.title = MOCK_BLOGS[0].title;
			el.description = MOCK_BLOGS[0].description;
		});

		it("without editId", () => {
			el.stateChanged({
				error: "",
				editId: 0,
				blogs: MOCK_BLOGS,
			});

			el.title = "";
			el.description = "";
		});

		it("without blogs", () => {
			el.stateChanged({
				error: "",
				editId: 1,
				blogs: [],
			});

			el.title = "";
			el.description = "";
		});
	});

	describe("render function", async () => {
		let htmlElement: HTMLElement;

		beforeEach(async () => {
			htmlElement = await fixture(el.render());
		});

		it("handle input", () => {
			const titleInput = htmlElement.querySelector(
				"#title-input"
			) as HTMLInputElement;
			const descInput = htmlElement.querySelector(
				"#desc-input"
			) as HTMLInputElement;

			expect(titleInput.value).to.be.equal("");
			expect(descInput.value).to.be.equal("");

			const TITLE = "[Unit test] title";
			titleInput.value = TITLE;
			titleInput.dispatchEvent(new Event("model-value-changed"));

			const DESCRIPTION = "Unit test description";
			descInput.value = DESCRIPTION;
			descInput.dispatchEvent(new Event("model-value-changed"));
		});

		it("error message", async () => {
			expect(el.querySelector("#error-message")).to.not.exist;

			const ERROR_MESSAGE = "[Unit test] Error";
			el.errorMessage = ERROR_MESSAGE;
			htmlElement = await fixture(el.render());

			expect(
				(htmlElement.querySelector("#error-message") as HTMLElement)
					.innerText
			).to.be.equal(ERROR_MESSAGE);
		});
	});
});
