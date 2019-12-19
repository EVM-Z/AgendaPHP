<div class="campos">
    <div class="campo">
        <label for="nombre">Nombre:</label>
        <input  type="text" placeholder="Nombre Contacto" id="nombre"
                value="<?php if(isset($contacto['nombre'])) echo $contacto['nombre']; else echo ''; ?>"
        >
    </div>
    <div class="campo">
        <label for="empresa">Empresa:</label>
        <input  type="text" placeholder="Nombre Empresa" id="empresa"
                value="<?php if(isset($contacto['empresa'])) echo $contacto['empresa']; else echo ''; ?>"
        >
    </div>
    <div class="campo">
        <label for="telefono">Teléfono:</label>
        <input  type="tel" placeholder="Numero Telefonico" id="telefono"
                value="<?php if(isset($contacto['telefono'])) echo $contacto['telefono']; else echo ''; ?>"
        >
    </div> 
</div>
<div class="campo enviar">
    <?php
            $textoBtn=(isset($contacto['telefono'])) ? 'Guardar' : 'Añadir';
            $accion=(isset($contacto['telefono'])) ? 'editar' : 'crear';
    ?>
    <input type="hidden" id="accion" value="<?php echo $accion; ?>">
    <?php if(isset($contacto['id'])){ ?>
        <input type="hidden" id="id" value="<?php echo $contacto['id']; ?>">
    <?php } ?>
    <input type="submit" value="<?php echo $textoBtn; ?>">
</div>