import { MinLength } from "@lion/form-core";
import { FeedbackMessageData } from "@lion/form-core/types";

export class MinLengthForm extends MinLength {
	static async getMessage(
		data?: Partial<FeedbackMessageData> | undefined
	): Promise<string | Element> {
		return `Waarde moet minimaal ${data?.params} karakters lang zijn`;
	}
}
