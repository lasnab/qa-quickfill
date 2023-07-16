document
  .getElementById('clearFieldsBtn')
  .addEventListener('click', clearFields);

document.getElementById('saveFieldsBtn').addEventListener('click', saveFields);

function clearFields() {
  document.getElementById('envInput').value = '';
  document.getElementById('typeInput').value = '';
  document.getElementById('loginIdInput').value = '';
  document.getElementById('loginParamInput').value = '';
  document.getElementById('createdAtInput').value = getCurrentDate();
}

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

document.getElementById('createdAtInput').value = getCurrentDate();
