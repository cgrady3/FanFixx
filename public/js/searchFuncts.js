//Will hold search items to create buttons
var avatar;
var userQuery = "";
var instagram = "";
var twitter = "";

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

  // Click event for search button
$("#sportsQuery-submit").on("click", function (event) {
    event.preventDefault();
    let errorArr = [];
    userQuery = $("#sportsQuery-text").val().trim();
    instagram = $("#instaQuery-text").val().trim();
    twitter = $("#twitterQuery-text").val().trim();
  
    $("#error-warning").empty();
  
    //pull instagram info from api
    var instaSettings = {
      async: true,
      crossDomain: true,
      url:
        "https://instagram9.p.rapidapi.com/api/instagram?kullaniciadi=" +
        instagram +
        "&lang=en",
      method: "GET",
      headers: {
        "x-rapidapi-host": "instagram9.p.rapidapi.com",
        "x-rapidapi-key": "24e7ba1147msh84b2d9ba4889f35p191fc7jsn48829d32f784",
      },
    };
  
    $.ajax(instaSettings).done(function (response) {
      avatar = response.avatar;
  
      var newQuery = {
        userQuery: userQuery,
        instagram: instagram,
        twitter: twitter,
        avatar: avatar,
        UserId: userid,
      };
      console.log(newQuery);
      if (newQuery.userQuery === "") {
        errorArr.push("Enter a player or team to search");
      }
      if (newQuery.instagram === "") {
        errorArr.push(
          "Enter the appropriate Instagram Handle, not including the @"
        );
      }
      if (newQuery.twitter === "") {
        errorArr.push(
          "Enter the appropriate Twitter Handle, not including the @"
        );
      }
      if (errorArr.length === 0) {
        api.submit(newQuery, "query").then((response) => {
          console.log("ressssss: " + response);
          //Resets search text
          $("#sportsQuery-text").val("");
          $("#instaQuery-text").val("");
          $("#twitterQuery-text").val("");
          location.reload();
        });
      } else {
        $.each(errorArr, (index, error) => {
          let newError = $(`<p> ${error(index)} </p>`);
          $("#error-warning").append(newError);
        });
      }
    });
  });
  
  // to take in user queries on hitting enter (top box)
  $("#sportsQuery-text").on("keydown", function (event) {
    if (event.keyCode === 13) {
      $("#error-warning").empty();
      let errorArr = [];
      userQuery = $("#sportsQuery-text").val().trim();
      instagram = $("#instaQuery-text").val().trim();
      twitter = $("#twitterQuery-text").val().trim();
  
      //pull instagram info from api
      var instaSettings = {
        async: true,
        crossDomain: true,
        url:
          "https://instagram9.p.rapidapi.com/api/instagram?kullaniciadi=" +
          instagram +
          "&lang=en",
        method: "GET",
        headers: {
          "x-rapidapi-host": "instagram9.p.rapidapi.com",
          "x-rapidapi-key": "24e7ba1147msh84b2d9ba4889f35p191fc7jsn48829d32f784",
        },
      };
  
      $.ajax(instaSettings).done(function (response) {
        avatar = response.avatar;
  
        var newQuery = {
          userQuery: userQuery,
          instagram: instagram,
          twitter: twitter,
          avatar: avatar,
          UserId: userid,
        };
  
        if (newQuery.userQuery === "") {
          errorArr.push("Enter a player or team to search");
        }
        if (newQuery.instagram === "") {
          errorArr.push(
            "Enter the appropriate Instagram Handle, not including the @"
          );
        }
        if (newQuery.twitter === "") {
          errorArr.push(
            "Enter the appropriate Twitter Handle, not including the @"
          );
        }
  
        if (errorArr.length === 0) {
          api.submit(newQuery, "query").then((response) => {
            //Resets search text
            $("#sportsQuery-text").val("");
            $("#instaQuery-text").val("");
            $("#twitterQuery-text").val("");
            location.reload();
          });
        } else {
          $.each(errorArr, (index, error) => {
            let newError = $(`<p> ${error(index)} </p>`);
            $("#error-warning").append(newError);
          });
        }
      });
    }
  });
  
  // to take in user queries on hitting enter (bottom box)
  $("#instaQuery-text").on("keydown", function (event) {
    if (event.keyCode === 13) {
      $("#error-warning").empty();
      let errorArr = [];
      userQuery = $("#sportsQuery-text").val().trim();
      instagram = $("#instaQuery-text").val().trim();
      twitter = $("#twitterQuery-text").val().trim();
  
      //pull instagram info from api
      var instaSettings = {
        async: true,
        crossDomain: true,
        url:
          "https://instagram9.p.rapidapi.com/api/instagram?kullaniciadi=" +
          instagram +
          "&lang=en",
        method: "GET",
        headers: {
          "x-rapidapi-host": "instagram9.p.rapidapi.com",
          "x-rapidapi-key": "24e7ba1147msh84b2d9ba4889f35p191fc7jsn48829d32f784",
        },
      };
  
      $.ajax(instaSettings).done(function (response) {
        avatar = response.avatar;
  
        var newQuery = {
          userQuery: userQuery,
          instagram: instagram,
          twitter: twitter,
          avatar: avatar,
          UserId: userid,
        };
  
        if (newQuery.userQuery === "") {
          errorArr.push("Enter a player or team to search");
        }
        if (newQuery.instagram === "") {
          errorArr.push(
            "Enter the appropriate Instagram Handle, not including the @"
          );
        }
        if (newQuery.twitter === "") {
          errorArr.push(
            "Enter the appropriate Twitter Handle, not including the @"
          );
        }
  
        if (errorArr.length === 0) {
          api.submit(newQuery, "query").then((response) => {
            //Resets search text
            $("#sportsQuery-text").val("");
            $("#instaQuery-text").val("");
            $("#twitterQuery-text").val("");
            location.reload();
          });
        } else {
          $.each(errorArr, (index, error) => {
            let newError = $(`<p> ${error(index)} </p>`);
            $("#error-warning").append(newError);
          });
        }
      });
    }
  });
  
  $("#twitterQuery-text").on("keydown", function (event) {
    if (event.keyCode === 13) {
      $("#error-warning").empty();
      let errorArr = [];
      userQuery = $("#sportsQuery-text").val().trim();
      instagram = $("#instaQuery-text").val().trim();
      twitter = $("#twitterQuery-text").val().trim();
  
      //pull instagram info from api
      var instaSettings = {
        async: true,
        crossDomain: true,
        url:
          "https://instagram9.p.rapidapi.com/api/instagram?kullaniciadi=" +
          instagram +
          "&lang=en",
        method: "GET",
        headers: {
          "x-rapidapi-host": "instagram9.p.rapidapi.com",
          "x-rapidapi-key": "24e7ba1147msh84b2d9ba4889f35p191fc7jsn48829d32f784",
        },
      };
  
      $.ajax(instaSettings).done(function (response) {
        avatar = response.avatar;
  
        var newQuery = {
          userQuery: userQuery,
          instagram: instagram,
          twitter: twitter,
          avatar: avatar,
          UserId: userid,
        };
  
        if (newQuery.userQuery === "") {
          errorArr.push("Enter a player or team to search");
        }
        if (newQuery.instagram === "") {
          errorArr.push(
            "Enter the appropriate Instagram Handle, not including the @"
          );
        }
        if (newQuery.twitter === "") {
          errorArr.push(
            "Enter the appropriate Twitter Handle, not including the @"
          );
        }
  
        if (errorArr.length === 0) {
          api.submit(newQuery, "query").then((response) => {
            //Resets search text
            $("#sportsQuery-text").val("");
            $("#instaQuery-text").val("");
            $("#twitterQuery-text").val("");
            location.reload();
          });
        } else {
          $.each(errorArr, (index, error) => {
            let newError = $(`<p> ${error(index)} </p>`);
            $("#error-warning").append(newError);
          });
        }
      });
    }
  });
  