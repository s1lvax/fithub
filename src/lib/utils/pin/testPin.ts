export const testPin = (pinString: string) => {
	if (!/^\d+$/.test(pinString)) {
		return { valid: false, error: 'invalid' };
	}

	if (pinString.length < 4 || pinString.length > 6) {
		return { valid: false, error: 'incorrect' };
	}

	return { valid: true };
};
