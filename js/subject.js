// document.addEventListener("DOMContentLoaded", () => {
//     const buttonAddCategory = document.getElementById("buttonAddCategory");
//     const formCategory = document.getElementById("formCategory");
//     const btnCloseFormCategory = document.getElementById("btnCloseFormCategory");
//     const btnAddSubject = document.getElementById("btnAddSubject");
//     const subjectTableBody = document.querySelector(".category-table tbody");
//     const subjectNameError = document.getElementById("subjectNameError");
//     const searchInput = document.querySelector(".input-search");
//     const pageNumbersContainer = document.querySelector(".page-numbers");
//     const buttonPrev = document.querySelector(".button-prev");
//     const buttonNext = document.querySelector(".button-next");

//     let currentPage = 1;
//     const rowsPerPage = 5;
//     let subjects = [
//         {
//             id: 1,
//             name: "Lập trình C",
//             status: "active"
//         },
//         {
//             id: 2,
//             name: "Lập trình Frontend với ReactJS",
//             status: "inactive"
//         },
//         {
//             id: 3,
//             name: "Lập trình Backend với Spring Boot",
//             status: "active"
//         },
//         {
//             id: 4,
//             name: "Lập trình Frontend với VueJS",
//             status: "inactive"
//         },
//         {
//             id: 5,
//             name: "Cấu trúc dữ liệu và giải thuật",
//             status: "inactive"
//         },
//         {
//             id: 6,
//             name: "Phân tích và thiết kế hệ thống",
//             status: "inactive"
//         },
//         {
//             id: 7,
//             name: "Toán cao cấp",
//             status: "active" },
//         {
//             id: 8,
//             name: "Tiếng Anh chuyên ngành",
//             status: "inactive"
//         },
//     ];

//     const renderTable = () => {
//         if (!subjectTableBody) return;
//         subjectTableBody.innerHTML = "";
//         const start = (currentPage - 1) * rowsPerPage;
//         const end = start + rowsPerPage;
//         const visibleSubjects = subjects.filter((subject, index) => index >= start && index < end);

//         visibleSubjects.forEach((subject) => {
//             const newRow = createSubjectRow(subject);
//             subjectTableBody.appendChild(newRow);
//         });
//         setupEventListeners();
//     };

//     const createSubjectRow = (subject) => {
//         const newRow = document.createElement("tr");
//         newRow.innerHTML = `
//             <td>${subject.id}</td>
//             <td>${subject.name}</td>
//             <td>${getStatusCellHtml(subject.status)}</td>
//             <td class="all">
//                 <img class="delete-button" src="../assets/public/icons/icon_14.png" alt="">
//                 <img class="edit-button" src="../assets/public/icons/icon_15.png" alt="">
//             </td>
//         `;
//         return newRow;
//     };

//     const getStatusCellHtml = (status) => {
//         const isActive = status === "active";
//         return `
//             <div class="status ${isActive ? "status-active" : "status-inactive"}">
//                 <img src="../assets/public/icons/${isActive ? "icon_19.png" : "icon_20.png"}" alt="">
//                 <span>${isActive ? "Đang hoạt động" : "Ngừng hoạt động"}</span>
//             </div>
//         `;
//     };

//     const setupEventListeners = () => {
//         if (!subjectTableBody) return;
//         subjectTableBody.querySelectorAll(".delete-button").forEach(button => {
//             button.onclick = () => deleteSubject(button.closest("tr"));
//         });
//         subjectTableBody.querySelectorAll(".edit-button").forEach(button => {
//             button.onclick = () => editSubject(button.closest("tr"));
//         });
//     };

//     const deleteSubject = (row) => {
//         if (confirm("Bạn có chắc chắn muốn xóa môn học này?")) {
//             const id = parseInt(row.children[0].textContent);
//             subjects = subjects.filter(subject => subject.id !== id);
//             renderTable();
//             updatePagination();
//         }
//     };

