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
            createdAt: "2023-11-19T14:30:00Z"
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
            status: "inactive",
            createdAt: "2023-11-18T16:45:00Z"
        },
        {
            id: 5,
            name: "Cấu trúc dữ liệu và giải thuật",
            status: "inactive",
            createdAt: "2023-11-22T11:20:00Z"
        },
        {
            id: 6,
            name: "Phân tích và thiết kế hệ thống",
            status: "inactive",
            createdAt: "2023-11-17T13:00:00Z"
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

            // Hiển thị thông báo thành công
            showSuccessNotification();
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

    const showSuccessNotification = () => {
        const notification = document.createElement('div');
        notification.classList.add('success-notification');
        notification.innerHTML = `
            <img src="../assets/public/icons/icon_23.png" alt="">
            <div>
                <h3>Thành công</h3>
                <p>Xóa bài học thành công</p>
            </div>
            <img class="close-notification" src="../assets/public/icons/icon_24.png" alt="">
        `;
        document.body.appendChild(notification);

        notification.querySelector('.close-notification').onclick = () => {
            document.body.removeChild(notification);
        };
    };

    buttonAddCategory.onclick = openForm;
    btnCloseFormCategory.onclick = closeForm;
    btnAddSubject.onclick = addSubject;
    searchInput.addEventListener("input", filterSubjects);
    selectFilter.addEventListener("change", filterSubjects);
    buttonPrev.onclick = () => { 
        if (currentPage > 1) currentPage--; renderTable(); updatePagination(); 
    };
    buttonNext.onclick = () => { 
        if (currentPage < Math.ceil(filteredSubjects.length / rowsPerPage)) currentPage++; renderTable(); updatePagination(); 
    };
    sortByNameAsc.addEventListener("click", () => sortSubjectsByName("asc"));

    renderTable();
    updatePagination();
});
