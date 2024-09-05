import { useNavigate } from "react-router-dom";

export default function User({ user }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/users/${user.id}`);
  }

  

  return (
    <article className="user-card" onClick={handleClick}>
      <img
        src={user.image || "https://placehold.co/600x400?text=Error+loading+image"}
        alt={user.name}
      />
      <div className="user-card-content">
        <h2 className="name">{user.name}</h2>
        <p className="description">{user.description}</p>
        <div className="user-card-details">
          <p className="language">{user.language}</p>
          <p className="people">
            <i className="fas fa-users"></i> {user.people}
          </p>
          <p className="time">
            <i className="fas fa-clock"></i> {user.time}
          </p>
        </div>
      </div>
    </article>
  );
  
}
