import { useState } from "react";

const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [name, setName] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const addAttendance = () => {
    if (!name) return;

    setRecords([...records, { name, status: "Present" }]);
    setName("");
  };

  const deleteAttendance = (index) => {
    records.splice(index, 1);
    setRecords([...records]);
  };

  const editAttendance = (index) => {
    setName(records[index].name);
    setEditingIndex(index);
  };

  const updateAttendance = () => {
    records[editingIndex].name = name;
    setRecords([...records]);
    setEditingIndex(null);
    setName("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Attendance Management</h2>

      <input
        placeholder="Student name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {editingIndex === null ? (
        <button onClick={addAttendance}>Add</button>
      ) : (
        <button onClick={updateAttendance}>Update</button>
      )}

      <table border="1" width="100%" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {records.map((r, i) => (
            <tr key={i}>
              <td>{r.name}</td>
              <td>{r.status}</td>
              <td>
                <button onClick={() => editAttendance(i)}>Edit</button>
                <button onClick={() => deleteAttendance(i)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