//     const editSubject = (row) => {
//         const id = parseInt(row.children[0].textContent);
//         const subject = subjects.find(subject => subject.id === id);
//         if (subject) {
//             document.getElementById("subjectName").value = subject.name;
//             document.querySelector(`input[name="status"][value="${subject.status}"]`).checked = true;
//             formCategory.dataset.editingId = id;
//             openForm();
//         }
//     };

//     const updateSubject = (id, name, status) => {
//         subjects = subjects.map(subject => {
//             if (subject.id === id) {
//                 return { ...subject, name, status };
//             }
//             return subject;
//         });
//     };

//     const addSubject = () => {
//         const subjectName = document.getElementById("subjectName").value.trim();
//         const status = document.querySelector('input[name="status"]:checked').value;
//         if (!subjectName) {
//             subjectNameError.textContent = "Vui lòng nhập tên môn học.";
//             subjectNameError.style.display = "block";
//             return;
//         } else {
//             subjectNameError.style.display = "none";
//         }
//         if (formCategory.dataset.editingId) {
//             updateSubject(parseInt(formCategory.dataset.editingId), subjectName, status);
//             formCategory.dataset.editingId = null;
//         } else {
//             const newId = subjects.length > 0 ? Math.max(...subjects.map(s => s.id)) + 1 : 1;
//             subjects.push({ id: newId, name: subjectName, status });
//         }
//         closeForm();
//         renderTable();
//         updatePagination();
//         filterSubjects();
//     };

//     const filterSubjects = () => {
//         const searchTerm = searchInput.value.trim().toLowerCase();
//         const filteredSubjects = subjects.filter(subject => subject.name.toLowerCase().includes(searchTerm));
//         renderTable();
//         updatePagination(filteredSubjects.length);
//     };

//     const updatePagination = (totalItems = subjects.length) => {
//         const totalPages = Math.ceil(totalItems / rowsPerPage);
//         pageNumbersContainer.innerHTML = "";
//         for (let i = 1; i <= totalPages; i++) {
//             const pageButton = document.createElement("button");
//             pageButton.textContent = i;
//             pageButton.className = "button-number";
//             if (i === currentPage) pageButton.classList.add("active");
//             pageButton.onclick = () => {
//                 currentPage = i;
//                 renderTable();
//                 updatePagination();
//             };
//             pageNumbersContainer.appendChild(pageButton);
//         }
//         buttonPrev.disabled = currentPage === 1;
//         buttonNext.disabled = currentPage === totalPages;
//     };

//     const openForm = () => {
//         formCategory.style.display = "flex";
//         document.getElementById("subjectName").value = "";
//     };

//     const closeForm = () => {
//         formCategory.style.display = "none";
//     };

//     buttonAddCategory.onclick = openForm;
//     btnCloseFormCategory.onclick = closeForm;
//     btnAddSubject.onclick = addSubject;
//     searchInput.addEventListener("input", filterSubjects);
//     buttonPrev.onclick = () => { if (currentPage > 1) currentPage--; renderTable(); updatePagination(); };
//     buttonNext.onclick = () => { if (currentPage < Math.ceil(subjects.length / rowsPerPage)) currentPage++; renderTable(); updatePagination(); };

//     renderTable();
//     updatePagination();
// });

// document.addEventListener("DOMContentLoaded", () => {
//     const buttonAddCategory = document.getElementById("buttonAddCategory");
//     const formCategory = document.getElementById("formCategory");
//     const btnCloseFormCategory = document.getElementById("btnCloseFormCategory");
//     const btnAddSubject = document.getElementById("btnAddSubject");
//     const subjectTableBody = document.querySelector(".category-table tbody");
//     const subjectNameError = document.getElementById("subjectNameError");
//     const searchInput = document.querySelector(".input-search");
//     const pageNumbersContainer = document.querySelector(".page-numbers");
//     const buttonPrev = document.querySelector(".button-prev");
//     const buttonNext = document.querySelector(".button-next");
//     const selectFilter = document.querySelector(".select"); //Thêm select filter

