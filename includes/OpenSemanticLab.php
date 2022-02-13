<?php

class OpenSemanticLab {

	public static function onPageImporterRegisterPageLists( array &$pageLists ) {

		$pageLists['OpenSemanticLab'] = [

			// list of pages to create and the corresponding files to use as content
			"pages" => [
				"Template:LabProcess" => "Template/LabProcess.mediawiki",
				"Template:LabProcess/Instance/Demo1" => "Template/LabProcess/Instance/Demo1.mediawiki",
				"Template:LabProcess/Step/Form/Param/Common" => "Template/LabProcess/Step/Form/Param/Common.mediawiki",
				"Template:LabProcess/Step/Form/Param/MultiQuantitative/Fields" => "Template/LabProcess/Step/Form/Param/MultiQuantitative/Fields.mediawiki",
				"Template:LabProcess/Parameter" => "Template/LabProcess/Parameter.mediawiki",
				"Template:LabProcess/Steps/MultiObjectSelection/Subpage" => "Template/LabProcess/Steps/MultiObjectSelection/Subpage.mediawiki",
				"Template:LabProcess/Steps/Generic/Subpage" => "Template/LabProcess/Steps/Generic/Subpage.mediawiki",
				"Template:LabProcess/Steps/Generic" => "Template/LabProcess/Steps/Generic.mediawiki",
				"Template:LabProcess/Parameter/MultiObject/Object" => "Template/LabProcess/Parameter/MultiObject/Object.mediawiki",
				"Template:LabProcess/Instance/Demo2" => "Template/LabProcess/Instance/Demo2.mediawiki",
				"Template:LabProcess/Parameter/MultiQuantitative/Quantitative" => "Template/LabProcess/Parameter/MultiQuantitative/Quantitative.mediawiki",
				"Template:LabProcess/Instance" => "Template/LabProcess/Instance.mediawiki",
				"Template:LabProcess/Header" => "Template/LabProcess/Header.mediawiki",
				"Template:LabProcess/Object" => "Template/LabProcess/Object.mediawiki",
				"Template:LabProcess/Footer" => "Template/LabProcess/Footer.mediawiki",
				"Template:LabProcess/Instance/Footer" => "Template/LabProcess/Instance/Footer.mediawiki",
				"Template:LabProcess/Step/Footer" => "Template/LabProcess/Step/Footer.mediawiki",
				"Template:LabProcess/Instance/Header" => "Template/LabProcess/Instance/Header.mediawiki",
				"Template:LabProcess/Step/Subpage" => "Template/LabProcess/Step/Subpage.mediawiki",
				"Template:LabProcess/Step/Form" => "Template/LabProcess/Step/Form.mediawiki",
				"Template:LabProcess/Step/Form/Param/Device/Footer" => "Template/LabProcess/Step/Form/Param/Device/Footer.mediawiki",
				"Template:LabProcess/Step/Form/Param/Device/Fields" => "Template/LabProcess/Step/Form/Param/Device/Fields.mediawiki",
				"Template:LabProcess/Steps/ObjectSelection/Subpage" => "Template/LabProcess/Steps/ObjectSelection/Subpage.mediawiki",
				"Template:LabProcess/Step/Form/Param/Object/Header" => "Template/LabProcess/Step/Form/Param/Object/Header.mediawiki",
				"Template:LabProcess/Steps" => "Template/LabProcess/Steps.mediawiki",
				"Template:LabProcess/Step/Form/Param" => "Template/LabProcess/Step/Form/Param.mediawiki",
				"Template:LabProcess/Step/Form/Param/Specific" => "Template/LabProcess/Step/Form/Param/Specific.mediawiki",
				"Template:LabProcess/Step/Form/Param/Quantitative" => "Template/LabProcess/Step/Form/Param/Quantitative.mediawiki",
				"Template:LabProcess/Query" => "Template/LabProcess/Query.mediawiki",
				"Template:LabProcess/Parameter/MultiQuantitative/ParamArray" => "Template/LabProcess/Parameter/MultiQuantitative/ParamArray.mediawiki",
				"Template:LabProcess/Step/Form/Param/MultiObject" => "Template/LabProcess/Step/Form/Param/MultiObject.mediawiki",
				"Template:LabProcess/Step/Form/Param/MultiQuantitative" => "Template/LabProcess/Step/Form/Param/MultiQuantitative.mediawiki",
				"Template:LabProcess/Step/Form/Param/Device" => "Template/LabProcess/Step/Form/Param/Device.mediawiki",
				"Template:LabProcess/Step/Form/Param/MultiObject/Rows" => "Template/LabProcess/Step/Form/Param/MultiObject/Rows.mediawiki",
				"Template:LabProcess/Parameter/MultiObject" => "Template/LabProcess/Parameter/MultiObject.mediawiki",
				"Template:LabProcess/Step/Form/Param/Multi" => "Template/LabProcess/Step/Form/Param/Multi.mediawiki",
				"Template:LabProcess/Step/Form/Param/Object/Fields" => "Template/LabProcess/Step/Form/Param/Object/Fields.mediawiki",
				"Template:LabProcess/Step/Form/Param/Object/Footer" => "Template/LabProcess/Step/Form/Param/Object/Footer.mediawiki",
				"Template:LabProcess/Query/GenericParam/SubQuery" => "Template/LabProcess/Query/GenericParam/SubQuery.mediawiki",
				"Template:LabProcess/Parameter/Device" => "Template/LabProcess/Parameter/Device.mediawiki",
				"Template:LabProcess/Steps/GravimetricDosing" => "Template/LabProcess/Steps/GravimetricDosing.mediawiki",
				"Template:LabProcess/File" => "Template/LabProcess/File.mediawiki",
				"Template:LabProcess/Step/Form/Param/Material" => "Template/LabProcess/Step/Form/Param/Material.mediawiki",
				"Template:LabProcess/Step/Form/Param/Material/Footer" => "Template/LabProcess/Step/Form/Param/Material/Footer.mediawiki",
				"Template:LabProcess/Step/Form/Param/Material/Fields" => "Template/LabProcess/Step/Form/Param/Material/Fields.mediawiki",
				"Template:LabProcess/Step/Form/Param/Quantitative/Fields" => "Template/LabProcess/Step/Form/Param/Quantitative/Fields.mediawiki",
				"Template:LabProcess/Step/Form/Param/MultiObject/Fields" => "Template/LabProcess/Step/Form/Param/MultiObject/Fields.mediawiki",
				"Template:LabProcess/Steps/MultiObjectSelection" => "Template/LabProcess/Steps/MultiObjectSelection.mediawiki",
				"Template:LabProcess/Step/Form/Param/MultiFile/Rows" => "Template/LabProcess/Step/Form/Param/MultiFile/Rows.mediawiki",
				"Template:LabProcess/Steps/ObjectSelection" => "Template/LabProcess/Steps/ObjectSelection.mediawiki",
				"Template:LabProcess/Step/Form/Param/Device/Header" => "Template/LabProcess/Step/Form/Param/Device/Header.mediawiki",
				"Template:LabProcess/Step/Subpage/Template" => "Template/LabProcess/Step/Subpage/Template.mediawiki",
				"Template:LabProcess/Parameter/MultiQuantitative" => "Template/LabProcess/Parameter/MultiQuantitative.mediawiki",
				"Template:LabProcess/Step/Form/Param/MultiFile/Fields" => "Template/LabProcess/Step/Form/Param/MultiFile/Fields.mediawiki",
				"Template:LabProcess/Step/Form/Param/Multi/SectionHeader" => "Template/LabProcess/Step/Form/Param/Multi/SectionHeader.mediawiki",
				"Template:LabProcess/Object/ObjectCreator" => "Template/LabProcess/Object/ObjectCreator.mediawiki",
				"Template:LabProcess/Step/Form/Param/Quantitative/Header" => "Template/LabProcess/Step/Form/Param/Quantitative/Header.mediawiki",
				"Template:LabProcess/Step/Form/Param/Quantitative/Footer" => "Template/LabProcess/Step/Form/Param/Quantitative/Footer.mediawiki",
				"Template:LabProcess/Parameter/MultiObject/ParamArray" => "Template/LabProcess/Parameter/MultiObject/ParamArray.mediawiki",
				"Template:LabProcess/CreateInstanceLink" => "Template/LabProcess/CreateInstanceLink.mediawiki",
				"Template:LabProcess/Step/Form/Param/Multi/Header" => "Template/LabProcess/Step/Form/Param/Multi/Header.mediawiki",
				"Template:LabProcess/Step" => "Template/LabProcess/Step.mediawiki",
				"Template:LabProcess/Step/Descriptor" => "Template/LabProcess/Step/Descriptor.mediawiki",
				"Template:LabProcess/Step/Form/Header" => "Template/LabProcess/Step/Form/Header.mediawiki",
				"Template:LabProcess/Step/Form/Footer" => "Template/LabProcess/Step/Form/Footer.mediawiki",
				"Template:LabProcess/Step/Form/Param/MultiQuantitative/Rows" => "Template/LabProcess/Step/Form/Param/MultiQuantitative/Rows.mediawiki",
				"Template:LabProcess/Query/DeviceParam" => "Template/LabProcess/Query/DeviceParam.mediawiki",
				"Template:LabProcess/Query/GenericParam" => "Template/LabProcess/Query/GenericParam.mediawiki",
				"Template:LabProcess/Step/Form/Param/Object" => "Template/LabProcess/Step/Form/Param/Object.mediawiki",
				"Template:LabProcess/Steps/GravimetricDosing/Subpage" => "Template/LabProcess/Steps/GravimetricDosing/Subpage.mediawiki",
				"Template:LabProcess/Step/Form/Param/Specific/Header" => "Template/LabProcess/Step/Form/Param/Specific/Header.mediawiki",
				"Template:LabProcess/Step/Form/Param/Specific/Footer" => "Template/LabProcess/Step/Form/Param/Specific/Footer.mediawiki",
				"Template:LabProcess/Step/Form/Param/Material/Header" => "Template/LabProcess/Step/Form/Param/Material/Header.mediawiki",
				"Template:LabProcess/Parameter/MultiFile/File" => "Template/LabProcess/Parameter/MultiFile/File.mediawiki",
				"Template:LabProcess/Parameter/MultiFile/ParamArray" => "Template/LabProcess/Parameter/MultiFile/ParamArray.mediawiki",
				"Form:LabProcess" => "Form/LabProcess.mediawiki",
				"Form:LabProcess/Steps/Generic" => "Form/LabProcess/Steps/Generic.mediawiki",
				"Form:LabProcess/Instance" => "Form/LabProcess/Instance.mediawiki",
				"Form:LabProcess/Steps/GravimetricDosing" => "Form/LabProcess/Steps/GravimetricDosing.mediawiki",
				"Form:LabProcess/Steps/ObjectSelection" => "Form/LabProcess/Steps/ObjectSelection.mediawiki",
				"Form:LabProcess/Steps/MultiObjectSelection" => "Form/LabProcess/Steps/MultiObjectSelection.mediawiki",
				"Form:LabProcess/Steps" => "Form/LabProcess/Steps.mediawiki",
				"Form:ELN" => "Form/ELN.mediawiki",
				"Form:ELN/Entry/Query" => "Form/ELN/Entry/Query.mediawiki",
				"Form:ELN/Entry" => "Form/ELN/Entry.mediawiki",
				"Template:ELN" => "Template/ELN.mediawiki",
				"Template:ELN/Entry/Body" => "Template/ELN/Entry/Body.mediawiki",
				"Template:ELN/Attachment/TimeStampedDoc" => "Template/ELN/Attachment/TimeStampedDoc.mediawiki",
				"Template:ELN/Attachment" => "Template/ELN/Attachment.mediawiki",
				"Template:ELN/Editor/Kekule" => "Template/ELN/Editor/Kekule.mediawiki",
				"Template:ELN/Editor/DrawIO" => "Template/ELN/Editor/DrawIO.mediawiki",
				"Template:ELN/Attachment/TimeStamp" => "Template/ELN/Attachment/TimeStamp.mediawiki",
				"Template:ELN/Entry/Footer" => "Template/ELN/Entry/Footer.mediawiki",
				"Template:ELN/Viewer/Kekule" => "Template/ELN/Viewer/Kekule.mediawiki",
				"Template:ELN/Editor/Kekule/Default" => "Template/ELN/Editor/Kekule/Default.mediawiki",
				"Template:ELN/Editor" => "Template/ELN/Editor.mediawiki",
				"Template:ELN/Viewer" => "Template/ELN/Viewer.mediawiki",
				"Template:ELN/Viewer/Wellplate" => "Template/ELN/Viewer/Wellplate.mediawiki",
				"Template:ELN/Entry" => "Template/ELN/Entry.mediawiki",
				"Template:ELN/Entry/Header" => "Template/ELN/Entry/Header.mediawiki",
				"Template:ELN/Attachment/Verification" => "Template/ELN/Attachment/Verification.mediawiki",
				"Template:ELN/Attachment/Verification/TableHeader" => "Template/ELN/Attachment/Verification/TableHeader.mediawiki",
				"Template:ELN/Attachment/Verification/TableBody" => "Template/ELN/Attachment/Verification/TableBody.mediawiki",
				"Template:ELN/Attachment/Verification/TableFooter" => "Template/ELN/Attachment/Verification/TableFooter.mediawiki",
				"Template:ELN/Entry/Query" => "Template/ELN/Entry/Query.mediawiki",
				"Form:LIMS" => "Form/LIMS.mediawiki",
				"Form:LIMS/Material/Type" => "Form/LIMS/Material/Type.mediawiki",
				"Form:LIMS/Device/Type" => "Form/LIMS/Device/Type.mediawiki",
				"Form:LIMS/Device/Category" => "Form/LIMS/Device/Category.mediawiki",
				"Form:LIMS/Material/Category" => "Form/LIMS/Material/Category.mediawiki",
				"Form:LIMS/File/Type" => "Form/LIMS/File/Type.mediawiki",
				"Form:LIMS/File/Category" => "Form/LIMS/File/Category.mediawiki",
				"Form:LIMS/Device" => "Form/LIMS/Device.mediawiki",
				"Form:LIMS/Material" => "Form/LIMS/Material.mediawiki",
				"Form:LIMS/Device/Instance" => "Form/LIMS/Device/Instance.mediawiki",
				"Form:LIMS/Material/Instance" => "Form/LIMS/Material/Instance.mediawiki",
				"Template:LIMS" => "Template/LIMS.mediawiki",
				"Template:LIMS/Device/Instance" => "Template/LIMS/Device/Instance.mediawiki",
				"Template:LIMS/Device/Type" => "Template/LIMS/Device/Type.mediawiki",
				"Template:LIMS/Device/Category" => "Template/LIMS/Device/Category.mediawiki",
				"Template:LIMS/Form/Common/Header" => "Template/LIMS/Form/Common/Header.mediawiki",
				"Template:LIMS/Material/Type" => "Template/LIMS/Material/Type.mediawiki",
				"Template:LIMS/Material/Instance" => "Template/LIMS/Material/Instance.mediawiki",
				"Template:LIMS/Material/Category" => "Template/LIMS/Material/Category.mediawiki",
				"Template:LIMS/File/Type" => "Template/LIMS/File/Type.mediawiki",
				"Template:LIMS/Common/Property" => "Template/LIMS/Common/Property.mediawiki",
				"Template:LIMS/Common" => "Template/LIMS/Common.mediawiki",
				"Template:LIMS/File/Category" => "Template/LIMS/File/Category.mediawiki",
				"Template:LIMS/Form/Common/Footer" => "Template/LIMS/Form/Common/Footer.mediawiki",
				"Template:LIMS/Common/Category/Footer" => "Template/LIMS/Common/Category/Footer.mediawiki",
				"Template:LIMS/Common/Template" => "Template/LIMS/Common/Template.mediawiki",
				"Template:LIMS/Common/Category/Header" => "Template/LIMS/Common/Category/Header.mediawiki",
				"Template:LIMS/Device" => "Template/LIMS/Device.mediawiki",
				"Template:LIMS/Form/Common" => "Template/LIMS/Form/Common.mediawiki",
				"Template:LIMS/Form/Common/Category/Header" => "Template/LIMS/Form/Common/Category/Header.mediawiki",
				"Template:LIMS/Common/Link" => "Template/LIMS/Common/Link.mediawiki",
				"Concept:LIMS/Object/Category" => "Concept/LIMS/Object/Category.mediawiki",
				"Concept:LIMS/Material/Category" => "Concept/LIMS/Material/Category.mediawiki",
				"Concept:LIMS/File/Category" => "Concept/LIMS/File/Category.mediawiki",
				"Concept:LIMS/Device/Category" => "Concept/LIMS/Device/Category.mediawiki",
				"Template:Property" => "Template/Property.mediawiki",
				"Template:Property/Quantitative" => "Template/Property/Quantitative.mediawiki",
				"Template:Property/Quantity" => "Template/Property/Quantity.mediawiki",
				"Template:Property/Quantity/Unit" => "Template/Property/Quantity/Unit.mediawiki",
				"Form:Property/Quantity" => "Form/Property/Quantity.mediawiki",
				"Form:Property/Subquantity" => "Form/Property/Subquantity.mediawiki",
				"Category:File" => "Category/File.mediawiki",
				"Category:Device" => "Category/Device.mediawiki",
				"Category:Material" => "Category/Material.mediawiki",
			],

			// base dir for imported pages
			"root" => dirname(__DIR__) . '/importPages',

			// edit summary used when PageImporter edits pages
			"comment" => "Updated with content from Extension:OpenSemanticLab version 0.0.3"
		];

	}

