import { ReactiveController, ReactiveControllerHost } from "lit";

export class ClockController implements ReactiveController {
	host: ReactiveControllerHost;

	value = "LADEN...";

	private _timerID?: any;

	constructor(host: ReactiveControllerHost) {
		(this.host = host).addController(this);
	}

	hostConnected() {
		this._timerID = setInterval(() => {
			this.value = timeFormat.format(new Date());
			this.host.requestUpdate();
		}, 1000);
	}

	hostDisconnected() {
		clearInterval(this._timerID);
		this._timerID = undefined;
	}
}

const timeFormat = new Intl.DateTimeFormat("en-UK", {
	hour: "numeric",
	minute: "numeric",
	second: "numeric",
});
