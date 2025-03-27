package com.ces.note.taking;

import com.ces.note.taking.model.Note;
import com.ces.note.taking.config.UserDetailsImplementation;
import com.ces.note.taking.config.UserDetailsServiceImplementation;
import com.ces.note.taking.service.NoteService;
import org.hibernate.ObjectNotFoundException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class NoteServiceTests {

    @Autowired
    private NoteService noteService;

    @MockBean
    private UserDetailsServiceImplementation userDetailsService;

    @BeforeEach
    public void setUp() {
        UserDetailsImplementation userDetailsImplementation = new UserDetailsImplementation(
                1,
                "test@test.com",
                "password",
                new ArrayList<>(List.of(new SimpleGrantedAuthority("ROLE_USER")))
        );

        Mockito.when(userDetailsService.loadUserByUsername(Mockito.anyString()))
                .thenReturn(userDetailsImplementation);

        SecurityContext securityContext = SecurityContextHolder.getContext();
        securityContext.setAuthentication(
                new UsernamePasswordAuthenticationToken(
                        userDetailsImplementation,
                        null,
                        userDetailsImplementation.getAuthorities()));
    }

    @AfterEach
    public void shutDown() {
        try {
            List<Note> notes = noteService.getNotes();
            for (Note note : notes) {
                noteService.removeNote(note.getId());
            }
        } catch (ObjectNotFoundException ignored) {
        }
    }

    @Test
    public void getNotes_Empty_ReturnsEmptyList() {
        List<Note> result = noteService.getNotes();

        List<Note> expected = new ArrayList<>();
        Assertions.assertIterableEquals(expected, result);
    }

    @Test
    public void getNotes_WithExistingNotes_ReturnsCorrectList() {
        Note testNote = new Note("testTitle", "testContent");
        noteService.createNote(testNote);

        Note result = noteService.getNotes().get(0);

        Assertions.assertEquals(testNote.getTitle(), result.getTitle());
        Assertions.assertEquals(testNote.getContent(), result.getContent());
    }

    @Test
    public void getNotes_WithoutUser_ThrowsException() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        securityContext.setAuthentication(null);

        Assertions.assertThrows(ObjectNotFoundException.class, () -> {noteService.getNotes();});
    }

    @Test
    public void createNote_WithUser_ReturnsNote() {
        Note noteToCreate = new Note("Test Title", "Test Content");

        Note result = noteService.createNote(noteToCreate);

        Assertions.assertEquals(noteToCreate, result);
    }

    @Test
    public void createNote_WithoutUser_ThrowsException() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        securityContext.setAuthentication(null);

        Note noteToCreate = new Note("Test Title", "Test Content");

        Assertions.assertThrows(ObjectNotFoundException.class, () -> {noteService.createNote(noteToCreate);});
    }

    @Test
    public void removeNote_OneNoteCreatedAndRemoved_RemovesNote() {
        Note noteToCreate = new Note("Test Title", "Test Content");
        noteToCreate.setId(1);
        noteService.createNote(noteToCreate);

        noteService.removeNote(1);

        List<Note> result = noteService.getNotes();
        List<Note> expected = new ArrayList<>();
        Assertions.assertIterableEquals(expected, result);
    }

    @Test
    public void removeNote_WithoutUser_ThrowsException() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        securityContext.setAuthentication(null);

        Assertions.assertThrows(ObjectNotFoundException.class, () -> {noteService.removeNote(1);});
    }

    @Test
    public void updateNote_ValidNoteId_ReturnsUpdatedContent() {
        Note noteToCreate = new Note("Test Title", "Test Content");
        noteToCreate.setId(1);
        noteService.createNote(noteToCreate);

        Note updatedContent = new Note("Test Title", "Updated Content");
        Note result = noteService.updateNote(1, updatedContent);

        Assertions.assertEquals(updatedContent.getContent(), result.getContent());
    }

    @Test
    public void updateNote_InvalidNoteId_ThrowsException() {
        Note noteToCreate = new Note("Test Title", "Test Content");
        noteToCreate.setId(1);
        noteService.createNote(noteToCreate);
        Note updatedContent = new Note("Test Title", "Updated Content");

        Assertions.assertThrows(ObjectNotFoundException.class, () -> {noteService.updateNote(2, updatedContent);});
    }

}
