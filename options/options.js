const breakTime = document.getElementById("break-time");
breakTime.addEventListener("change", (e) => {
  const value = e.target.value;
  if (value < 1 || value > 60) {
    breakTime.value = 30;
  }
});
const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    timer: 0,
    isRunning: false,
    breakTime: breakTime.value,
  });
});

chrome.storage.local.get(["breakTime"], (data) => {
  breakTime.value = data.breakTime ? data.breakTime : 30;
});
