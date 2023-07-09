const supabaseUrl = "https://keerrggipsskzhzfzicg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlZXJyZ2dpcHNza3poemZ6aWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NDI2MDAsImV4cCI6MjAwMzQxODYwMH0.MRp3meFNt2rdgxDRXr4_W3-Vdm0qbxxm9dSeRNYr9yQ";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

document
  .getElementById("registration")
  .addEventListener("submit", async function (formEvent) {
    formEvent.preventDefault();
    const form = document.getElementById("main");
    const formData = new FormData(form);
    const userdata = {
      firstname: formData.get("fname"),
      lastname: formData.get("lname"),
      email: formData.get("email"),
      password: formData.get("pass"),
    };
    console.log(userdata);
    const { data: email, error: emerror } = await supabase
      .from("user-form")
      .select("email");
    const isEmailMatched = email.some(
      (entry) => entry.email === userdata.email
    );
    if (
      userdata.password != formData.get("re-pass") ||
      !userdata.email.match(mailformat)
    ) {
      alert(
        "Check if the email is given in correct format and Passwords should be matched"
      );
    } else if (isEmailMatched) {
      alert("You already registered with this email.");
    } else {
      const { data, error } = await supabase
        .from("user-form")
        .insert([userdata]);
      if (error) throw error;
      else console.log("Data inserted");
    }
  });

const handleLogin = document
  .getElementById("login")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    // User Login Form data
    const form = document.getElementById("formlogin");
    const formData = new FormData(form);
    const userdata = {
      email1: formData.get("email1"),
      password1: formData.get("password"),
    };

    // DataBase user data
    const { data: users } = await supabase
      .from("user-form")
      .select("email,password,firstname,lastname")
      .eq("email", userdata.email1)
      .eq("password", userdata.password1);

    // Authorization Check
    let authorized = false;
    let userFullName = "";
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (
        userdata.email1 == user.email &&
        userdata.password1 == user.password
      ) {
        authorized = true;
        userFullName = `Welcome ${user.firstname} ${user.lastname} !`;
        break;
      }
    }
    if (authorized) {
      console.log("Authorization success");
      window.location.href = "home.html";
      alert(userFullName);
      // document.getElementById("userFullName").textContent = userFullName;
    } else {
      console.log("Please enter correct values.");
    }
  });

// document.getElementById("userFullName").innerHTML = userFullName;
document.getElementById("registration").classList.add("hidden");

document.getElementById("new").addEventListener("click", function () {
  document.getElementById("registration").classList.remove("hidden");
  document.getElementById("login").classList.add("hidden");
});

document.getElementById("old").addEventListener("click", function () {
  document.getElementById("registration").classList.add("hidden");
  document.getElementById("login").classList.remove("hidden");
});
