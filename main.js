// import TimeAgo from "javascript-time-ago";
// import en from "javascript-time-ago/locale/en";

// const TimeAgo = require("javascript-time-ago");
// const en = require("javascript-time-ago/locale/en");

(function () {
  "use strict";

  // TimeAgo.addDefaultLocale(en);

  // Create formatter (English).
  // const timeAgo = new TimeAgo("en-US");

  let repos = [];
  // let updates = [];

  const getRepos = async () => {
    const rawData = await fetch(
      "https://api.github.com/users/androcat/repos?sort=created_at"
    );
    const jsonData = await rawData.json();
    jsonData.forEach((obj) => {
      repos.push({ name: obj.name, update: obj.updated_at });
    });
    console.log(repos); //jsonData);

    // jsonData.forEach((obj) => {
    //   repos.push(obj.updated_at);
    // });

    renderRepoNames();
  };

  const container = document.querySelector("#repos");

  const renderRepoNames = () => {
    repos.forEach((repo) => {
      let listItem = document
        .querySelector("#repos__list-item")
        .content.cloneNode(true);

      listItem
        .querySelector("h3")
        .appendChild(document.createTextNode(repo.name));

      // let myUpdate = timeAgo.format(Date.now() - Date(repo.update));
      let myDate = new Date(repo.update);

      listItem
        .querySelector(".repo__update")
        .appendChild(document.createTextNode(myDate.toLocaleString("en-US")));

      container.appendChild(listItem);
    });
  };

  //   repos.forEach((obj) => {});

  getRepos();
})();