//     let currentPage = 1;
//     const rowsPerPage = 5;
//     let subjects = [
//         { id: 1, name: "Lập trình C", status: "active" },
//         { id: 2, name: "Lập trình Frontend với ReactJS", status: "inactive" },
//         { id: 3, name: "Lập trình Backend với Spring Boot", status: "active" },
//         { id: 4, name: "Lập trình Frontend với VueJS", status: "inactive" },
//         { id: 5, name: "Cấu trúc dữ liệu và giải thuật", status: "inactive" },
//         { id: 6, name: "Phân tích và thiết kế hệ thống", status: "inactive" },
//         { id: 7, name: "Toán cao cấp", status: "active" },
//         { id: 8, name: "Tiếng Anh chuyên ngành", status: "inactive" },
//     ];
//     let filteredSubjects = [...subjects]; //Thêm filteredSubjects

//     const renderTable = () => {
//         if (!subjectTableBody) return;
//         subjectTableBody.innerHTML = "";
//         const start = (currentPage - 1) * rowsPerPage;
//         const end = start + rowsPerPage;
//         const visibleSubjects = filteredSubjects.filter((subject, index) => index >= start && index < end);

//         visibleSubjects.forEach((subject) => {
//             const newRow = createSubjectRow(subject);
//             subjectTableBody.appendChild(newRow);
//         });
//         setupEventListeners();
//     };

//     const createSubjectRow = (subject) => {
//         const newRow = document.createElement("tr");
//         newRow.innerHTML = `
//             <td>${subject.id}</td>
//             <td>${subject.name}</td>
//             <td>${getStatusCellHtml(subject.status)}</td>
//             <td class="all">
//                 <img class="delete-button" src="../assets/public/icons/icon_14.png" alt="">
//                 <img class="edit-button" src="../assets/public/icons/icon_15.png" alt="">
//             </td>
//         `;
//         return newRow;
//     };

//     const getStatusCellHtml = (status) => {
//         const isActive = status === "active";
//         return `
//             <div class="status ${isActive ? "status-active" : "status-inactive"}">
//                 <img src="../assets/public/icons/${isActive ? "icon_19.png" : "icon_20.png"}" alt="">
//                 <span>${isActive ? "Đang hoạt động" : "Ngừng hoạt động"}</span>
//             </div>
//         `;
//     };

//     const setupEventListeners = () => {
//         if (!subjectTableBody) return;
//         subjectTableBody.querySelectorAll(".delete-button").forEach(button => {
//             button.onclick = () => deleteSubject(button.closest("tr"));
//         });
//         subjectTableBody.querySelectorAll(".edit-button").forEach(button => {
//             button.onclick = () => editSubject(button.closest("tr"));
//         });
//     };

//     const deleteSubject = (row) => {
//         if (confirm("Bạn có chắc chắn muốn xóa môn học này?")) {
//             const id = parseInt(row.children[0].textContent);
//             subjects = subjects.filter(subject => subject.id !== id);
//             filterSubjects(); //Gọi filterSubjects để cập nhật filteredSubjects
//         }
//     };

//     const editSubject = (row) => {
//         const id = parseInt(row.children[0].textContent);
//         const subject = subjects.find(subject => subject.id === id);
//         if (subject) {
//             document.getElementById("subjectName").value = subject.name;
//             document.querySelector(`input[name="status"][value="${subject.status}"]`).checked = true;
//             formCategory.dataset.editingId = id;
//             openForm();
//         }
//     };

//     const updateSubject = (id, name, status) => {
//         subjects = subjects.map(subject => {
//             if (subject.id === id) {
//                 return { ...subject, name, status };
//             }
//             return subject;
//         });
//     };

