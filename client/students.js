const url = "http://localhost:8000/api/univer";
var isNew = false;

/**
 * @function
 * @async
 * @param {string} id
 */
async function prepareToEdit(id) {
  sessionStorage.setItem("student_id", id);

  await getById(id, true);
}

/**
 * @function
 * @param {string} id
 */
function showGrades(id) {
  sessionStorage.setItem("student_id", id);
  window.location.href = `grades.html`;
}

/**
 * @function
 * @async
 */
async function enterData() {
  if (isNew) await addStudent();
  else {
    const id = sessionStorage.getItem("student_id");
    await updateStudent(id);
    //console.log(1, id);
  }
  await getAll();
}

function cancel() {
  const wrapper = document.querySelector("#editModalWrapper");
  wrapper.style = "display:none";
  document.body.style = "overflow:auto";
  wrapper.querySelectorAll("input").forEach((val) => {
    val.classList.remove("error");
  });
}

async function studentInfo(id) {
  console.log(id);
  await getById(id, false);
}

// Get All Students.
const getAll = async () => {
  const response = await fetch(url);

  if (response.ok) {
    const students = await response.json();
    const table = document.querySelector("#tab").querySelector("tbody");
    table.innerHTML = "";

    students.forEach((student) => {
      const elTr = document.createElement("tr");
      elTr.innerHTML = `
                        <td onclick="studentInfo('${student._id}')">${student.name}</td>
                        <td onclick="studentInfo('${student._id}')">${student.faculty}</td>
                        <td><div onclick="showGrades('${student._id}')">Grades</div></td>
                        <td><div onclick="prepareToEdit('${student._id}')">Edit</div></td>
                        <td><div class="danger" onclick="deleteStudent('${student._id}')">Delete</div></td>
                    `;
      table.append(elTr);
    });
  }
};

/**
 * @async
 * @function
 * @constant
 * @description Get By Id.
 * @param {string} id
 * @param {boolean} [isEdit]
 */
const getById = async (id, isEdit = false) => {
  const response = await fetch(`${url}/${id}`);

  if (response.ok) {
    const wrapper = document.querySelector("#editModalWrapper");
    const header = wrapper.querySelector("header");
    wrapper.style = "display:flex";
    document.body.style = "overflow:hidden";

    wrapper.querySelectorAll("input").forEach((val) => {
      val.disabled = !isEdit;
    });

    if (isEdit) {
      header.innerText = "Edit";
      wrapper.classList.remove("view");
    } else {
      header.innerText = "View";
      wrapper.classList.add("view");
    }

    const student = await response.json();

    document.getElementById("name").value = student.name;
    document.getElementById("faculty").value = student.faculty;
    document.getElementById("birthday").value = student?.birthday
      ? new Date(student.birthday).toISOString().split("T")[0]
      : "";
  }
};

/**
 * @function
 * @param {HTMLElement} entity
 * @param {boolean|null} [isValid]
 */
function validateField(entities = []) {
  let isValid = null;

  /**
   * @function
   * @private
   * @param {HTMLElement} entity
   */
  function _validate(entity) {
    if (entity.value.length) {
      if (isValid === null) {
        isValid = true;
      }
      entity.classList.remove("error");
    } else {
      isValid = false;
      entity.classList.add("error");
    }
  }

  entities.forEach((entity) => _validate(entity));
  return isValid;
}

// Add A new Student
const addStudent = async () => {
  const name = document.getElementById("name");
  const faculty = document.getElementById("faculty");
  const birthday = document.getElementById("birthday");
  
  if (!validateField([name, faculty, birthday])) {
    console.log("error");
    return false;
  }

  const newStudent = {
    name: name.value,
    faculty: faculty.value,
    birthday: birthday.value,
  };

  const response = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newStudent),
  });

  if (response.ok) {
    console.log("Added successfully");
    cancel();
  } else console.log("Error");

  isNew = false;
};

// Update a Student
const updateStudent = async (id) => {
  const name = document.getElementById("name");
  const faculty = document.getElementById("faculty");
  const birthday = document.getElementById("birthday");

  if (!validateField([name, faculty, birthday])) {
    console.log("error");
    return false;
  }

  const updatedStudent = {
    name: name.value,
    faculty: faculty.value,
    birthday: birthday.value
  };

  const response = await fetch(`${url}/${id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedStudent)
  });
  console.log(updatedStudent);

  if (response.ok) {
    console.log("Updeted successfully");
    cancel();
  } else console.log("Error");
};

// Delete an Existing student
const deleteStudent = async (id) => {
  console.log(id);
  const response = await fetch(`${url}/${id}`, {
    method: "delete",
  });

  if (response.ok) {
    alert("You deleted the Student");
    console.log("Deleted successfully");
    await getAll();
  } else console.log("Error");
};

function addData() {
  isNew = true;
  const wrapper = document.querySelector("#editModalWrapper");

  wrapper.querySelector("header").innerText = "New Student";
  wrapper.style = "display:flex";
  document.body.style = "overflow:hidden";

  wrapper.querySelectorAll("input").forEach((val) => {
    val.value = "";
    val.disabled = false;
  });
}
