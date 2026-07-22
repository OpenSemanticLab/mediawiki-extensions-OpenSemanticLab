/* OSL info-box side-collapse toggle
 * Companion to modules/ext.OpenSemanticLab/InfoBox.css
 * Persistence: global (single localStorage flag for all info boxes on the wiki).
 * Idempotent: re-runs safely on mw.hook('wikipage.content') refires (VE, etc.).
 */
( function () {
	'use strict';

	var STORAGE_KEY = 'osl-info-box-collapsed';
	var COLLAPSED_CLASS = 'info_box--collapsed';
	var TAB_VISIBLE_CLASS = 'info_box-tab--visible';

	function getStoredCollapsed() {
		try {
			return window.localStorage.getItem( STORAGE_KEY ) === '1';
		} catch ( e ) {
			return false;
		}
	}
	function setStoredCollapsed( collapsed ) {
		try {
			window.localStorage.setItem( STORAGE_KEY, collapsed ? '1' : '0' );
		} catch ( e ) { /* private mode, quota, etc. */ }
	}

	function extractHeadingText( heading ) {
		// Prefer direct text nodes so injected widgets like {{#info}} tooltips
		// (child elements) do not pollute the tab label.
		var out = '';
		heading.childNodes.forEach( function ( n ) {
			if ( n.nodeType === Node.TEXT_NODE ) {
				out += n.nodeValue;
			}
		} );
		out = out.replace( /\s+/g, ' ' ).trim();
		if ( !out ) {
			out = heading.textContent.replace( /\s+/g, ' ' ).trim();
		}
		return out || 'Info';
	}

	function enhance( box ) {
		if ( box.dataset.oslInfoBoxEnhanced === '1' ) {
			return;
		}
		box.dataset.oslInfoBoxEnhanced = '1';

		var heading = box.querySelector( 'th.heading' );
		if ( !heading ) {
			return; // not the expected DOM shape
		}

		var titleText = extractHeadingText( heading );

		var collapseBtn = document.createElement( 'button' );
		collapseBtn.type = 'button';
		collapseBtn.className = 'info_box-toggle';
		collapseBtn.setAttribute( 'aria-controls', box.id || '' );
		collapseBtn.setAttribute( 'aria-label', 'Collapse info box to side tab' );
		collapseBtn.title = 'Collapse info box';
		collapseBtn.textContent = '▶'; // right-pointing triangle
		heading.appendChild( collapseBtn );

		var tabBtn = document.createElement( 'button' );
		tabBtn.type = 'button';
		tabBtn.className = 'info_box-tab';
		tabBtn.setAttribute( 'aria-controls', box.id || '' );
		tabBtn.setAttribute( 'aria-label', 'Expand info box' );
		tabBtn.title = 'Expand info box';
		var tabLabel = document.createElement( 'span' );
		tabLabel.className = 'info_box-tab-label';
		tabLabel.textContent = titleText;
		tabBtn.appendChild( tabLabel );
		box.parentNode.insertBefore( tabBtn, box.nextSibling );

		function apply( collapsed ) {
			box.classList.toggle( COLLAPSED_CLASS, collapsed );
			tabBtn.classList.toggle( TAB_VISIBLE_CLASS, collapsed );
			collapseBtn.setAttribute( 'aria-expanded', collapsed ? 'false' : 'true' );
			tabBtn.setAttribute( 'aria-expanded', collapsed ? 'false' : 'true' );
		}

		apply( getStoredCollapsed() );

		collapseBtn.addEventListener( 'click', function ( e ) {
			e.stopPropagation();
			apply( true );
			setStoredCollapsed( true );
			tabBtn.focus();
		} );
		tabBtn.addEventListener( 'click', function ( e ) {
			e.stopPropagation();
			apply( false );
			setStoredCollapsed( false );
			collapseBtn.focus();
		} );
	}

	function scan( root ) {
		var boxes = ( root || document ).querySelectorAll( 'table.info_box' );
		for ( var i = 0; i < boxes.length; i++ ) {
			enhance( boxes[ i ] );
		}
	}

	if ( window.mw && mw.hook ) {
		mw.hook( 'wikipage.content' ).add( function ( $content ) {
			var root = $content && $content.length ? $content[ 0 ] : document;
			scan( root );
		} );
	} else if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', function () { scan(); } );
	} else {
		scan();
	}
}() );