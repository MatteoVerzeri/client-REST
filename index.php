<?php

// Connessione al database
$servername = "localhost";
$username = "roott";
$password = "roott";
$dbname = "cinematografia";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica della connessione
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

//echo $_SERVER['REQUEST_URI'];

$array = explode('/',$_SERVER['REQUEST_URI']); 
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header("Content-Type:application/json");   
    $body=file_get_contents('php://input');
    $data = json_decode($body,true);
    $nome=$data["nome"];
    $cognome=$data["cognome"];
    $datanascita=$data["data_di_nascita"];
    $datamorte=$data["data_di_morte"];
    if($datamorte=="")
        $sql = " INSERT INTO attori (nome, cognome, data_di_nascita, data_di_morte) VALUES ('$nome','$cognome','$datanascita',NULL)";
    else
        $sql = " INSERT INTO attori (nome, cognome, data_di_nascita, data_di_morte) VALUES ('$nome','$cognome','$datanascita','$datamorte')";
    $result = $conn->query($sql);
    http_response_code(200); 
}
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    header("Content-Type:application/json");
    $url=$_SERVER['REQUEST_URI'];
    $id=explode("/",$url)[3];
    $body=file_get_contents('php://input');
    $data = json_decode($body,true);
    $nome=$data["nome"];
    $cognome=$data["cognome"];
    $datanascita=$data["data_di_nascita"];
    $datamorte=$data["data_di_morte"];
    try{
    if($datamorte=="")
        $sql = "UPDATE attori SET nome= '$nome',cognome='$cognome',data_di_nascita='$datanascita',data_di_morte=NULL  WHERE id = '$id'" ;
    else
        $sql = "UPDATE attori SET nome= '$nome',cognome='$cognome',data_di_nascita='$datanascita',data_di_morte='$datamorte'  WHERE id = '$id'" ;
    $result = $conn->query($sql);
    echo  http_response_code(200);
    }
    catch(Exception $ecc){
        http_response_code(405);
    }
}
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    if (count($array) == 3 && $array[2] != '')
    {
        $id = $array[2];
        $sql = "DELETE FROM attori WHERE id = '$id'";
        $result = $conn->query($sql);   
            http_response_code(200); 

    }
    else if(count($array) == 3 && $array[2] == '')
    {
        // Se non è specificato un ID nella richiesta GET
        $sql = "SELECT * FROM attori";
        $result = $conn->query($sql);
       
        if ($result->num_rows > 0) {
            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            echo json_encode($rows);
        } else {
            http_response_code(404);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (count($array) == 3 && $array[2] != '')
    {
        // Se è specificato un ID nella richiesta GET
        $id = $array[2];
        $sql = "SELECT * FROM attori WHERE id = '$id'";
        $result = $conn->query($sql);   
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            echo json_encode($row);
        } else {
            echo "Nessun risultato trovato con ID $id";
        }
    }
    else if(count($array) == 3 && $array[2] == '')
    {
        // Se non è specificato un ID nella richiesta GET
        $sql = "SELECT * FROM attori";
        $result = $conn->query($sql);
       
        if ($result->num_rows > 0) {
            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            echo json_encode($rows);
        } else {
            http_response_code(404);
        }
    }
}


$conn->close();

?>
