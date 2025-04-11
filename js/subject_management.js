document.addEventListener("DOMContentLoaded", () => {
    const buttonAddCategory = document.getElementById("buttonAddCategory");
    const formAddCategory = document.getElementById("formAddCategory");
    const btnCloseFormAddCategory = document.getElementById("btnCloseFormAddCategory");
    const btnAddSubject = document.getElementById("btnAddSubject");
    const subjectTableBody = document.querySelector(".category-table tbody");
    const subjectNameAddInput = document.getElementById("subjectNameAdd");
    const subjectNameAddError = document.getElementById("subjectNameAddError");
    const searchInput = document.querySelector(".input-search");
    const pageNumbersContainer = document.querySelector(".page-numbers");
    const buttonPrev = document.querySelector(".button-prev");
    const buttonNext = document.querySelector(".button-next");
    const selectFilter = document.querySelector(".select");
    const editModal = document.getElementById("editModal");
    const editForm = document.getElementById("editForm");
    const editSubjectNameInput = document.getElementById("editSubjectName");
    const editSubjectNameErrorEdit = document.getElementById("editSubjectNameError");
    const editActiveRadio = document.getElementById("editActive");
    const editInactiveRadio = document.getElementById("editInactive");
    const btnCloseEditModal = document.getElementById("btnCloseEditModal");
    const btnSaveSubject = document.getElementById("btnSaveSubject");
    const btnCancelEdit = document.getElementById("btnCancelEdit");
    
    let subjects = [];
    let currentPage = 1;
    const rowsPerPage = 5; 
    const storedSubjects = localStorage.getItem('subjects');

    if (storedSubjects) {
        subjects = JSON.parse(storedSubjects);
    } else {
        subjects = [
            { id: 1, name: "Lập trình C", status: "active", createdAt: "2023-11-20T10:00:00Z" },
            { id: 2, name: "Lập trình Frontend với ReactJS", status: "inactive", createdAt: "2023-11-19T14:30:00Z" },
            { id: 3, name: "Lập trình Backend với Spring Boot", status: "active", createdAt: "2023-11-21T09:15:00Z" },
            { id: 4, name: "Lập trình Frontend với VueJS", status: "inactive", createdAt: "2023-11-18T16:45:00Z" },
            { id: 5, name: "Cấu trúc dữ liệu và giải thuật", status: "inactive", createdAt: "2023-11-22T11:20:00Z" },
            { id: 6, name: "Phân tích và thiết kế hệ thống", status: "inactive", createdAt: "2023-11-17T13:00:00Z" },
            { id: 7, name: "Toán cao cấp", status: "active", createdAt: "2023-11-23T15:30:00Z" },
            { id: 8, name: "Tiếng Anh chuyên ngành", status: "inactive", createdAt: "2023-11-16T10:45:00Z" },
        ];
        localStorage.setItem('subjects', JSON.stringify(subjects)); 
    }

    let filteredSubjects = [...subjects];
    let editingSubjectId = null;
    let sortDirection = 'asc';

    const renderTable = () => {
        if (!subjectTableBody) {
            console.error("Không tìm thấy phần tử tbody của bảng.");
            return;
        }
        subjectTableBody.innerHTML = "";
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const visibleSubjects = filteredSubjects.slice(start, end); 

        console.log("currentPage:", currentPage);
        console.log("rowsPerPage:", rowsPerPage);
        console.log("start:", start);
        console.log("end:", end);
        console.log("filteredSubjects:", filteredSubjects);
        console.log("visibleSubjects:", visibleSubjects);

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
            button.onclick = () => openEditModal(button.closest("tr"));
        });
    };

    const deleteSubject = (row) => {
        const modal = document.createElement('div');
        modal.classList.add('modal-overlay');

        const icon = document.createElement('img');
        icon.src = "../assets/public/icons/icon_22.png";
        icon.alt = "Confirmation Icon";
        icon.style.marginBottom = '10px';
        modal.appendChild(icon);

        const confirmationText = document.createElement('h3');
        confirmationText.textContent = "Xác nhận";
        confirmationText.style.marginBottom = '10px';
        modal.appendChild(confirmationText);

        const message = document.createElement('p');
        const subjectName = row.children[1].textContent;
        message.textContent = `Bạn có chắc chắn muốn xóa môn học ${subjectName} khỏi hệ thống không?`;
        modal.appendChild(message);

        const confirmButton = document.createElement('button');
        confirmButton.classList.add('modal-confirm-button');
        confirmButton.textContent = "Xóa";
        confirmButton.onclick = () => {
            const id = parseInt(row.children[0].textContent);
            subjects = subjects.filter(subject => subject.id !== id);
            filterSubjects();
            document.body.removeChild(modal);
            showSuccessNotification("Xóa môn học thành công");
            localStorage.setItem('subjects', JSON.stringify(subjects)); 
        };
        modal.appendChild(confirmButton);

        const cancelButton = document.createElement('button');
        cancelButton.classList.add('modal-cancel-button');
        cancelButton.textContent = "Hủy";
        cancelButton.onclick = () => {
            document.body.removeChild(modal);
        };
        modal.appendChild(cancelButton);

        document.body.appendChild(modal);
    };

    const updateSubject = (id, name, status) => {
        subjects = subjects.map(subject => {
            if (subject.id === id) {
                return { ...subject, name, status };
            }
            return subject;
        });
        localStorage.setItem('subjects', JSON.stringify(subjects)); 
    };

    const addSubject = () => {
        const subjectName = subjectNameAddInput.value.trim();
        const status = document.querySelector('input[name="statusAdd"]:checked').value;

        if (!subjectName) {
            subjectNameAddError.textContent = "Tên môn học không được để trống";
            subjectNameAddError.style.display = "block";
            return;
        } else if (subjects.some(sub => sub.name.toLowerCase() === subjectName.toLowerCase())) {
            subjectNameAddError.textContent = "Tên môn học đã tồn tại";
            subjectNameAddError.style.display = "block";
            return;
        } else {
            subjectNameAddError.style.display = "none";
        }

        const newId = subjects.length > 0 ? Math.max(...subjects.map(sub => sub.id)) + 1 : 1;
        const newSubject = { id: newId, name: subjectName, status, createdAt: new Date().toISOString() };
        subjects.push(newSubject);
        localStorage.setItem('subjects', JSON.stringify(subjects)); 

        closeAddForm();
        filterSubjects();
        showSuccessNotification("Thêm môn học thành công");
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

    const openAddForm = () => {
        formAddCategory.style.display = "flex";
        subjectNameAddInput.value = "";
        subjectNameAddError.style.display = "none";
        document.querySelector('input[name="statusAdd"][value="active"]').checked = true;
    };

    const closeAddForm = () => {
        formAddCategory.style.display = "none";
    };

    const showSuccessNotification = (message) => {
        const notification = document.createElement('div');
        notification.classList.add('success-notification');
        notification.innerHTML = `
            <img src="../assets/public/icons/icon_23.png" alt="">
            <div>
                <h3>Thành công</h3>
                <p>${message}</p>
            </div>
            <img class="close-notification" src="../assets/public/icons/icon_24.png" alt="">
        `;
        document.body.appendChild(notification);

        notification.querySelector('.close-notification').onclick = () => {
            document.body.removeChild(notification);
        };
    };

    const openEditModal = (row) => {
        editingSubjectId = parseInt(row.children[0].textContent);
        const subjectToEdit = subjects.find(subject => subject.id === editingSubjectId);
        if (subjectToEdit) {
            editSubjectNameInput.value = subjectToEdit.name;
            if (editSubjectNameErrorEdit) {
                editSubjectNameErrorEdit.style.display = "none";
                editSubjectNameErrorEdit.textContent = "";
            }
            if (subjectToEdit.status === "active") {
                editActiveRadio.checked = true;
            } else {
                editInactiveRadio.checked = true;
            }
            editModal.style.display = "flex";
        }
    };

    const closeEditModal = () => {
        editModal.style.display = "none";
        editingSubjectId = null;
        if (editSubjectNameErrorEdit) {
            editSubjectNameErrorEdit.style.display = "none";
            editSubjectNameErrorEdit.textContent = "";
        }
    };

    const saveSubject = () => {
        if (editingSubjectId !== null) {
            const updatedName = editSubjectNameInput.value.trim();
            const updatedStatus = document.querySelector('input[name="editStatus"]:checked').value;

            if (!updatedName) {
                if (!editSubjectNameErrorEdit) {
                    const errorElement = document.createElement("p");
                    errorElement.id = "editSubjectNameError";
                    errorElement.className = "error-message";
                    errorElement.style.color = "#DC2626";
                    editSubjectNameInput.parentNode.insertBefore(errorElement, editSubjectNameInput.nextSibling);
                    editSubjectNameErrorEdit = errorElement;
                }
                editSubjectNameErrorEdit.textContent = "Tên môn học không được để trống";
                editSubjectNameErrorEdit.style.display = "block";
                return;
            } else if (subjects.some(sub => sub.id !== editingSubjectId && sub.name.toLowerCase() === updatedName.toLowerCase())) {
                if (!editSubjectNameErrorEdit) {
                    const errorElement = document.createElement("p");
                    errorElement.id = "editSubjectNameError";
                    errorElement.className = "error-message";
                    errorElement.style.color = "#DC2626";
                    editSubjectNameInput.parentNode.insertBefore(errorElement, editSubjectNameInput.nextSibling);
                    editSubjectNameErrorEdit = errorElement;
                }
                editSubjectNameErrorEdit.textContent = "Tên môn học đã tồn tại";
                editSubjectNameErrorEdit.style.display = "block";
                return;
            } else {
                if (editSubjectNameErrorEdit) {
                    editSubjectNameErrorEdit.style.display = "none";
                    editSubjectNameErrorEdit.textContent = "";
                }
            }

            updateSubject(editingSubjectId, updatedName, updatedStatus);
            filterSubjects();
            closeEditModal();
            showSuccessNotification("Cập nhật môn học thành công");
            editingSubjectId = null;
            localStorage.setItem('subjects', JSON.stringify(subjects)); 
        }
    };

    const sortableNameHeader = document.querySelector(".category-table th.sortable[data-sort='name']");
    if (sortableNameHeader) {
        sortableNameHeader.addEventListener('click', () => {
            filteredSubjects.sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                if (sortDirection === 'asc') {
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                } else {
                    if (nameA > nameB) return -1;
                    if (nameA < nameB) return 1;
                    return 0;
                }
            });
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            renderTable();
            updatePagination();
        });
    }

    btnCloseEditModal.onclick = closeEditModal;
    btnSaveSubject.onclick = saveSubject;
    buttonAddCategory.onclick = openAddForm;
    btnCloseFormAddCategory.onclick = closeAddForm;
    btnAddSubject.onclick = addSubject;
    searchInput.addEventListener("input", filterSubjects);
    selectFilter.addEventListener("change", filterSubjects);
    buttonPrev.onclick = () => {
        if (currentPage > 1) currentPage--; renderTable(); updatePagination();
    };
    buttonNext.onclick = () => {
        if (currentPage < Math.ceil(filteredSubjects.length / rowsPerPage)) currentPage++; renderTable(); updatePagination();
    };

    if (btnCancelEdit) {
        btnCancelEdit.onclick = closeEditModal;
    }

    renderTable(); 
    updatePagination();
});