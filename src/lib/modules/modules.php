<?php
namespace sv_gutenform;

class modules extends init {
	public function init() {
		$this->sv_gutenform->init();
		$this->archive_manager->init();
		$this->submission_manager->init();
		$this->mail_manager->init();
	}
}