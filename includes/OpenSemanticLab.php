<?php

use MediaWiki\MediaWikiServices;

class OpenSemanticLab {

	public static function onPageImporterRegisterPageLists( array &$pageLists ) {

		$pageLists['OpenSemanticLab'] = [

			// list of pages to create and the corresponding files to use as content
			"pages" => [
				"Category:Data" => "Category/Data.mediawiki",
				"Category:DataProperty" => "Category/DataProperty.mediawiki",
				"Category:DataSet" => "Category/DataSet.mediawiki",
				"Category:Device" => "Category/Device.mediawiki",
				"Category:File" => "Category/File.mediawiki",
				"Category:Material" => "Category/Material.mediawiki",
				"Category:ObjectProperty" => "Category/ObjectProperty.mediawiki",
				"Category:OSL" => "Category/OSL.mediawiki",
				"Category:OSL/Infrastructure" => "Category/OSL/Infrastructure.mediawiki",
				"Category:OSL/Infrastructure/Messages" => "Category/OSL/Infrastructure/Messages.mediawiki",
				"Category:OSL/Infrastructure/Template" => "Category/OSL/Infrastructure/Template.mediawiki",
				"Category:OSL/Infrastructure/Template/User" => "Category/OSL/Infrastructure/Template/User.mediawiki",
				"Category:OSL/Property" => "Category/OSL/Property.mediawiki",
				"Category:QuantityProperty" => "Category/QuantityProperty.mediawiki",
				"Category:Software" => "Category/Software.mediawiki",
				"Category:Tool" => "Category/Tool.mediawiki",
				"Concept:ELN/Entry/Creator" => "Concept/ELN/Entry/Creator.mediawiki",
				"Concept:ELN/Order/Creator" => "Concept/ELN/Order/Creator.mediawiki",
				"Concept:LIMS/Device/Category" => "Concept/LIMS/Device/Category.mediawiki",
				"Concept:LIMS/Device/Instance" => "Concept/LIMS/Device/Instance.mediawiki",
				"Concept:LIMS/Device/Type" => "Concept/LIMS/Device/Type.mediawiki",
				"Concept:LIMS/File/Category" => "Concept/LIMS/File/Category.mediawiki",
				"Concept:LIMS/Location/Instance" => "Concept/LIMS/Location/Instance.mediawiki",
				"Concept:LIMS/Material/Category" => "Concept/LIMS/Material/Category.mediawiki",
				"Concept:LIMS/Object/Category" => "Concept/LIMS/Object/Category.mediawiki",
				"Concept:LIMS/Ou" => "Concept/LIMS/Ou.mediawiki",
				"Concept:LIMS/Property/Category" => "Concept/LIMS/Property/Category.mediawiki",
				"Concept:LIMS/Software/Category" => "Concept/LIMS/Software/Category.mediawiki",
				"Form:ELN" => "Form/ELN.mediawiki",
				"Form:ELN/Editor/ParamSet" => "Form/ELN/Editor/ParamSet.mediawiki",
				"Form:ELN/Entry" => "Form/ELN/Entry.mediawiki",
				"Form:ELN/Entry/Query" => "Form/ELN/Entry/Query.mediawiki",
				"Form:ELN/Order" => "Form/ELN/Order.mediawiki",
				"Form:ELN/Order/Actionable" => "Form/ELN/Order/Actionable.mediawiki",
				"Form:ELN/Order/Actionable/Query" => "Form/ELN/Order/Actionable/Query.mediawiki",
				"Form:ELN/Order/Query" => "Form/ELN/Order/Query.mediawiki",
				"Form:KB/Class" => "Form/KB/Class.mediawiki",
				"Form:KB/Entity" => "Form/KB/Entity.mediawiki",
				"Form:KB/Term" => "Form/KB/Term.mediawiki",
				"Form:LabProcess" => "Form/LabProcess.mediawiki",
				"Form:LabProcess/Instance" => "Form/LabProcess/Instance.mediawiki",
				"Form:LabProcess/Query/InteractiveSemanticGraph" => "Form/LabProcess/Query/InteractiveSemanticGraph.mediawiki",
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
				"Form:LIMS/Location/Building" => "Form/LIMS/Location/Building.mediawiki",
				"Form:LIMS/Location/Floor" => "Form/LIMS/Location/Floor.mediawiki",
				"Form:LIMS/Location/Room" => "Form/LIMS/Location/Room.mediawiki",
				"Form:LIMS/Location/Site" => "Form/LIMS/Location/Site.mediawiki",
				"Form:LIMS/Material" => "Form/LIMS/Material.mediawiki",
				"Form:LIMS/Material/Category" => "Form/LIMS/Material/Category.mediawiki",
				"Form:LIMS/Material/Instance" => "Form/LIMS/Material/Instance.mediawiki",
				"Form:LIMS/Material/Type" => "Form/LIMS/Material/Type.mediawiki",
				"Form:LIMS/Ou" => "Form/LIMS/Ou.mediawiki",
				"Form:LIMS/Ou/Organization" => "Form/LIMS/Ou/Organization.mediawiki",
				"Form:LIMS/Ou/Organization/Query" => "Form/LIMS/Ou/Organization/Query.mediawiki",
				"Form:LIMS/Person" => "Form/LIMS/Person.mediawiki",
				"Form:LIMS/Person/Query" => "Form/LIMS/Person/Query.mediawiki",
				"Form:LIMS/Person/User" => "Form/LIMS/Person/User.mediawiki",
				"Form:LIMS/Query/Device" => "Form/LIMS/Query/Device.mediawiki",
				"Form:LIMS/Software/Category" => "Form/LIMS/Software/Category.mediawiki",
				"Form:LIMS/Software/Instance" => "Form/LIMS/Software/Instance.mediawiki",
				"Form:LIMS/Software/Type" => "Form/LIMS/Software/Type.mediawiki",
				"Form:Property" => "Form/Property.mediawiki",
				"Form:Property/Quantity" => "Form/Property/Quantity.mediawiki",
				"Form:Property/Subquantity" => "Form/Property/Subquantity.mediawiki",
				"MediaWiki:Smw service cas" => "MediaWiki/Smw service cas.mediawiki",
				"MediaWiki:Smw service online maps" => "MediaWiki/Smw service online maps.mediawiki",
				"MediaWiki:Smw service pubchem cid" => "MediaWiki/Smw service pubchem cid.mediawiki",
				"Module:KB/Viewer/SparqlGraph" => "Module/KB/Viewer/SparqlGraph.mediawiki",
				"Module:LabProcess/Object" => "Module/LabProcess/Object.mediawiki",
				"Module:LabProcess/Parameter/Config" => "Module/LabProcess/Parameter/Config.mediawiki",
				"OslTemplate:Common/Form/Label/Instances" => "OslTemplate/Common/Form/Label/Instances.mediawiki",
				"OslTemplate:Common/Label" => "OslTemplate/Common/Label.mediawiki",
				"OslTemplate:ELN" => "OslTemplate/ELN.mediawiki",
				"OslTemplate:ELN/Attachment" => "OslTemplate/ELN/Attachment.mediawiki",
				"OslTemplate:ELN/Attachment/TimeStamp" => "OslTemplate/ELN/Attachment/TimeStamp.mediawiki",
				"OslTemplate:ELN/Attachment/TimeStampedDoc" => "OslTemplate/ELN/Attachment/TimeStampedDoc.mediawiki",
				"OslTemplate:ELN/Attachment/Verification" => "OslTemplate/ELN/Attachment/Verification.mediawiki",
				"OslTemplate:ELN/Attachment/Verification/TableBody" => "OslTemplate/ELN/Attachment/Verification/TableBody.mediawiki",
				"OslTemplate:ELN/Attachment/Verification/TableFooter" => "OslTemplate/ELN/Attachment/Verification/TableFooter.mediawiki",
				"OslTemplate:ELN/Attachment/Verification/TableHeader" => "OslTemplate/ELN/Attachment/Verification/TableHeader.mediawiki",
				"OslTemplate:ELN/Decoration" => "OslTemplate/ELN/Decoration.mediawiki",
				"OslTemplate:ELN/Decoration/Annotation" => "OslTemplate/ELN/Decoration/Annotation.mediawiki",
				"OslTemplate:ELN/Decoration/ColoredText" => "OslTemplate/ELN/Decoration/ColoredText.mediawiki",
				"OslTemplate:ELN/Editor" => "OslTemplate/ELN/Editor.mediawiki",
				"OslTemplate:ELN/Editor/DrawIO" => "OslTemplate/ELN/Editor/DrawIO.mediawiki",
				"OslTemplate:ELN/Editor/Graph" => "OslTemplate/ELN/Editor/Graph.mediawiki",
				"OslTemplate:ELN/Editor/Kekule" => "OslTemplate/ELN/Editor/Kekule.mediawiki",
				"OslTemplate:ELN/Editor/Kekule/Default" => "OslTemplate/ELN/Editor/Kekule/Default.mediawiki",
				"OslTemplate:ELN/Editor/ParamSet/Link" => "OslTemplate/ELN/Editor/ParamSet/Link.mediawiki",
				"OslTemplate:ELN/Editor/ParamSet/Subpage" => "OslTemplate/ELN/Editor/ParamSet/Subpage.mediawiki",
				"OslTemplate:ELN/Editor/Spreadsheet" => "OslTemplate/ELN/Editor/Spreadsheet.mediawiki",
				"OslTemplate:ELN/Editor/SvgEdit" => "OslTemplate/ELN/Editor/SvgEdit.mediawiki",
				"OslTemplate:ELN/Editor/Wellplate" => "OslTemplate/ELN/Editor/Wellplate.mediawiki",
				"OslTemplate:ELN/Entry" => "OslTemplate/ELN/Entry.mediawiki",
				"OslTemplate:ELN/Entry/Body" => "OslTemplate/ELN/Entry/Body.mediawiki",
				"OslTemplate:ELN/Entry/Footer" => "OslTemplate/ELN/Entry/Footer.mediawiki",
				"OslTemplate:ELN/Entry/Header" => "OslTemplate/ELN/Entry/Header.mediawiki",
				"OslTemplate:ELN/Entry/Query" => "OslTemplate/ELN/Entry/Query.mediawiki",
				"OslTemplate:ELN/Order" => "OslTemplate/ELN/Order.mediawiki",
				"OslTemplate:ELN/Order/Actionable" => "OslTemplate/ELN/Order/Actionable.mediawiki",
				"OslTemplate:ELN/Order/Actionable/Query" => "OslTemplate/ELN/Order/Actionable/Query.mediawiki",
				"OslTemplate:ELN/Order/Body" => "OslTemplate/ELN/Order/Body.mediawiki",
				"OslTemplate:ELN/Order/Footer" => "OslTemplate/ELN/Order/Footer.mediawiki",
				"OslTemplate:ELN/Order/Query" => "OslTemplate/ELN/Order/Query.mediawiki",
				"OslTemplate:ELN/Order/Sample" => "OslTemplate/ELN/Order/Sample.mediawiki",
				"OslTemplate:ELN/Viewer" => "OslTemplate/ELN/Viewer.mediawiki",
				"OslTemplate:ELN/Viewer/Kekule" => "OslTemplate/ELN/Viewer/Kekule.mediawiki",
				"OslTemplate:ELN/Viewer/ProjectTree" => "OslTemplate/ELN/Viewer/ProjectTree.mediawiki",
				"OslTemplate:ELN/Viewer/Wellplate" => "OslTemplate/ELN/Viewer/Wellplate.mediawiki",
				"OslTemplate:Helper" => "OslTemplate/Helper.mediawiki",
				"OslTemplate:Helper/Docu/FormTemplate" => "OslTemplate/Helper/Docu/FormTemplate.mediawiki",
				"OslTemplate:Helper/Id/BasePageSubobject" => "OslTemplate/Helper/Id/BasePageSubobject.mediawiki",
				"OslTemplate:Helper/Id/RootPageSubobject" => "OslTemplate/Helper/Id/RootPageSubobject.mediawiki",
				"OslTemplate:Helper/Id/RootPageSubobject/AsInput" => "OslTemplate/Helper/Id/RootPageSubobject/AsInput.mediawiki",
				"OslTemplate:Helper/Id/Subobject" => "OslTemplate/Helper/Id/Subobject.mediawiki",
				"OslTemplate:Helper/Links" => "OslTemplate/Helper/Links.mediawiki",
				"OslTemplate:Helper/Links/ParamLink" => "OslTemplate/Helper/Links/ParamLink.mediawiki",
				"OslTemplate:Helper/Location/CustomMarker" => "OslTemplate/Helper/Location/CustomMarker.mediawiki",
				"OslTemplate:Helper/Query" => "OslTemplate/Helper/Query.mediawiki",
				"OslTemplate:Helper/Query/DebugProperty" => "OslTemplate/Helper/Query/DebugProperty.mediawiki",
				"OslTemplate:Helper/Query/List/SubPageList" => "OslTemplate/Helper/Query/List/SubPageList.mediawiki",
				"OslTemplate:Helper/Query/List/SubPageName" => "OslTemplate/Helper/Query/List/SubPageName.mediawiki",
				"OslTemplate:Helper/Query/Plain" => "OslTemplate/Helper/Query/Plain.mediawiki",
				"OslTemplate:Helper/Semantics/InlineProperty" => "OslTemplate/Helper/Semantics/InlineProperty.mediawiki",
				"OslTemplate:Helper/Semantics/InlineProperty/DensityTooltip" => "OslTemplate/Helper/Semantics/InlineProperty/DensityTooltip.mediawiki",
				"OslTemplate:Helper/Semantics/InlineProperty/HasChemicalStructureSDS" => "OslTemplate/Helper/Semantics/InlineProperty/HasChemicalStructureSDS.mediawiki",
				"OslTemplate:Helper/Semantics/InlineProperty/HasDensity" => "OslTemplate/Helper/Semantics/InlineProperty/HasDensity.mediawiki",
				"OslTemplate:Helper/Semantics/InlineProperty/HasHazardStatement" => "OslTemplate/Helper/Semantics/InlineProperty/HasHazardStatement.mediawiki",
				"OslTemplate:Helper/Semantics/InlineProperty/HazardStatementTooltip" => "OslTemplate/Helper/Semantics/InlineProperty/HazardStatementTooltip.mediawiki",
				"OslTemplate:Helper/StringOps" => "OslTemplate/Helper/StringOps.mediawiki",
				"OslTemplate:Helper/StringOps/ConcatLists" => "OslTemplate/Helper/StringOps/ConcatLists.mediawiki",
				"OslTemplate:Helper/StringOps/SplitOnTripleHashSelectFirst" => "OslTemplate/Helper/StringOps/SplitOnTripleHashSelectFirst.mediawiki",
				"OslTemplate:Helper/Strings" => "OslTemplate/Helper/Strings.mediawiki",
				"OslTemplate:Helper/Strings/CleanDisplayTitle" => "OslTemplate/Helper/Strings/CleanDisplayTitle.mediawiki",
				"OslTemplate:Helper/Strings/EqualSign" => "OslTemplate/Helper/Strings/EqualSign.mediawiki",
				"OslTemplate:Helper/Strings/No" => "OslTemplate/Helper/Strings/No.mediawiki",
				"OslTemplate:Helper/Strings/Yes" => "OslTemplate/Helper/Strings/Yes.mediawiki",
				"OslTemplate:Helper/UI/Div/Closing" => "OslTemplate/Helper/UI/Div/Closing.mediawiki",
				"OslTemplate:Helper/UI/Div/VE-Hidden" => "OslTemplate/Helper/UI/Div/VE-Hidden.mediawiki",
				"OslTemplate:Helper/UI/Div/VE-Visible" => "OslTemplate/Helper/UI/Div/VE-Visible.mediawiki",
				"OslTemplate:Helper/UI/Tiles/Grid" => "OslTemplate/Helper/UI/Tiles/Grid.mediawiki",
				"OslTemplate:Helper/UI/Tiles/Tile" => "OslTemplate/Helper/UI/Tiles/Tile.mediawiki",
				"OslTemplate:Helper/UI/VE" => "OslTemplate/Helper/UI/VE.mediawiki",
				"OslTemplate:Helper/UI/VE/EditButton" => "OslTemplate/Helper/UI/VE/EditButton.mediawiki",
				"OslTemplate:Helper/UI/VE/Hidden" => "OslTemplate/Helper/UI/VE/Hidden.mediawiki",
				"OslTemplate:Helper/UI/VE/SectionSeparator" => "OslTemplate/Helper/UI/VE/SectionSeparator.mediawiki",
				"OslTemplate:Helper/UI/VE/SectionSeparatorHelper" => "OslTemplate/Helper/UI/VE/SectionSeparatorHelper.mediawiki",
				"OslTemplate:Helper/UI/VE/Visible" => "OslTemplate/Helper/UI/VE/Visible.mediawiki",
				"OslTemplate:ID" => "OslTemplate/ID.mediawiki",
				"OslTemplate:ID/Local" => "OslTemplate/ID/Local.mediawiki",
				"OslTemplate:ID/UUID" => "OslTemplate/ID/UUID.mediawiki",
				"OslTemplate:ID/UUID/Format/Normal" => "OslTemplate/ID/UUID/Format/Normal.mediawiki",
				"OslTemplate:ID/UUID/Format/Normal/Process" => "OslTemplate/ID/UUID/Format/Normal/Process.mediawiki",
				"OslTemplate:KB" => "OslTemplate/KB.mediawiki",
				"OslTemplate:KB/Attachment" => "OslTemplate/KB/Attachment.mediawiki",
				"OslTemplate:KB/Class" => "OslTemplate/KB/Class.mediawiki",
				"OslTemplate:KB/Relation" => "OslTemplate/KB/Relation.mediawiki",
				"OslTemplate:KB/Relation/ReverseListFormat" => "OslTemplate/KB/Relation/ReverseListFormat.mediawiki",
				"OslTemplate:KB/Term" => "OslTemplate/KB/Term.mediawiki",
				"OslTemplate:KB/Term/Body" => "OslTemplate/KB/Term/Body.mediawiki",
				"OslTemplate:KB/Term/Footer" => "OslTemplate/KB/Term/Footer.mediawiki",
				"OslTemplate:KB/Viewer/GraphFromList" => "OslTemplate/KB/Viewer/GraphFromList.mediawiki",
				"OslTemplate:LabProcess" => "OslTemplate/LabProcess.mediawiki",
				"OslTemplate:LabProcess/CreateInstanceLink" => "OslTemplate/LabProcess/CreateInstanceLink.mediawiki",
				"OslTemplate:LabProcess/File" => "OslTemplate/LabProcess/File.mediawiki",
				"OslTemplate:LabProcess/Footer" => "OslTemplate/LabProcess/Footer.mediawiki",
				"OslTemplate:LabProcess/Header" => "OslTemplate/LabProcess/Header.mediawiki",
				"OslTemplate:LabProcess/Instance" => "OslTemplate/LabProcess/Instance.mediawiki",
				"OslTemplate:LabProcess/Instance/Demo1" => "OslTemplate/LabProcess/Instance/Demo1.mediawiki",
				"OslTemplate:LabProcess/Instance/Footer" => "OslTemplate/LabProcess/Instance/Footer.mediawiki",
				"OslTemplate:LabProcess/Instance/Header" => "OslTemplate/LabProcess/Instance/Header.mediawiki",
				"OslTemplate:LabProcess/Object" => "OslTemplate/LabProcess/Object.mediawiki",
				"OslTemplate:LabProcess/Object/Array" => "OslTemplate/LabProcess/Object/Array.mediawiki",
				"OslTemplate:LabProcess/Object/ById" => "OslTemplate/LabProcess/Object/ById.mediawiki",
				"OslTemplate:LabProcess/Object/ByName" => "OslTemplate/LabProcess/Object/ByName.mediawiki",
				"OslTemplate:LabProcess/Object/Global" => "OslTemplate/LabProcess/Object/Global.mediawiki",
				"OslTemplate:LabProcess/Object/Id" => "OslTemplate/LabProcess/Object/Id.mediawiki",
				"OslTemplate:LabProcess/Object/ObjectCreator" => "OslTemplate/LabProcess/Object/ObjectCreator.mediawiki",
				"OslTemplate:LabProcess/Object/Reference" => "OslTemplate/LabProcess/Object/Reference.mediawiki",
				"OslTemplate:LabProcess/Object/WikiId" => "OslTemplate/LabProcess/Object/WikiId.mediawiki",
				"OslTemplate:LabProcess/Parameter" => "OslTemplate/LabProcess/Parameter.mediawiki",
				"OslTemplate:LabProcess/Parameter/MultiFile/Config" => "OslTemplate/LabProcess/Parameter/MultiFile/Config.mediawiki",
				"OslTemplate:LabProcess/Parameter/MultiFile/File" => "OslTemplate/LabProcess/Parameter/MultiFile/File.mediawiki",
				"OslTemplate:LabProcess/Parameter/MultiFile/ParamArray" => "OslTemplate/LabProcess/Parameter/MultiFile/ParamArray.mediawiki",
				"OslTemplate:LabProcess/Parameter/MultiObject" => "OslTemplate/LabProcess/Parameter/MultiObject.mediawiki",
				"OslTemplate:LabProcess/Parameter/MultiObject/Config" => "OslTemplate/LabProcess/Parameter/MultiObject/Config.mediawiki",
				"OslTemplate:LabProcess/Parameter/MultiObject/Object" => "OslTemplate/LabProcess/Parameter/MultiObject/Object.mediawiki",
				"OslTemplate:LabProcess/Parameter/MultiObject/ParamArray" => "OslTemplate/LabProcess/Parameter/MultiObject/ParamArray.mediawiki",
				"OslTemplate:LabProcess/Parameter/MultiQuantitative" => "OslTemplate/LabProcess/Parameter/MultiQuantitative.mediawiki",
				"OslTemplate:LabProcess/Parameter/MultiQuantitative/Config" => "OslTemplate/LabProcess/Parameter/MultiQuantitative/Config.mediawiki",
				"OslTemplate:LabProcess/Parameter/MultiQuantitative/ParamArray" => "OslTemplate/LabProcess/Parameter/MultiQuantitative/ParamArray.mediawiki",
				"OslTemplate:LabProcess/Parameter/MultiQuantitative/Quantitative" => "OslTemplate/LabProcess/Parameter/MultiQuantitative/Quantitative.mediawiki",
				"OslTemplate:LabProcess/Parameter/MultiTool" => "OslTemplate/LabProcess/Parameter/MultiTool.mediawiki",
				"OslTemplate:LabProcess/Parameter/MultiTool/Config" => "OslTemplate/LabProcess/Parameter/MultiTool/Config.mediawiki",
				"OslTemplate:LabProcess/Parameter/MultiTool/Device" => "OslTemplate/LabProcess/Parameter/MultiTool/Device.mediawiki",
				"OslTemplate:LabProcess/Parameter/MultiTool/Tool" => "OslTemplate/LabProcess/Parameter/MultiTool/Tool.mediawiki",
				"OslTemplate:LabProcess/Parameter/Tool" => "OslTemplate/LabProcess/Parameter/Tool.mediawiki",
				"OslTemplate:LabProcess/Query" => "OslTemplate/LabProcess/Query.mediawiki",
				"OslTemplate:LabProcess/Query/DeviceParam" => "OslTemplate/LabProcess/Query/DeviceParam.mediawiki",
				"OslTemplate:LabProcess/Query/GenericParam" => "OslTemplate/LabProcess/Query/GenericParam.mediawiki",
				"OslTemplate:LabProcess/Query/GenericParam/SubQuery" => "OslTemplate/LabProcess/Query/GenericParam/SubQuery.mediawiki",
				"OslTemplate:LabProcess/Query/InteractiveSemanticGraph" => "OslTemplate/LabProcess/Query/InteractiveSemanticGraph.mediawiki",
				"OslTemplate:LabProcess/Query/Param" => "OslTemplate/LabProcess/Query/Param.mediawiki",
				"OslTemplate:LabProcess/Step" => "OslTemplate/LabProcess/Step.mediawiki",
				"OslTemplate:LabProcess/Step/Descriptor" => "OslTemplate/LabProcess/Step/Descriptor.mediawiki",
				"OslTemplate:LabProcess/Step/Footer" => "OslTemplate/LabProcess/Step/Footer.mediawiki",
				"OslTemplate:LabProcess/Step/Form" => "OslTemplate/LabProcess/Step/Form.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Footer" => "OslTemplate/LabProcess/Step/Form/Footer.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Header" => "OslTemplate/LabProcess/Step/Form/Header.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param" => "OslTemplate/LabProcess/Step/Form/Param.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Common" => "OslTemplate/LabProcess/Step/Form/Param/Common.mediawiki",
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
				"OslTemplate:LabProcess/Step/Form/Param/MultiTool" => "OslTemplate/LabProcess/Step/Form/Param/MultiTool.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/MultiTool/Fields" => "OslTemplate/LabProcess/Step/Form/Param/MultiTool/Fields.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/MultiTool/Rows" => "OslTemplate/LabProcess/Step/Form/Param/MultiTool/Rows.mediawiki",
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
				"OslTemplate:LabProcess/Step/Form/Param/Tool" => "OslTemplate/LabProcess/Step/Form/Param/Tool.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Tool/Fields" => "OslTemplate/LabProcess/Step/Form/Param/Tool/Fields.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Tool/Footer" => "OslTemplate/LabProcess/Step/Form/Param/Tool/Footer.mediawiki",
				"OslTemplate:LabProcess/Step/Form/Param/Tool/Header" => "OslTemplate/LabProcess/Step/Form/Param/Tool/Header.mediawiki",
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
				"OslTemplate:LIMS/Attachment" => "OslTemplate/LIMS/Attachment.mediawiki",
				"OslTemplate:LIMS/Common" => "OslTemplate/LIMS/Common.mediawiki",
				"OslTemplate:LIMS/Common/Category/Footer" => "OslTemplate/LIMS/Common/Category/Footer.mediawiki",
				"OslTemplate:LIMS/Common/Category/Header" => "OslTemplate/LIMS/Common/Category/Header.mediawiki",
				"OslTemplate:LIMS/Common/Link" => "OslTemplate/LIMS/Common/Link.mediawiki",
				"OslTemplate:LIMS/Common/Property" => "OslTemplate/LIMS/Common/Property.mediawiki",
				"OslTemplate:LIMS/Common/Template" => "OslTemplate/LIMS/Common/Template.mediawiki",
				"OslTemplate:LIMS/Common/Viewer/LocationTree" => "OslTemplate/LIMS/Common/Viewer/LocationTree.mediawiki",
				"OslTemplate:LIMS/Device" => "OslTemplate/LIMS/Device.mediawiki",
				"OslTemplate:LIMS/Device/Category" => "OslTemplate/LIMS/Device/Category.mediawiki",
				"OslTemplate:LIMS/Device/Instance" => "OslTemplate/LIMS/Device/Instance.mediawiki",
				"OslTemplate:LIMS/Device/Type" => "OslTemplate/LIMS/Device/Type.mediawiki",
				"OslTemplate:LIMS/Device/Type/Body" => "OslTemplate/LIMS/Device/Type/Body.mediawiki",
				"OslTemplate:LIMS/Device/Type/Footer" => "OslTemplate/LIMS/Device/Type/Footer.mediawiki",
				"OslTemplate:LIMS/File/Category" => "OslTemplate/LIMS/File/Category.mediawiki",
				"OslTemplate:LIMS/File/Instance" => "OslTemplate/LIMS/File/Instance.mediawiki",
				"OslTemplate:LIMS/File/Type" => "OslTemplate/LIMS/File/Type.mediawiki",
				"OslTemplate:LIMS/Form/Common" => "OslTemplate/LIMS/Form/Common.mediawiki",
				"OslTemplate:LIMS/Form/Common/Category/Header" => "OslTemplate/LIMS/Form/Common/Category/Header.mediawiki",
				"OslTemplate:LIMS/Form/Common/Footer" => "OslTemplate/LIMS/Form/Common/Footer.mediawiki",
				"OslTemplate:LIMS/Form/Common/Header" => "OslTemplate/LIMS/Form/Common/Header.mediawiki",
				"OslTemplate:LIMS/Location/Building" => "OslTemplate/LIMS/Location/Building.mediawiki",
				"OslTemplate:LIMS/Location/Floor" => "OslTemplate/LIMS/Location/Floor.mediawiki",
				"OslTemplate:LIMS/Location/Room" => "OslTemplate/LIMS/Location/Room.mediawiki",
				"OslTemplate:LIMS/Location/Site" => "OslTemplate/LIMS/Location/Site.mediawiki",
				"OslTemplate:LIMS/Material/Category" => "OslTemplate/LIMS/Material/Category.mediawiki",
				"OslTemplate:LIMS/Material/Instance" => "OslTemplate/LIMS/Material/Instance.mediawiki",
				"OslTemplate:LIMS/Material/Type" => "OslTemplate/LIMS/Material/Type.mediawiki",
				"OslTemplate:LIMS/Ou" => "OslTemplate/LIMS/Ou.mediawiki",
				"OslTemplate:LIMS/Ou/Organization" => "OslTemplate/LIMS/Ou/Organization.mediawiki",
				"OslTemplate:LIMS/Ou/Organization/Query" => "OslTemplate/LIMS/Ou/Organization/Query.mediawiki",
				"OslTemplate:LIMS/Person" => "OslTemplate/LIMS/Person.mediawiki",
				"OslTemplate:LIMS/Person/Query" => "OslTemplate/LIMS/Person/Query.mediawiki",
				"OslTemplate:LIMS/Person/User" => "OslTemplate/LIMS/Person/User.mediawiki",
				"OslTemplate:LIMS/Project/Part/Footer" => "OslTemplate/LIMS/Project/Part/Footer.mediawiki",
				"OslTemplate:LIMS/Project/Part/Header" => "OslTemplate/LIMS/Project/Part/Header.mediawiki",
				"OslTemplate:LIMS/Query/Device" => "OslTemplate/LIMS/Query/Device.mediawiki",
				"OslTemplate:LIMS/Software/Category" => "OslTemplate/LIMS/Software/Category.mediawiki",
				"OslTemplate:LIMS/Software/Instance" => "OslTemplate/LIMS/Software/Instance.mediawiki",
				"OslTemplate:LIMS/Software/Type" => "OslTemplate/LIMS/Software/Type.mediawiki",
				"OslTemplate:Message" => "OslTemplate/Message.mediawiki",
				"OslTemplate:Message/NotDefined" => "OslTemplate/Message/NotDefined.mediawiki",
				"OslTemplate:Property" => "OslTemplate/Property.mediawiki",
				"OslTemplate:Property/Quantitative" => "OslTemplate/Property/Quantitative.mediawiki",
				"OslTemplate:Property/Quantity" => "OslTemplate/Property/Quantity.mediawiki",
				"OslTemplate:Property/Quantity/Unit" => "OslTemplate/Property/Quantity/Unit.mediawiki",
				"OslTemplate:Test" => "OslTemplate/Test.mediawiki",
				"Template:ELN/Decoration/Annotation" => "Template/ELN/Decoration/Annotation.mediawiki",
				"Template:ELN/Decoration/ColoredText" => "Template/ELN/Decoration/ColoredText.mediawiki",
				"Template:ELN/Editor/DrawIO" => "Template/ELN/Editor/DrawIO.mediawiki",
				"Template:ELN/Editor/Graph" => "Template/ELN/Editor/Graph.mediawiki",
				"Template:ELN/Editor/Kekule" => "Template/ELN/Editor/Kekule.mediawiki",
				"Template:ELN/Editor/Spreadsheet" => "Template/ELN/Editor/Spreadsheet.mediawiki",
				"Template:ELN/Editor/SvgEdit" => "Template/ELN/Editor/SvgEdit.mediawiki",
				"Template:ELN/Editor/Wellplate" => "Template/ELN/Editor/Wellplate.mediawiki",
				"Template:ELN/Viewer/Kekule" => "Template/ELN/Viewer/Kekule.mediawiki",
				"Template:ELN/Viewer/ProjectTree" => "Template/ELN/Viewer/ProjectTree.mediawiki",
				"Template:LIMS/Common/Viewer/LocationTree" => "Template/LIMS/Common/Viewer/LocationTree.mediawiki",
				"Template:ELN/Editor/ParamSet" => "Template/ELN/Editor/ParamSet.mediawiki",
				"OslTemplate:ELN/Editor/ParamSet" => "OslTemplate/ELN/Editor/ParamSet.mediawiki",
				"CreatePage" => "CreatePage.mediawiki",
				"Category:Object" => "Category/Object.mediawiki",
				"Category:Thing" => "Category/Thing.mediawiki",
				"Category:Process" => "Category/Process.mediawiki",
				"Category:Term" => "Category/Term.mediawiki",
				"Category:LIMS/Person/User" => "Category/LIMS/Person/User.mediawiki",
				"Category:LIMS/Person" => "Category/LIMS/Person.mediawiki",
			],

			// base dir for imported pages
			"root" => dirname(__DIR__) . '/importPages',

			// edit summary used when PageImporter edits pages
			"comment" => "Updated with content from Extension:OpenSemanticLab version 0.0.3"
		];

	}

