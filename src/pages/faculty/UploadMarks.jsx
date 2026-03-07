import { useState } from "react";

const UploadMarks = () => {
  const [name, setName] = useState("");
  const [marks, setMarks] = useState("");
  const [records, setRecords] = useState([]);

  const upload = () => {
    setRecords([...records, { name, marks }]);
    setName("");
    setMarks("");
  };

  return (
    <div>
      <h3>Upload Marks</h3>

      <input
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Marks"
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
      />

      <button onClick={upload}>Upload</button>

      <ul>
        {records.map((r, i) => (
          <li key={i}>
            {r.name} - {r.marks}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadMarks;
