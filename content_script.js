(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function EditPage(value, query) {
    let tag = document.querySelector(`${query}`);
    console.log();
    tag.innerHTML = value;
  }

  browser.runtime.onMessage.addListener(message => {
    if (message.command === "log") {
      EditPage(message.inputValue, message.queryValue);
    } else {
      alert("the command didn't work :(");
    }
  });
})();
