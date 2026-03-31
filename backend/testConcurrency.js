const axios = require("axios");

const URL = "http://localhost:5000/student/register";

const requests = [];

for (let i = 0; i < 20; i++) {
  requests.push(
    axios.post(URL, {
      roll: "101",                 // ✅ required
      name: "Swetha",              // ✅ required
      email: "swetha@test.com",    // ✅ required
      courseId: "CS101"            // (if your schema uses it)
    }).catch(err => err.response.data)
  );
}

Promise.all(requests).then(responses => {
  console.log("Results:");
  responses.forEach((res, i) => {
    console.log(i + 1, res.data || res);
  });
});