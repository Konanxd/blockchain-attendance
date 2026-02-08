import eventService from "../services/event.service.js";

export const createEvent = async (req, res) => {
  try {
    const { name, code } = req.body;

    const user = await eventService.create(name, code);
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
