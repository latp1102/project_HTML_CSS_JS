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

    // Mở modal
    buttonAddCategory.addEventListener("click", () => {
        formCategory.style.display = "flex";
        subjectNameInput.value = "";
        timeInput.value = "";
        subjectNameError.textContent = "";
        timeError.textContent = "";
        formCategory.dataset.editingRow = null;
    });

    // Đóng modal
    function closeForm() {
        formCategory.style.display = "none";
    }

    btnCloseFormCategory.addEventListener("click", closeForm);

    // Thêm môn học vào danh sách
    btnAddSubject.addEventListener("click", () => {
        const subjectName = subjectNameInput.value.trim();
        const status = document.querySelector('input[name="status"]:checked').value;
        const time = timeInput.value;

        subjectNameError.textContent = "";
        timeError.textContent = "";

        if (!subjectName) {
            subjectNameError.textContent = "Vui lòng nhập tên môn học";
            return;
        }

        if (!time) {
            timeError.textContent = "Vui lòng nhập thời gian học";
            return;
        }

        if (formCategory.dataset.editingRow) {
            const row = subjectTableBody.querySelector(`tr[data-id="${formCategory.dataset.editingRow}"]`);
            if (row) {
                row.children[1].textContent = subjectName;
                row.children[2].textContent = time;
                row.children[3].innerHTML = status === "active" ? `<div class="status status-active"><img src="icon_19.png" alt=""><span>Đã hoàn thành</span></div>` : `<div class="status status-inactive"><img src="icon_20.png" alt=""><span>Chưa hoàn thành</span></div>`;
            }
            formCategory.dataset.editingRow = null;
        } else {
            const newId = Date.now();
            const newRow = document.createElement("tr");
            newRow.setAttribute("data-id", newId);
            newRow.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${subjectName}</td>
                <td>${time}</td>
                <td>${status === "active" ? `<div class="status status-active"><img src="icon_19.png" alt=""><span>Đã hoàn thành</span></div>` : `<div class="status status-inactive"><img src="icon_20.png" alt=""><span>Chưa hoàn thành</span></div>`}</td>
                <td><div><img class="delete-button" src="icon_14.png" alt=""></div></td>
                <td><div><img class="edit-button" src="icon_15.png" alt=""></div></td>
            `;
            subjectTableBody.appendChild(newRow);
            setupEventListeners();
        }
        closeForm();
    });

    function setupEventListeners() {
        subjectTableBody.querySelectorAll(".delete-button").forEach(button => {
            button.onclick = () => {
                const row = button.closest("tr");
                const subjectName = row.children[1].textContent;
                if (confirm(`Bạn có chắc chắn muốn xóa bài học không?`)) {
                    row.remove();
                }
            };
        });

        subjectTableBody.querySelectorAll(".edit-button").forEach(button => {
            button.onclick = () => {
                const row = button.closest("tr");
                const subjectName = row.children[1].textContent;
                const status = row.children[3].textContent.includes("Đã hoàn thành") ? "active" : "inactive";
                const time = row.children[2].textContent;

                subjectNameInput.value = subjectName;
                timeInput.value = time;
                document.querySelector(`input[name="status"][value="${status}"]`).checked = true;
                subjectNameError.textContent = "";
                timeError.textContent = "";

                formCategory.style.display = "flex";
                formCategory.dataset.editingRow = row.getAttribute("data-id");
            };
        });
    }

    function sortTable(columnIndex, ascending) {
        const rows = Array.from(subjectTableBody.querySelectorAll("tr"));
        rows.sort((rowA, rowB) => {
            const cellA = rowA.children[columnIndex].textContent.trim();
            const cellB = rowB.children[columnIndex].textContent.trim();
            if (columnIndex === 2) { // Sắp xếp theo thời gian
                const timeA = parseInt(cellA, 10);
                const timeB = parseInt(cellB, 10);
                return ascending ? timeA - timeB : timeB - timeA;
            } else { // Sắp xếp theo tên
                return ascending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
            }
        });

        // Xóa các hàng hiện tại và thêm các hàng đã sắp xếp
        rows.forEach(row => subjectTableBody.appendChild(row));
    }

    function setupSortEventListeners() {
        const nameHeader = document.querySelector(".category-table th:nth-child(2)");
        const timeHeader = document.querySelector(".category-table th:nth-child(3)");

        let nameAscending = true;
        let timeAscending = true;

        nameHeader.addEventListener("click", () => {
            sortTable(1, nameAscending);
            nameAscending = !nameAscending;
        });

        timeHeader.addEventListener("click", () => {
            sortTable(2, timeAscending);
            timeAscending = !timeAscending;
        });
    }

    setupEventListeners();
    setupSortEventListeners();
});