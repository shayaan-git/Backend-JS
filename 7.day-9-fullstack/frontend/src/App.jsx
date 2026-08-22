import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  let fetchData = async () => {
    let res = await axios.get("http://localhost:3000/api/notes");
    // console.log(res.data.notes);
    setNotes(res.data.notes);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function submitHandler(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;
    // getting the title and description values from the Form inputs (ke ander jo 'name' tag hai usse)

    // console.log(title.value, description.value);

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,

        /*
         pehle postman se hardcode krke data bhejte the req.body mein, Lekin lekin Ab! Form ke through bhej rahe honge title.value and title.description ke zariye

         iss frontend mei 'left wala' title, description --> backend mein req.body.'title' Aur req.body.'description' (right wale se match karna hota hai) isliye SAME hi rakhenge always.

         And post api ko bas req.body mei data chahiye rehta hai to hum ek object create karte hai aur object ke ander data bhejenge

        `axios.post()` do cheezein leta hai —
    axios.post( KAHAaN bhejna hai,  KYA bhejna hai )
              ↑                      ↑
           URL/address             data object
        */
      })
      .then((res) => {
        console.log(res.data);
        fetchData();
        e.target.reset();
      });
  }

  function deleteHandler(noteId) {
    axios.delete(`http://localhost:3000/api/notes/${noteId}`).then((res) => {
      console.log(res.data);
      fetchData();
    });
  }

  return (
    <>
    {/* Form */}
      <form className="note-create-form" onSubmit={submitHandler}>
        <input name="title" type="text" required placeholder="Enter title" />
        <input
          name="description"
          type="text"
          required
          placeholder="Enter description"
        />
        <button type="submit">Create Note</button>
      </form>

    {/* Notes Mapping */}
      <div className="notes">
        {notes.map((note, idx) => {
          /* map use kiya kyuki return karwana hai */
          return (
            <div className="note" key={idx}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button
                onClick={() => {
                  deleteHandler(note._id);
                }}
              >
                delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
