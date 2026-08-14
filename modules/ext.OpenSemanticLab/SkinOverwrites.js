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
		btn.setAttribute( 'aria-label', 'Collapse info box' );
		btn.title = 'Collapse info box';
		// Glyph provided by CSS ::before so it can adapt to viewport
		// (▶ on desktop, ▲ on mobile).
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
		var labelText = titleText + ' - Info Box';

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

/* A second horizontal scrollbar above wide DataTables.
 *
 * DataTables renders the header in .dt-scroll-head with overflow:hidden and drives it
 * from .dt-scroll-body, so the only scrollbar sits below the table: a wide table has
 * to be scrolled to the bottom before it can be scrolled sideways. Making the head
 * scrollable and mirroring scrollLeft in both directions adds a scrollbar on top
 * without touching DataTables, since both elements already share the inner width.
 */
( function () {
	'use strict';

	function enhance( container ) {
		if ( container.dataset.oslTopScroll === '1' ) {
			return;
		}
		var head = container.querySelector( '.dt-scroll-head' );
		var body = container.querySelector( '.dt-scroll-body' );
		if ( !head || !body ) {
			return; // not a scrollX table, nothing to scroll
		}
		container.dataset.oslTopScroll = '1';

		// DataTables sets overflow inline, so it has to be overridden the same way
		head.style.overflowX = 'auto';

		var syncing = false;
		function mirror( from, to ) {
			return function () {
				if ( syncing ) {
					return; // otherwise the two handlers chase each other
				}
				syncing = true;
				to.scrollLeft = from.scrollLeft;
				syncing = false;
			};
		}
		head.addEventListener( 'scroll', mirror( head, body ) );
		body.addEventListener( 'scroll', mirror( body, head ) );
	}

	function scan( root ) {
		var containers = ( root || document ).querySelectorAll( '.dt-container' );
		for ( var i = 0; i < containers.length; i++ ) {
			enhance( containers[ i ] );
		}
	}

	if ( window.mw && mw.hook ) {
		mw.hook( 'wikipage.content' ).add( function ( $content ) {
			var root = $content && $content.length ? $content[ 0 ] : document;
			scan( root );
			// DataTables initialises after the content hook, so look again once it has
			setTimeout( function () { scan( root ); }, 0 );
		} );
	} else {
		scan();
	}
}() );
