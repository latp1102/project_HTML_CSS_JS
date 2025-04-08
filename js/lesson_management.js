document.addEventListener('DOMContentLoaded', () => {
    const buttonAddCategory = document.getElementById("buttonAddCategory");
    const formCategory = document.getElementById("formCategory");
    const btnCloseFormCategory = document.getElementById("btnCloseFormCategory");
    const btnAddSubject = document.getElementById("btnAddSubject");
    const subjectTableBody = document.querySelector(".category-table tbody");
    const subjectNameInput = document.getElementById("subjectName");
    const timeInput = document.getElementById("time");
    const subjectNameError = document.getElementById("subjectNameError");
    const timeError = document.getElementById("timeError");
    const subjectsSelect = document.getElementById("subjects");
    const filterSelect = document.querySelector(".select");
    const deleteConfirmationModal = document.getElementById('deleteConfirmationModal');
    const subjectToDeleteName = document.getElementById('subjectToDeleteName');
    const cancelDelete = document.getElementById('cancelDelete');
    const confirmDelete = document.getElementById('confirmDelete');
    const deleteSuccessNotification = document.getElementById('deleteSuccessNotification');
    const closeNotification = document.getElementById('closeNotification');
    const sortByNameButton = document.getElementById('sortByName');
    const sortByTimeButton = document.getElementById('sortByTime');

    let subjectsData = [
        { id: 1, name: "Session 01-Tổng quan về HTML", time: 45, status: "active", subjectType: "HTML VÀ CSS" },
        { id: 2, name: "Session 02-Thẻ inline và Block", time: 60, status: "inactive", subjectType: "HTML VÀ CSS" },
        { id: 3, name: "Session 03-Form và Table", time: 40, status: "active", subjectType: "HTML VÀ CSS" },
        { id: 4, name: "Session 04-CSS cơ bản", time: 45, status: "inactive", subjectType: "HTML VÀ CSS" },
        { id: 5, name: "Session 05-CSS layout", time: 60, status: "inactive", subjectType: "HTML VÀ CSS" },
        { id: 6, name: "Session 06-CSS Flex box", time: 45, status: "inactive", subjectType: "HTML VÀ CSS" },
        { id: 7, name: "Session 12-Con trỏ trong C", time: 45, status: "active", subjectType: "Lập trình C cơ bản" },
        { id: 8, name: "Session 15-Đọc và ghi file", time: 60, status: "inactive", subjectType: "Lập trình C cơ bản" },
    ];

    function renderSubjectsTable(data = subjectsData) {
        subjectTableBody.innerHTML = "";
        data.forEach(subject => {
            const newRow = document.createElement("tr");
            newRow.setAttribute("data-id", subject.id);
            newRow.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${subject.subjectType}</td>
                <td>${subject.name}</td>
                <td>${subject.time}</td>
                <td>${subject.status === "active" ? `<div class="status status-active"><img src="../assets/public/icons/icon_19.png" alt=""><span>Đã hoàn thành</span></div>` : `<div class="status status-inactive"><img src="../assets/public/icons/icon_20.png" alt=""><span>Chưa hoàn thành</span></div>`}</td>
                <td><img class="delete-button" src="../assets/public/icons/icon_14.png" alt=""></td>
                <td><img class="edit-button" src="../assets/public/icons/icon_15.png" alt=""></td>
            `;
            subjectTableBody.appendChild(newRow);
        });
        setupEventListeners();
    }

    function closeForm() {
        formCategory.style.display = "none";
    }

    buttonAddCategory.addEventListener("click", () => {
        formCategory.style.display = "flex";
        subjectNameInput.value = "";
        timeInput.value = "";
        subjectNameError.textContent = "";
        timeError.textContent = "";
        formCategory.dataset.editingRow = null;
    });

    function closeForm() {
        formCategory.style.display = "none";
    }

    btnCloseFormCategory.addEventListener("click", closeForm);

    btnAddSubject.addEventListener("click", () => {
        const subjectName = subjectNameInput.value.trim();
        const status = document.querySelector('input[name="status"]:checked').value;
        const time = parseInt(timeInput.value, 10);
        const subjectType = subjectsSelect.value;

        subjectNameError.textContent = "";
        timeError.textContent = "";

        if (!subjectName) {
            subjectNameError.textContent = "Tên bài không được để trống";
            return;
        }

        if (!subjectType) {
            subjectNameError.textContent = "Loại môn học không được để trống";
        }

        if (!time) {
            timeError.textContent = "Thời gian học không được để trống";
            return;
        }

        if (formCategory.dataset.editingRow) {
            const editingId = parseInt(formCategory.dataset.editingRow, 10);
            const subjectIndex = subjectsData.findIndex(subject => subject.id === editingId);
            if (subjectIndex !== -1) {
                subjectsData[subjectIndex].name = subjectName;
                subjectsData[subjectIndex].time = time;
                subjectsData[subjectIndex].status = status;
                subjectsData[subjectIndex].subjectType = subjectType;
            }
            formCategory.dataset.editingRow = null;
        } else {
            const newId = Date.now();
            subjectsData.push({ id: newId, name: subjectName, time: time, status: status, subjectType: subjectType });
        }
        renderSubjectsTable();
        closeForm();
    });

    function setupEventListeners() {
        subjectTableBody.querySelectorAll(".delete-button").forEach(button => {
            button.onclick = () => {
                const row = button.closest("tr");
                const subjectId = parseInt(row.getAttribute("data-id"), 10);
                const subject = subjectsData.find(subject => subject.id === subjectId);
                if (subject) {
                    subjectToDeleteName.textContent = subject.name;
                    deleteConfirmationModal.style.display = 'flex';

                    confirmDelete.onclick = () => {
                        subjectsData = subjectsData.filter(sub => sub.id !== subjectId);
                        renderSubjectsTable();
                        deleteConfirmationModal.style.display = 'none';
                        deleteSuccessNotification.style.display = 'flex';
                    };

                    cancelDelete.onclick = () => {
                        deleteConfirmationModal.style.display = 'none';
                    };
                }
            };
        });

        subjectTableBody.querySelectorAll(".edit-button").forEach(button => {
            button.onclick = () => {
                const row = button.closest("tr");
                const subjectId = parseInt(row.getAttribute("data-id"), 10);
                const subject = subjectsData.find(subject => subject.id === subjectId);
                if (subject) {
                    subjectNameInput.value = subject.name;
                    timeInput.value = subject.time;
                    document.querySelector(`input[name="status"][value="${subject.status}"]`).checked = true;
                    subjectsSelect.value = subject.subjectType;
                    subjectNameError.textContent = "";
                    timeError.textContent = "";

                    formCategory.style.display = "flex";
                    formCategory.dataset.editingRow = subjectId;
                }
            };
        });
    }

    function sortTable(sortBy) {
        subjectsData.sort((a, b) => {
            let valueA, valueB;
            if (sortBy === 'name') {
                valueA = a.name.toLowerCase();
                valueB = b.name.toLowerCase();
            } else if (sortBy === 'time') {
                valueA = a.time;
                valueB = b.time;
            } else {
                return 0;
            }

            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
            return 0;
        });

        renderSubjectsTable();
    }

    sortByNameButton.addEventListener('click', () => {
        sortTable('name');
    });

    sortByTimeButton.addEventListener('click', () => {
        sortTable('time');
    });

    filterSelect.addEventListener("change", () => {
        const filterValue = filterSelect.value;
        let filteredData = subjectsData;
        if (filterValue) {
            filteredData = subjectsData.filter(subject => subject.status === filterValue);
        }
        renderSubjectsTable(filteredData);
    });

    closeNotification.onclick = () => {
        deleteSuccessNotification.style.display = 'none';
    };

    renderSubjectsTable();
});
