import { useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import AddMemberForm from "./components/AddMemberForm";
function App() {
  const [editingMember, setEditingMember] = useState();
  const [editingOrder, setEditingOrder] = useState();
  const initialMembers = [
    {
      name: "Gökhan",
      email: "gokhan@workintech.com.tr",
      role: "Frontend Instructor",
    },
    {
      name: "Ömer",
      email: "omer@workintech.com.tr",
      role: "Frontend Instructor",
    },
    {
      name: "Emre",
      email: "emre@workintech.com.tr",
      role: "Backend Instructor",
    },
  ];

  const [members, setMembers] = useState(initialMembers);

  // Proje açıldığında iniaalMembers'ı members'a atıyoruz.
  // Axios ile sunucu ile iletişim kuruyoruz.
  // Sunucudan gelen veriyi members'a ilk başta atabilmek için
  // useEffect kullanıyoruz.

  // reqres.in sitesi üzerinden fake api kullanıyoruz.
  // burası get ile bizim verimizi kabul etmediğinden POST kullanıyoruz.

  // BONUS çalışma
  // aşağıdaki request'i çalıştırıp, postman'den gelen veriyi
  // state'e ekleyin
  // axios.post("https://reqres.in/api/workintech", initialMembers)
  // NORMALDE GET İÇİN GET ATILIR AMA BU SİTE GET İÇİN POST ATILMASINI İSTİYOR

  function addMember(newMember) {
    axios
      .post("https://reqres.in/api/workintech", newMember)
      .then(function (response) {
        console.log("response", response.data);

        if (editingOrder !== undefined) {
          const updatedMembers = [...members];
          updatedMembers.splice(editingOrder, 1, response.data);
          setMembers(updatedMembers);
        } else {
          setMembers([...members, response.data]);
        }
        setEditingOrder();
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log("editingOrder", editingOrder);
  }

  function editHelper(memberData, order) {
    setEditingMember(memberData);
    setEditingOrder(order);
  }

  return (
    <div className="App App-header">
      <h2>Üye Listesi</h2>
      <ul>
        {members.map((member, i) => {
          return (
            <li key={i}>
              <a className="App-link" href={`mailto:${member.email}`}>
                {member.name} - {member.role}
              </a>
              <button onClick={() => editHelper(member, i)}>Edit</button>
            </li>
          );
        })}
      </ul>
      {/* <img src={logo} width="100px" className="App-logo" alt="logo" /> */}
      <AddMemberForm
        addMember={addMember}
        editMode={editingMember}
        // editMember={member2Edit}
      />
    </div>
  );
}

export default App;
