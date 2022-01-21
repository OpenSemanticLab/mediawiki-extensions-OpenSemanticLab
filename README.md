# LabWiki

## Namespaces
* Device: Abstract devices (device types)
* Material: Abstract materials
* Process: Abstract processes
* Lab: Instances of devices (instances), materials (batches), and processes (protocols)

## Templates
* Device
  * DeviceCategory
  * DeviceType
  * DeviceInstance
* Material
  * MaterialCategory
  * Material / MaterialType
  * Batch / MaterialInstance
* Quantity
* LabProcess

## Forms

## Categories
* Material: Root of MaterialCategories
* Device: Root of DeviceCategories
* ProcessStepInstance
* Parameter 
* ProcessParameter
* ProcessTemplate
* ProcessStepTemplate
* ProcessStepSubpageTemplate

## Concepts
* MaterialCategory: Hierarchical categories for Materials 
* DeviceCategory: Hierarchical categories for Devices

## Properties
* IsInstanceOf: Instance -> Abstract Class
* IsRelatedTo
* HasAgent
* HasPredecessor
* HasSuccessor
* IsConcurrentTo
* HasSubpage
* HasInput
* HasOutput
* HasName
* HasStartTimeAndDate
* HasEndTimeAndDate
* HasParameterType
* HasProperty
* HasStatus
* HasVersion
* HasTemplate
* HasForm
