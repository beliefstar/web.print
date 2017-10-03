angular.module('Main', [
	'ui.router',
	'MainC',
	'MainService',
	'pageC'
	])
	
	.config(['$stateProvider','$urlRouterProvider',
		function($stateProvider,$urlRouterProvider){
			$urlRouterProvider.otherwise('filelist');
			$stateProvider
				.state('filelist', {
					url:'/filelist',
					templateUrl:'view/filelist.html',
					controller:'filelistCtrl'
				})
				// .state('file', {
				// 	url:'/file/{action}/{id}/{number}',
				// 	templateUrl:'view/file.html',
				// 	controller:'fileCtrl'
				// })
				.state('printRecord', {
					url:'/printRecord',
					templateUrl:'view/printRecord.html',
					controller:'printRecordCtrl'
				})
				.state('no2', {
					url:'/no2/{action}/{id}',
					templateUrl:'view/table-page/no2.html',
					controller:'no2Ctrl'
				})
				.state('no3', {
					url:'/no3/{action}/{id}',
					templateUrl:'view/table-page/no3.html',
					controller:'no3Ctrl'
				})
				.state('no4', {
					url:'/no4/{action}/{id}',
					templateUrl:'view/table-page/no4.html',
					controller:'no4Ctrl'
				})
				.state('no5', {
					url:'/no5/{action}/{id}',
					templateUrl:'view/table-page/no5.html',
					controller:'no5Ctrl'
				})
				.state('no6', {
					url:'/no6/{action}/{id}',
					templateUrl:'view/table-page/no6.html',
					controller:'no6Ctrl'
				})
				.state('no7', {
					url:'/no7/{action}/{id}',
					templateUrl:'view/table-page/no7.html',
					controller:'no7Ctrl'
				})
				.state('no8', {
					url:'/no8/{action}/{id}',
					templateUrl:'view/table-page/no8.html',
					controller:'no8Ctrl'
				})
	}])
