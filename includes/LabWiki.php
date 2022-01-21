<?php

class LabWiki {

	public static function onPageImporterRegisterPageLists( array &$pageLists ) {

		$pageLists['LabWiki'] = [

			// list of pages to create and the corresponding files to use as content
			"pages" => [
				"Formular:ELN" => "Formular/ELN.mediawiki",
				"Template:ELN" => "Template/ELN.mediawiki",
				"Template:ELN/Attachment" => "Template/ELN/Attachment.mediawiki",
				"Template:ELN/Attachment/TimeStamp" => "Template/ELN/Attachment/TimeStamp.mediawiki",
				"Template:ELN/Attachment/TimeStampedDoc" => "Template/ELN/Attachment/TimeStampedDoc.mediawiki",
				"Template:ELN/Attachment/Verification" => "Template/ELN/Attachment/Verification.mediawiki",
				"Template:ELN/Attachment/Verification/TableBody" => "Template/ELN/Attachment/Verification/TableBody.mediawiki",
				"Template:ELN/Attachment/Verification/TableFooter" => "Template/ELN/Attachment/Verification/TableFooter.mediawiki",
				"Template:ELN/Attachment/Verification/TableHeader" => "Template/ELN/Attachment/Verification/TableHeader.mediawiki",
				"Template:ELN/Editor" => "Template/ELN/Editor.mediawiki",
				"Template:ELN/Editor/DrawIO" => "Template/ELN/Editor/DrawIO.mediawiki",
				"Template:ELN/Editor/Kekule" => "Template/ELN/Editor/Kekule.mediawiki",
				"Formular:ELN/Entry" => "Formular/ELN/Entry.mediawiki",
				"Template:ELN/Entry" => "Template/ELN/Entry.mediawiki",
				"Template:ELN/Entry/Body" => "Template/ELN/Entry/Body.mediawiki",
				"Template:ELN/Entry/Footer" => "Template/ELN/Entry/Footer.mediawiki",
				"Template:ELN/Entry/Header" => "Template/ELN/Entry/Header.mediawiki",
				"Template:ELN/Entry/Query" => "Template/ELN/Entry/Query.mediawiki",
				"Formular:ELN/Entry/Query" => "Formular/ELN/Entry/Query.mediawiki",
				"Template:ELN/Viewer" => "Template/ELN/Viewer.mediawiki",
				"Template:ELN/Viewer/Kekule" => "Template/ELN/Viewer/Kekule.mediawiki",
				"Template:ELN/Viewer/Wellplate" => "Template/ELN/Viewer/Wellplate.mediawiki",
				"Template:LIMS" => "Template/LIMS.mediawiki",
				"Formular:LIMS" => "Formular/LIMS.mediawiki",
				"Template:LIMS/Common" => "Template/LIMS/Common.mediawiki",
				"Template:LIMS/Form" => "Template/LIMS/Form.mediawiki",
				"Template:LIMS/Form/Common" => "Template/LIMS/Form/Common.mediawiki",
				"Template:LIMS/Form/Common/Footer" => "Template/LIMS/Form/Common/Footer.mediawiki",
				"Template:LIMS/Form/Common/Header" => "Template/LIMS/Form/Common/Header.mediawiki",
				"Formular:LIMS/Material" => "Formular/LIMS/Material.mediawiki",
				"Concept:LIMS/Material" => "Concept/LIMS/Material.mediawiki",
				"Template:LIMS/Material" => "Template/LIMS/Material.mediawiki",
				"Template:LIMS/Material/Category" => "Template/LIMS/Material/Category.mediawiki",
				"Formular:LIMS/Material/Category" => "Formular/LIMS/Material/Category.mediawiki",
				"Concept:LIMS/Material/Category" => "Concept/LIMS/Material/Category.mediawiki",
				"Formular:LIMS/Material/Instance" => "Formular/LIMS/Material/Instance.mediawiki",
				"Template:LIMS/Material/Instance" => "Template/LIMS/Material/Instance.mediawiki",
				"Formular:LIMS/Material/Type" => "Formular/LIMS/Material/Type.mediawiki",
				"Template:LIMS/Material/Type" => "Template/LIMS/Material/Type.mediawiki",
				"Formular:LabProcess" => "Formular/LabProcess.mediawiki",
				"Template:LabProcess" => "Template/LabProcess.mediawiki",
				"Template:LabProcess/CreateInstanceLink" => "Template/LabProcess/CreateInstanceLink.mediawiki",
				"Template:LabProcess/File" => "Template/LabProcess/File.mediawiki",
				"Template:LabProcess/Footer" => "Template/LabProcess/Footer.mediawiki",
				"Template:LabProcess/Form" => "Template/LabProcess/Form.mediawiki",
				"Template:LabProcess/Form/Device" => "Template/LabProcess/Form/Device.mediawiki",
				"Template:LabProcess/Header" => "Template/LabProcess/Header.mediawiki",
				"Formular:LabProcess/Instance" => "Formular/LabProcess/Instance.mediawiki",
				"Template:LabProcess/Instance" => "Template/LabProcess/Instance.mediawiki",
				"Template:LabProcess/Instance/Footer" => "Template/LabProcess/Instance/Footer.mediawiki",
				"Template:LabProcess/Instance/Header" => "Template/LabProcess/Instance/Header.mediawiki",
				"Template:LabProcess/Object" => "Template/LabProcess/Object.mediawiki",
				"Template:LabProcess/Parameter" => "Template/LabProcess/Parameter.mediawiki",
				"Template:LabProcess/Parameter/Device" => "Template/LabProcess/Parameter/Device.mediawiki",
				"Template:LabProcess/Query" => "Template/LabProcess/Query.mediawiki",
				"Template:LabProcess/Query/DeviceParam" => "Template/LabProcess/Query/DeviceParam.mediawiki",
				"Template:LabProcess/Query/GenericParam" => "Template/LabProcess/Query/GenericParam.mediawiki",
				"Template:LabProcess/Query/GenericParam/SubQuery" => "Template/LabProcess/Query/GenericParam/SubQuery.mediawiki",
				"Template:LabProcess/Step" => "Template/LabProcess/Step.mediawiki",
				"Template:LabProcess/Step/Descriptor" => "Template/LabProcess/Step/Descriptor.mediawiki",
				"Template:LabProcess/Step/Footer" => "Template/LabProcess/Step/Footer.mediawiki",
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
				"Template:LabProcess/Step/Form/Param/MultiObject" => "Template/LabProcess/Step/Form/Param/MultiObject.mediawiki",
				"Template:LabProcess/Step/Form/Param/MultiObject/Fields" => "Template/LabProcess/Step/Form/Param/MultiObject/Fields.mediawiki",
				"Template:LabProcess/Step/Form/Param/Object" => "Template/LabProcess/Step/Form/Param/Object.mediawiki",
				"Template:LabProcess/Step/Form/Param/Object/Fields" => "Template/LabProcess/Step/Form/Param/Object/Fields.mediawiki",
				"Template:LabProcess/Step/Form/Param/Object/Footer" => "Template/LabProcess/Step/Form/Param/Object/Footer.mediawiki",
				"Template:LabProcess/Step/Form/Param/Object/Header" => "Template/LabProcess/Step/Form/Param/Object/Header.mediawiki",
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
				"Formular:LabProcess/Steps/GravimetricDosing" => "Formular/LabProcess/Steps/GravimetricDosing.mediawiki",
				"Template:LabProcess/Steps/GravimetricDosing" => "Template/LabProcess/Steps/GravimetricDosing.mediawiki",
				"Template:LabProcess/Steps/GravimetricDosing/Subpage" => "Template/LabProcess/Steps/GravimetricDosing/Subpage.mediawiki",
				"Formular:LabProcess/Steps/MultiObjectSelection" => "Formular/LabProcess/Steps/MultiObjectSelection.mediawiki",
				"Template:LabProcess/Steps/MultiObjectSelection" => "Template/LabProcess/Steps/MultiObjectSelection.mediawiki",
				"Template:LabProcess/Steps/MultiObjectSelection/Object" => "Template/LabProcess/Steps/MultiObjectSelection/Object.mediawiki",
				"Template:LabProcess/Steps/MultiObjectSelection/Subpage" => "Template/LabProcess/Steps/MultiObjectSelection/Subpage.mediawiki",
				"Formular:LabProcess/Steps/ObjectSelection" => "Formular/LabProcess/Steps/ObjectSelection.mediawiki",
				"Template:LabProcess/Steps/ObjectSelection" => "Template/LabProcess/Steps/ObjectSelection.mediawiki",
				"Template:LabProcess/Steps/ObjectSelection/Subpage" => "Template/LabProcess/Steps/ObjectSelection/Subpage.mediawiki",
				"Category:211112-sist-0001-mc" => "Category/211112-sist-0001-mc.mediawiki",
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
		$smwgNamespacesWithSemanticLinks[NS_ROOM] = true;
		$smwgNamespacesWithSemanticLinks[NS_PROJECT] = true;
		$smwgNamespacesWithSemanticLinks[NS_LABNOTE] = true;
		$smwgNamespacesWithSemanticLinks[NS_LABPROCESS] = true;
		$smwgNamespacesWithSemanticLinks[NS_LABOBJECT] = true;

		global $wgNamespaceContentModels;        
		$wgNamespaceContentModels[NS_MATERIAL_TALK] = 'flow-board';
		$wgNamespaceContentModels[NS_DEVICE_TALK] = 'flow-board';
		$wgNamespaceContentModels[NS_ROOM_TALK] = 'flow-board';
		$wgNamespaceContentModels[NS_PROJECT_TALK] = 'flow-board';
		$wgNamespaceContentModels[NS_LABNOTE_TALK] = 'flow-board';
		$wgNamespaceContentModels[NS_LABPROCESS_TALK] = 'flow-board';
		$wgNamespaceContentModels[NS_LABOBJECT_TALK] = 'flow-board';
        
		return true;

	}

}
