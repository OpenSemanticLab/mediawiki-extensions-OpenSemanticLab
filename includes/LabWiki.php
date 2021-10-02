<?php

class LabWiki {

	public static function onPageImporterRegisterPageLists( array &$pageLists ) {

		$pageLists['SemanticActions'] = [

			// list of pages to create and the corresponding files to use as content
			"pages" => [
				"Template:LabProcess" => "Template/LabProcess.mediawiki",
				"Template:LabProcess/Footer" => "Template/LabProcess/Footer.mediawiki",
				"Template:LabProcess/Form" => "Template/LabProcess/Form.mediawiki",
				"Template:LabProcess/Form/CommonParameters" => "Template/LabProcess/Form/CommonParameters.mediawiki",
				"Template:LabProcess/Form/Device" => "Template/LabProcess/Form/Device.mediawiki",
				"Template:LabProcess/Form/Device/Fields" => "Template/LabProcess/Form/Device/Fields.mediawiki",
				"Template:LabProcess/Form/Device/Footer" => "Template/LabProcess/Form/Device/Footer.mediawiki",
				"Template:LabProcess/Form/Device/Header" => "Template/LabProcess/Form/Device/Header.mediawiki",
				"Template:LabProcess/Form/Footer" => "Template/LabProcess/Form/Footer.mediawiki",
				"Template:LabProcess/Form/Header" => "Template/LabProcess/Form/Header.mediawiki",
				"Template:LabProcess/Header" => "Template/LabProcess/Header.mediawiki",
				"Template:LabProcess/Object" => "Template/LabProcess/Object.mediawiki",
				"Template:LabProcess/Step" => "Template/LabProcess/Step.mediawiki",
				"Template:LabProcess/Step/Descriptor" => "Template/LabProcess/Step/Descriptor.mediawiki",
			],

			// base dir for imported pages
			"root" => dirname(__DIR__) . '/importPages',

			// edit summary used when PageImporter edits pages
			"comment" => "Updated with content from Extension:LabWiki version 0.0.1"
		];

	}

	public static function onBeforePageDisplay( $out ) {

		$out->addModuleStyles( 'ext.LabWiki.styles' );

		return true;

	}

	public static function onSetupAfterCache( ) {

		global $smwgNamespacesWithSemanticLinks;

		$smwgNamespacesWithSemanticLinks[NS_MATERIAL] = true;
		$smwgNamespacesWithSemanticLinks[NS_DEVICE] = true;

		return true;

	}

}
