<?php

if (mail('denis.raslov@yandex.ru', 'Message from the CV site', $_POST['message'])) {
    echo '{ result: 1 }';
} else {
    echo '{ result: 0 }';    
}

?>
