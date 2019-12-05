<?php
define ('DB_USUARIO', 'root');
define ('DB_PASSWORD', '');
define ('DB_HOST', 'localhost');
define ('DB_NOMBRE', 'agendaphp');

$conn=new mysqli(DB_HOST, DB_USUARIO, DB_PASSWORD, DB_NOMBRE);
// Comprueba la conexion a la base de datos 1=si 0=no
// echo $conn->ping();
?>