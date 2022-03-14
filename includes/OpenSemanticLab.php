<?php

class OpenSemanticLab {

	public static function onPageImporterRegisterPageLists( array &$pageLists ) {

		$pageLists['OpenSemanticLab'] = [

			// list of pages to create and the corresponding files to use as content
			"pages" => [
				"Category:Device" => "Category/Device.mediawiki",
				"Category:File" => "Category/File.mediawiki",
				"Category:Material" => "Category/Material.mediawiki",
				"Category:OSL" => "Category/OSL.mediawiki",
				"Category:OSL/Infrastructure" => "Category/OSL/Infrastructure.mediawiki",
				"Category:OSL/Infrastructure/Template" => "Category/OSL/Infrastructure/Template.mediawiki",
				"Category:OSL/Infrastructure/Template/User" => "Category/OSL/Infrastructure/Template/User.mediawiki",
				"Concept:LIMS/Device/Category" => "Concept/LIMS/Device/Category.mediawiki",
				"Concept:LIMS/File/Category" => "Concept/LIMS/File/Category.mediawiki",
				"Concept:LIMS/Material/Category" => "Concept/LIMS/Material/Category.mediawiki",
				"Concept:LIMS/Object/Category" => "Concept/LIMS/Object/Category.mediawiki",
				"Form:ELN" => "Form/ELN.mediawiki",
				"Form:ELN/Editor/DataSet" => "Form/ELN/Editor/DataSet.mediawiki",
				"Form:ELN/Entry" => "Form/ELN/Entry.mediawiki",
				"Form:ELN/Entry/Query" => "Form/ELN/Entry/Query.mediawiki",
				"Form:ELN/Entry2" => "Form/ELN/Entry2.mediawiki",
				"Form:LabProcess" => "Form/LabProcess.mediawiki",
				"Form:LabProcess/Instance" => "Form/LabProcess/Instance.mediawiki",
				"Form:LabProcess/Steps" => "Form/LabProcess/Steps.mediawiki",
				"Form:LabProcess/Steps/Generic" => "Form/LabProcess/Steps/Generic.mediawiki",
				"Form:LabProcess/Steps/GravimetricDosing" => "Form/LabProcess/Steps/GravimetricDosing.mediawiki",
				"Form:LabProcess/Steps/MultiObjectSelection" => "Form/LabProcess/Steps/MultiObjectSelection.mediawiki",
				"Form:LabProcess/Steps/ObjectSelection" => "Form/LabProcess/Steps/ObjectSelection.mediawiki",
				"Form:LIMS" => "Form/LIMS.mediawiki",
				"Form:LIMS/ACL" => "Form/LIMS/ACL.mediawiki",
				"Form:LIMS/Device" => "Form/LIMS/Device.mediawiki",
				"Form:LIMS/Device/Category" => "Form/LIMS/Device/Category.mediawiki",
				"Form:LIMS/Device/Instance" => "Form/LIMS/Device/Instance.mediawiki",
				"Form:LIMS/Device/Type" => "Form/LIMS/Device/Type.mediawiki",
				"Form:LIMS/File/Category" => "Form/LIMS/File/Category.mediawiki",
				"Form:LIMS/File/Type" => "Form/LIMS/File/Type.mediawiki",
				"Form:LIMS/Location/Site" => "Form/LIMS/Location/Site.mediawiki",
				"Form:LIMS/Material" => "Form/LIMS/Material.mediawiki",
				"Form:LIMS/Material/Category" => "Form/LIMS/Material/Category.mediawiki",
				"Form:LIMS/Material/Instance" => "Form/LIMS/Material/Instance.mediawiki",
				"Form:LIMS/Material/Type" => "Form/LIMS/Material/Type.mediawiki",
				"Form:Property/Quantity" => "Form/Property/Quantity.mediawiki",
				"Form:Property/Subquantity" => "Form/Property/Subquantity.mediawiki",
				"OslTemplate:ELN" => "OslTemplate/ELN.mediawiki",
				"OslTemplate:ELN/Attachment" => "OslTemplate/ELN/Attachment.mediawiki",
				"OslTemplate:ELN/Attachment/TimeStamp" => "OslTemplate/ELN/Attachment/TimeStamp.mediawiki",
				"OslTemplate:ELN/Attachment/TimeStampedDoc" => "OslTemplate/ELN/Attachment/TimeStampedDoc.mediawiki",
				"OslTemplate:ELN/Attachment/Verification" => "OslTemplate/ELN/Attachment/Verification.mediawiki",
				"OslTemplate:ELN/Attachment/Verification/TableBody" => "OslTemplate/ELN/Attachment/Verification/TableBody.mediawiki",
				"OslTemplate:ELN/Attachment/Verification/TableFooter" => "OslTemplate/ELN/Attachment/Verification/TableFooter.mediawiki",
				"OslTemplate:ELN/Attachment/Verification/TableHeader" => "OslTemplate/ELN/Attachment/Verification/TableHeader.mediawiki",
				"OslTemplate:ELN/Editor" => "OslTemplate/ELN/Editor.mediawiki",
				"OslTemplate:ELN/Editor/DataSet" => "OslTemplate/ELN/Editor/DataSet.mediawiki",
				"OslTemplate:ELN/Editor/DataSet/Link" => "OslTemplate/ELN/Editor/DataSet/Link.mediawiki",
				"OslTemplate:ELN/Editor/DataSet/Subpage" => "OslTemplate/ELN/Editor/DataSet/Subpage.mediawiki",
				"OslTemplate:ELN/Editor/DrawIO" => "OslTemplate/ELN/Editor/DrawIO.mediawiki",
				"OslTemplate:ELN/Editor/Kekule" => "OslTemplate/ELN/Editor/Kekule.mediawiki",
				"OslTemplate:ELN/Editor/Kekule/Default" => "OslTemplate/ELN/Editor/Kekule/Default.mediawiki",
				"OslTemplate:ELN/Editor/SvgEdit" => "OslTemplate/ELN/Editor/SvgEdit.mediawiki",
				"OslTemplate:ELN/Editor/Wellplate" => "OslTemplate/ELN/Editor/Wellplate.mediawiki",
				"OslTemplate:ELN/Entry" => "OslTemplate/ELN/Entry.mediawiki",
				"OslTemplate:ELN/Entry/Body" => "OslTemplate/ELN/Entry/Body.mediawiki",
				"OslTemplate:ELN/Entry/Body2" => "OslTemplate/ELN/Entry/Body2.mediawiki",
				"OslTemplate:ELN/Entry/Footer" => "OslTemplate/ELN/Entry/Footer.mediawiki",
				"OslTemplate:ELN/Entry/Footer2" => "OslTemplate/ELN/Entry/Footer2.mediawiki",
				"OslTemplate:ELN/Entry/Header" => "OslTemplate/ELN/Entry/Header.mediawiki",
				"OslTemplate:ELN/Entry/Header2" => "OslTemplate/ELN/Entry/Header2.mediawiki",
				"OslTemplate:ELN/Entry/Query" => "OslTemplate/ELN/Entry/Query.mediawiki",
				"OslTemplate:ELN/Viewer" => "OslTemplate/ELN/Viewer.mediawiki",
				"OslTemplate:ELN/Viewer/Kekule" => "OslTemplate/ELN/Viewer/Kekule.mediawiki",
				"OslTemplate:ELN/Viewer/Wellplate" => "OslTemplate/ELN/Viewer/Wellplate.mediawiki",
				"OslTemplate:Helper" => "OslTemplate/Helper.mediawiki",
				"OslTemplate:Helper/Docu/FormTemplate" => "OslTemplate/Helper/Docu/FormTemplate.mediawiki",
				"OslTemplate:Helper/Links" => "OslTemplate/Helper/Links.mediawiki",
				"OslTemplate:Helper/Links/ParamLink" => "OslTemplate/Helper/Links/ParamLink.mediawiki",
				"OslTemplate:Helper/Location/CustomMarker" => "OslTemplate/Helper/Location/CustomMarker.mediawiki",
				"OslTemplate:Helper/Query" => "OslTemplate/Helper/Query.mediawiki",
				"OslTemplate:Helper/Query/DebugProperty" => "OslTemplate/Helper/Query/DebugProperty.mediawiki",
				"OslTemplate:Helper/Query/Plain" => "OslTemplate/Helper/Query/Plain.mediawiki",
				"OslTemplate:Helper/Semantics/InlineProperty" => "OslTemplate/Helper/Semantics/InlineProperty.mediawiki",
				"OslTemplate:Helper/Semantics/InlineProperty/DensityTooltip" => "OslTemplate/Helper/Semantics/InlineProperty/DensityTooltip.mediawiki",
				"OslTemplate:Helper/Semantics/InlineProperty/HasChemicalStructureSDS" => "OslTemplate/Helper/Semantics/InlineProperty/HasChemicalStructureSDS.mediawiki",
				"OslTemplate:Helper/Semantics/InlineProperty/HasDensity" => "OslTemplate/Helper/Semantics/InlineProperty/HasDensity.mediawiki",
				"OslTemplate:Helper/Semantics/InlineProperty/HasHazardStatement" => "OslTemplate/Helper/Semantics/InlineProperty/HasHazardStatement.mediawiki",
				"OslTemplate:Helper/Semantics/InlineProperty/HazardStatementTooltip" => "OslTemplate/Helper/Semantics/InlineProperty/HazardStatementTooltip.mediawiki",
				"OslTemplate:Helper/StringOps" => "OslTemplate/Helper/StringOps.mediawiki",
				"OslTemplate:Helper/StringOps/SplitOnTripleHashSelectFirst" => "OslTemplate/Helper/StringOps/SplitOnTripleHashSelectFirst.mediawiki",
				"OslTemplate:Helper/Strings" => "OslTemplate/Helper/Strings.mediawiki",
				"OslTemplate:Helper/Strings/No" => "OslTemplate/Helper/Strings/No.mediawiki",
				"OslTemplate:Helper/Strings/Yes" => "OslTemplate/Helper/Strings/Yes.mediawiki",
				"OslTemplate:Helper/UI/Div/Closing" => "OslTemplate/Helper/UI/Div/Closing.mediawiki",
				"OslTemplate:Helper/UI/Div/VE-Hidden" => "OslTemplate/Helper/UI/Div/VE-Hidden.mediawiki",
				"OslTemplate:Helper/UI/Div/VE-Visible" => "OslTemplate/Helper/UI/Div/VE-Visible.mediawiki",
				"OslTemplate:Helper/UI/VE" => "OslTemplate/Helper/UI/VE.mediawiki",
				"OslTemplate:Helper/UI/VE/EditButton" => "OslTemplate/Helper/UI/VE/EditButton.mediawiki",
				"OslTemplate:Helper/UI/VE/Hidden" => "OslTemplate/Helper/UI/VE/Hidden.mediawiki",
				"OslTemplate:Helper/UI/VE/Visible" => "OslTemplate/Helper/UI/VE/Visible.mediawiki",
				"OslTemplate:LabProcess" => "OslTemplate/LabProcess.mediawiki",
				"OslTemplate:LabProcess/CreateInstanceLink" => "OslTemplate/LabProcess/CreateInstanceLink.mediawiki",
				"OslTemplate:LabProcess/File" => "OslTemplate/LabProcess/File.mediawiki",
				"OslTemplate:LabProcess/Footer" => "OslTemplate/LabProcess/Footer.mediawiki",
				"OslTemplate:LabProcess/Header" => "OslTemplate/LabProcess/Header.mediawiki",
				"OslTemplate:LabProcess/Instance" => "OslTemplate/LabProcess/Instance.mediawiki",
				"OslTemplate:LabProcess/Instance/Demo1" => "OslTemplate/LabProcess/Instance/Demo1.mediawiki",
				"OslTemplate:LabProcess/Instance/Demo2" => "OslTemplate/LabProcess/Instance/Demo2.mediawiki",
				"OslTemplate:LabProcess/Instance/Footer" => "OslTemplate/LabProcess/Instance/Footer.mediawiki",
				"OslTemplate:LabProcess/Instance/Header" => "OslTemplate/LabProcess/Instance/Header.mediawiki",
				"OslTemplate:LabProcess/Object" => "OslTemplate/LabProcess/Object.mediawiki",
				"OslTemplate:LabProcess/Object/ObjectCreator" => "OslTemplate/LabProcess/Object/ObjectCreator.mediawiki",
				"OslTemplate:LabProcess/Parameter" => "OslTemplate/LabProcess/Parameter.mediawiki",
				"OslTemplate:LabProcess/Parameter/Device" => "OslTemplate/LabProcess/Parameter/Device.mediawiki",
				"OslTemplate:LabProcess/Parameter/MultiFile/File" => "OslTemplate/LabProcess/Parameter/MultiFile/File.mediawiki",
				"OslTemplate:LabProcess/Parameter/MultiFile/ParamArray" => "OslTemplate/LabProcess/Parameter/MultiFile/ParamArray.mediawiki",
				"OslTemplate:LabProcess/Parameter/MultiObject" => "OslTemplate/LabProcess/Parameter/MultiObject.mediawiki",
				"OslTemplate:LabProcess/Parameter/MultiObject/Object" => "OslTemplate/LabProcess/Parameter/MultiObject/Object.mediawiki",
				"OslTemplate:LabProcess/Parameter/MultiObject/ParamArray" => "OslTemplate/LabProcess/Parameter/MultiObject/ParamArray.mediawiki",
				"OslTemplate:LabProcess/Parameter/MultiQuantitative" => "OslTemplate/LabProcess/Parameter/MultiQuantitative.mediawiki",
				"OslTemplate:LabProcess/Parameter/MultiQuantitative/ParamArray" => "OslTemplate/LabProcess/Parameter/MultiQuantitative/ParamArray.mediawiki",
				"OslTemplate:LabProcess/Parameter/MultiQuantitative/Quantitative" => "OslTemplate/LabProcess/Parameter/MultiQuantitative/Quantitative.mediawiki",
				"OslTemplate:LabProcess/Query" => "OslTemplate/LabProcess/Query.mediawiki",
				"OslTemplate:LabProcess/Query/DeviceParam" => "OslTemplate/LabProcess/Query/DeviceParam.mediawiki",
				"OslTemplate:LabProcess/Query/GenericParam" => "OslTemplate/LabProcess/Query/GenericParam.mediawiki",
				"OslTemplate:LabProcess/Query/GenericParam/SubQuery" => "OslTemplate/LabProcess/Query/GenericParam/SubQuery.mediawiki",
				"OslTemplate:LabProcess/Step" => "OslTemplate/LabProcess/Step.mediawiki",
				"OslTemplate:LabProcess/Step/Descriptor" => "OslTemplate/LabProcess/Step/Descriptor.mediawiki",
				"OslTemplate:LabProcess/Step/Footer" => "OslTemplate/LabProcess/Step/Footer.mediawiki",
				"OslTemplate:LabProcess/Step/Form" => "OslTemplate/LabProcess/Step/Form.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Footer" => "OslTemplate/LabProcess/Step/Form/Footer.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Header" => "OslTemplate/LabProcess/Step/Form/Header.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param" => "OslTemplate/LabProcess/Step/Form/Param.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Common" => "OslTemplate/LabProcess/Step/Form/Param/Common.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Device" => "OslTemplate/LabProcess/Step/Form/Param/Device.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Device/Fields" => "OslTemplate/LabProcess/Step/Form/Param/Device/Fields.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Device/Footer" => "OslTemplate/LabProcess/Step/Form/Param/Device/Footer.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Device/Header" => "OslTemplate/LabProcess/Step/Form/Param/Device/Header.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Material" => "OslTemplate/LabProcess/Step/Form/Param/Material.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Material/Fields" => "OslTemplate/LabProcess/Step/Form/Param/Material/Fields.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Material/Footer" => "OslTemplate/LabProcess/Step/Form/Param/Material/Footer.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Material/Header" => "OslTemplate/LabProcess/Step/Form/Param/Material/Header.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Multi" => "OslTemplate/LabProcess/Step/Form/Param/Multi.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Multi/Header" => "OslTemplate/LabProcess/Step/Form/Param/Multi/Header.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Multi/SectionHeader" => "OslTemplate/LabProcess/Step/Form/Param/Multi/SectionHeader.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/MultiFile/Fields" => "OslTemplate/LabProcess/Step/Form/Param/MultiFile/Fields.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/MultiFile/Rows" => "OslTemplate/LabProcess/Step/Form/Param/MultiFile/Rows.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/MultiObject" => "OslTemplate/LabProcess/Step/Form/Param/MultiObject.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/MultiObject/Fields" => "OslTemplate/LabProcess/Step/Form/Param/MultiObject/Fields.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/MultiObject/Rows" => "OslTemplate/LabProcess/Step/Form/Param/MultiObject/Rows.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/MultiQuantitative" => "OslTemplate/LabProcess/Step/Form/Param/MultiQuantitative.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/MultiQuantitative/Fields" => "OslTemplate/LabProcess/Step/Form/Param/MultiQuantitative/Fields.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/MultiQuantitative/Rows" => "OslTemplate/LabProcess/Step/Form/Param/MultiQuantitative/Rows.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Object" => "OslTemplate/LabProcess/Step/Form/Param/Object.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Object/Fields" => "OslTemplate/LabProcess/Step/Form/Param/Object/Fields.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Object/Footer" => "OslTemplate/LabProcess/Step/Form/Param/Object/Footer.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Object/Header" => "OslTemplate/LabProcess/Step/Form/Param/Object/Header.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Quantitative" => "OslTemplate/LabProcess/Step/Form/Param/Quantitative.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Quantitative/Fields" => "OslTemplate/LabProcess/Step/Form/Param/Quantitative/Fields.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Quantitative/Footer" => "OslTemplate/LabProcess/Step/Form/Param/Quantitative/Footer.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Quantitative/Header" => "OslTemplate/LabProcess/Step/Form/Param/Quantitative/Header.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Specific" => "OslTemplate/LabProcess/Step/Form/Param/Specific.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Specific/Footer" => "OslTemplate/LabProcess/Step/Form/Param/Specific/Footer.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Specific/Header" => "OslTemplate/LabProcess/Step/Form/Param/Specific/Header.mediawiki",
				"OslTemplate:LabProcess/Step/Subpage" => "OslTemplate/LabProcess/Step/Subpage.mediawiki",
				"OslTemplate:LabProcess/Step/Subpage/Template" => "OslTemplate/LabProcess/Step/Subpage/Template.mediawiki",
				"OslTemplate:LabProcess/Steps" => "OslTemplate/LabProcess/Steps.mediawiki",
				"OslTemplate:LabProcess/Steps/Generic" => "OslTemplate/LabProcess/Steps/Generic.mediawiki",
				"OslTemplate:LabProcess/Steps/Generic/Subpage" => "OslTemplate/LabProcess/Steps/Generic/Subpage.mediawiki",
				"OslTemplate:LabProcess/Steps/GravimetricDosing" => "OslTemplate/LabProcess/Steps/GravimetricDosing.mediawiki",
				"OslTemplate:LabProcess/Steps/GravimetricDosing/Subpage" => "OslTemplate/LabProcess/Steps/GravimetricDosing/Subpage.mediawiki",
				"OslTemplate:LabProcess/Steps/MultiObjectSelection" => "OslTemplate/LabProcess/Steps/MultiObjectSelection.mediawiki",
				"OslTemplate:LabProcess/Steps/MultiObjectSelection/Subpage" => "OslTemplate/LabProcess/Steps/MultiObjectSelection/Subpage.mediawiki",
				"OslTemplate:LabProcess/Steps/ObjectSelection" => "OslTemplate/LabProcess/Steps/ObjectSelection.mediawiki",
				"OslTemplate:LabProcess/Steps/ObjectSelection/Subpage" => "OslTemplate/LabProcess/Steps/ObjectSelection/Subpage.mediawiki",
				"OslTemplate:LabProcess/Template/IoMapping" => "OslTemplate/LabProcess/Template/IoMapping.mediawiki",
				"OslTemplate:LIMS" => "OslTemplate/LIMS.mediawiki",
				"OslTemplate:LIMS/ACL" => "OslTemplate/LIMS/ACL.mediawiki",
				"OslTemplate:LIMS/ACL/Display" => "OslTemplate/LIMS/ACL/Display.mediawiki",
				"OslTemplate:LIMS/Common" => "OslTemplate/LIMS/Common.mediawiki",
				"OslTemplate:LIMS/Common/Category/Footer" => "OslTemplate/LIMS/Common/Category/Footer.mediawiki",
				"OslTemplate:LIMS/Common/Category/Header" => "OslTemplate/LIMS/Common/Category/Header.mediawiki",
				"OslTemplate:LIMS/Common/Link" => "OslTemplate/LIMS/Common/Link.mediawiki",
				"OslTemplate:LIMS/Common/Property" => "OslTemplate/LIMS/Common/Property.mediawiki",
				"OslTemplate:LIMS/Common/Template" => "OslTemplate/LIMS/Common/Template.mediawiki",
				"OslTemplate:LIMS/Device" => "OslTemplate/LIMS/Device.mediawiki",
				"OslTemplate:LIMS/Device/Category" => "OslTemplate/LIMS/Device/Category.mediawiki",
				"OslTemplate:LIMS/Device/Instance" => "OslTemplate/LIMS/Device/Instance.mediawiki",
				"OslTemplate:LIMS/Device/Type" => "OslTemplate/LIMS/Device/Type.mediawiki",
				"OslTemplate:LIMS/File/Category" => "OslTemplate/LIMS/File/Category.mediawiki",
				"OslTemplate:LIMS/File/Instance" => "OslTemplate/LIMS/File/Instance.mediawiki",
				"OslTemplate:LIMS/File/Type" => "OslTemplate/LIMS/File/Type.mediawiki",
				"OslTemplate:LIMS/Form/Common" => "OslTemplate/LIMS/Form/Common.mediawiki",
				"OslTemplate:LIMS/Form/Common/Category/Header" => "OslTemplate/LIMS/Form/Common/Category/Header.mediawiki",
				"OslTemplate:LIMS/Form/Common/Footer" => "OslTemplate/LIMS/Form/Common/Footer.mediawiki",
				"OslTemplate:LIMS/Form/Common/Header" => "OslTemplate/LIMS/Form/Common/Header.mediawiki",
				"OslTemplate:LIMS/Material/Category" => "OslTemplate/LIMS/Material/Category.mediawiki",
				"OslTemplate:LIMS/Material/Instance" => "OslTemplate/LIMS/Material/Instance.mediawiki",
				"OslTemplate:LIMS/Material/Type" => "OslTemplate/LIMS/Material/Type.mediawiki",
				"OslTemplate:Message" => "OslTemplate/Message.mediawiki",
				"OslTemplate:Message/NotDefined" => "OslTemplate/Message/NotDefined.mediawiki",
				"OslTemplate:Property" => "OslTemplate/Property.mediawiki",
				"OslTemplate:Property/Quantitative" => "OslTemplate/Property/Quantitative.mediawiki",
				"OslTemplate:Property/Quantity" => "OslTemplate/Property/Quantity.mediawiki",
				"OslTemplate:Property/Quantity/Unit" => "OslTemplate/Property/Quantity/Unit.mediawiki",
				"Template:ELN/Editor/DrawIO" => "Template/ELN/Editor/DrawIO.mediawiki",
				"Template:ELN/Editor/Kekule" => "Template/ELN/Editor/Kekule.mediawiki",
				"Template:ELN/Editor/SvgEdit" => "Template/ELN/Editor/SvgEdit.mediawiki",
				"Template:ELN/Editor/Wellplate" => "Template/ELN/Editor/Wellplate.mediawiki",
				"Template:ELN/Viewer/Kekule" => "Template/ELN/Viewer/Kekule.mediawiki",
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
			'href' => "https://$_SERVER[HTTP_HOST]/wiki/CreatePage?superpage=" . $skin->getTitle()->getFullText(),
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
