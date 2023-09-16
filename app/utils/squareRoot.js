function squareRoot(bilangan) {
	if (bilangan === 0) return 0; // Penanganan khusus untuk akar dari 0

	var approx = bilangan / 2; // Pendekatan awal, bisa disesuaikan sesuai kebutuhan

	for (var i = 0; i < 10; i++) {
		// Lakukan iterasi beberapa kali (10 kali sebagai contoh)
		approx = 0.5 * (approx + bilangan / approx);
	}

	return approx;
}

module.exports = { squareRoot };