//     const addSubject = () => {
//         const subjectName = document.getElementById("subjectName").value.trim();
//         const status = document.querySelector('input[name="status"]:checked').value;
//         if (!subjectName) {
//             subjectNameError.textContent = "Vui lòng nhập tên môn học.";
//             subjectNameError.style.display = "block";
//             return;
//         } else {
//             subjectNameError.style.display = "none";
//         }
//         if (formCategory.dataset.editingId) {
//             updateSubject(parseInt(formCategory.dataset.editingId), subjectName, status);
//             formCategory.dataset.editingId = null;
//         } else {
//             const newId = subjects.length > 0 ? Math.max(...subjects.map(s => s.id)) + 1 : 1;
//             subjects.push({ id: newId, name: subjectName, status });
//         }
//         closeForm();
//         filterSubjects(); //Gọi filterSubjects để cập nhật filteredSubjects
//     };

//     const filterSubjects = () => {
//         const searchTerm = searchInput.value.trim().toLowerCase();
//         const filterStatus = selectFilter.value;

//         filteredSubjects = subjects.filter(subject => {
//             const nameMatch = subject.name.toLowerCase().includes(searchTerm);
//             const statusMatch = filterStatus === "" || subject.status === filterStatus;
//             return nameMatch && statusMatch;
//         });
//         currentPage = 1;
//         renderTable();
//         updatePagination();
//     };

//     const updatePagination = () => {
//         const totalPages = Math.ceil(filteredSubjects.length / rowsPerPage);
//         pageNumbersContainer.innerHTML = "";
//         for (let i = 1; i <= totalPages; i++) {
//             const pageButton = document.createElement("button");
//             pageButton.textContent = i;
//             pageButton.className = "button-number";
//             if (i === currentPage) pageButton.classList.add("active");
//             pageButton.onclick = () => {
//                 currentPage = i;
//                 renderTable();
//                 updatePagination();
//             };
//             pageNumbersContainer.appendChild(pageButton);
//         }
//         buttonPrev.disabled = currentPage === 1;
//         buttonNext.disabled = currentPage === totalPages;
//     };

//     const openForm = () => {
//         formCategory.style.display = "flex";
//         document.getElementById("subjectName").value = "";
//     };

//     const closeForm = () => {
//         formCategory.style.display = "none";
//     };

//     buttonAddCategory.onclick = openForm;
//     btnCloseFormCategory.onclick = closeForm;
//     btnAddSubject.onclick = addSubject;
//     searchInput.addEventListener("input", filterSubjects);
//     selectFilter.addEventListener("change", filterSubjects); //Thêm sự kiện change
//     buttonPrev.onclick = () => { if (currentPage > 1) currentPage--; renderTable(); updatePagination(); };
//     buttonNext.onclick = () => { if (currentPage < Math.ceil(filteredSubjects.length / rowsPerPage)) currentPage++; renderTable(); updatePagination(); };

//     renderTable();
//     updatePagination();
// });

// document.addEventListener("DOMContentLoaded", () => {
//     const buttonAddCategory = document.getElementById("buttonAddCategory");
//     const formCategory = document.getElementById("formCategory");
//     const btnCloseFormCategory = document.getElementById("btnCloseFormCategory");
//     const btnAddSubject = document.getElementById("btnAddSubject");
//     const subjectTableBody = document.querySelector(".category-table tbody");
//     const subjectNameError = document.getElementById("subjectNameError");
//     const searchInput = document.querySelector(".input-search");
//     const pageNumbersContainer = document.querySelector(".page-numbers");
//     const buttonPrev = document.querySelector(".button-prev");
//     const buttonNext = document.querySelector(".button-next");
//     const selectFilter = document.querySelector(".select");
//     const sortByNameAsc = document.getElementById("sortByNameAsc");
//     // const sortByNameDesc = document.getElementById("sortByNameDesc");
//     // const sortByTimeAsc = document.getElementById("sortByTimeAsc");
//     // const sortByTimeDesc = document.getElementById("sortByTimeDesc");

