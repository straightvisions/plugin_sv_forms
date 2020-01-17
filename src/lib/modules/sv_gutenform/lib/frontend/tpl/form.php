<form method="POST" class="<?php echo $this->get_form_class(); ?>">
    <input type="hidden" name="<?php echo $this->get_root()->get_prefix( 'form_id' ) ?>" value="<?php echo $attr['formId']; ?>" tabindex="-1" autocomplete="off" />
    <?php echo $content; ?>
</form>