import { v4 as uuidV4 } from 'uuid'
//if types arent available (npm i --save-dev @types/uuid), you have to write your own types

// console.log(uuidV4())

// const form = document.getElementById("new-task-form") as HTMLFormElement |
const list = document.querySelector<HTMLUListElement>("#list")
const form = document.querySelector<HTMLFormElement>("#new-task-form")
const input = document.querySelector<HTMLInputElement>("#new-task-title")
const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)


//? Optional chaining, if form or input exists, run the property
form?.addEventListener("submit", e => {
  e.preventDefault()
  if(input?.value == "" || input?.value == null) {
    return
  }

  const newTask: Task = {
    id: uuidV4(),
    title: input?.value,
    completed: false,
    createdAt: new Date()
  }

  tasks.push(newTask)
  saveTasks()

  addListItem(newTask)
  input.value = ""
})

// function addListItem(task: {id: string, title: string, completed: boolean, createdAt: Date}) {
//   console.log(task)

// }

type Task = {id: string, title: string, completed: boolean, createdAt: Date}


function addListItem(task: Task) {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks()
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS")
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
}