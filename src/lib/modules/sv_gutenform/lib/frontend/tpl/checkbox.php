<div class="<?php echo $this->get_wrapper_class(); ?>">
    <input <?php echo $this->get_checkbox_attr(); ?> />
    <?php if ( isset( $attr['label'] ) && ! empty( $attr['label'] ) ) { ?>
        <label <?php echo $this->get_label_attr(); ?>>
            <?php echo $attr['label']; ?>
        </label>
    <?php } ?>
</div>