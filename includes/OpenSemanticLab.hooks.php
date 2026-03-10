<?php
/**
 * Hooks for OpenSemanticLab extension
 *
 * @file
 * @ingroup Extensions
 */

class OpenSemanticLabHooks {

	public static function onParserFirstCallInit( Parser &$parser ) {
		// important: This needs 	
		// "ExtensionMessagesFiles": { "OpenSemanticLabMagic": "OpenSemanticLab.i18n.magic.php" }
		// in extension.json

		$parser->setFunctionHook( 'pagebutton', [ 'OpenSemanticLabHooks', 'pagebutton' ]  );
	}


	/**
	 * @param Parser &$parser
	 * @param string &$text
	 * @return true
	 */
	public static function pagebutton( &$parser, &$text ) {
		// Called in MW text like this: {{#pagebutton: }}

      //$params = OpenSemanticLabHooks::extractParams( array_slice( func_get_args(), 1 ) );
      $params = json_decode($text, true);

		// For named parameters like {{#hdf: foo=bar | apple=orange | banana }}
		// See: https://www.mediawiki.org/wiki/Manual:Parser_functions#Named_parameters
      // <a class="${config.class}" role="button" href='javascript:osl.ui.editData(${JSON.stringify(config.params)});'>${icon + config.label}</a>
      if ($params["action"] === "edit-data") {
         $result .= Html::openElement ( 'a', array(
            #'class' => "btn btn-primary",
            'role' => "button",
            'href' => 'javascript:osl.ui.editData(' . json_encode($params["params"]) . ');',
         ) );
         $result .= Html::rawElement ( 'i', array(
            'class' => $params["icon_class"],
         ) );
         $result .= Html::closeElement ( 'a' );
      }
      else $result = "Action '" . $params['action'] . "' not supported.";
		return [$result, 'isHTML' => true, 'noparse' => true ];
      #return [var_dump($params), 'isHTML' => false, 'noparse' => true];

	}

   /**
    * Converts an array of values in form [0] => "name=value"
    * into a real associative array in form [name] => value
    * If no = is provided, true is assumed like this: [name] => true
    *
    * @param array string $params
    * @return array $results
    */
   public static function extractParams( array $params ) {
      $results = [];
      foreach ( $params as $param ) {
         $pair = array_map( 'trim', explode( '=', $param, 2 ) );
         if ( count( $pair ) === 2 ) {
            $results[ $pair[0] ] = $pair[1];
         }
         if ( count( $pair ) === 1 ) {
            $results[ $pair[0] ] = true;
         }
      }
      return $results;
   }

}
