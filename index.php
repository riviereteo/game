<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="index.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>

<body>
    <!-- php -S 127.0.0.1:8080 -->
    <?php
    $dsn = "mysql:dbname=u611830779_game;host=89.116.147.52";
    $user = 'u611830779_game';
    $password = 'Gameteoriviere33';
    $pdo = new PDO($dsn, $user, $password);
    $sql = "SELECT `Test`.`testString`FROM `Test`;";
    $query = $pdo->query($sql);
    foreach ($query as $row) {
    echo 'Nom : ' . $row['testString']. "\n";
    }
    ?>
    <script src="index.js"></script>
</body>

</html>