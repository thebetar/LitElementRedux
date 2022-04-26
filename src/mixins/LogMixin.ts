import { LitElement } from "lit";

type Constructor<T = {}> = new (...args: any[]) => T;

export declare class LogMixinInterface {
	updated: (changedProperties: any) => void;
	title: string;
	description: string;
	isTitleValid: boolean;
	isDescriptionValid: boolean;
	errorMessage: string;
	editId: number;
}

export const LogMixin = <T extends Constructor<LitElement>>(superClass: T) => {
	class LogMixinClass extends superClass {
		updated(changedProperties: any): void {
			super.updated?.(changedProperties);
			console.log(`[UPDATED] from mixin ${changedProperties}`);
		}
	}

	return LogMixinClass as Constructor<LogMixinInterface> & T;
};
