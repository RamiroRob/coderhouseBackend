// public/js/deleteUser.js

function deleteUser(userId) {
    fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Usuario eliminado:', data);
            window.location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', (event) => {
    const deleteButtons = document.querySelectorAll('.delete-user-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            deleteUser(this.dataset.userId);
        });
    });
});
