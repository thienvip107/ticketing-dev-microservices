import { Publisher, TicketCreatedEvent, Subjects } from "@tian-ticketing/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated
}