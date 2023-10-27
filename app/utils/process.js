function findFastestProcessingTime(data) {
	if (data.length === 0) {
		return null; // Data kosong, tidak ada waktu proses tercepat.
	}

	let fastestTime = data[0].time; // Anggap data pertama sebagai yang tercepat.

	for (let i = 1; i < data.length; i++) {
		const currentTime = data[i].time;
		if (currentTime < fastestTime) {
			fastestTime = currentTime;
		}
	}

	return fastestTime;
}

function findSlowestProcessingTime(data) {
	if (data.length === 0) {
		return null; // Data kosong, tidak ada waktu proses terlama.
	}

	let slowestTime = data[0].time; // Anggap data pertama sebagai yang terlama.

	for (let i = 1; i < data.length; i++) {
		const currentTime = data[i].time;
		if (currentTime > slowestTime) {
			slowestTime = currentTime;
		}
	}

	return slowestTime;
}

function calculateAverageProcessingTime(data) {
	if (data.length === 0) {
		return 0; // Data kosong, rata-rata waktu proses adalah 0.
	}

	let totalProcessingTime = 0;
	for (let i = 0; i < data.length; i++) {
		totalProcessingTime += data[i].time;
	}

	return totalProcessingTime / data.length;
}

module.exports = {
	calculateAverageProcessingTime,
	findFastestProcessingTime,
	findSlowestProcessingTime,
};
