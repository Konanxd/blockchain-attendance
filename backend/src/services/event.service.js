import { prisma } from "../utils/prisma.ts";

class EventService {
  async create(name, code) {
    const exists = await prisma.event.findUnique({
      where: { eventCode: code },
    });

    if (exists) {
      throw new Error("Name or code already registered");
    }

    const event = await prisma.event.create({
      data: {
        name,
        eventCode: code,
      },
    });

    return {
      id: event.id,
      name: event.name,
      eventCode: event.eventCode,
    };
  }
}

export default new EventService();