	public static function onBeforePageDisplay( $out ) {

		//handle css explicitly, see https://www.mediawiki.org/wiki/ResourceLoader/Developing_with_ResourceLoader#CSS_2
		$out->addModuleStyles( 'ext.OpenSemanticLab.styles' );
		$out->addModuleStyles( 'ext.OpenSemanticLab.LIMS.styles' );

		$out->addModules( 'ext.OpenSemanticLab' );
		$out->addModules( 'ext.OpenSemanticLab.editor' );
		$out->addModules( 'ext.OpenSemanticLab.forms' );

		$out->addModules( 'ext.osw.ui.qr' );
		$out->addModules( 'ext.osw.ui.kanban' );

		return true;

	}
	
	public static function onSkinTemplateNavigation_Universal( &$skin, &$links ) {
		// Add an additional link
		//https://stackoverflow.com/questions/18442495/how-to-get-current-page-url-in-mediawiki
		//https://github.com/wikimedia/mediawiki/blob/bcaab3d057c8e550793100448f725761e1a8e017/includes/skins/SkinTemplate.php#L1018

      	/*$links['actions']['subpage'] = array(
			'class' => false, // false or 'selected', defines whether the tab should be highlighted
			'text' => wfMessage('open-semantic-lab-create-subpage'), // what the tab says
			'href' => $skin->makeInternalOrExternalUrl("CreatePage" . ?superpage=" . $skin->getTitle()->getFullText())
		);*/

		$user = $skin->getUser();
		$namespace = $skin->getTitle()->getNamespace();
		$page_title = $skin->getTitle()->getFullText();
		$permissionManager = MediaWikiServices::getInstance()->getPermissionManager();
		$user_can_edit = $permissionManager->userCan( 'edit', $user, $skin->getTitle(), MediaWiki\Permissions\PermissionManager::RIGOR_QUICK );
		$data_editable = in_array($namespace, [
			0, // Main
			6, // File
			14, // Category
			102, // Property
			7000 // Item
		]) && $page_title != "Main Page";

		if ( $skin->getSkinName() === 'citizen' ) {

			//views: always visible
			if ( $user_can_edit && $data_editable ) $links['views']['edit-data'] = array(
				'class' => "osw-links citizen-ve-edit-merged",
				'text' => wfMessage( 'open-semantic-lab-edit-page-data-short' )->text(),
				'title' => wfMessage( 'open-semantic-lab-edit-page-data-tooltip' )->text(),
				'href' => "javascript:osl.ui.editData();",
			);
			
			//Actions: In sidebar
			if ( $user_can_edit && $data_editable && $namespace != 0) { //not "Main"
				$links['actions']['copy'] = array(
					'class' => "",
					'text' => wfMessage( 'open-semantic-lab-copy-page' )->text(),
					'title' => wfMessage( 'open-semantic-lab-copy-page-tooltip' )->text(),
					'href' => 'javascript:osl.ui.editData({"mode": "copy"});',
				);
			}
			$links['actions']['export-pdf'] = array(
				'class' => "",
				'text' => wfMessage( 'open-semantic-lab-print-page' )->text(),
				'title' => wfMessage( 'open-semantic-lab-print-page-tooltip' )->text(),
				'href' => 'javascript:osl.ui.printPage();',
			);

			if ($namespace == 14) { //Category
				
			
				if ( $user_can_edit ) $links['views']['create-subcategory'] = array(
					'class' => "osw-links",
					'text' => wfMessage( 'open-semantic-lab-create-subcategory-short' )->text(),
					'title' => wfMessage( 'open-semantic-lab-create-subcategory-tooltip' )->text(),
					'href' => 'javascript:osl.ui.createSubcategory(["' . $page_title . '"]);' ,
				);

				if ( $user_can_edit ) $links['views']['create-instance'] = array(
					'class' => "osw-links",
					'text' => wfMessage( 'open-semantic-lab-create-instance-short' )->text(),
					'title' => wfMessage( 'open-semantic-lab-create-instance-tooltip' )->text(),
					'href' => 'javascript:osl.ui.createInstance(["' . $page_title . '"]);' ,
				);

				if ( $user_can_edit ) $links['actions']['edit-schema'] = array(
					'class' => "osw-links",
					'text' => wfMessage( 'open-semantic-lab-edit-page-schema' )->text(),
					'title' => wfMessage( 'open-semantic-lab-edit-page-schema-tooltip' )->text(),
					'href' => "javascript:osl.ui.editData({dataslot: 'jsonschema'});" ,
				);

				$links['views']['query-instance'] = array(
					'class' => "osw-links",
					'text' => wfMessage( 'open-semantic-lab-query-instance-short' )->text(),
					'title' => wfMessage( 'open-semantic-lab-query-instance-tooltip' )->text(),
					'href' => 'javascript:osl.ui.queryInstance(["' . $page_title . '"]);' ,
				);
			}

			if ($namespace == 6) { //File

				if ( ExtensionRegistry::getInstance()->isLoaded( 'WebDAV' ) ) {
					// display an "Edit with ..." button to open files directly in a desktop app, e. g. MS WORD

					$webDAVUrlProvider = MediaWikiServices::getInstance()->getService( 'WebDAVUrlProvider' );
					$webDAVUrl = $webDAVUrlProvider->getUrl( $skin->getTitle() );

					// static token e. g. to mount as a drive - not supported yet
					#$webDAVTokenizer = MediaWikiServices::getInstance()->getService( 'WebDAVTokenizer' );
					#$webDAVTokenizer->setUser( $user );
					#$staticToken = $webDAVTokenizer->getStaticToken( );
					
					// Adapted from https://de.wiki.bluespice.com/wiki/Referenz:BlueSpiceWebDAVClientIntegration
					$apps = [
						'webdav-ci-ms-word' => [
							'icon' => 'icon-file-word',
							'extensions' => ['doc', 'docx', 'dot', 'dotx', 'rtf', 'docm', 'dotm', 'odt'],
							'protocol' => 'ms-word', 
						], 
						'webdav-ci-ms-excel' => [
							'icon' => 'icon-file-excel',
							'extensions' => ['xls', 'xlsx', 'csv', 'tsv', 'xlsm'],
							'protocol' => 'ms-excel',
						], 
						'webdav-ci-ms-powerpoint' => [
							'icon' => 'icon-file-powerpoint', 
							'extensions' => [0 => 'ppt', 1 => 'pptx'], 
							'protocol' => 'ms-powerpoint', 
						], 
						'webdav-ci-archive' => [
							'icon' => 'icon-file-zip', 
							'extensions' => [0 => 'zip'], 
						], 
						'webdav-ci-generic' => [
							'icon' => 'icon-file', 
						], 
						'@Not yet supported!' => [],
						'@webdav-ci-ms-visio' => [
							'icon' => 'icon-file-visio', 
							'extensions' => [], 
							'protocol' => 'ms-visio', 
						], 
						'@webdav-ci-ms-access' => [
							'icon' => 'icon-file-access', 
							'extensions' => [], 
							'protocol' => 'ms-access', 
						], 
						'@webdav-ci-ms-project' => [
							'icon' => 'icon-file-project', 
							'extensions' => [], 
							'protocol' => 'ms-project', 
						], 
						'@webdav-ci-ms-publisher' => [
							'icon' => 'icon-file-publisher', 
							'extensions' => [], 
							'protocol' => 'ms-publisher', 
						], 
						'@webdav-ci-ms-spd' => [
							'icon' => 'icon-file-spd', 
							'extensions' => [], 
							'protocol' => 'ms-spd', 
						], 
						'@webdav-ci-ms-infopath' => [
							'icon' => 'icon-file-infopath', 
							'extensions' => [], 
							'protocol' => 'ms-infopath', 
						], 
					];

					$file_extension = end(explode('.', $page_title));
					$protocol = null;
					$app_id = null;
					foreach ( $apps as $key => $app ) {
						if ( array_key_exists('extensions', $app) && array_key_exists('protocol', $app) ) {
							if ( in_array( $file_extension, $app['extensions'] ) ) {
								$protocol = $app['protocol'];
								$app_id = $key;
								break;
							}
						}
					}
					if ($protocol) {
						$links['views']['create-subcategory'] = array(
							'class' => "osw-links",
							'text' => wfMessage( 'open-semantic-lab-webdav-ci-open-with-tool' )->params(
								wfMessage( 'open-semantic-lab-' . $app_id )
							)->plain(),
							'title' => "Opens the file in a desktop app",
							'href' => $protocol . ':ofe|u|' . $webDAVUrl,
						);
					}
				}
			}

			if ( $user_can_edit ) $links['actions']['edit-slots'] = array(
				'class' => "osw-links",
				'text' => wfMessage( 'open-semantic-lab-edit-page-slots' )->text(),
				'title' => wfMessage( 'open-semantic-lab-edit-page-slots-tooltip' )->text(),
				'href' => "javascript:osl.ui.editSlots({'include': ['jsonschema', 'jsondata'], 'hide': ['footer', 'header']});"
			);

			//$links['views']['ve-edit']['text'] = "Edit text"; //does not work, overwritten by js

			// move history to "more"
			$links['actions']['history'] = $links['views']['history'];
			unset($links['views']['history']);

			// rename "Read" button (visible when VisualEditor is active)
			$links['views']['view']['text'] = wfMessage( 'open-semantic-lab-edit-page-visual-cancel' )->text();
		}

		return true;
	}
}
