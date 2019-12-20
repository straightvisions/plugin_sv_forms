<form method="POST" class="<?php echo $this->get_form_class(); ?>">
    <?php echo $content; ?>
    <input type="hidden" name="form_id" value="<?php echo $attr['formId']; ?>" />
</form>