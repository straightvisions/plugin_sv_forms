<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=<?php bloginfo( 'charset' ); ?>" />
	<title><?php echo $attr['title']; ?></title>
	<?php echo $this->get_styles( $attr['block_styles'] ); ?>
</head>
<body class='<?php echo $this->get_prefix( 'body' ); ?>'>