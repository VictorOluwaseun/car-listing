$('#btnSubmit').on('click', function (e) {
  e.preventDefault();
  const email = $('#email').val();
  const password = $('#password').val();
  //if the email and password fields are empty
  if (!email || !password) {
    console.log("Enter your email and password");
    return false;
  }

  $.ajax({
    url: "http://localhost:3000/cars",
    type: "GET",
    success: function (response) {
      for (let i = 0; i < response.length; i++) {

        if (email === response[i].email) {
          if (response[i].password === password) {
            sessionStorage.clear();
            sessionStorage.setItem("userId", JSON.stringify(response[i].id));
            window.location.replace("http://localhost:3000/userui.html");
            return true;
          } else {
            console.log("Enter the right password");
            return false;
          }
        }
      }
      console.log("Invalid email");
      return false;
    }
  });
});