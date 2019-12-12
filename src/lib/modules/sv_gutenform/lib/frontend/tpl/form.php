<form method="POST" class="wp-block-straightvisions-sv-gutenform">
    <?php echo $content; ?>
    <input type="hidden" name="form_id" value="<?php echo $attr['blockId']; ?>" />
</form>
<?php 
    // DEBUG
    var_dump(get_post_meta(get_the_ID(),'_sv_gutenform_forms', true));
?>