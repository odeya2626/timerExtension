chrome.alarms.create("timerAlarm", {
  periodInMinutes: 1 / 60,
});
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "timerAlarm") {
    chrome.storage.local.get(["timer", "isRunning", "breakTime"], (data) => {
      if (data.isRunning) {
        let timer = data.timer + 1;
        let isRunning = true;
        if (timer === 60 * data.breakTime) {
          chrome.notifications.create(
            "Timer Notification",
            {
              type: "basic",
              iconUrl: "icon.png",
              title: "Chrome Timer Extension",
              message: `${data.breakTime} seconds has passed!`,
            },
            () => {
              console.log("Notification created");
            }
          );
          timer = 0;
          isRunning = false;
        }

        chrome.storage.local.set({
          timer,
          isRunning,
        });
      }
    });
  }
});

//defaults
chrome.storage.local.get(["timer", "isRunning", "breakTime"], (data) => {
  chrome.storage.local.set({
    timer: "timer" in data ? data.timer : 0,
    isRunning: "isRunning" in data ? data.isRunning : false,
    breakTime: "breakTime" in data ? data.breakTime : 30,
  });
});
