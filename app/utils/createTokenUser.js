// fungsinya nampung kedalam object setelah di findone dan nglangin password juga

const createTokenUser = (user) => {
	return {
		nama: user.nama,
		userId: user.id,
		role: user.role.nama,
		email: user.email,
	};
};

// const createTokenParticipant = (participant) => {
// 	return {
// 		lastName: participant.lastName,
// 		participantId: participant._id,
// 		firstName: participant.firstName,
// 		email: participant.email,
// 	};
// };

module.exports = { createTokenUser };
