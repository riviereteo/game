<?php
$dsn = "mysql:dbname=u611830779_game;host=89.116.147.52";
$user = 'u611830779_game';
$password = 'Gameteoriviere33';
$pdo = new PDO($dsn, $user, $password);
$sql = "SELECT * FROM `Game`;";
$query = $pdo->query($sql);
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game</title>
    <link rel="stylesheet" href="index.css">
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>

<body>
    <div id="carrouselNews">
    </div>
    <div id="carrouselNavigator"></div>
    <div id="gameContainer">
        <?php
        $titles = [];
        $img = [];
        foreach ($query as $row) {
            echo "<div class='game' data-type='" . $row['type'] . "' onclick='start(\"" . $row['link'] . "\")'>" .
                "<img class='imgGame' src='" . $row['img'] . "'></img>" .
                "<div class='parentGameOnRightImg'>" .
                "<p class='titreGame'>" . $row['titre'] . "</p>" .
                "<p class='dateGame'>" . $row['Date'] . "</p>" .
                "</div>" .
                "</div>";
            array_push($titles, $row['titre']);
            $img[] = $row['img'];
        }
        echo "<script>const titles = " . json_encode($titles) . ";</script>";
        echo "<script>const img = " . json_encode($img) . ";</script>";
        ?>
    </div>
    <script src="index.js"></script>
    <!-- php -S 127.0.0.1:8080 -->
</body>

</html>