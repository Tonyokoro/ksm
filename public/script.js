document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const loginBtn = document.getElementById('loginBtn');
    const adminSection = document.getElementById('adminSection');

    let isAdmin = false;

    loginBtn.addEventListener('click', () => {
        const password = prompt("Enter admin password:");
        if (password === "admin123") {
            isAdmin = true;
            adminSection.classList.remove('hidden');
            loginBtn.classList.add('hidden');
        } else {
            alert("Incorrect password!");
        }
    });

    uploadForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!isAdmin) return alert("You are not authorized!");

        const file = fileInput.files[0];
        if (!file) return alert("Please select a file!");

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('File uploaded successfully!');
            fetchFiles();
        } else {
            alert('Failed to upload file.');
        }
    });

    async function fetchFiles() {
        const response = await fetch('/files');
        const files = await response.json();
        fileList.innerHTML = '';
        files.forEach(file => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = `/uploads/${file}`;
            link.textContent = file;
            link.download = file;
            li.appendChild(link);
            fileList.appendChild(li);
        });
    }

    fetchFiles();
});
