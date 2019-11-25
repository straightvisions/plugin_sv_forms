<div class="<?php echo $this->get_wrapper_class(); ?>">
    <?php if ( isset( $attr['label'] ) && ! empty( $attr['label'] ) ) { ?>
        <label <?php echo $this->get_label_attr(); ?>>
            <?php echo $attr['label']; ?>
        </label>
    <?php } ?>
    <input <?php echo $this->get_input_attr(); ?> />
    <?php if ( isset( $this->block_attr['isRecipient'] ) && $this->block_attr['isRecipient'] ) { ?>
        <input type="hidden" name="recipient" value="<?php echo $this->block_attr['name']; ?>">
    <?php } ?>
</div>