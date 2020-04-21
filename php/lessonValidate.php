<?php
$content = trim(file_get_contents("php://input"));
$decoded = json_decode($content, true);
$lesson_id = $decoded['id'];
$valid_ids = array(1, 6, 7);
echo in_array($lesson_id, $valid_ids);
