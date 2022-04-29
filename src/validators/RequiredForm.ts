import { Validator } from "@lion/form-core";
import { ValidatorOutcome } from "@lion/form-core/types";

export default class RequiredForm extends Validator {
	static get validatorName() {
		return "Required";
	}

	execute(modelValue: string): ValidatorOutcome {
		return !!modelValue;
	}

	static async getMessage() {
		return "Dit veld is verplicht.";
	}
}
