<?php 
    if($_POST['accion']=='crear'){
        // Creara un nuevo registro en la base de datos
        require_once('../funciones/db.php');
        // Validar la sentradas
        $nombre=filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
        $empresa=filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
        $telefono=filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);

        try{
            $stmt=$conn->prepare("INSERT INTO contactos (nombre, empresa, telefono) VALUES(?, ?, ?)");
            // s significa string, en este caso, vamos a meter tres strings
            $stmt->bind_param("sss", $nombre, $empresa, $telefono);
            $stmt->execute();
            if($stmt->affected_rows==1){
                $respuesta=array(
                    'respuesta'=>'correcto',
                    
                    'datos'=>array(
                        'nombre'=>$nombre,
                        'empresa'=>$empresa,
                        'telefono'=>$telefono,
                        'id_insertado'=>$stmt->insert_id
                    )
                );
            }
            $stmt->close();
            $conn->close();
        }
        catch(Exception $e){
            $respuesta=array(
                'error'=>$e->getMessage()
            );
        }
        echo json_encode($respuesta);
    }
?>