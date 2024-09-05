import { useEffect, useState } from "react";
import User from "../components/User";

export default function HomePage() {
  const [users, setUsers] = useState([]); // state to handle the data (users)
  const [searchTerm, setSearchTerm] = useState(""); // state to handle the search term
  const [peopleFilter, setPeopleFilter] = useState(""); // state to handle the filter by number of players
  const [timeFilter, setTimeFilter] = useState(""); // state to handle the filter by time to play
  const [languageFilter, setLanguageFilter] = useState(""); // state to handle the filter by language
  const [sortBy, setSortBy] = useState("name"); // state to handle the sort

  useEffect(() => {
    getUsers();

    async function getUsers() {
      const data = localStorage.getItem("users"); // get data from local storage

      let usersData = [];

      if (data) {
        // if data exists in local storage
        usersData = JSON.parse(data); // parse the data from string to javascript array
      } else {
        // if data does not exist in local storage, fetch the data from the API
        usersData = await fetchUsers(); // fetch the data from the API
      }

      console.log(usersData);
      setUsers(usersData); // set the users state with the data from local storage
    }
  }, []);

  async function fetchUsers() {
    const response = await fetch("https://raw.githubusercontent.com/muhcho/games-content/main/boardgames.json"); // fetch the data from the API
    const data = await response.json(); // parse the data from string to JavaScript array
    localStorage.setItem("users", JSON.stringify(data)); // save the data to local storage
    return data; // return the data
  }

  // Filter and sort the users array
  let filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (peopleFilter) {
    filteredUsers = filteredUsers.filter(user => user.people === peopleFilter); // filter the users array by the selected number of players
  }

  if (timeFilter) {
    filteredUsers = filteredUsers.filter(user => user.time === timeFilter); // filter the users array by the selected time to play
  }

  if (languageFilter) {
    filteredUsers = filteredUsers.filter(user => user.language === languageFilter); // filter the users array by the selected language
  }

  filteredUsers.sort((user1, user2) => user1[sortBy].localeCompare(user2[sortBy])); // sort the users array by the selected sort

  const peopleOptions = [...new Set(users.map(user => user.people))]; // get all the unique numbers of players from the users array
  const timeOptions = [...new Set(users.map(user => user.time))];
  const languageOptions = [...new Set(users.map(user => user.language))];

  return (
    <section className="page">
      <form className="grid-filter" role="search">
        <label>
          Which game are you looking for?
          <input
            placeholder="Search by name"
            type="search"
            onChange={e => setSearchTerm(e.target.value)}
          />
        </label>
        <label>
          Number of players:
          <select onChange={e => setPeopleFilter(e.target.value)}>
            <option value="">select a number</option>
            {peopleOptions.map(people => (
              <option key={people} value={people}>
                {people}
              </option>
            ))}
          </select>
        </label>
        <label>
          Time to play:
          <select onChange={e => setTimeFilter(e.target.value)}>
            <option value="">select a time</option>
            {timeOptions.map(time => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </label>
        <label>
          Language:
          <select onChange={e => setLanguageFilter(e.target.value)}>
            <option value="">select the language</option>
            {languageOptions.map(language => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort by:
          <select name="sort-by" onChange={e => setSortBy(e.target.value)}>
            <option value="name">Name</option>
            <option value="description">Description</option>
            <option value="language">Language</option>
            <option value="people">People</option>
            <option value="time">Time</option>
          </select>
        </label>
      </form>
      <section className="grid">
        {filteredUsers.map(user => (
          <User user={user} key={user.id} />
        ))}
      </section>
    </section>
  );
}

