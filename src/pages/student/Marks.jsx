const Marks = () => {
  const marks = [
    { subject: "Math", score: 90 },
    { subject: "Science", score: 85 },
  ];

  return (
    <div>
      <h2>Marks</h2>
      {marks.map((m, i) => (
        <p key={i}>{m.subject}: {m.score}</p>
      ))}
    </div>
  );
};

export default Marks;
