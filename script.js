
fetch('candidates.json')
    .then(data => data.json())
    .then(candidates => {
        const tbody = document.getElementsByClassName('candidate-data')[0];
        candidates.forEach((candidate, idx) => {
            tbody.innerHTML += `<tr data-index="${idx}">
                                <td>${candidate.name.firstname}</td>
                                <td>${candidate.name.lastname}</td>
                                <td>${candidate.name.phone}</td>
                                <td>[
                                    <a href="#" data-edit>edit</a>/
                                    <a href="#" data-delete>delete</a>]
                                </td>
                              </tr>`
        })
        const form =tbody.parentNode.querySelector('[data-form]');
        document.getElementsByClassName('candidates')[0].addEventListener('click', ev => {
            const target = ev.target;
            const targetData = ev.target.dataset;
            if (targetData.delete !== undefined) {
                const td = target.parentNode;
                const tr = td.parentNode;
                tbody.removeChild(tr)
            }
            else if(targetData.add!==undefined){
                form.style.display='table-row';
            }
            else if(targetData.cancel!==undefined){
                form.style.display='none';
            }
            else if(targetData.edit!==undefined){
                form.style.display='table-row';
            }
        })
    })

