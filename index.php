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
    <link rel="stylesheet" href="cursor.css">
</head>

<body>
    <div id="menu">
        <div id="menuLeft">
            <div class="menuButton activeMenu" id="menuTitle">
                <span class="material-symbols-outlined">title</span>
            </div>
            <div class="menuButton" id="menuDate">
                <span class="material-symbols-outlined">schedule</span>
            </div>
            <div class="menuButton activeMenu" id="menuVersion">
                <span class="material-symbols-outlined">deployed_code</span>
            </div>
            <div class="separator"></div>
            <div class="menuButton activeMenu" id="menuGame">
                <span class="material-symbols-outlined">stadia_controller</span>
            </div>
            <div class="menuButton activeMenu" id="menuExp">
                <span class="material-symbols-outlined">experiment</span>
            </div>
            <div class="menuButton activeMenu" id="menuNews">
                <span class="material-symbols-outlined">newspaper</span>
            </div>
            <div class="separator"></div>
            <div id="searchButton">
                <span class="material-symbols-outlined">search</span>
            </div>
        </div>
        <div id="menuRight">
            <div class="menuButton activeMenu" id="menuList">
                <span class="material-symbols-outlined">sort</span>
            </div>
            <div class="menuButton" id="menuGrid">
                <span class="material-symbols-outlined">grid_on</span>
            </div>
            <div class="separator"></div>
            <div class="menuButton">
                <span class="material-symbols-outlined">filter_alt</span>
                <span class="material-symbols-outlined arrowdown">
                    arrow_drop_down
                </span>
            </div>
        </div>
    </div>
    <div id="carrouselNews">
    </div>
    <div id="carrouselNavigator"></div>
    <div id="gameContainer">
        <?php
        $titles = [];
        $img = [];
        $link = [];
        $versions = [];
        foreach ($query as $row) {
            echo "<div class='game' data-type='" . $row['type'] . "' onclick='start(\"" . $row['link'] . "\", \"game\")'>";
            echo "<img class='imgGame' src='" . $row['img'] . "'></img>";
            echo "<div class='parentGameOnRightImg'>";
            echo "<p class='titreGame'>" . $row['titre'] . "</p>";
            echo "<p class='dateGame'>" . $row['Date'] . "</p>";
            echo "<p class='versionGame'>" . $row['Version'] . "</p>";
            echo "</div>";
            echo "</div>";
            $titles[] = $row['titre'];
            $img[] = $row['img'];
            $link[] = $row['link'];
            $versions[] = $row['Version'];
        }
        echo "<script>const titles = " . json_encode($titles) . ";";
        echo "const img = " . json_encode($img) . ";";
        echo "const link = " . json_encode($link) . ";";
        echo "const versions = " . json_encode($versions) . ";</script>";
        ?>
    </div>
    <div class="cursor"></div>
    <script src="index.js"></script>
    <script type="module" src="cursor.js"></script>
    <!-- php -S 127.0.0.1:8080 -->
</body>

</html>