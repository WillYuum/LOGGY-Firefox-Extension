function listenForClicks() {
  const button = document.getElementById("Log-button");
  document.addEventListener("click", e => {
    e.preventDefault();

    function Log(tabs) {
      let query = document.getElementById("dropdown").value;
      let input = document.getElementById("inputText").value;
      browser.tabs.sendMessage(tabs[0].id, {
        command: "log",
        inputValue: input,
        queryValue: query
      });
    }

    function reportError(error) {
      console.error(`Could not LOG: ${error}`);
    }

    if (e.target.classList.contains("Log-button")) {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(Log)
        .catch(reportError);
    }
  });
}

function reportExecuteScriptError(error) {
  document.querySelector(".main").classList.add("hidden");
  document.querySelector("#error-content").classList.remove(".hidden");
  console.warn(`Failed to execute the popup: ${error.message}`);
}

browser.tabs
  .executeScript({ file: "/content_script.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
