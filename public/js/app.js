var userid = $(".user-id").text().trim();

// initially hide some content
$(".popup-content").hide();
$(".user-id").hide();

// api shortcuts
var api = {
  submit: function (res, req) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json",
      },
      type: "POST",
      url: "/api/" + req,
      data: JSON.stringify(res),
    });
  },
  grab: function (req) {
    return $.ajax({
      url: "/api/" + req,
      type: "GET",
    });
  },
  annihilate: function (req) {
    return $.ajax({
      url: "/api/" + req,
      type: "DELETE",
    });
  },
};

// populate users buttons
$(document).ready(function () {
  api.grab("query/user/" + userid).then(function (response) {
    for (let i = 0; i < response.length; i++) {
      console.log(response[i]);
      let query = response[i].userQuery;
      let insta = response[i].instagram;
      let twitt = response[i].twitter;
      let avatar = response[i].avatar;
      let buttonId = response[i].id;

      // pass uppercase name to avatar label
      let labelName = query.replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
      });

      //Creates buttons
      var imgDiv = $('<div class="sports-btn">');
      imgDiv.attr("data-name", query);
      imgDiv.attr("data-insta", insta);
      imgDiv.attr("data-twitter", twitt);
      var deleteBtn = $('<button class="delete">delete</button>');
      deleteBtn.attr("data-id", buttonId);

      var sportsBtn = $("<a href=# class='link'>");

      var image = $(
        '<img src="' + avatar + '" alt="sportsBlock" class="circle avatar-img">'
      );
      var label = $("<div class='label'>" + labelName + "</div>");
      var innerBlock = sportsBtn.append(image).append(label);

      var token = imgDiv.append(innerBlock).append(deleteBtn);
      //Append each button to home page
      $("#buttons").append(token);
    }
  });
});

$(document).on("click", ".delete", function (e) {
  e.preventDefault();
  let buttonId = $(this).attr("data-id");
  console.log(buttonId);
  api.annihilate("query/" + buttonId).then(function (response) {
    location.reload();
  });
});

//Close button for popup, has a slow fade-out animation.
$(".close").on("click", function () {
  $(".popup-content").fadeOut("slow");
});
