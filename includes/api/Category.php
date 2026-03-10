<?php

use ApiBase;
use ApiFormatRaw;
use ApiMain;
use ApiResult;
use ApiUsageException;
use MediaWiki\Languages\LanguageNameUtils;
use MediaWiki\Page\WikiPageFactory;
use MWException;
use RepoGroup;
use WANObjectCache;
use Wikimedia\ParamValidator\ParamValidator;

use ApiFormatRawFile;

/**
 * Implements file downloads via the action api
 * for consumption by any client, including api-only clients
 * (e. g. via bot password or OAuth)
 * Based on Extension:TimedMediaHandler/includes/ApiTimedText.php
 *
 * @ingroup API
 * @emits error.code timedtext-notfound, invalidlang, invalid-title
 */
class ApiCategories extends ApiBase {

	/** @var RepoGroup */
	private $repoGroup;

	/**
	 * @param ApiMain $main
	 * @param string $action
	 * @param LanguageNameUtils $languageNameUtils
	 * @param RepoGroup $repoGroup
	 * @param WANObjectCache $cache
	 * @param WikiPageFactory $wikiPageFactory
	 */
	public function __construct(
		ApiMain $main,
		$action#,
		#RepoGroup $repoGroup
	) {
		parent::__construct( $main, $action );
		$this->repoGroup = $repoGroup;
	}

	/**
	 * @return void
	 * @throws ApiUsageException
	 * @throws MWException
	 */
	public function execute() {
		$params = $this->extractRequestParams();

		$page = $this->getTitleOrPageId( $params );
		if ( !$page->exists() ) {
			$this->dieWithError( 'apierror-missingtitle', 'invalidtitle' );
		}

		// Check if we are allowed to read this page
		$this->checkTitleUserPermissions( $page->getTitle(), 'read', [ 'autoblock' => true ] );

		$ns = $page->getTitle()->getNamespace();
		if ( $ns !== NS_CATEGORY ) {
			$this->dieWithError( 'apierror-filedoesnotexist', 'invalidtitle' );
		}

		$result = $this->getResult();
        $subcategories = [];
		# see https://www.mediawiki.org/wiki/Manual:Title.php#Relating_to_page_titles
        $this->getAllSubcategories( $page->getTitle()->getDBKey(), $subcategories );
		$result->addValue( null, 'subcategories', $subcategories );

	}


	/**
	 * @param int $flags
	 *
	 * @return array
	 */
	public function getAllowedParams( $flags = 0 ) {
		$ret = [
			'title' => [
				ParamValidator::PARAM_TYPE => 'string',
			],
			'pageid' => [
				ParamValidator::PARAM_TYPE => 'integer'
			],
		];
		return $ret;
	}

	/**
	 * @see ApiBase::getExamplesMessages()
	 * @return array of examples
	 */
	protected function getExamplesMessages() {
		return [
			'action=download&title=File:Example.ogv'
				=> 'apihelp-download-example-1',
		];
	}

    /**
	 * Recursive function to populate a tree based on category information.
	 */
	private function getAllSubcategories( $categoryName, &$results ) {
		$subcats = self::getSubcategories( $categoryName );
        $results += $subcats;
		foreach ( $subcats as $subcat ) {
            $this->getAllSubcategories( $subcat, $results );
		}
	}

    /**
	 * Gets all the subcategories of the passed-in category.
     * From PF_Tree.php
	 *
	 * @todo This might not belong in this class.
	 *
	 * @param string $categoryName
	 * @return array
	 */
	private static function getSubcategories( $categoryName ) {
		$dbr = wfGetDB( DB_REPLICA );

		$tables = [ 'page', 'categorylinks' ];
		$fields = [ 'page_id', 'page_namespace', 'page_title',
			'page_is_redirect', 'page_len', 'page_latest', 'cl_to',
			'cl_from' ];
		$where = [];
		$joins = [];
		$options = [ 'ORDER BY' => 'cl_type, cl_sortkey' ];

		$joins['categorylinks'] = [ 'JOIN', 'cl_from = page_id' ];
		$where['cl_to'] = str_replace( ' ', '_', $categoryName );
		$options['USE INDEX']['categorylinks'] = 'cl_sortkey';

		$tables = array_merge( $tables, [ 'category' ] );
		$fields = array_merge( $fields, [ 'cat_id', 'cat_title', 'cat_subcats', 'cat_pages', 'cat_files' ] );
		$joins['category'] = [ 'LEFT JOIN', [ 'cat_title = page_title', 'page_namespace' => NS_CATEGORY ] ];

		$res = $dbr->select( $tables, $fields, $where, __METHOD__, $options, $joins );
		$subcats = [];

		foreach ( $res as $row ) {
			$t = Title::newFromRow( $row );
			if ( $t->getNamespace() == NS_CATEGORY ) {
				$subcats[] = $t->getText();
			}
		}
		return $subcats;
	}
}