import { useNavigate } from "react-router-dom";

export default function User({ user }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/users/${user.id}`);
  }

  

  return (
    <article className="user-card" onClick={handleClick}>
      <img src={user.image || "https://placehold.co/600x400?text=Error+loading+image"} alt={user.name} />
      <h2>
      <p className="name">{user.name}</p>
      </h2>
      <p>
      <p className="description">{user.description}</p>
      <p className="language">{user.language}</p>
      <p className="people">{user.people}</p>
      <p className="time">{user.time}</p>
      
        
      </p>
    </article>
  );
}
