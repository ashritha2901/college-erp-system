const FacultyAttendance = () => {
  const students = [
    { name: "John", attendance: "90%" },
    { name: "Sara", attendance: "85%" },
    { name: "Alex", attendance: "92%" },
  ];

  return (
    <div>
      <h3>Student Attendance</h3>

      <table border="1" width="60%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Attendance</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s, i) => (
            <tr key={i}>
              <td>{s.name}</td>
              <td>{s.attendance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacultyAttendance;
