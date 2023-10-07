<?php
// Conexão com o banco de dados MySQL
$servername = "https://databases-auth.000webhost.com/";
$username = "id17772163_new";
$password = "114811t@F@";
$dbname = "id17772163_new";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifique a conexão
if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados: " . $conn->connect_error);
}

// Receba os dados do formulário
$nome = $_POST['name'];
$email = $_POST['email'];
$mensagem = $_POST['message'];

// Prepare e execute a consulta SQL para inserir os dados
$sql = "INSERT INTO clientes (nome, email, msg) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $nome, $email, $mensagem);

if ($stmt->execute()) {
    echo "Mensagem enviada com sucesso!";
} else {
    echo "Erro ao enviar a mensagem: " . $stmt->error;
}

// Feche a conexão com o banco de dados
$stmt->close();
$conn->close();
?>
