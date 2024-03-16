import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  //States
  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: "",
    author: "",
    body: "",
  });

  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    author: "",
    body: "",
  });

  //UseEffect
  useEffect(() => {
    fetchNotes();
  }, []);

  //Functions
  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:3000/allnotes");
    setNotes(res.data.notes);
    console.log("fetching notes");
    console.log(notes);
  };

  const updateCreateForm = (e) => {
    setCreateForm({ ...createForm, [e.target.name]: e.target.value });
  };
  const updateUpdateForm = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const CreateNote = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/note", createForm);
    console.log("create notes");
    console.log(res.data);
    setNotes([...notes, res.data]);
    // fetchNotes();
    setCreateForm({
      title: "",
      author: "",
      body: "",
    });
  };

  const DeleteNote = async (_id) => {
    const res = await axios.delete(`http://localhost:3000/note/${_id}`);
    console.log("delete notes");
    console.log(res.data);
    // fetchNotes();
    setNotes((newNotes) => newNotes.filter((note) => note._id !== _id));
  };
  // click edit then put value and it here
  const EditNote = async (note) => {
    setUpdateForm({
      _id: note._id,
      title: note.title,
      author: note.author,
      body: note.body,
    });
  };

  const UpdateNote = async (e) => {
    e.preventDefault();
    const { title, author, body } = updateForm;
    console.log(title);
    const res = await axios.put(
      `http://localhost:3000/note/${updateForm._id}`,
      { title, author, body }
    );
    console.log("update notes");
    console.log(res.data);
    // fetchNotes();
    //update State
    setNotes(
      notes.map((note) =>
        note._id === updateForm._id ? { ...res.data } : note
      )
    );
  };
  return (
    <div className="App">
      <h2>POST: create note</h2>
      <form onSubmit={CreateNote}>
        <input
          onChange={updateCreateForm}
          value={createForm.title}
          name="title"
          type="text"
          placeholder="title"
        />
        <input
          onChange={updateCreateForm}
          value={createForm.author}
          name="author"
          type="text"
          placeholder="author"
        />
        <input
          onChange={updateCreateForm}
          value={createForm.body}
          name="body"
          type="text"
          placeholder="body"
        />
        <button type="submit">Create</button>
      </form>
      <h2>UPDATE: update note</h2>
      <form onSubmit={UpdateNote}>
        <input
          onChange={updateUpdateForm}
          value={updateForm.title}
          name="title"
          type="text"
          placeholder="title"
        />
        <input
          onChange={updateUpdateForm}
          value={updateForm.author}
          name="author"
          type="text"
          placeholder="author"
        />
        <input
          onChange={updateUpdateForm}
          value={updateForm.body}
          name="body"
          type="text"
          placeholder="body"
        />
        <button type="submit">Update</button>
      </form>
      <h2>GET/DELETE: get all notes</h2>
      {notes &&
        notes.map((note) => (
          <div key={note._id}>
            <h3>title:{note.title}</h3>
            <p>author: {note.author}</p>
            <p>body: {note.body}</p>
            <button onClick={() => EditNote(note)}>Edit</button>
            <button onClick={() => DeleteNote(note._id)}>Delete</button>
          </div>
        ))}
    </div>
  );
}
export default App;
