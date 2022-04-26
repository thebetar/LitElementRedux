import { Required } from "@lion/form-core";
import { FeedbackMessageData } from "@lion/form-core/types";

export class RequiredForm extends Required {
	static async getMessage(
		data?: Partial<FeedbackMessageData> | undefined
	): Promise<string | Element> {
		return "Waarde is verplicht";
	}
}
