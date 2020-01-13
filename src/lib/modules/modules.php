<?php
namespace sv_gutenform;

class modules extends init {
	public function init() {
		$this->helper_methods->init();
		$this->post_manager->init();
		$this->taxonomy_manager->init();
		$this->archive_manager->init();
		$this->submission_manager->init();
		$this->mail_manager->init();
		$this->personal_data_manager->init();
		$this->sv_gutenform->init();
	}
}