import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialItem = {
  name: '',
  email: ''
};

const UpdateForm = props => {
  // ********** get the params and history objects ********** //
  const [student, setStudent] = useState(initialItem);
  const { id } = useParams();
  const { push } = useHistory();
  // ********** get the params and history objects ********** //

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === 'price') {
      value = parseInt(value, 10);
    }
    setStudent({
      ...student,
      [ev.target.name]: value
    });
  };

  // ********** Find the student and set it to state ********** //
  // get the id from params
  // loop through the items list to find the student
  // set the student to state to pre-populate the form\
  useEffect(() => {
    const itemToUpdate = props.items.find(e => `${e.id}` === id);
    if (itemToUpdate) {
      setStudent(itemToUpdate);
    }
  }, [props.items, id]);

    // ********** Make the put request ********** //
  // ********** Find the student and set it to state ********** //
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`https://betterprofessorapp.herokuapp.com/api/students/${id}`, student)
      .then(res => {console.log(res);  push(`/YourStudents`);})
      .catch(err => console.log(err));

  };

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={changeHandler}
          placeholder="name"
          value={student.name}
        />
        <div className="baseline" />

        <input
          type="number"
          name="price"
          onChange={changeHandler}
          placeholder="Price"
          value={student.price}
        />
        <div className="baseline" />

        <input
          type="string"
          name="imageUrl"
          onChange={changeHandler}
          placeholder="Image"
          value={student.imageUrl}
        />
        <div className="baseline" />

        <input
          type="string"
          name="description"
          onChange={changeHandler}
          placeholder="Description"
          value={student.description}
        />
        <div className="baseline" />

        <input
          type="string"
          name="shipping"
          onChange={changeHandler}
          placeholder="Shipping"
          value={student.shipping}
        />
        <div className="baseline" />

        <button className="updater">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
