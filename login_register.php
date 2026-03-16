<?php
session_start();
require_once 'config.php';

// ---------- SIGN UP ----------
if (isset($_POST['signup'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // check if email exists
    $checkEmail = $conn->query("SELECT * FROM users WHERE email='$email' ");

    if ($checkEmail->num_rows > 0) {
        $_SESSION['error'] = "This email is already registered!";
        header("Location: index.php");
        exit();
    }

    // insert user
    $conn->query("INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')");

    $_SESSION['success'] = "Account created successfully! Please login.";
    header("Location: index.php");
    exit();
}



// ---------- LOGIN ----------
if (isset($_POST['login'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $result = $conn->query("SELECT * FROM users WHERE email='$email'");

    if ($result->num_rows == 0) {
        $_SESSION['error'] = "Email not found!";
        header("Location: index.php");
        exit();
    }

    $user = $result->fetch_assoc();

    // verify password
    if (!password_verify($password, $user['password'])) {
        $_SESSION['error'] = "Incorrect password!";
        header("Location: index.php");
        exit();
    }

    // SUCCESS login
    $_SESSION['user'] = $user['name']; 
    header("Location: src/main.html");
    exit();
}
?>