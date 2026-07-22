/* OSL info-box side-collapse toggle
 * Companion to modules/ext.OpenSemanticLab/InfoBox.css
 * Persistence: global (single localStorage flag for all info boxes on the wiki).
 * Multiple info boxes on one page share ONE tab; every info box gets its own
 * collapse button so the toggle is reachable wherever you scroll.
 *
 * An inline head script in OpenSemanticLab::onBeforePageDisplay pre-sets
 * .osl-info-box-collapsed on <html> when the persisted state is collapsed so
 * the CSS can hide the box before this script runs (no flash of visible box).
 * We remove that html-level class here once we've applied .info_box--collapsed
 * to the individual boxes.
 */
( function () {
	'use strict';

	var STORAGE_KEY = 'osl-info-box-collapsed';
	var HTML_HINT_CLASS = 'osl-info-box-collapsed';
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

	function applyState( collapsed ) {
		var boxes = document.querySelectorAll( 'table.info_box' );
		for ( var i = 0; i < boxes.length; i++ ) {
			boxes[ i ].classList.toggle( COLLAPSED_CLASS, collapsed );
		}
		var tab = document.querySelector( '.info_box-tab' );
		if ( tab ) {
			tab.classList.toggle( TAB_VISIBLE_CLASS, collapsed );
			tab.setAttribute( 'aria-expanded', collapsed ? 'false' : 'true' );
		}
		var toggles = document.querySelectorAll( '.info_box-toggle' );
		for ( var j = 0; j < toggles.length; j++ ) {
			toggles[ j ].setAttribute( 'aria-expanded', collapsed ? 'false' : 'true' );
		}
	}

	function addCollapseButton( box ) {
		if ( box.dataset.oslInfoBoxEnhanced === '1' ) {
			return;
		}
		box.dataset.oslInfoBoxEnhanced = '1';

		var heading = box.querySelector( 'th.heading' );
		if ( !heading ) {
			return; // not the expected DOM shape
		}

		var btn = document.createElement( 'button' );
		btn.type = 'button';
		btn.className = 'info_box-toggle';
		btn.setAttribute( 'aria-label', 'Collapse info box to side tab' );
		btn.title = 'Collapse info box';
		btn.textContent = '▶'; // ▶
		heading.appendChild( btn );

		btn.addEventListener( 'click', function ( e ) {
			e.stopPropagation();
			applyState( true );
			setStoredCollapsed( true );
			var tab = document.querySelector( '.info_box-tab' );
			if ( tab ) {
				tab.focus();
			}
		} );
	}

	function ensureSharedTab( boxes ) {
		if ( document.querySelector( '.info_box-tab' ) ) {
			return; // shared tab already exists
		}
		var firstBox = boxes[ 0 ];
		var firstHeading = firstBox.querySelector( 'th.heading' );
		var titleText = firstHeading ? extractHeadingText( firstHeading ) : 'Info';
		var labelText = titleText + ' Info Box';

		var tabBtn = document.createElement( 'button' );
		tabBtn.type = 'button';
		tabBtn.className = 'info_box-tab';
		tabBtn.setAttribute( 'aria-label', 'Expand info box' );
		tabBtn.title = 'Expand info box';

		var icon = document.createElement( 'span' );
		icon.className = 'info_box-tab-icon';
		tabBtn.appendChild( icon );

		var label = document.createElement( 'span' );
		label.className = 'info_box-tab-label';
		label.textContent = labelText;
		tabBtn.appendChild( label );

		// Insert right after the first info box so mobile (inline) mode shows
		// the tab in place of the box. On desktop it is position:fixed so DOM
		// position does not matter visually.
		firstBox.parentNode.insertBefore( tabBtn, firstBox.nextSibling );

		tabBtn.addEventListener( 'click', function ( e ) {
			e.stopPropagation();
			applyState( false );
			setStoredCollapsed( false );
			var first = document.querySelector( '.info_box-toggle' );
			if ( first ) {
				first.focus();
			}
		} );
	}

	function scan( root ) {
		var boxes = ( root || document ).querySelectorAll( 'table.info_box' );
		if ( !boxes.length ) {
			return;
		}
		for ( var i = 0; i < boxes.length; i++ ) {
			addCollapseButton( boxes[ i ] );
		}
		ensureSharedTab( boxes );

		applyState( getStoredCollapsed() );
		// Hand off from the anti-flicker html class to the per-box classes so
		// the CSS rule scoped to html.osl-info-box-collapsed no longer applies.
		document.documentElement.classList.remove( HTML_HINT_CLASS );
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