<?php
/**
 * SpecialPage to redirect to an page matching an ask query
 *
 * @file
 * @ingroup Extensions
 */

use SpecialPage;
use SMW\MediaWiki\Api\ApiRequestParameterFormatter;
use SMW\MediaWiki\Api\ApiQueryResultFormatter;
use SMW\Services\ServicesFactory as ApplicationFactory;
use SMWQuery;
use SMWQueryProcessor;
use SMWQueryResult;

class SpecialAskResolver extends SpecialPage {
	public function __construct() {
		parent::__construct( 'AskResolver', '' );
	}

	/*
	 * based on https://github.com/SemanticMediaWiki/SemanticMediaWiki/blob/aa409231add0bc094c8d81c550b669b06a98fc12/src/MediaWiki/Api/Ask.php#L24
	 * and https://github.com/SemanticMediaWiki/SemanticMediaWiki/blob/aa409231add0bc094c8d81c550b669b06a98fc12/src/MediaWiki/Specials/SpecialURIResolver.php#L18
	 * 
	 */
	public function execute( $par ) {
		$out = $this->getOutput();
		$out->setPageTitle("Ask Resolver");

		$request = $this->getRequest();
		$query = $request->getText( 'query' );
		$params = ["query" => $query];

		$parameterFormatter = new ApiRequestParameterFormatter( $params );
		$outputFormat = 'json';

		list( $queryString, $parameters, $printouts ) = SMWQueryProcessor::getComponentsFromFunctionParams( $parameterFormatter->getAskApiParameters(), false );

		$queryResult = $this->getQueryResult( $this->getQuery(
			$queryString,
			$printouts,
			$parameters
		) );

		$resultFormatter = new ApiQueryResultFormatter( $queryResult );
		$resultFormatter->setIsRawMode( true );
		$resultFormatter->doFormat();

		$formatedResult = $resultFormatter->getResult();

		# debug
		# $json = json_encode($formatedResult);
		# $out->addHTML($json);

		$redirect_url = "";
		$msg .= "";

		if ( array_key_exists("results", $formatedResult) ) {
			$results = $formatedResult["results"];

			if ( array_key_exists("0", $results ) ) {
				$result = $results["0"];
				$redirect_url = $result["fullurl"];
				$out->addHTML($redirect_url);
			}
			else {
				$msg .= "Warning: No result";
			}
			if ( array_key_exists("1", $results ) ) {
				$msg .= "Warning: More than one result";
			}
		}

		if ( $redirect_url != "") $out->redirect( $redirect_url, '303' );
		else $out->addHTML($msg);
	}

		/**
	 * Returns a query object for the provided query string and list of printouts.
	 *
	 * @since 1.6.2
	 *
	 * @param string $queryString
	 * @param array $printouts
	 * @param array $parameters
	 *
	 * @return SMWQuery
	 */
	protected function getQuery( $queryString, array $printouts, array $parameters = [] ) {

		SMWQueryProcessor::addThisPrintout( $printouts, $parameters );

		$query = SMWQueryProcessor::createQuery(
			$queryString,
			SMWQueryProcessor::getProcessedParams( $parameters, $printouts ),
			SMWQueryProcessor::SPECIAL_PAGE,
			'',
			$printouts
		);

		$query->setOption( SMWQuery::PROC_CONTEXT, 'API' );

		return $query;
	}

	/**
	 * Run the actual query and return the result.
	 *
	 * @since 1.6.2
	 *
	 * @param SMWQuery $query
	 *
	 * @return SMWQueryResult
	 */
	protected function getQueryResult( SMWQuery $query ) {
		return ApplicationFactory::getInstance()->getStore()->getQueryResult( $query );
	}

}
