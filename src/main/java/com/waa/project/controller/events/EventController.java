package com.waa.project.controller.events;

import com.waa.project.dto.requests.EventDTO;
import com.waa.project.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public List<EventDTO> getAllEvents() {
        return eventService.findAll();
    }

    @GetMapping("/admins/{id}")
    public EventDTO getEvent(@PathVariable Long id) {
        return eventService.findById(id);
    }

    @PostMapping
    public EventDTO createEvent(@RequestBody EventDTO eventDTO) {
        return eventService.save(eventDTO);
    }

    @PutMapping("/admins/{id}")
    public EventDTO updateEvent(@PathVariable Long id, @RequestBody EventDTO eventDTO) {
        return eventService.update(eventDTO, id);
    }

    @DeleteMapping("/admins/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventService.deleteById(id);
    }

    @PostMapping("/students/{eventId}/attendees/{studentId}")
    public EventDTO addAttendee(@PathVariable Long eventId, @PathVariable Long studentId) {
        return eventService.addEventAttendee(eventId, studentId);
    }

    @DeleteMapping("/students/{eventId}/attendees/{studentId}")
    public void removeAttendee(@PathVariable Long eventId, @PathVariable Long studentId) {
         eventService.removeEventAttendee(eventId, studentId);
    }
}