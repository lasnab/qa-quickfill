function createTableRows() {
  const tableBody = document.getElementById('tableBody');
  const emptyListDisclaimer = document.getElementById('emptyListDisclaimer');

  chrome.storage.sync.get({ globalParams: [] }, function (result) {
    const tableRows = result.globalParams ?? [];

    if (tableRows.length === 0) {
      tableBody.innerHTML = '';
      emptyListDisclaimer.classList.remove('hide');
      return;
    }

    emptyListDisclaimer.classList.add('hide');

    tableBody.innerHTML = '';

    tableRows.sort(compareParamDates).forEach((param) => {
      const tr = document.createElement('tr');

      tr.addEventListener('click', function () {
        autoFillParams(param.id, param.param);
      });

      tr.addEventListener('mouseover', function () {
        this.classList.add('highlight');
      });

      tr.addEventListener('mouseout', function () {
        this.classList.remove('highlight');
      });

      const deleteIcon = document.createElement('td');

      deleteIcon.innerHTML = `
        <svg z-index="100" class="delete-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
      `;

      deleteIcon.addEventListener('click', function (event) {
        deleteRow(param.id);
        event.stopPropagation();
      });

      tr.innerHTML = `
              <td><span class='env'>${param.env.toUpperCase()}</span></td>
              <td>${param.type.toUpperCase()}</td>
              <td>${param.id}</td>
              <td>${param.param}</td>
              <td>${param.created}</td>
          `;
      tr.appendChild(deleteIcon);
      tableBody.appendChild(tr);
    });
  });
}

function deleteRow(id) {
  chrome.storage.sync.get({ globalParams: [] }, function (result) {
    var globalParams = result.globalParams;
    if (globalParams) {
      const idx = globalParams.map((p) => p.id).indexOf(id);
      if (idx > -1) {
        globalParams.splice(idx, 1);
      }
    }

    chrome.storage.sync.set({ globalParams }, function () {
      createTableRows();
    });
  });
}

function compareParamDates(paramA, paramB) {
  return (
    new Date(paramB.created).getTime() - new Date(paramA.created).getTime()
  );
}

createTableRows();

function saveFields() {
  const currParam = {
    env: document.getElementById('envInput').value,
    type: document.getElementById('typeInput').value,
    id: document.getElementById('loginIdInput').value,
    param: document.getElementById('loginParamInput').value,
    created: document.getElementById('createdAtInput').value,
  };

  if (!currParam.env || !currParam.id || !currParam.param) {
    return;
  }

  chrome.storage.sync.get({ globalParams: [] }, function (result) {
    var globalParams = result.globalParams;
    if (globalParams) {
      globalParams.push(currParam);
    } else {
      globalParams = [currParam];
    }

    chrome.storage.sync.set({ globalParams }, function () {
      clearFields();
      createTableRows();
    });
  });
}
