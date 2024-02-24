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
    <div id="gameContainer">
        <?php
        foreach ($query as $row) {
            echo "<div class='game' data-type='" . $row['type'] . "' onclick='start(\"" . $row['link'] . "\")'>" .
                "<img class='imgGame' src='" . $row['img'] . "'></img>" .
                "<div class='parentGameOnRightImg'>" .
                "<p class='titreGame'>" . $row['titre'] . "</p>" .
                "<p class='dateGame'>" . $row['Date'] . "</p>" .
                "</div>" .
                "</div>";
        }
        ?>
    </div>
    <script src="index.js"></script>
    <?php
        $tab = [];
        foreach ($query as $row) {
            $tab[] = $row['titre'];
        }
        $tab = json_encode($tab);
        echo "<script>let titles = " . $tab . ";</script>";
        ?>
        <script>
            let page = 1;
            const apiUrl = `https://api.github.com/repos/riviereteo/game/commits`;
            const carrouselNews = document.getElementById('carrouselNews');
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    while (page < 10) {
                        const words = data[page].commit.message.split(" ");
                        let display = false;
                        for (let i = 0; i < words.length; i++) {
                            if (titles.includes(words[i])) {
                                display = true;
                                break;
                            }
                        }
                        if (display) {
                            const messageText = document.createElement('p');
                            messageText.innerHTML = data[page].commit.message;
                            const dateText = document.createElement('p');
                            const date = data[page].commit.author.date;
                            dateText.innerHTML = date.substring(8, 10) + '/' + date.substring(5, 7) + '/' + date.substring(0, 4)
                            carrouselNews.appendChild(messageText);
                            carrouselNews.appendChild(dateText);
                        }
                        page++;
                    }
                });
        </script>
    <!-- php -S 127.0.0.1:8080 -->
</body>

</html>