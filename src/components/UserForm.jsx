import { useEffect, useState } from "react";

export default function UserForm({ onSubmit, onCancel, user }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [people, setPeople] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (user) {
      user.name && setName(user.name); // if user.name is true, set the name state with the user.name value
      user.image && setImage(user.image); // if user.image is true, set the image state with the user.image value
      user.language && setLanguage(user.language);
      user.description && setDescription(user.description);
      user.people && setPeople(user.people);
      user.time && setTime(user.time);
    }
  }, [user]);

  function handleOnSubmit(event) {
    event.preventDefault();

    // validate the for
    if (!name || !description || !people || !language || !time) {
      alert("Please fill out all the fields");
      return;
    } else if (!image) {
      alert("Please paste an image URL");
      return;
    } else if (!image.startsWith("http")) {
      alert("Please paste a valid image URL");
      return;
    }

    const user = {
      // key/name: value from state,
      name: name,
      image: image,
      language: language,
      description: description,
      people: people,
      time: time
    };
    onSubmit(user);
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="">Name</label>
      <input id="name" type="text" value={name} placeholder="Type a name" onChange={e => setName(e.target.value)} />
         <label htmlFor="">Description</label>
          <input id="description" type="text" placeholder="Write a description" onChange={e => setDescription(e.target.value)} />
          <label htmlFor="">Language</label>
          <input id="language" type="text" placeholder="Choose a language" onChange={e => setLanguage(e.target.value)} />
          <label htmlFor="">People</label>
          <input id="people" type="text" placeholder="Choose number of people" onChange={e => setPeople(e.target.value)} />
          <label htmlFor="">Time</label>
          <input id="time" type="text" placeholder="Choose game time" onChange={e => setTime(e.target.value)} />
      <label htmlFor="mail">Image URL</label>
      <input type="url" value={image} placeholder="Paste image url" onChange={e => setImage(e.target.value)} />
      <label htmlFor="image-preview"></label>
      <img
        id="image-preview"
        className="image-preview"
        src={image ? image : "https://placehold.co/600x400?text=Paste+an+image+URL"}
        alt="Choose"
        onError={e => (e.target.src = "https://placehold.co/600x400?text=Error+loading+image")}
      />
      <div className="btns">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button>{user ? "Save" : "Create"}</button>
      </div>
    </form>
  );
}
