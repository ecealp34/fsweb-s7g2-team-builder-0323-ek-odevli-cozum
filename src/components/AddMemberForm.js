import React, { useEffect, useState } from "react";

// const emptyForm = {
//   name: "Erdal",
//   email: "erdal@workintech.com.tr",
//   role: "Fullstack Instructor",
// };

const emptyForm = {
  name: "",
  email: "",
  role: "",
};

function AddMemberForm(props) {
  // const { addMember } = props;

  const [formData, setFormData] = useState(emptyForm);
  const [isEditing, setisEditing] = useState(false);

  useEffect(() => {
    console.log("formum ben yenilendiiim");
    props.editMode ? setFormData(props.editMode) : setFormData(emptyForm);
    props.editMode ? setisEditing(true) : setisEditing(false);
  }, [props.editMode]);

  function submitHandler(e) {
    e.preventDefault();
    props.addMember(formData);
    setisEditing(false);
    setFormData(emptyForm);
  }

  function changeHandler(e) {
    console.log(e.target.value);
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newFormData);
  }

  return (
    <div>
      {isEditing ? <h2>Üye Düzenle</h2> : <h2>Yeni Üye Ekle</h2>}
      <form onSubmit={submitHandler}>
        <label htmlFor="name">İsim </label>
        <input
          onChange={(e) => changeHandler(e)}
          type="text"
          name="name"
          value={formData.name}
        />

        <label htmlFor="email">Eposta</label>
        <input
          onChange={(e) => changeHandler(e)}
          type="email"
          name="email"
          value={formData.email}
        />

        <label htmlFor="role">Rol</label>
        <input
          onChange={(e) => changeHandler(e)}
          type="text"
          name="role"
          value={formData.role}
        />

        <button type="submit">
          {isEditing ? "Üye Düzenle" : "Yeni Üye Ekle"}
        </button>
        <button type="button" onClick={() => setFormData(emptyForm)}>
          Sıfırla
        </button>
      </form>
    </div>
  );
}
export default AddMemberForm;
