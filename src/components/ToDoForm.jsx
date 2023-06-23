import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

export default function Table() {
  let [array, setArray] = useState([]);
  let [inputdata, setInputdata] = useState({ name: "", email: "", number: "" });
  let [index, setIndex] = useState();
  let [bolin, setBolin] = useState(false);
  let { name, email, number } = inputdata;

  function data(e) {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value });
  }

  function addinputdata() {
    if (name === "" || email === "" || number === "") {
      alert("Enter user name, email and phone number");
    } else {
      setArray([...array, { name, email, number }]);
      setInputdata({ name: "", email: "", number: "" });
    }
  }

  // deleting row
  function deletedata(i) {
    console.log(i, "this index row want to be delete");
    let total = [...array];
    total.splice(i, 1);
    setArray(total);
  }

  // editData
  function updatedata(i) {
    let { name, email, number } = array[i];
    //this perticular index no row data shoud be update so we get this index no row data in name or number
    setInputdata({ name, email, number });
    setBolin(true);
    setIndex(i);
  }

  //know add data at perticular index means update it on that index
  function updateinfo() {
    let total = [...array];
    total.splice(index, 1, { name, email, number });
    setArray(total);
    setBolin(false);
    setInputdata({ name: "", email: "", number: "" });
  }
  return (
    <div className="content">
      <div className="boxLeft">
        <form className="userAdd">
          <input
            type="text"
            value={inputdata.name}
            name="name"
            autoComplete="off"
            placeholder="Enter User Name"
            onChange={data}
            required
          />

          <input
            type="email"
            name="email"
            onChange={data}
            value={inputdata.email}
            placeholder="Email Address"
            required
          />

          <input
            type="number"
            name="number"
            placeholder="Phone Number"
            value={inputdata.number}
            onChange={data}
            required
          />
          <button onClick={!bolin ? addinputdata : updateinfo}>
            {/* {!bolin ? `Add data` : `Update data`} */}
            {!bolin ? <GrAdd /> : `Update data`}
          </button>

          <h2>Enter User Details</h2>
        </form>
      </div>
      <div className="boxRight">
        <table className="infoBox">
          <tbody>
            <tr className="headings">
              <td>User Name</td>
              <td>Email Address</td>
              <td>Phone Number</td>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {array &&
              array.map((item, i) => {
                return (
                  <tr className="userData" key={i}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.number}</td>
                    <th>
                      <button onClick={() => updatedata(i)}>
                        <AiFillEdit />
                      </button>
                    </th>
                    <th>
                      <button onClick={() => deletedata(i)}>
                        <AiFillDelete />
                      </button>
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
