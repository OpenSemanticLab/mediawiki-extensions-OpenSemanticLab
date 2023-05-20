<?php
/**
 *
 * Copyright © 30.12.22 by the authors listed below.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * http://www.gnu.org/copyleft/gpl.html
 *
 * @license AGPL-3.0-or-later
 * @file
 *
 * @author Simon Stier
 */
namespace MediaWiki\Extension\OpenSemanticLab;
use Content;
use TextContent;
use WikitextContent;
/**
 * Class EntityContent
 *
 * @package OpenSemanticLab
 */
class EntityContent extends TextContent {
	public const MODEL = 'entity';
	/** @inheritDoc */
	public function __construct( $text, $model_id = self::MODEL ) {
		parent::__construct( $text, $model_id );
	}

	/**
	 * Returns the text represented by this Content object, as a string.
	 *
	 * @since 1.33
	 * @note This method should not be overwritten by subclasses. If a subclass find itself in
	 * need to override this method, it should probably not be based on TextContent, but
	 * should rather extend AbstractContent instead.
	 *
	 * @return string The raw text.
	 */
	public function getText() {
		return $this->mText . "Test";
	}
}