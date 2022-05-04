import { expect } from "@open-wc/testing";
import sinon from "sinon";
import { ClockController } from "./ClockController";

describe("ClockController", () => {
	let el: ClockController,
		hostSpy: {
			addController: sinon.SinonStub;
			requestUpdate: sinon.SinonStub;
		};

	beforeEach(() => {
		hostSpy = {
			addController: sinon.stub(),
			requestUpdate: sinon.stub(),
		};

		el = new ClockController(hostSpy as any);
	});

	it("connects", async () => {
		expect(el.value).to.be.equal("LADEN...");

		await new Promise((resolve) => {
			el.hostConnected();

			setTimeout(() => {
				expect(el.value).to.not.be.equal("LADEN...");

				el.hostDisconnected();

				resolve(null);
			}, 1500);
		});
	});
});
