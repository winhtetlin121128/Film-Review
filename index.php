<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div id="popup-alert" class="alert-box hidden">
        <span id="alert-text"></span>
    </div>

    <div class="container">
        <h3>Login</h3>

        <form class="login-form" action="login_register.php" method="post">
            <label>Email</label>
            <input type="email" name="email" placeholder="username" required>

            <label>Password</label>
            <input type="password" name="password" placeholder="password" required>

            <button type="submit" name="login">Login</button>
        </form>
    </div>

    <div class="container2">
        <h3>Sign Up</h3>

        <form class="signup-form" action="login_register.php" method="post">

            <label>Display Name</label>
            <input type="text" name="name" placeholder="name" required>

            <label>Email</label>
            <input type="email" name="email" placeholder="username" required>

            <label>Password</label>
            <input type="password" name="password" placeholder="password" required>

            <button type="submit" name="signup">Sign Up</button>
        </form>
    </div>
    
    <script src="src/access.js"></script>
</body>

<?php
session_start();

$msg = "";
$type = ""; // error or success

if (isset($_SESSION['error'])) {
    $msg = $_SESSION['error'];
    $type = "error";
    unset($_SESSION['error']);
}

if (isset($_SESSION['success'])) {
    $msg = $_SESSION['success'];
    $type = "success";
    unset($_SESSION['success']);
}
?>

<script>
let msg = "<?php echo $msg; ?>";
let type = "<?php echo $type; ?>";

if (msg !== "") {
    let alertBox = document.getElementById("popup-alert");
    let alertText = document.getElementById("alert-text");

    alertText.textContent = msg;
    alertBox.classList.remove("hidden");
    alertBox.classList.add("show");
    alertBox.classList.add(type);

    // Auto-hide after 2 seconds
    setTimeout(() => {
        alertBox.classList.remove("show");
        setTimeout(() => alertBox.classList.add("hidden"), 400);
    }, 2000);
}
</script>
</html>