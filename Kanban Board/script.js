const cards = document.querySelectorAll(".card")
const columns = document.querySelectorAll(".column")

// Add drag events to each card
cards.forEach(card => {
  card.addEventListener("dragstart", dragStart)
  card.addEventListener("dragend", dragEnd)
})

// Add drop events to each column
columns.forEach(column => {
  column.addEventListener("dragover", dragOver)
  column.addEventListener("dragenter", dragEnter)
  column.addEventListener("dragleave", dragLeave)
  column.addEventListener("drop", dragDrop)
})

function dragStart(e) {
  e.dataTransfer.setData("text/plain", this.id)
  setTimeout(() => this.classList.add("hide"), 0) // Optional visual cue
}

function dragEnd() {
  this.classList.remove("hide")
}

function dragOver(e) {
  e.preventDefault()
}

function dragEnter(e) {
  e.preventDefault()
  this.classList.add("over")
}

function dragLeave(e) {
  this.classList.remove("over")
}

function dragDrop(e) {
  const id = e.dataTransfer.getData("text/plain")
  const card = document.getElementById(id)
  this.appendChild(card)
  this.classList.remove("over")
}
