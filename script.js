
fetch('candidates.json')
    .then(data => data.json())
    .then(candidates => {
        const tbody = document.getElementsByClassName('candidate-data')[0];
        let edit=false;
        let idCount=0;
        
        //object.id and <tr-data-id> will create the binding
        const render=(candidate, idx) => {
            tbody.innerHTML += `<tr data-id="${candidate.id}">
                                <td>${candidate.name.firstname}</td>
                                <td>${candidate.name.lastname}</td>
                                <td>${candidate.name.phone}</td>
                                <td>[
                                    <a href="#" data-edit>edit</a>/
                                    <a href="#" data-delete>delete</a>]
                                </td>
                              </tr>`
        }
        candidates.forEach((candidate)=>{candidate.id=idCount;idCount++;});
        candidates.forEach(render)
        
        const form =tbody.parentNode.querySelector('[data-form]');
        document.getElementsByClassName('candidates')[0].addEventListener('click', ev => {
                const target = ev.target;
                const targetData = ev.target.dataset;
                const td = target.parentNode;
                const tr = td.parentNode;
            if (targetData.delete !== undefined) {
                candidates.splice(tr.dataset.id,1);
                tbody.removeChild(tr);
                fetch('api/candidates/'+tr.dataset.id,{method:'DELETE'})
            }
            else if(targetData.add!==undefined){
                form.style.display='table-row';

                const inputs=form.querySelectorAll('td input');
                let firstnameInput=inputs[0];
                let lastnameInput=inputs[1];
                let phoneInput=inputs[2];

                firstnameInput.value='';
                lastnameInput.value='';
                phoneInput.value='';

                edit=false;
            }
            else if(targetData.cancel!==undefined){
                form.style.display='none';
                edit=false;
            }
            else if(targetData.edit!==undefined){
                form.style.display='table-row';
                
                const inputs=form.querySelectorAll('td input');
                let firstnameInput=inputs[0];
                let lastnameInput=inputs[1];
                let phoneInput=inputs[2];
                
                const values=tr.querySelectorAll('td');
                let firstnameValue=values[0];
                let lastnameValue=values[1];
                let phoneValue=values[2];

                firstnameInput.value=firstnameValue.innerText;
                lastnameInput.value=lastnameValue.innerText;
                phoneInput.value=phoneValue.innerText;
                edit=tr.dataset.id;
               
        }
         else if(targetData.save!==undefined){
                form.style.display='none';
                
                const inputs=form.querySelectorAll('td input');
                let firstnameInput=inputs[0];
                let lastnameInput=inputs[1];
                let phoneInput=inputs[2];
                
                const name={
                    firstname:firstnameInput.value,
                    lastname:lastnameInput.value,
                    phone:phoneInput.value,
                }
                if(edit===false)
                {
                    const newCandidate={
                        id:idCount,
                        name:name
                    }
                    candidates.push(newCandidate);
                    tbody.innerHTML='';
                    candidates.forEach(render);
                    firstnameInput.value='';
                    lastnameInput.value='';
                    phoneInput.value='';
                    fetch('api/candidates/',{method:'POST'})
                }
                else {
                   tbody.innerHTML='';
                   candidates.forEach(candidate=>{
                       
                       if (candidate.id==edit)
                       {
                           candidate.name=name;
                       }
                   })
                   candidates.forEach(render)
                    const id=edit;
                    edit=false;

                    fetch(`api/candidates/${id}`,{method:'PUT'})
                }
            }
        })
    })

