angular.module('MainC', ['MainService'])

	.controller('contentHeadCtrl', ['$scope','MainSer', function ($scope,MainSer) {
		$scope.exit = function(){
			$.post('models/state.php', {action: 'exit'}, function(data, textStatus, xhr) {
				if(data.state == "ok"){
					location.href = "account/";
				}
			}, 'json');
		}
		$scope.changepwd = function(){
			$("#changepwd-modal").modal('show');
		}
	}])

	.controller('changepwdCtrl', ['$scope','MainSer', function ($scope,MainSer) {
		$scope.oldpwd = "";
		$scope.newpwd = "";
		$scope.btn = function($event){
			if($.trim($scope.oldpwd)==""||$.trim($scope.newpwd)==""){
				$("#changepwd-modal").find('.alert-danger').html('密码不可为空').show();
			}else{
				$("#changepwd-modal").find('.alert-danger').hide();
				$("#changepwd-modal").find(".changepwdstate").show();
				$($event.target).attr('disabled','disabled');
				MainSer.changepwd($scope.oldpwd,$scope.newpwd).then(function(rel){
					$("#changepwd-modal").find(".changepwdstate").hide();
					$($event.target).removeAttr('disabled');
					if(rel.data.state=="ok"){
						$("#changepwd-modal").modal('hide');
						$("#state-modal").find('.modal-body').html('修改成功');
						$("#state-modal").modal('show');
					}else{
						if(rel.data.state=="none"){
							$("#changepwd-modal").find('.alert-danger').html('旧密码不正确').show();
						}
					}

				})
			}
			

		}
	}])

	.controller('navigationCtrl', ['$scope', function ($scope) {
		// { sref:"download", title:"文件下载" }
		$scope.navitem = [
				{ sref:"filelist", title:"文件列表" },
				{ sref:"printRecord", title:"打印记录" }
			];
		$scope.indexactive = -1;
		$scope.navaction = function(index){
			$scope.indexactive = index;
		}
	}])

	.controller('filelistCtrl', ['$scope','$stateParams', '$state','MainSer',
		function ($scope, $stateParams, $state, MainSer) {
			
			$scope.page = 1;
			$scope.time = 1483200000000;//2017
			$scope.txt = '';

			$scope.pagition = [];

			MainSer.GetFileList($scope.page, $scope.time, $scope.txt).then(function(rel){
				$scope.filelist=rel.data.list;
				$scope.total=rel.data.total;
				if($scope.total<=10){
					$("#navpage").hide();
					$scope.totalpage = 1;
				}else{
					$scope.totalpage = Math.ceil($scope.total/10);
					for (var i = 1; i <= $scope.totalpage; i++) {
						$scope.pagition[i-1]=i;
					}
				}
			});
			$scope.opyear = [];
			$scope.omonth = [];
			var _y = 2017;
			for (var i = 0; i < 12; i++) {
				$scope.opyear[i] = _y;
				_y++;
				if(i<9){
					$scope.omonth[i] = "0"+ (i+1);
				}else{
					$scope.omonth[i] = i+1;
				}
			}
			
			$("#selectforyear").bind('change',function(){
				var time = $(this).val()+"/01/01 00:00:00";
				var thetime = Date.parse(time);
				$scope.time = thetime;
				getlist().then(function(rel){
					$scope.filelist=rel.data.list;
					$scope.total=rel.data.total;
					if($scope.total<=10){
						$("#navpage").hide();
						$scope.totalpage = 1;
					}else{
						$("#navpage").show();
						$scope.totalpage = Math.ceil($scope.total/10);
						for (var i = 1; i <= $scope.totalpage; i++) {
							$scope.pagition[i-1]=i;
						}
					}
				});
			})
			$("#selectformonth").bind('change', function() {
				var time = $("#selectforyear").val()+"/"+$(this).val()+"/01 00:00:00";
				var thetime = Date.parse(time);
				$scope.time = thetime;
				getlist().then(function(rel){
					$scope.filelist=rel.data.list;
					$scope.total=rel.data.total;
					if($scope.total<=10){
						$("#navpage").hide();
						$scope.totalpage = 1;
					}else{
						$("#navpage").show();
						$scope.totalpage = Math.ceil($scope.total/10);
						for (var i = 1; i <= $scope.totalpage; i++) {
							$scope.pagition[i-1]=i;
						}
					}
				});
			});
			$scope.searchtxt='';
			$scope.txtsearch = function(){
				if($scope.searchtxt != ""){
					var defaulttxt = "（）农地经营权证（）第号";
					if(defaulttxt.indexOf($scope.searchtxt)>0){
						$scope.txt = "";
					}else{
						$scope.txt = $scope.searchtxt;
					}
				}else{
					$scope.txt = "";
				}
				getlist().then(function(rel){
					$scope.filelist=rel.data.list;
					$scope.total=rel.data.total;
					if($scope.total<=10){
						$("#navpage").hide();
						$scope.totalpage = 1;
					}else{
						$("#navpage").show();
						$scope.totalpage = Math.ceil($scope.total/10);
						for (var i = 1; i <= $scope.totalpage; i++) {
							$scope.pagition[i-1]=i;
						}
					}
				});
			}

			function getlist(){
				return MainSer.GetFileList($scope.page, $scope.time, $scope.txt);
			}

			$scope.togglePage = function(opage){
				if(opage<1)opage=1;
				if(opage>$scope.totalpage)opage=$scope.totalpage;
				$scope.page = opage;
				getlist().then(function(rel){
					$scope.filelist=rel.data.list;
				});
			}

			$scope.bianji = function(_id){
				$state.go("no3",{action:"edit",id:_id});
				$(".table-data-load").show();
			}
		}
	])
	
	.controller('printRecordCtrl', ['$scope','MainSer','$stateParams', '$state',
	 function ($scope, MainSer, $stateParams, $state) {

			$scope.page = 1;
			$scope.time = 1483200000000;//2017
			$scope.txt = '';

			$scope.pagition = [];

			MainSer.getprintlist($scope.page, $scope.time, $scope.txt).then(function(rel){
				$scope.filelist=rel.data.list;
				$scope.total=rel.data.total;
				if($scope.total<=10){
					$("#navpage").hide();
					$scope.totalpage = 1;
				}else{
					$scope.totalpage = Math.ceil($scope.total/10);
					for (var i = 1; i <= $scope.totalpage; i++) {
						$scope.pagition[i-1]=i;
					}
				}
			});
			$scope.opyear = [];
			$scope.omonth = [];
			var _y = 2017;
			for (var i = 0; i < 12; i++) {
				$scope.opyear[i] = _y;
				_y++;
				if(i<9){
					$scope.omonth[i] = "0"+ (i+1);
				}else{
					$scope.omonth[i] = i+1;
				}
			}
			
			$("#selectforyear").bind('change',function(){
				var time = $(this).val()+"/01/01 00:00:00";
				var thetime = Date.parse(time);
				$scope.time = thetime;
				getlist().then(function(rel){
					$scope.filelist=rel.data.list;
					$scope.total=rel.data.total;
					if($scope.total<=10){
						$("#navpage").hide();
						$scope.totalpage = 1;
					}else{
						$("#navpage").show();
						$scope.totalpage = Math.ceil($scope.total/10);
						for (var i = 1; i <= $scope.totalpage; i++) {
							$scope.pagition[i-1]=i;
						}
					}
				});
			})
			$("#selectformonth").bind('change', function() {
				var time = $("#selectforyear").val()+"/"+$(this).val()+"/01 00:00:00";
				var thetime = Date.parse(time);
				$scope.time = thetime;
				getlist().then(function(rel){
					$scope.filelist=rel.data.list;
					$scope.total=rel.data.total;
					if($scope.total<=10){
						$("#navpage").hide();
						$scope.totalpage = 1;
					}else{
						$("#navpage").show();
						$scope.totalpage = Math.ceil($scope.total/10);
						for (var i = 1; i <= $scope.totalpage; i++) {
							$scope.pagition[i-1]=i;
						}
					}
				});
			});
			$scope.searchtxt='';
			$scope.txtsearch = function(){
				if($scope.searchtxt != ""){
					var defaulttxt = "（）农地经营权证（）第号";
					if(defaulttxt.indexOf($scope.searchtxt)>0){
						$scope.txt = "";
					}else{
						$scope.txt = $scope.searchtxt;
					}
				}else{
					$scope.txt = "";
				}
				getlist().then(function(rel){
					$scope.filelist=rel.data.list;
					$scope.total=rel.data.total;
					if($scope.total<=10){
						$("#navpage").hide();
						$scope.totalpage = 1;
					}else{
						$("#navpage").show();
						$scope.totalpage = Math.ceil($scope.total/10);
						for (var i = 1; i <= $scope.totalpage; i++) {
							$scope.pagition[i-1]=i;
						}
					}
				});
			}

			function getlist(){
				return MainSer.getprintlist($scope.page, $scope.time, $scope.txt);
			}

			$scope.togglePage = function(opage){
				if(opage<1)opage=1;
				if(opage>$scope.totalpage)opage=$scope.totalpage;
				$scope.page = opage;
				getlist().then(function(rel){
					$scope.filelist=rel.data.list;
				});
			}

			$scope.yulan = function(_id, _page){
				var page = ['no2','no3','no4','no5','no6','no7','no8'];
				var pageid = _page.split('.')[1];
				$state.go("no"+pageid,{action:"show",id:_id});
				$(".table-data-load").show();
			}
	}])
