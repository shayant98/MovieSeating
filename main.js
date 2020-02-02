const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const moviesSelect = document.getElementById("movie");

let ticketPrice = parseInt(moviesSelect.value);

const setSelected = target => {
  target.classList.toggle("selected");
};

const updateSeatCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
};

const updateTotal = () => {
  total.innerText = count.innerText * ticketPrice;
};

moviesSelect.addEventListener("change", e => {
  ticketPrice = e.target.value;
  updateTotal();
});

container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    setSelected(e.target);
    updateSeatCount();
    updateTotal();
  }
});
