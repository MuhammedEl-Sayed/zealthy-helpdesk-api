export {};
const Ticket = require('./ticket/ticket');
const express = require('express');

const router = express.Router();

// Create a new ticket
router.post('/tickets', async (req, res) => {
	console.log(req.body);
	const { title, from, status, description } = req.body;
	try {
		const ticket = new Ticket({ title, from, status, description });
		await ticket.save();
		res.send(ticket);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

// Get all tickets
router.get('/tickets', async (req, res) => {
	try {
		const tickets = await Ticket.find({});
		console.log(tickets);
		res.send(tickets);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

// Update a ticket
router.put('/tickets/:id', async (req, res) => {
	const { id } = req.params;
	const { title, from, status, description, response } = req.body;

	try {
		const ticket = await Ticket.findByIdAndUpdate(
			id,
			{ title, from, status, description, response },
			{ new: true }
		);
		res.send(ticket);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

// Delete a ticket
router.delete('/tickets/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const ticket = await Ticket.findByIdAndDelete(id);
		res.send(ticket);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

router.put('/tickets/:id/response', async (req, res) => {
	const { id } = req.params;
	const { responseToTicket } = req.body;

	try {
		const ticket = await Ticket.findByIdAndUpdate(
			id,
			{ responseToTicket },
			{ new: true }
		);
		console.log(
			`Email sent to ${ticket.from} regarding ticket ID: ${id}, saying: ${responseToTicket}`
		);
		res.send(ticket);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

module.exports = router;
