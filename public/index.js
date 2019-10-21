// const getUserData = {
//     surName: $("#surname").val(),
//     firstName: $("#firstname").val(),
//     gender: $("#gender").val(),
//     email: $("#email").val(),
//     password: $("#password").val(),
//     confirmPassword: $("#confirmpassword").val(),
//     phone: $("#phone").val(),
//     address: $("#address").val()
// };

// console.log(getUserData);

// $("input[type='submit']").on("click", function (e) {
//     e.preventDefault();
// });

$('#loginForm').on('submit', function (e) {
  e.preventDefault();



  // $.ajax({
  //   url: "http://localhost:3000/carslisting",
  //   type: "GET",
  //   success: function (response) {}
  // });
  const userData = {
    surname: $('#surname').val(),
    firstname: $('#firstname').val(),
    gender: $('#gender').val(),
    email: $('#email').val(),
    password: $('#password').val(),
    phone: $('#phone').val(),
    address: $('#address').val()
  };

  const confirmPassword = $('#confirmpassword').val();

  let validUser;
  $.ajax({
    url: "http://localhost:3000/cars",
    type: "GET",
    success: function (response) {
      for (let i = 0; i < response.length; i++) {
        if (response[i].email === userData.email) {
          console.log("email already exists");
          return false;
        }
      }
      //check if password matches confirm password
      if (userData.password !== confirmPassword) {
        console.log("Password not matched!");
        return false;
      }

      // validUser = response.find(function (el) {
      //   return el.email === userData.email;
      // });
      // console.log(validUser);

      $.ajax({
        url: "http://localhost:3000/cars",
        method: "POST",
        data: userData,
        success: function (result) {
          console.log(result);
          window.location.replace("http://localhost:3000/confirm.html");
        },
      });
    }

  });


});