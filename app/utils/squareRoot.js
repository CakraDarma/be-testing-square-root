function squareRoot(bilangan) {
	if (bilangan === 0) return 0;

	var approx = bilangan / 2;

	for (var i = 0; i < 10; i++) {
		approx = 0.5 * (approx + bilangan / approx);
	}

	return approx;
}

module.exports = { squareRoot };
