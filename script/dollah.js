(function($) {
    $.dollah = function(element, options) {

        var defaults = {
            from_currency_selector 	: 	'#from-currency',
			to_currency_selector 	: 	'#to-currency',
			from_value_selector		:	'#from-value',
			to_value_selector		:	'#to-value',
			round_to_dp 			: 	0,
            onStart					: 	function() 	{
			},
			onGetData				:	function()	{
			},
			onReturnData			:	function()	{
			},
			onEnd					:	function()	{
			}
        }

        var plugin = this;

        plugin.settings = {}
		plugin.variables = {}

        var $element = $(element), element = element;

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
			//console.log( plugin.settings.from_currency_selector );

            plugin.variables.from_currency 	= 	$(plugin.settings.from_currency_selector).val();
			plugin.variables.to_currency 	= 	$(plugin.settings.to_currency_selector).val();
			plugin.variables.from_value 	= 	$(plugin.settings.from_value_selector).val();
			plugin.variables.to_value 		=	0;
			
			plugin.variables.sql_string 		= 	encodeURI('select * from yahoo.finance.xchange where pair in ("'+plugin.variables.from_currency+plugin.variables.to_currency+'")');
			plugin.variables.query_yahooapis =	"https://query.yahooapis.com/v1/public/yql?q="+plugin.variables.sql_string+"&format=json&diagnostics=false&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?";
        }

        plugin.convert = function() {
			if( typeof plugin.settings.onGetData === 'function' ){
				plugin.settings.onStart();
			}
		
            $.getJSON(plugin.variables.query_yahooapis,
				function(data) {
					var rates = data.query.results.rate;
					plugin.variables.to_value = ( plugin.variables.from_value*rates.Rate ).toFixed(	plugin.variables.round_to_dp );
					if( typeof plugin.settings.onReturnData === 'function' ){
						plugin.settings.onReturnData();
					}
				}
			);
        }

        foo_public_method = function() {
            // code goes here
        }

		plugin.execute = function(){
			plugin.init();
			
			if( typeof plugin.settings.onStart === 'function' ){
				plugin.settings.onStart();
			}
			
			plugin.convert();
		}
		
		plugin.execute();
    }

})(jQuery);

jQuery(document).ready(function($){
	
	$('#dollah').click(function(){
		$.dollah();
	/*
		//	====================
		//	selectors
		//	====================
		var action					=	'edit';			// Edit or Return
		var from_currency_selector 	= 	'#from-currency';
		var to_currency_selector 	= 	'#to-currency';
		var from_value_selector		=	'#from-value';
		var to_value_selector		=	'#to-value';
		var round_to_decimal_places = 	0;
	
		//	====================
		//	to review
		//	====================
		var from_currency 	= 	$(from_currency_selector).val();
		var to_currency 	= 	$(to_currency_selector).val();
		var from_value 		= 	$(from_value_selector).val();
		var to_value 		=	0;
		
		var sql_string 		= 	encodeURI('select * from yahoo.finance.xchange where pair in ("'+from_currency+to_currency+'")');
		var query_yahooapis =	"https://query.yahooapis.com/v1/public/yql?q="+sql_string+"&format=json&diagnostics=false&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?";
			
		$.getJSON(query_yahooapis,
			function(data) {
				var rates = data.query.results.rate;
				to_value = (from_value*rates.Rate).toFixed(round_to_decimal_places);
				console.log( to_value );
				if( action == 'edit' ){	
					$(to_value_selector).val( to_value );	
				}
			}
		);
	*/
	});
	
});