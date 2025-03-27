package com.ces.note.taking.repository;

import com.ces.note.taking.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Integer> {

    public List<Note> findNotesByTitleContainsIgnoreCase(String title);

}
