function createTableRows() {
  const tableBody = document.getElementById('tableBody');
  const emptyListDisclaimer = document.getElementById('emptyListDisclaimer');

  chrome.storage.sync.get({ globalParams: [] }, function (result) {
    const tableRows = result.globalParams ?? [];

    if (tableRows.length === 0) {
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

      tr.innerHTML = `
              <td><span class='env'>${param.env.toUpperCase()}</span></td>
              <td>${param.type.toUpperCase()}</td>
              <td>${param.id}</td>
              <td>${param.param}</td>
              <td>${param.created}</td>
          `;
      tableBody.appendChild(tr);
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
