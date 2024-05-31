## University Management System

### Functional Requirement Analysis

1. **Authentication**
   1. **Student**
      1. Students can log in and log out securely.
      2. Students can update their password.
   2. **Faculty**
      1. Faculty can log in and log out securely.
      2. Faculty can update their password.
   3. **Admin**:
      1. Admin can log in and log out securely.
      2. Admin can update their password.
2. **Profile Management:**
   1. **Student**
      1. Students can manage and update their profile.
      2. Students can update certain fields.
   2. **Faculty**:
      1. Faculty can manage and update their profile.
      2. Faculty can update certain fields.
   3. **Admin**:
      1. Admin can manage and update their profile.
      2. Admin can update certain fields.
3. **Academic Process**:
   1. Student:
      1. Students can enroll in offered courses for a specific semester.
      2. Students can view their class schedule.
      3. Students can see their grades.
      4. Students can view notice boards and events.
   2. Faculty:
      1. Faculty can manage student grades.
      2. Faculty can access student’s personal and academic information.
   3. Admin:
      1. Admin can manage multiple processes:
         1. Semester.
         2. Course.
         3. Offered Course.
         4. Section.
         5. Room.
         6. Building.
4. **User Management:**
   1. Admin:
      1. Admins can manage multiple accounts.
      2. Admin can block/unblock users.
      3. Admin can change user passwords.

## **Data Model**

**User:**

- \_id
- id (generated)
- password
- needsPasswordChange
- role
- status
- isDeleted
- createdAt
- updatedAt

**Student:**

- \_id
- id (generated)
- name
- gender
- dateOfBirth
- email
- contactNo
- emergencyContactNo
- presentAddress
- permanentAddress
- guardian
- localGuardian
- profileImage
- admissionSemester
- isDeleted
- createdAt
- updatedAt

**Faculty:**

- \_id
- id (generated)
- designation
- name
- gender
- dateOfBirth
- email
- contactNo
- emergencyContactNo
- presentAddress
- permanentAddress
- profileImage
- academicFaculty
- academicDepartment
- isDeleted
- createdAt
- updatedAt

**Admin:**

- \_id
- id (generated)
- designation
- name
- gender
- dateOfBirth
- email
- contactNo
- emergencyContactNo
- presentAddress
- permanentAddress
- profileImage
- managementDepartment
- isDeleted
- createdAt
- updatedAt

**Academic Semester:**

- \_id
- name
- year
- code
- startMonth
- endMonth
- createdAt
- updatedAt

**Academic Faculty**:

- \_id
- name
- createdAt
- updatedAt

**Academic Department**:

- \_id
- name
- academicFaculty
- createdAt
- updatedAt

## **API Endpoints**

**User:**

- users/create-student (POST)
- users/create-faculty (POST)
- users/create-admin (POST)

**Student:**

- students (GET)
- students/:id (GET)
- students/:id (PATCH)
- students/:id (DELETE)
- students/my-profile

**Faculty:**

- faculties(GET)
- faculties/:id (GET)
- faculties/:id (PATCH)
- faculties/:id (DELETE)
- faculties/my-profile

**Admin:**

- admins (GET)
- admins /:id (GET)
- admins /:id (PATCH)
- admins /:id (DELETE)
- admins /my-profile

**Auth:**

- auth/login
- auth/refresh-token
- auth/change-password
- auth/forgot-password
- auth/reset-password

## ER Diagram

![ER Diagram](https://raw.githubusercontent.com/Apollo-Level2-Web-Dev/Level2-Batch-3-PH-university-server/part-2/ER_Diagram2.png)
![ER Diagram](https://raw.githubusercontent.com/Apollo-Level2-Web-Dev/Level2-Batch-3-PH-university-server/part-1/ER_Diagram.png)

<!-- New topic => What Is Error Handling -->
