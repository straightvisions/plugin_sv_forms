<?php
namespace sv_gutenform;

class modules extends init {
	public function init() {
		$this->helper_methods->init();
		$this->post->init();
		$this->taxonomy->init();
		$this->archive->init();
		$this->submission->init();
		$this->mail->init();
		$this->personal_data->init();
		$this->sv_gutenform->init();
	}
}