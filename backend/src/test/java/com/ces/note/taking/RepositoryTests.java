package com.ces.note.taking;

import com.ces.note.taking.model.Note;
import com.ces.note.taking.repository.NoteRepository;
import com.ces.note.taking.service.InitService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;

@DataJpaTest
public class RepositoryTests {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private TestEntityManager entityManager;

    @MockBean
    private InitService initService;

    @Test
    public void findNotesByTitleContainsIgnoreCase_NotesWithSearchQueryExisting_ReturnsCorrectNote() {
        Note note1 = new Note("Test 123", "Content 123");
        Note note2 = new Note("Blah 123", "Content 123");
        Note note3 = new Note("123 Teeeeesssssst", "Content 123");
        entityManager.persist(note1);
        entityManager.persist(note2);
        entityManager.persist(note3);
        entityManager.clear();

        List<Note> returnedNoteList = noteRepository.findNotesByTitleContainsIgnoreCase("test");

        List<Note> expectedNoteList = new ArrayList<>();
        expectedNoteList.add(note1);
        Assertions.assertEquals(expectedNoteList.size(), returnedNoteList.size());
        Assertions.assertEquals(expectedNoteList.get(0).getTitle(), returnedNoteList.get(0).getTitle());
        Assertions.assertEquals(note1.getTitle(), returnedNoteList.get(0).getTitle());
    }

}