//     let currentPage = 1;
//     const rowsPerPage = 5;
//     let subjects = [
//         { id: 1, name: "Lập trình C", status: "active", createdAt: "2023-11-20T10:00:00Z" },
//         { id: 2, name: "Lập trình Frontend với ReactJS", status: "inactive", createdAt: "2023-11-19T14:30:00Z" },
//         { id: 3, name: "Lập trình Backend với Spring Boot", status: "active", createdAt: "2023-11-21T09:15:00Z" },
//         { id: 4, name: "Lập trình Frontend với VueJS", status: "inactive", createdAt: "2023-11-18T16:45:00Z" },
//         { id: 5, name: "Cấu trúc dữ liệu và giải thuật", status: "inactive", createdAt: "2023-11-22T11:20:00Z" },
//         { id: 6, name: "Phân tích và thiết kế hệ thống", status: "inactive", createdAt: "2023-11-17T13:00:00Z" },
//         { id: 7, name: "Toán cao cấp", status: "active", createdAt: "2023-11-23T15:30:00Z" },
//         { id: 8, name: "Tiếng Anh chuyên ngành", status: "inactive", createdAt: "2023-11-16T10:45:00Z" },
//     ];
//     let filteredSubjects = [...subjects];

//     const renderTable = () => {
//         if (!subjectTableBody) return;
//         subjectTableBody.innerHTML = "";
//         const start = (currentPage - 1) * rowsPerPage;
//         const end = start + rowsPerPage;
//         const visibleSubjects = filteredSubjects.filter((subject, index) => index >= start && index < end);

//         visibleSubjects.forEach((subject) => {
//             const newRow = createSubjectRow(subject);
//             subjectTableBody.appendChild(newRow);
//         });
//         setupEventListeners();
//     };

//     const createSubjectRow = (subject) => {
//         const newRow = document.createElement("tr");
//         newRow.innerHTML = `
//             <td>${subject.id}</td>
//             <td>${subject.name}</td>
//             <td>${getStatusCellHtml(subject.status)}</td>
//             <td class="all">
//                 <img class="delete-button" src="../assets/public/icons/icon_14.png" alt="">
//                 <img class="edit-button" src="../assets/public/icons/icon_15.png" alt="">
//             </td>
//         `;
//         return newRow;
//     };

//     const getStatusCellHtml = (status) => {
//         const isActive = status === "active";
//         return `
//             <div class="status ${isActive ? "status-active" : "status-inactive"}">
//                 <img src="../assets/public/icons/${isActive ? "icon_19.png" : "icon_20.png"}" alt="">
//                 <span>${isActive ? "Đang hoạt động" : "Ngừng hoạt động"}</span>
//             </div>
//         `;
//     };

//     const setupEventListeners = () => {
//         if (!subjectTableBody) return;
//         subjectTableBody.querySelectorAll(".delete-button").forEach(button => {
//             button.onclick = () => deleteSubject(button.closest("tr"));
//         });
//         subjectTableBody.querySelectorAll(".edit-button").forEach(button => {
//             button.onclick = () => editSubject(button.closest("tr"));
//         });
//     };

//     const deleteSubject = (row) => {
//         if (confirm("Bạn có chắc chắn muốn xóa môn học này?")) {
//             const id = parseInt(row.children[0].textContent);
//             subjects = subjects.filter(subject => subject.id !== id);
//             filterSubjects();
//         }
//     };

//     const editSubject = (row) => {
//         const id = parseInt(row.children[0].textContent);
//         const subject = subjects.find(subject => subject.id === id);
//         if (subject) {
//             document.getElementById("subjectName").value = subject.name;
//             document.querySelector(`input[name="status"][value="${subject.status}"]`).checked = true;
//             formCategory.dataset.editingId = id;
//             openForm();
//         }
//     };

//     const updateSubject = (id, name, status) => {
//         subjects = subjects.map(subject => {
//             if (subject.id === id) {
//                 return { ...subject, name, status };
//             }
//             return subject;
//         });
//     };

