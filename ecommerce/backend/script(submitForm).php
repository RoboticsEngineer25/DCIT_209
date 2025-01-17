<?php
// Database connection
$servername = "Local Instance";
$username = "root";
$password = "2004";
$dbname = "sphinx";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Collect form data
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Encrypt the password
$first_name = $_POST['fname'];
$last_name = $_POST['lname'];
$phone_prefix = $_POST['country'];
$phone_number = $_POST['telno'];
$gender = $_POST['gender'];
$birth_date = $_POST['bdate'];
$newsletter_opt_in = isset($_POST['news']) ? 1 : 0;
$terms_accepted = isset($_POST['tnc']) ? 1 : 0;

// Prepare and execute SQL query
$stmt = $conn->prepare("INSERT INTO users (email, password, first_name, last_name, phone_prefix, phone_number, gender, birth_date, newsletter_opt_in, terms_accepted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssssssii", $email, $password, $first_name, $last_name, $phone_prefix, $phone_number, $gender, $birth_date, $newsletter_opt_in, $terms_accepted);

if ($stmt->execute()) {
    echo "Account created successfully!";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
