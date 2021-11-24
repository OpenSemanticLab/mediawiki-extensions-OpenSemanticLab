<?php

class LabWiki {

	public static function onPageImporterRegisterPageLists( array &$pageLists ) {

		$pageLists['LabWiki'] = [

			// list of pages to create and the corresponding files to use as content
			"pages" => [
				"Template:ELN" => "Template/ELN.mediawiki",
				"Formular:ELN" => "Formular/ELN.mediawiki",
				"Template:ELN/Entry" => "Template/ELN/Entry.mediawiki",
				"Formular:ELN/Entry" => "Formular/ELN/Entry.mediawiki",
				"Template:LabProcess" => "Template/LabProcess.mediawiki",
				"Formular:LabProcess" => "Formular/LabProcess.mediawiki",
				"Template:LabProcess/Footer" => "Template/LabProcess/Footer.mediawiki",
				"Template:LabProcess/Form" => "Template/LabProcess/Form.mediawiki",
				"Template:LabProcess/Form/Device" => "Template/LabProcess/Form/Device.mediawiki",
				"Template:LabProcess/Header" => "Template/LabProcess/Header.mediawiki",
				"Template:LabProcess/Object" => "Template/LabProcess/Object.mediawiki",
				"Template:LabProcess/Parameter" => "Template/LabProcess/Parameter.mediawiki",
				"Template:LabProcess/Parameter/Device" => "Template/LabProcess/Parameter/Device.mediawiki",
				"Template:LabProcess/Query" => "Template/LabProcess/Query.mediawiki",
				"Template:LabProcess/Query/DeviceParam" => "Template/LabProcess/Query/DeviceParam.mediawiki",
				"Template:LabProcess/Query/GenericParam" => "Template/LabProcess/Query/GenericParam.mediawiki",
				"Template:LabProcess/Query/GenericParam/SubQuery" => "Template/LabProcess/Query/GenericParam/SubQuery.mediawiki",
				"Template:LabProcess/Step" => "Template/LabProcess/Step.mediawiki",
				"Template:LabProcess/Step/Descriptor" => "Template/LabProcess/Step/Descriptor.mediawiki",
				"Template:LabProcess/Step/Form" => "Template/LabProcess/Step/Form.mediawiki",
				"Template:LabProcess/Step/Form/Device" => "Template/LabProcess/Step/Form/Device.mediawiki",
				"Template:LabProcess/Step/Form/Footer" => "Template/LabProcess/Step/Form/Footer.mediawiki",
				"Template:LabProcess/Step/Form/Header" => "Template/LabProcess/Step/Form/Header.mediawiki",
				"Template:LabProcess/Step/Form/Param" => "Template/LabProcess/Step/Form/Param.mediawiki",
				"Template:LabProcess/Step/Form/Param/Common" => "Template/LabProcess/Step/Form/Param/Common.mediawiki",
				"Template:LabProcess/Step/Form/Param/Device" => "Template/LabProcess/Step/Form/Param/Device.mediawiki",
				"Template:LabProcess/Step/Form/Param/Device/Fields" => "Template/LabProcess/Step/Form/Param/Device/Fields.mediawiki",
				"Template:LabProcess/Step/Form/Param/Device/Footer" => "Template/LabProcess/Step/Form/Param/Device/Footer.mediawiki",
				"Template:LabProcess/Step/Form/Param/Device/Header" => "Template/LabProcess/Step/Form/Param/Device/Header.mediawiki",
				"Template:LabProcess/Step/Form/Param/Material" => "Template/LabProcess/Step/Form/Param/Material.mediawiki",
				"Template:LabProcess/Step/Form/Param/Material/Fields" => "Template/LabProcess/Step/Form/Param/Material/Fields.mediawiki",
				"Template:LabProcess/Step/Form/Param/Material/Footer" => "Template/LabProcess/Step/Form/Param/Material/Footer.mediawiki",
				"Template:LabProcess/Step/Form/Param/Material/Header" => "Template/LabProcess/Step/Form/Param/Material/Header.mediawiki",
				"Template:LabProcess/Step/Form/Param/Quantitative" => "Template/LabProcess/Step/Form/Param/Quantitative.mediawiki",
				"Template:LabProcess/Step/Form/Param/Quantitative/Fields" => "Template/LabProcess/Step/Form/Param/Quantitative/Fields.mediawiki",
				"Template:LabProcess/Step/Form/Param/Quantitative/Footer" => "Template/LabProcess/Step/Form/Param/Quantitative/Footer.mediawiki",
				"Template:LabProcess/Step/Form/Param/Quantitative/Header" => "Template/LabProcess/Step/Form/Param/Quantitative/Header.mediawiki",
				"Template:LabProcess/Step/Form/Param/Specific" => "Template/LabProcess/Step/Form/Param/Specific.mediawiki",
				"Template:LabProcess/Step/Form/Param/Specific/Footer" => "Template/LabProcess/Step/Form/Param/Specific/Footer.mediawiki",
				"Template:LabProcess/Step/Form/Param/Specific/Header" => "Template/LabProcess/Step/Form/Param/Specific/Header.mediawiki",
				"Template:LabProcess/Step/Subpage" => "Template/LabProcess/Step/Subpage.mediawiki",
				"Template:LabProcess/Step/Subpage/Template" => "Template/LabProcess/Step/Subpage/Template.mediawiki",
				"Template:LabProcess/Steps" => "Template/LabProcess/Steps.mediawiki",
				"Formular:LabProcess/Steps" => "Formular/LabProcess/Steps.mediawiki",
				"Template:LabProcess/Steps/GravimetricDosing" => "Template/LabProcess/Steps/GravimetricDosing.mediawiki",
				"Formular:LabProcess/Steps/GravimetricDosing" => "Formular/LabProcess/Steps/GravimetricDosing.mediawiki",
				"Template:LabProcess/Steps/GravimetricDosing/Subpage" => "Template/LabProcess/Steps/GravimetricDosing/Subpage.mediawiki",
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
