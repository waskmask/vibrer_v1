function toHome(currentPath) {
  if (currentPath !== "/home") {
    window.location.href = "/app/home";
  }
}

function toContests(currentPath) {
  if (currentPath !== "/contests") {
    window.location.href = "/app/contests";
  }
}
function toContest(currentPath) {
  if (currentPath !== "/contests") {
    window.location.href = "/app/contest-view";
  }
}

function toMyContests(currentPath, currentLink) {
  if (currentPath !== "/my-contests" || currentLink !== "/my-contests") {
    window.location.href = "/app/my-contests";
  }
}

function toMyVotes(currentLink) {
  if (currentLink !== "/my-contest-votes") {
    window.location.href = "/app/my-votes";
  }
}

function toMyContestFavs(currentLink) {
  if (currentLink !== "/my-contest-favs") {
    window.location.href = "/app/my-contest-favs";
  }
}

function toPreMyContests(currentPath, contest_id) {
  if (currentPath !== "/my-contests") {
    window.location.href = "/app/pre-participate/" + contest_id;
  }
}

function toTheContest(currentPath) {
  if (currentPath !== "/contest") {
    window.location.href = "/app/pre-contest/";
  }
}

function toPreHome(currentPath) {
  if (currentPath !== "/my-contests" || currentLink !== "/my-contests") {
    window.location.href = "/app/pre-home";
  }
}

function toEditProfile() {
  window.location.href = "/app/pre-edit-profile";
}
function toMyProfile() {
  window.location.href = "/app/pre-my-profile";
}

function toNewPost() {
  window.open("/app/new-post", "_blank");
}

function toReports(currentPath, currentLink) {
  if (currentLink !== "allreports") {
    window.location.href = "/app/reports";
  }
}

function toActiveReports(currentPath, currentLink) {
  if (currentPath !== "/reports" || currentLink !== "active") {
    window.location.href = "/app/active-reports";
  }
}

function youReported(currentPath, currentLink) {
  if (currentPath !== "/reports" || currentLink !== "youreported") {
    window.location.href = "/app/you-reported";
  }
}

function toAddPost(currentPath) {
  if (currentPath !== "/new-post") {
    window.location.href = "/app/new-post";
  }
}
function toAddMusic(currentPath) {
  if (currentPath !== "/new-post-music") {
    window.location.href = "/app/new-post-music";
  }
}
function toAddImages(currentPath) {
  if (currentPath !== "/new-post-image") {
    window.location.href = "/app/new-post-image";
  }
}
