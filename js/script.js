const ToDoList=function(){
    let todoListArr=[
        {
            taskName:'Выучить js',
            id: '1',
            isDone: false,
        },
        {
            taskName:'Выучить css',
            id: '2',
            isDone: true,
        }
    ];
    this.Init=()=>{
        const app=document.querySelector('.app');
        const container=document.createElement('div');
        container.classList.add('container');
        container.innerHTML=`<div class="main_wrapper">
                                <div class="todolist_header">
                                    <h2 class="todolist_title">ToDo List</h2>
                                </div>
                                <div class="todolist_main">
                                    <div class="todolist_create_task">
                                        <input type="text" class="create_task" name="task" placeholder="Введите задачу..." maxlength="50">
                                    </div>
                                    <ul class="todolist_items">
                                    </ul>
                                    
                                </div>
                             </div>
                               
        `;
        app.appendChild(container);
        this.addEventCreateTask();
        this.Show();
    }
    this.Verification=(value)=>{
        let regExp=/[\[\]\{\}\|\&]/g;
        switch(true){
            case(value.length===0 || value.length===''):
                alert('Введена пустая строка.Повторите попытку.');
                return false;
            case(value.length<3):
                alert('Длина текста не должна быть меньше 3 символов.Повторите попытку.');
                return false;
            case(value.length>50):
                alert('Длина текста не должна быть больше 50 символов.Повторите попытку.');
                return false;
            case(regExp.test(value)):
                alert('Используются недопустимые символы.Повторите попытку.');
                return false;
            default: return true;

        }
    }
    this.addEventCreateTask=()=>{
        const input=document.querySelector('.create_task');
        input.addEventListener('keypress',(event)=>{
           if(event.key==='Enter' && this.Verification(input.value)){
                
                this.CreateTask(input.value);
                input.value='';
           }
        })
    }
    this.CreateTask=(value)=>{
        todoListArr.push({
            taskName: value,
            id: `${performance.now()}`,
            isDone: false,
        });

        this.Show();

    }
    this.Show=()=>{
        const ul=document.querySelector('.todolist_items');
        let li='';
        todoListArr.forEach(({taskName,id,isDone})=>{
            li+=`<li class='todolist_item'>
                    <input type="checkbox" class='todolist_item_checkbox'  ${isDone ? "checked" : ""} id="${id}"><label for=${id}  class='${isDone ? "task_text cross" : "task_text"}' ><span class='text'>${taskName}</span></label>
                    <button class="btn edit_btn" data-edit="${id}">(Ред.)</button>
                    <button class="btn delete_btn" data-del="${id}" >(Уд.)</button>
                </li>`
        });
        ul.innerHTML=li;
        this.Checked();
        this.addEventEditTask();
        this.addEventDeleteTask();
    }
    this.Checked=()=>{
       const checkBoxes=document.querySelectorAll('.todolist_item_checkbox');
       checkBoxes.forEach((elem)=>{
            elem.addEventListener('click',(event)=>{
              
                let id=event.target.id;
                todoListArr.map((elem)=>{
                    if(elem.id===id){
                        elem.isDone=event.target.checked;
                    };
                });
                this.Show();
            });
       });
    }
    this.addEventEditTask=()=>{
        const editButtons=document.querySelectorAll('.edit_btn');
        editButtons.forEach((elem)=>{
            
            elem.addEventListener('click',(event)=>{
                const Done=todoListArr.find(({id})=>id===event.target.dataset.edit);
                if(Done.isDone===false){
                    this.Modal(event.target.dataset.edit);
                }
                
            })
        })
    }
    this.Modal=(btnId)=>{
        let value=todoListArr.find((elem)=>{
            if(elem.id===btnId){
                return elem;
            }
        });
        const {taskName,id} = value;
        const modal=document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML=`
                            <div class='modal_container'>
                                <div class='modal_wrapper'>
                                  <div class='modal_header'>
                                    <h2 class='modal_title'>Введите задачу</h2>
                                  </div>
                                  <div class='modal_main'>
                                    <input class='modal_input' type='text' value="${taskName}" maxlength="50" >
                                    <button class='modal_button'>Сохранить</button>
                                  </div>
                                    
                                    
                                </div>
                            </div>
                        `;
        document.body.appendChild(modal);

        modal.addEventListener('click',(event)=>{
            if(event.target.classList[0]==='modal_container'){
                modal.remove();
            }
        })

        const saveBtn=document.querySelector('.modal_button');
        const modalInput=document.querySelector('.modal_input');
        saveBtn.addEventListener('click',()=>{
            if(this.Verification(modalInput.value)){
                this.Edit(modalInput.value,id);
                modal.remove();
            }
        });

    }
    this.Edit=(newValue, editId)=>{
        todoListArr=todoListArr.map((elem)=>{
            if(elem.id===editId){
                elem.taskName=newValue;
            }
            return elem;
        });
        this.Show();
    }

    this.addEventDeleteTask=()=>{
        const deleteButtons=document.querySelectorAll('.delete_btn');
        deleteButtons.forEach((elem)=>{
            elem.addEventListener('click',(event)=>{
                    this.Delete(event.target.dataset.del);
                
            })
        })
    }
    this.Delete=(id)=>{

        todoListArr=todoListArr.filter((elem)=>elem.id!==id);
        this.Show();
    }
    
}

window.addEventListener('load',()=>{
    const toDoList=new ToDoList();
    toDoList.Init();
});