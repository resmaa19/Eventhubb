import Event from '../models/Events.js';
//import getNextSequenceValue from '../utils/getNextCounter.js';
// Create new event
export const createEvent = async (req, res) => {
    try {
        // Ensure that only admins can create events
        // if (!req.user || req.user.role !== 'admin') {
        //     return res.status(401).json({ success: false, message: "Only admins can create events" });
        // }
        const newEvent = new Event(req.body);
        const id =await getNextSequenceValue();
        newEvent.id= id
        const savedEvent = await newEvent.save();

        res.status(201).json({ success: true, message: "Event successfully created", data: savedEvent });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "An error occurred while creating the event" });
    }
};

// Get single event by ID
export const getEventById = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findOne({ id: eventId }).populate("reviews"); 
        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        res.status(200).json({ success: true, data: event });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "An error occurred while fetching the event" });
    }
};

// Update event by ID
export const updateEventById = async (req, res) => {
    try {
        const eventId = req.params.id;
        const updatedEvent = await Event.findOneAndUpdate({ id: eventId }, req.body, { new: true }); 
        if (!updatedEvent) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        res.status(200).json({ success: true, message: "Event successfully updated", data: updatedEvent });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "An error occurred while updating the event" });
    }
};

// Delete event by ID
export const deleteEventById = async (req, res) => {
    try {
        const eventId = req.params.id;
        const deletedEvent = await Event.findOneAndDelete({ id: eventId }); 
        if (!deletedEvent) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        res.status(204).json({ success: true, message: "Event successfully deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "An error occurred while deleting the event" });
    }
};

// Get all events
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({ success: true, data: events });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "An error occurred while fetching events" });
    }
};
