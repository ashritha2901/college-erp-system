import React, { useState } from 'react';
import './AdminModule.css';

// Dummy data
const usersData = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@college.edu', role: 'Student', department: 'Computer Science' },
  { id: 2, name: 'Dr. Robert Smith', email: 'robert@college.edu', role: 'Faculty', department: 'Computer Science' },
  { id: 3, name: 'Michael Brown', email: 'michael@college.edu', role: 'Student', department: 'Electronics' },
  { id: 4, name: 'Prof. Emily Davis', email: 'emily@college.edu', role: 'Faculty', department: 'Mechanical' },
  { id: 5, name: 'Admin User', email: 'admin@college.edu', role: 'Admin', department: 'Administration' },
];

const coursesData = [
  { id: 1, name: 'Data Structures', code: 'CS301', department: 'Computer Science' },
  { id: 2, name: 'Operating Systems', code: 'CS302', department: 'Computer Science' },
  { id: 3, name: 'Digital Electronics', code: 'EC201', department: 'Electronics' },
  { id: 4, name: 'Thermodynamics', code: 'ME101', department: 'Mechanical' },
];

const AdminModule = () => {
  const [activeTab, setActiveTab] = useState('addStudent');

  return (
    <div className="admin-module">
      <div className="module-tabs">
        <button
          className={activeTab === 'addStudent' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('addStudent')}
        >
          ➕ Add Student
        </button>
        <button
          className={activeTab === 'addFaculty' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('addFaculty')}
        >
          👨‍🏫 Add Faculty
        </button>
        <button
          className={activeTab === 'assignCourses' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('assignCourses')}
        >
          📚 Assign Courses
        </button>
        <button
          className={activeTab === 'viewUsers' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('viewUsers')}
        >
          👥 View All Users
        </button>
      </div>

      <div className="module-content">
        {activeTab === 'addStudent' && <AddStudent />}
        {activeTab === 'addFaculty' && <AddFaculty />}
        {activeTab === 'assignCourses' && <AssignCourses />}
        {activeTab === 'viewUsers' && <ViewUsers />}
      </div>
    </div>
  );
};

// Add Student Component
const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rollNumber: '',
    department: '',
    semester: '',
    dateOfBirth: '',
    address: '',
    guardianName: '',
    guardianPhone: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Student Data:', formData);
    alert('Student added successfully!');
    // TODO: Call API to add student
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      rollNumber: '',
      department: '',
      semester: '',
      dateOfBirth: '',
      address: '',
      guardianName: '',
      guardianPhone: '',
    });
  };

  return (
    <div className="add-student">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@college.edu"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth *</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Academic Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="rollNumber">Roll Number *</label>
              <input
                type="text"
                id="rollNumber"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                placeholder="CSE2021001"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department *</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electronics">Electronics</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="semester">Semester *</label>
              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                required
              >
                <option value="">Select Semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street, City, State"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Guardian Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="guardianName">Guardian Name *</label>
              <input
                type="text"
                id="guardianName"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                placeholder="Enter guardian name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="guardianPhone">Guardian Phone *</label>
              <input
                type="tel"
                id="guardianPhone"
                name="guardianPhone"
                value={formData.guardianPhone}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Add Student
        </button>
      </form>
    </div>
  );
};

// Add Faculty Component
const AddFaculty = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    employeeId: '',
    department: '',
    designation: '',
    qualification: '',
    specialization: '',
    experience: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Faculty Data:', formData);
    alert('Faculty added successfully!');
    // TODO: Call API to add faculty
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      employeeId: '',
      department: '',
      designation: '',
      qualification: '',
      specialization: '',
      experience: '',
    });
  };

  return (
    <div className="add-faculty">
      <h2>Add New Faculty</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Dr. John Smith"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="faculty@college.edu"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="employeeId">Employee ID *</label>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                placeholder="FAC2024001"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Professional Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="department">Department *</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electronics">Electronics</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="designation">Designation *</label>
              <select
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              >
                <option value="">Select Designation</option>
                <option value="Professor">Professor</option>
                <option value="Associate Professor">Associate Professor</option>
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Lecturer">Lecturer</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="qualification">Highest Qualification *</label>
              <input
                type="text"
                id="qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="Ph.D., M.Tech, etc."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="specialization">Specialization *</label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="Machine Learning, VLSI, etc."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="experience">Experience (Years) *</label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                min="0"
                placeholder="10"
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Add Faculty
        </button>
      </form>
    </div>
  );
};

// Assign Courses Component
const AssignCourses = () => {
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);

  const facultyMembers = usersData.filter((user) => user.role === 'Faculty');

  const handleCourseToggle = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedFaculty) {
      alert('Please select a faculty member');
      return;
    }

    if (selectedCourses.length === 0) {
      alert('Please select at least one course');
      return;
    }

    const assignmentData = {
      facultyId: selectedFaculty,
      courseIds: selectedCourses,
    };

    console.log('Course Assignment:', assignmentData);
    alert('Courses assigned successfully!');
    // TODO: Call API to assign courses

    setSelectedFaculty('');
    setSelectedCourses([]);
  };

  return (
    <div className="assign-courses">
      <h2>Assign Courses to Faculty</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="faculty">Select Faculty Member *</label>
          <select
            id="faculty"
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            required
          >
            <option value="">Choose a faculty...</option>
            {facultyMembers.map((faculty) => (
              <option key={faculty.id} value={faculty.id}>
                {faculty.name} - {faculty.department}
              </option>
            ))}
          </select>
        </div>

        <div className="courses-selection">
          <h3>Select Courses</h3>
          <div className="courses-grid">
            {coursesData.map((course) => (
              <div
                key={course.id}
                className={`course-card ${selectedCourses.includes(course.id) ? 'selected' : ''}`}
                onClick={() => handleCourseToggle(course.id)}
              >
                <input
                  type="checkbox"
                  checked={selectedCourses.includes(course.id)}
                  onChange={() => handleCourseToggle(course.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="course-info">
                  <h4>{course.name}</h4>
                  <p className="course-code">{course.code}</p>
                  <p className="course-dept">{course.department}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Assign Courses
        </button>
      </form>
    </div>
  );
};

// View Users Component
const ViewUsers = () => {
  const [filterRole, setFilterRole] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = usersData.filter((user) => {
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      console.log('Deleting user:', userId);
      alert('User deleted successfully!');
      // TODO: Call API to delete user
    }
  };

  return (
    <div className="view-users">
      <h2>All Users</h2>

      <div className="filter-section">
        <div className="form-group">
          <label htmlFor="roleFilter">Filter by Role</label>
          <select
            id="roleFilter"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="Student">Students</option>
            <option value="Faculty">Faculty</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="search">Search Users</label>
          <input
            type="text"
            id="search"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>{user.department}</td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-btn" title="Edit">
                      ✏️
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(user.id)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="no-results">
          <p>No users found</p>
        </div>
      )}
    </div>
  );
};

export default AdminModule;