	public static function onBeforePageDisplay( $out ) {

		//handle css explicitly, see https://www.mediawiki.org/wiki/ResourceLoader/Developing_with_ResourceLoader#CSS_2
		$out->addModuleStyles( 'ext.OpenSemanticLab.LIMS.styles' );

		$out->addModules( 'ext.OpenSemanticLab.editor' );

		return true;

	}

        public static function onSkinTemplateNavigation( &$skin, &$links ) {
       		// Add an additional link
       		//https://stackoverflow.com/questions/18442495/how-to-get-current-page-url-in-mediawiki
      		$links['views']['subpage'] = array(
			'class' => false, // false or 'selected', defines whether the tab should be highlighted
			'text' => wfMessage('open-semantic-lab-create-subpage'), // what the tab says
			'href' => "https://$_SERVER[HTTP_HOST]/wiki/CreatePage?superpage=" . $skin->getTitle()->getDBkey(),
		);

		//not placed properly with Skin:Timeless -> use javascript
		//$request = $skin->getRequest();
		//$reveal = $request->getText( 'reveal' );
		//$links['actions']['slide'] = array(
		//	'class' => ( $reveal == 'true') ? 'selected' : false,
		//	'text' => "Slideshow",
		//	'href' => $skin->makeArticleUrlDetails($skin->getTitle()->getFullText(), 'reveal=true' )['href']
		//);

        	return true;
        }

}