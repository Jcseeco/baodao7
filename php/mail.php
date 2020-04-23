<?php

if (isset($_POST['fmail'])) {
    // our mail information
    $mail_to = "c2260801@gmail.com";
    $mail_subject = "官網客服聯絡訊息";

    function died($error)
    {
        // your error code can go here
        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
        echo "These errors appear below.<br /><br />";
        echo $error."<br /><br />";
        echo "Please go back and fix these errors.<br /><br />";
        die();
    }

    // validation expected data exists
    if(!isset($_POST['fname'])
        || !isset($_POST['fmail'])
        || !isset($_POST['fphone'])
        || !isset($_POST['fmessage'])
    ) {
        died('很抱歉!傳送內容似乎有留白處，請重新填寫!');
    }

    $name = $_POST['fname'];
    $mail = $_POST['fmail'];
    $phone = $_POST['fphone'];
    $message = $_POST['fmessage'];

    $error_message = "";

    // validate email
    if(!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
        $error_message .= "email格式不正確!</br>";
    }
    $phone_exp = "/^09[0-9]{8}$/";
    if(!preg_match($phone_exp, $phone)) {
        $error_message .= "手機格式不正確!</br>";
    }
    if(strlen($error_message) > 0) {
        died($error_message);
    }

    $mail_message = "以下為透過官網克服連絡之資訊:\r\n";

    function clean_string($string)
    {
          $bad = array("content-type","bcc:","to:","cc:","href");
          return str_replace($bad, "", $string);
    }

    $mail_message .= "匿稱: ".clean_string($name)."\n";
    $mail_message .= "信箱: ".clean_string($mail)."\n";
    $mail_message .= "手機: ".clean_string($phone)."\n";
    $mail_message .= "訊息: \n".clean_string($message)."\n";

    // mail headers
    $headers = "From: ".$mail."\r\n".
    'Reply-To: '.$mail."\r\n".
    'X-mailer: PHP/' . phpversion();
    @mail($mail_to, $mail_subject, $mail_message, $headers);
    ?>

<script>
    alert("感謝您的聯絡，我們會盡速回覆!");
    location.href = "https://baodao7-mail.com#contact-sec";
</script>
    <?php

}
?>
