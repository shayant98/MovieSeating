const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const moviesSelect = document.getElementById("movie");

let ticketPrice = parseInt(moviesSelect.value);

const setSelected = target => {
  target.classList.toggle("selected");
};

const saveSeatsToLocalStorage = selectedSeats => {
  const seatIndex = selectedSeats.map(seat => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));
};

const saveMovieToLocalStorage = movieIndex => {
  localStorage.setItem("movieIndex", movieIndex);
};
const savePriceToLocalStorage = movieIndex => {
  localStorage.setItem("price", movieIndex);
};

const getLocalStorageData = () => {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  const selectedMovie = localStorage.getItem("movieIndex");
  const moviePrice = localStorage.getItem("price");

  if (selectedSeats.length !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  if (selectedMovie !== null) {
    moviesSelect.selectedIndex = selectedMovie;
    ticketPrice = moviePrice;
  }
  updateSeatCount();
  updateTotal();
};

const updateSeatCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  saveSeatsToLocalStorage([...selectedSeats]);
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
};

const updateTotal = () => {
  total.innerText = count.innerText * ticketPrice;
};

getLocalStorageData();

saveMovieToLocalStorage(moviesSelect.selectedIndex);
savePriceToLocalStorage(moviesSelect.value);

moviesSelect.addEventListener("change", e => {
  ticketPrice = e.target.value;
  updateTotal();
  saveMovieToLocalStorage(e.target.selectedIndex);
  savePriceToLocalStorage(e.target.value);
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
