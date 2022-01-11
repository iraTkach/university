const urlGrades = "http://localhost:8000/api/grades";
const url = "http://localhost:8000/api/univer";
var isNew = false;

function home() {
  window.location.replace("students.html");
}

function cancel() {
  const wrapper = document.querySelector("#editModalWrapper");
  wrapper.style = "display:none";
  document.body.style = "overflow:auto";
  wrapper.querySelectorAll("input").forEach((val) => {
    val.classList.remove("error") ;
  });
}

async function enterData() {
  const id = sessionStorage.getItem("student_id");

  if (isNew) await addGrade();
  else {
    await updateGrade();
  }
  await getAll();

}

// Get Grade By Id.
const getStudentById = async (id) => {
  const response = await fetch(`${url}/${id}`);

  if (response.ok) {
    
    const student = await response.json();

    document.querySelector( "#userInfo span"
    ).innerHTML = `Grades of <i><b>${student.name}</b></i>`;
   
  }
};

//Get all grades
const getAll = async () => {
    
    const student_id = sessionStorage.getItem("student_id");
    await getStudentById(student_id);
  
    const response = await fetch( `${urlGrades}/student/${student_id}`);
  
    if (response.ok) {
      const grades = await response.json();
      const table = document.querySelector("#tab").querySelector("tbody");
      table.innerHTML = "";
  
      grades.forEach((grade) => {
        const elTr = document.createElement("tr");
        elTr.innerHTML = `
                          <td>${grade.subject}</td>
                          <td>${grade.grade}</td>
                          <td>${new Date(grade.date).toLocaleDateString()}</td>
                          <td><div onclick="getGradeById('${grade._id}', true)">Edit</div></td>
                          <td><div class="danger" onclick="deleteGrade('${grade._id}')">Delete</div></td>
  
                      `;
        table.append(elTr);
      });
    }
  };

const getGradeById = async (id, isEdit = false) => {
  const response = await fetch(`${urlGrades}/${id}`);

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

    const grade = await response.json();

    document.getElementById("subject").value = grade.subject;
    document.getElementById("grade").value = grade.grade;
    document.getElementById("grade_id").value = id;
    document.getElementById("date").value = grade?.date
      ? new Date(grade.date).toISOString().split("T")[0]
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

// Add A new Grade
const addGrade = async () => {
  const student_id = sessionStorage.getItem("student_id");
  const subject = document.getElementById("subject");
  const grade = document.getElementById("grade");
  const date = document.getElementById("date");
    
  if (!validateField([subject, grade, date])) {
    console.log("error");
    return false;
  }
  
  const newGrade = {
    student_id: student_id,
    subject: subject.value,
    grade: grade.value,
    date: date.value
  };
  console.log(newGrade);
  const response = await fetch(urlGrades, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newGrade),
  });

  if (response.ok) {
    console.log("Added successfully");
    cancel();
  } else console.log("Error");

  isNew = false;
};

// Update a Grade
const updateGrade = async () => {
  const student_id = sessionStorage.getItem("student_id");
  const subject = document.getElementById("subject");
  const grade = document.getElementById("grade");
  const date = document.getElementById("date");
  const id = document.getElementById("grade_id");

  if (!validateField([subject, grade, date])) {
    console.log("error");
    return false;
  }

  const updatedGrade = {
    student_id: student_id,
    subject: subject.value,
    grade: +grade.value,
    date: date.value
  };

  const response = await fetch(`${urlGrades}/${id.value}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedGrade)
  });
  //console.log(updatedGrade);

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    //console.log(response, "Updeted successfully!!");
    
    cancel();
  } else console.log("Error");
};

// Delete an Existing student
const deleteGrade = async (id) => {
  console.log(id);
  const response = await fetch(`${urlGrades}/${id}`, {
    method: "delete",
  });

  if (response.ok) {
    alert("You deleted the Grade");
    console.log("Deleted successfully");
    await getAll();
  } else console.log("Error");
};

function addData() {
  isNew = true;
  const wrapper = document.querySelector("#editModalWrapper");
  
  wrapper.querySelector("header").innerText = "New Grade";
  wrapper.style = "display:flex";
  document.body.style = "overflow:hidden";

  wrapper.querySelectorAll("input").forEach((val) => {
    val.value = "";
    val.disabled = false;
  });
  wrapper.querySelector("#date").value = new Date().toISOString().slice(0, 10)
  ;

}