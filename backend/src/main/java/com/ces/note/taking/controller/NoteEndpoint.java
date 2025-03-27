package com.ces.note.taking.controller;

import com.ces.note.taking.model.Note;
import com.ces.note.taking.service.NoteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "https://note-taking-1.onrender.com/")
@RestController
@RequestMapping("/api/notes")
public class NoteEndpoint {

    private final NoteService noteService;

    public NoteEndpoint(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    public List<Note> getNotes() {
        return noteService.getNotes();
    }

    @PostMapping
    public Note createNote(@RequestBody Note note) {
        noteService.createNote(note);
        return note;
    }

    @DeleteMapping("/{id}")
    public void removeNote(@PathVariable("id") int id) {
        noteService.removeNote(id);
    }

    @PutMapping("/{id}")
    public Note updateNote(@PathVariable("id") int id, @RequestBody Note note) {
        return noteService.updateNote(id, note);
    }

    @GetMapping("/title/{title}")
    public List<Note> getNotesByTitle(@PathVariable("title") String title) {
        return noteService.getNotesByTitle(title);
    }

}
