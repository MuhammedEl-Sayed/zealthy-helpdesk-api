export {};
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ticketSchema = new Schema(
	{
		title: String,
		name: String,
		email: String,
		status: String,
		createdAt: Number,
		updatedAt: Number,
		description: String,
		response: String,
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			versionKey: false,
			transform: function (doc, ret) {
				// remove these props when object is serialized
				delete ret._id;
				ret.id = doc._id;
			},
		},
	}
);

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