//     const addSubject = () => {
//         const subjectName = document.getElementById("subjectName").value.trim();
//         const status = document.querySelector('input[name="status"]:checked').value;
//         if (!subjectName) {
//             subjectNameError.textContent = "Vui lòng nhập tên môn học.";
//             subjectNameError.style.display = "block";
//             return;
//         } else {
//             subjectNameError.style.display = "none";
//         }
//         if (formCategory.dataset.editingId) {
//             updateSubject(parseInt(formCategory.dataset.editingId), subjectName, status);
//             formCategory.dataset.editingId = null;
//         } else {
//             const newId = subjects.length > 0 ? Math.max(...subjects.map(s => s.id)) + 1 : 1;
//             subjects.push({ id: newId, name: subjectName, status, createdAt: new Date().toISOString() });
//         }
//         closeForm();
//         filterSubjects();
//     };

//     const filterSubjects = () => {
//         const searchTerm = searchInput.value.trim().toLowerCase();
//         const filterStatus = selectFilter.value;

//         filteredSubjects = subjects.filter(subject => {
//             const nameMatch = subject.name.toLowerCase().includes(searchTerm);
//             const statusMatch = filterStatus === "" || subject.status === filterStatus;
//             return nameMatch && statusMatch;
//         });
//         currentPage = 1;
//         renderTable();
//         updatePagination();
//     };

//     const updatePagination = () => {
//         const totalPages = Math.ceil(filteredSubjects.length / rowsPerPage);
//         pageNumbersContainer.innerHTML = "";
//         for (let i = 1; i <= totalPages; i++) {
//             const pageButton = document.createElement("button");
//             pageButton.textContent = i;
//             pageButton.className = "button-number";
//             if (i === currentPage) pageButton.classList.add("active");
//             pageButton.onclick = () => {
//                 currentPage = i;
//                 renderTable();
//                 updatePagination();
//             };
//             pageNumbersContainer.appendChild(pageButton);
//         }
//         buttonPrev.disabled = currentPage === 1;
//         buttonNext.disabled = currentPage === totalPages;
//     };

//     const openForm = () => {
//         formCategory.style.display = "flex";
//         document.getElementById("subjectName").value = "";
//     };

//     const closeForm = () => {
//         formCategory.style.display = "none";
//     };

//     const sortSubjectsByName = (order = 'asc') => {
//         filteredSubjects.sort((a, b) => {
//             const nameA = a.name.toUpperCase();
//             const nameB = b.name.toUpperCase();
//             if (order === 'asc') {
//                 if (nameA < nameB) return -1;
//                 if (nameA > nameB) return 1;
//             } else {
//                 if (nameA < nameB) return 1;
//                 if (nameA > nameB) return -1;
//             }
//             return 0;
//         });
//         renderTable();
//         updatePagination();
//     };

//     // const sortSubjectsByTime = (order = 'asc') => {
//     //     filteredSubjects.sort((a, b) => {
//     //         const timeA = new Date(a.createdAt);
//     //         const timeB = new Date(b.createdAt);
//     //         if (order === 'asc') {
//     //             return timeA - timeB;
//     //         } else {
//     //             return timeB - timeA;
//     //         }
//     //     });
//     //     renderTable();
//     //     updatePagination();
//     // };

//     buttonAddCategory.onclick = openForm;
//     btnCloseFormCategory.onclick = closeForm;
//     btnAddSubject.onclick = addSubject;
//     searchInput.addEventListener("input", filterSubjects);
//     selectFilter.addEventListener("change", filterSubjects);
//     buttonPrev.onclick = () => { if (currentPage > 1) currentPage--; renderTable(); updatePagination(); };
//     buttonNext.onclick = () => { if (currentPage < Math.ceil(filteredSubjects.length / rowsPerPage)) currentPage++; renderTable(); updatePagination(); };
//     sortByNameAsc.addEventListener("click", () => sortSubjectsByName("asc"));
//     // sortByNameDesc.addEventListener("click", () => sortSubjectsByName("desc"));
//     // sortByTimeAsc.addEventListener("click", () => sortSubjectsByTime("asc"));
//     // sortByTimeDesc.addEventListener("click", () => sortSubjectsByTime("desc"));

