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

function toPreMyContests(currentPath) {
  if (currentPath !== "/my-contests") {
    window.location.href = "/app/pre-my-contests";
  }
}

function toPreHome(currentPath) {
  if (currentPath !== "/my-contests" || currentLink !== "/my-contests") {
    window.location.href = "/app/pre-home";
  }
}
