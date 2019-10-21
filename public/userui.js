const getIdFromSS = JSON.parse(sessionStorage.getItem("userId"));
let carLists;

// $(document).ready(function () {
$.ajax({
  url: `http://localhost:3000/cars/${getIdFromSS}`,
  type: "GET",
  success: function (response) {
    $("#username").text(response.firstname);
    if (!response.carLists) {
      $("#no-of-cars").text("no");
    } else {
      $("#no-of-cars").text(response.carLists.length);
      var output = "";
      for (let i = 0; i < response.carLists.length; i++) {
        output += `<div class="col-sm-3" style="margin: 2rem;">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${response.carLists[i].image}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">Brand: ${response.carLists[i].brand}</h5>
                <p class="card-text">Model: ${response.carLists[i].model}</p>
                <p class="card-text">Year: ${response.carLists[i].year}</p>
                <p class="card-text">Price: ${response.carLists[i].price}</p>
                <p class="card-text">Color: ${response.carLists[i].color}</p>
                <a href="#showform" class="btn btn-warning" data-carId=${i}>update</a>
                <a class="btn btn-danger" data-carId=${i}>delete</a>
            </div>
            </div>
            </div>`;
        $("#display-cars").html(output);
      }
    }
    //delete car
    $(".card").on("click", function (e) {
      e.preventDefault();
      if ($(e.target).hasClass("btn-danger")) {
        let carId = $(e.target).attr("data-carId");
        carLists = response.carLists;
        carLists.splice(carId, 1);
        $.ajax({
          method: "PATCH",
          contentType: 'application/json',
          data: JSON.stringify({
            carLists
          }), //stringify is important,
          url: `http://localhost:3000/cars/${getIdFromSS}`,
          success: function (response) {
            console.log("done!");
          }
        });
        // $(".card").unhide();
        location.reload();
      }
    });
    let carId;
    //To update a car
    $(".card").on("click", function (e) {
      e.preventDefault();
      if ($(e.target).hasClass("btn-warning")) {
        carId = $(e.target).attr("data-carId");
        carLists = response.carLists;
        console.log(carLists[carId]);

        $("#brand").val(carLists[carId].brand);
        $("#model").val(carLists[carId].model);
        $("#year").val(carLists[carId].year);
        $("#price").val(carLists[carId].price);
        $("#color").val(carLists[carId].color);
        $("#image").val(carLists[carId].image);

        $(".create").css("display", "none");
        $(".update").css("display", "block");

      }
    });

    //Update
    $(".update").on("click", function (e) {
      e.preventDefault();
      carLists[carId].brand = $("#brand").val();
      carLists[carId].model = $("#model").val();
      carLists[carId].year = $("#year").val();
      carLists[carId].price = $("#price").val();
      carLists[carId].color = $("#color").val();
      carLists[carId].image = $("#image").val();

      $.ajax({
        method: "PATCH",
        contentType: 'application/json',
        data: JSON.stringify({
          carLists
        }), //stringify is important,
        url: `http://localhost:3000/cars/${getIdFromSS}`,
        success: function (response) {
          console.log("done!");
        }
      });
      $(".create").css("display", "display");
      location.reload();
    });

    //To add a car
    $(".create").on("click", function (e) {
      e.preventDefault();
      // A get request to ger user's carlists
      //push new item into carLists
      //send back to database through patch request

      //To check if there is carList
      if (!response.carLists) {
        carLists = [];
      } else {
        carLists = response.carLists;
      }

      carLists.push({
        brand: $("#brand").val(),
        model: $("#model").val(),
        year: $("#year").val(),
        price: $("#price").val(),
        color: $("#color").val(),
        image: $("#image").val()
      });

      $.ajax({
        method: "PATCH",
        contentType: 'application/json',
        data: JSON.stringify({
          carLists
        }), //stringify is important,
        url: `http://localhost:3000/cars/${getIdFromSS}`,
        success: function (response) {
          console.log("done!");
        }
      });
      location.reload();
      //clear form after creating a car
    });
  }
});

// });