//     renderTable();
//     updatePagination();
// });


// 

document.addEventListener("DOMContentLoaded", () => {
    const buttonAddCategory = document.getElementById("buttonAddCategory");
    const formCategory = document.getElementById("formCategory");
    const btnCloseFormCategory = document.getElementById("btnCloseFormCategory");
    const btnAddSubject = document.getElementById("btnAddSubject");
    const subjectTableBody = document.querySelector(".category-table tbody");
    const subjectNameError = document.getElementById("subjectNameError");
    const searchInput = document.querySelector(".input-search");
    const pageNumbersContainer = document.querySelector(".page-numbers");
    const buttonPrev = document.querySelector(".button-prev");
    const buttonNext = document.querySelector(".button-next");
    const selectFilter = document.querySelector(".select");
    const sortByNameAsc = document.getElementById("sortByNameAsc");
    // const sortByNameDesc = document.getElementById("sortByNameDesc");

    let currentPage = 1;
    const rowsPerPage = 5;
    let subjects = [
        { 
            id: 1, 
            name: "Lập trình C", 
            status: "active", 
            createdAt: "2023-11-20T10:00:00Z" 
        },
        { 
            id: 2, 
            name: "Lập trình Frontend với ReactJS", 
            status: "inactive", 
            createdAt: 
            "2023-11-19T14:30:00Z" 
        },
        { 
            id: 3, 
            name: "Lập trình Backend với Spring Boot", 
            status: "active", 
            createdAt: "2023-11-21T09:15:00Z" 
        },
        { 
            id: 4, 
            name: "Lập trình Frontend với VueJS", 
            status: "inactive", createdAt: "2023-11-18T16:45:00Z" 
        },
        { 
            id: 5, 
            name: "Cấu trúc dữ liệu và giải thuật", 
            status: "inactive", createdAt: "2023-11-22T11:20:00Z" 
        },
        {     
            id: 6, 
            name: "Phân tích và thiết kế hệ thống", 
            status: "inactive", createdAt: "2023-11-17T13:00:00Z" 
        },
        { 
            id: 7, 
            name: "Toán cao cấp", 
            status: "active", 
            createdAt: "2023-11-23T15:30:00Z" 
        },
        { 
            id: 8, 
            name: "Tiếng Anh chuyên ngành", 
            status: "inactive", 
            createdAt: "2023-11-16T10:45:00Z" 
        },
    ];
    let filteredSubjects = [...subjects];

    const renderTable = () => {
        if (!subjectTableBody) return;
        subjectTableBody.innerHTML = "";
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const visibleSubjects = filteredSubjects.filter((subject, index) => index >= start && index < end);

        visibleSubjects.forEach((subject) => {
            const newRow = createSubjectRow(subject);
            subjectTableBody.appendChild(newRow);
        });
        setupEventListeners();
    };

    const createSubjectRow = (subject) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${subject.id}</td>
            <td>${subject.name}</td>
            <td>${getStatusCellHtml(subject.status)}</td>
            <td class="all">
                <img class="delete-button" src="../assets/public/icons/icon_14.png" alt="">
                <img class="edit-button" src="../assets/public/icons/icon_15.png" alt="">
            </td>
        `;
        return newRow;
    };

    const getStatusCellHtml = (status) => {
        const isActive = status === "active";
        return `
            <div class="status ${isActive ? "status-active" : "status-inactive"}">
                <img src="../assets/public/icons/${isActive ? "icon_19.png" : "icon_20.png"}" alt="">
                <span>${isActive ? "Đang hoạt động" : "Ngừng hoạt động"}</span>
            </div>
        `;
    };

    const setupEventListeners = () => {
        if (!subjectTableBody) return;
        subjectTableBody.querySelectorAll(".delete-button").forEach(button => {
            button.onclick = () => deleteSubject(button.closest("tr"));
        });
        subjectTableBody.querySelectorAll(".edit-button").forEach(button => {
            button.onclick = () => editSubject(button.closest("tr"));
        });
    };

    const deleteSubject = (row) => {
        if (confirm("Bạn có chắc chắn muốn xóa môn học này?")) {
            const id = parseInt(row.children[0].textContent);
            subjects = subjects.filter(subject => subject.id !== id);
            filterSubjects();
        }
    };

    const editSubject = (row) => {
        const id = parseInt(row.children[0].textContent);
        const subject = subjects.find(subject => subject.id === id);
        if (subject) {
            document.getElementById("subjectName").value = subject.name;
            document.querySelector(`input[name="status"][value="${subject.status}"]`).checked = true;
            formCategory.dataset.editingId = id;
            openForm();
        }
    };

    const updateSubject = (id, name, status) => {
        subjects = subjects.map(subject => {
            if (subject.id === id) {
                return { ...subject, name, status };
            }
            return subject;
        });
    };

    const addSubject = () => {
        const subjectName = document.getElementById("subjectName").value.trim();
        const status = document.querySelector('input[name="status"]:checked').value;
        if (!subjectName) {
            subjectNameError.textContent = "Tên môn học không được để trống";
            subjectNameError.style.display = "block";
            return;
        } else {
            subjectNameError.style.display = "none";
        }
        if (formCategory.dataset.editingId) {
            updateSubject(parseInt(formCategory.dataset.editingId), subjectName, status);
            formCategory.dataset.editingId = null;
        } else {
            const newId = subjects.length > 0 ? Math.max(...subjects.map(s => s.id)) + 1 : 1;
            subjects.push({ id: newId, name: subjectName, status, createdAt: new Date().toISOString() });
        }
        closeForm();
        filterSubjects();
    };

    const filterSubjects = () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const filterStatus = selectFilter.value;

        filteredSubjects = subjects.filter(subject => {
            const nameMatch = subject.name.toLowerCase().includes(searchTerm);
            const statusMatch = filterStatus === "" || subject.status === filterStatus;
            return nameMatch && statusMatch;
        });
        currentPage = 1;
        renderTable();
        updatePagination();
    };

    const updatePagination = () => {
        const totalPages = Math.ceil(filteredSubjects.length / rowsPerPage);
        pageNumbersContainer.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
            pageButton.className = "button-number";
            if (i === currentPage) pageButton.classList.add("active");
            pageButton.onclick = () => {
                currentPage = i;
                renderTable();
                updatePagination();
            };
            pageNumbersContainer.appendChild(pageButton);
        }
        buttonPrev.disabled = currentPage === 1;
        buttonNext.disabled = currentPage === totalPages;
    };

    const openForm = () => {
        formCategory.style.display = "flex";
        document.getElementById("subjectName").value = "";
    };

    const closeForm = () => {
        formCategory.style.display = "none";
    };

    const sortSubjectsByName = (order = 'asc') => {
        filteredSubjects.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (order === 'asc') {
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
            } else {
                if (nameA < nameB) return 1;
                if (nameA > nameB) return -1;
            }
            return 0;
        });
        renderTable();
        updatePagination();
    };

    buttonAddCategory.onclick = openForm;
    btnCloseFormCategory.onclick = closeForm;
    btnAddSubject.onclick = addSubject;
    searchInput.addEventListener("input", filterSubjects);
    selectFilter.addEventListener("change", filterSubjects);
    buttonPrev.onclick = () => { if (currentPage > 1) currentPage--; renderTable(); updatePagination(); };
    buttonNext.onclick = () => { if (currentPage < Math.ceil(filteredSubjects.length / rowsPerPage)) currentPage++; renderTable(); updatePagination(); };
    sortByNameAsc.addEventListener("click", () => sortSubjectsByName("asc"));
    // sortByNameDesc.addEventListener("click", () => sortSubjectsByName("desc"));

    renderTable();
    updatePagination();
});