angular.module('pageC', [])

	.controller('no2Ctrl', ['$scope','$stateParams', '$state','MainSer', function ($scope,$stateParams,$state,MainSer) {
		$scope.goback = function(){
			if($stateParams.action == "edit"){
				$state.go('filelist');
			}else{
				$state.go('printRecord');
			}
		}

		$scope.id = $stateParams.id || 0;

		if($scope.id == 0){

		}

		if($scope.id != 0){
			$(".print-wrapper").find('input').hide();
			$(".print-wrapper").find('span').css('display','inline-block');//.show();
			MainSer.GetTableData('no2',$scope.id).then(function(rel){
				$scope.info1 = rel.data[0].info1;
				$scope.info2 = rel.data[0].info2;
				$scope.info3 = rel.data[0].info3;
				$scope.company = rel.data[0].company;
				var longdate = rel.data[0].date;
				$scope.No2_year = longdate.split('年')[0];
				$scope.No2_month = longdate.split('年')[1].split('月')[0];
				$scope.No2_date = longdate.split('月')[1].split('日')[0];
			})
		}

		if($stateParams.action=="show"){
			$(".print-wrapper").find('.show-table-prev').hide();
			$(".print-wrapper").find('.show-table-next').hide();
			$(".print-wrapper").find('input').hide();
			$(".print-wrapper").find('textarea').hide();
			$(".print-wrapper").find('span').show();
			$("#savedatabtn").hide();
		}
		$scope.slide_next = function(){
			$state.go('no3',{action:$stateParams.action,id:$scope.id});
		}

		$scope.Print = function(){
			var _page = "NO.2";
			var tweizhi = 'bottom:0;left:0;transform: rotate(0deg);';
			
			if($scope.id!=0){
				$(".table-data-load").show();
				MainSer.addPrint($scope.id,_page);
				ppp();
			}else{
				var falg =  confirm("当前页未保存，此次打印信息不保存到打印记录，是否打印？");
				if(falg){
					$(".table-data-load").show();
					ppp();
				}
			}
			
			function ppp(){
				var divToPrint = $(".print-wrapper").find('.table-data');
				divToPrint.find('input').hide();
				divToPrint.find('span').show();

				//var tablewall = '<div style="border:1px solid #000;position: absolute;'+tweizhi+'width: 664px;height: 952px;">'+divToPrint.html()+'</div>';
				var tablewall = '<div style="position: absolute;'+tweizhi+'width: 628px;height: 900px;">'+divToPrint.html()+'</div>';

				var newWin=window.open('','Print-Window');
				newWin.document.open();
				newWin.document.write('<html><body onload="window.print()">'+tablewall+'</body></html>');
				newWin.document.close();
				setTimeout(function(){
					newWin.close();
					if($scope.id==0){
						divToPrint.find('input').show();
						divToPrint.find('span').hide();
					}
					$(".table-data-load").hide();
				},10);
			}
		}
		$scope.Save = function(){
			if($scope.info1===undefined||$scope.info2===undefined||$scope.info3===undefined){
				$("#state-modal").find('.modal-body').html('请先填写证件关键信息<br>(表头信息不完整)');
				$("#state-modal").modal('show');
			}else{
				$(".table-data-load").show();
				var formdata;
				var odate = $scope.No2_year+'年'+$scope.No2_month+'月'+$scope.No2_date+'日';
			  	MainSer.addNewPrint($scope.info1,$scope.info2,$scope.info3,$scope.company,odate)
		  		.then(function(rel){
		  			if(rel.data.state=='ok'){
		  				$(".table-data-load").hide();
		  				$("#state-modal").find('.modal-body').html('保存成功！');
						$("#state-modal").modal('show');
						$scope.id = rel.data.id;//$scope.alldata[0].id = rel.data.id;
						var div = $(".table-item");
						div.find('input').hide();
						div.find('span').show();
		  			}else{
		  				$("#state-modal").find('.modal-body').html('保存失败！');
						$("#state-modal").modal('show');
		  			}
		  		});
			}
		}
	}])

	.controller('no3Ctrl', ['$scope', '$stateParams', '$state','MainSer', function ($scope,$stateParams,$state,MainSer) {
		$scope.goback = function(){
			if($stateParams.action == "edit"){
				$state.go('filelist');
			}else{
				$state.go('printRecord');
			}
		}

		$scope.id = $stateParams.id || 0;

		$scope.term_begin_year = "";
		$scope.landAddress_zhen = "";
		$scope.landAddress_cun = "";
		$scope.landAddress_zu = "";
		$scope.term_begin_year = "";
		$scope.term_begin_month = "";
		$scope.term_begin_date = "";
		$scope.term_over_year = "";
		$scope.term_over_month = "";
		$scope.term_over_date = "";


		if($scope.id != 0){
			MainSer.GetTableData('no3',$scope.id).then(function(rel){
				var reldata = rel.data[0];

				$scope.name1 = reldata.name1;
				$scope.name2 = reldata.name2;
				$scope.identity = reldata.identity;
				//$scope.landAddress = reldata.landAddress;
				$scope.landArea = reldata.landArea;
				$scope.landTotal = reldata.landTotal;
				$scope.circulationMode = reldata.circulationMode;
				$scope.payment = reldata.payment;
				$scope.term = reldata.term;
				$scope.purpose = reldata.purpose;

				var landAddresses = reldata.landAddress;
				if(landAddresses != undefined){
					$scope.landAddress_zhen = landAddresses.split('镇（街道）')[0];
					$scope.landAddress_cun = landAddresses.split('镇（街道）')[1].split('村（社区）')[0];
					$scope.landAddress_zu = landAddresses.split('村（社区）')[1].split('组')[0];
				}

				var termes = reldata.term;
				if(termes != undefined){
					$scope.term_begin_year = termes.split('年')[0];
					$scope.term_begin_month = termes.split('年')[1].split('月')[0];
					$scope.term_begin_date = termes.split('日起至')[0].split('月')[1];
					$scope.term_over_year = termes.split('日起至')[1].split('年')[0];
					$scope.term_over_month = termes.split('年')[2].split('月')[0];
					$scope.term_over_date = termes.split('日止')[0].split('月')[2];
				}
			})
		}

		if($stateParams.action=="show"){
			$(".print-wrapper").find('.show-table-prev').hide();
			$(".print-wrapper").find('.show-table-next').hide();
			$(".print-wrapper").find('input').hide();
			$(".print-wrapper").find('textarea').hide();
			$(".print-wrapper").find('span.showdata').show();
			$("#savedatabtn").hide();
		}

		$scope.slide_prev = function(){
			$state.go('no2',{action:$stateParams.action,id:$scope.id});
		}
		$scope.slide_next = function(){
			$state.go('no4',{action:$stateParams.action,id:$scope.id});
		}
		$scope.Print = function(){
				
				var _page = "NO.3";
				var tweizhi = 'transform: rotate(180deg);left:0;bottom:0;';
				
				if($scope.id!=0){
					$(".table-data-load").show();
					MainSer.addPrint($scope.id,_page);
					ppp();
				}else{
					var falg =  confirm("NO.2页未填写，此次打印信息不保存到打印记录，是否打印？");
					if(falg){
						$(".table-data-load").show();
						ppp();
					}
				}
				
				function ppp(){

					var divToPrint = $(".print-wrapper").find('#no3');

					var tablewall = '<div style="position: absolute;'+tweizhi+'width: 628px;height: 900px;">'+divToPrint.html()+'</div>';
					var newWin=window.open('','Print-Window');
					newWin.document.open();
					newWin.document.write('<html><body onload="window.print()">'+tablewall+'</body></html>');
					newWin.document.close();
					setTimeout(function(){
						newWin.close();
						$(".table-data-load").hide();
					},10);
				}
		}
		$scope.Save = function(){
			if($scope.id==0){
				$("#state-modal").find('.modal-body').html('请先填写NO.2页的内容');
				$("#state-modal").modal('show');
			}else{

				$(".table-data-load").show();

				$scope.term = $scope.term_begin_year+"年"+$scope.term_begin_month+"月"+$scope.term_begin_date+"日起至"
										+$scope.term_over_year+"年"+$scope.term_over_month+"月"+$scope.term_over_date+"日止";
				$scope.landAddress = $scope.landAddress_zhen+"镇（街道）"+$scope.landAddress_cun+"村（社区）"+$scope.landAddress_zu+"组";
				
				var form = {
					action:"no3",
					id:$scope.id,
					name1:$scope.name1,
					name2:$scope.name2,
					identity:$scope.identity,
					landAddress:$scope.landAddress,
					landArea:$scope.landArea,
					landTotal:$scope.landTotal,
					circulationMode:$scope.circulationMode,
					payment:$scope.payment,
					term:$scope.term,
					purpose:$scope.purpose
				};
				MainSer.update(form).then(function(rel){
					if(rel.data.state=="ok"){
						$(".table-data-load").hide();
						$("#state-modal").find('.modal-body').html('保存成功！');
						$("#state-modal").modal('show');
					}else{
						$(".table-data-load").hide();
						$("#state-modal").find('.modal-body').html('保存失败！');
						$("#state-modal").modal('show');
					}
				})
			}
		}
	}])

	.controller('no4Ctrl', ['$scope', '$stateParams', '$state','MainSer', function ($scope,$stateParams,$state,MainSer) {
		$scope.goback = function(){
			if($stateParams.action == "edit"){
				$state.go('filelist');
			}else{
				$state.go('printRecord');
			}
		}
		$scope.no4 = [];
		$scope.id = $stateParams.id || 0;

		if($scope.id!=0){
			MainSer.GetTableData('no4',$scope.id).then(function(rel){
				$scope.no4 = rel.data;
			})
		}
		if($stateParams.action=="show"){
			$(".print-wrapper").find('.show-table-prev').hide();
			$(".print-wrapper").find('.show-table-next').hide();
			$(".print-wrapper").find('input').hide();
			$(".print-wrapper").find('textarea').hide();
			$(".print-wrapper").find('span').show();
			$("#savedatabtn").hide();
		}

		$scope.slide_prev = function(){
			$state.go('no3',{action:$stateParams.action,id:$scope.id});
		}
		$scope.slide_next = function(){
			$state.go('no5',{action:$stateParams.action,id:$scope.id});
		}
		$scope.Print = function(){
				
				var _page = "NO.4";
				var tweizhi = 'transform: rotate(0deg);left:0;bottom:0;';
				
				
				if($scope.id!=0){
					$(".table-data-load").show();
					MainSer.addPrint($scope.id,_page);
					ppp();
				}else{
					var falg =  confirm("NO.2页信息未填写，此次打印信息不保存到打印记录，是否打印？");
					if(falg){
						$(".table-data-load").show();
						ppp();
					}
				}
				
				function ppp(){


					var divToPrint = $(".print-wrapper").find('#no4');
					var tablewall = '<div style="position: absolute;'+tweizhi+'width: 628px;height: 900px;">'+divToPrint.html()+'</div>';
					var newWin=window.open('','Print-Window');
					newWin.document.open();
					newWin.document.write('<html><body onload="window.print()">'+tablewall+'</body></html>');
					newWin.document.close();
					setTimeout(function(){
						newWin.close();
						$(".table-data-load").hide();
					},10);
				}
			}
		$scope.Save = function(){
				if($scope.id==0){
					$("#state-modal").find('.modal-body').html('请先填写证件关键信息<br>(表NO.2表头信息不完整)');
					$("#state-modal").modal('show');
				}else{

					$(".table-data-load").show();

					for (var i = $scope.no4.length - 1; i >= 0; i--) {
						if($scope.no4[i]===undefined){
							$scope.no4.splice(i,1);
							continue;
						}
						if($.trim($scope.no4[i].address)==""&&$.trim($scope.no4[i].landNumber)==""){
							$scope.no4.splice(i,1);
						}
					}
					var formdata = "";

					formdata = angular.toJson($scope.no4, true);

					var form = {
						action:"no4",
						id:$scope.id,
						page:'4',
						dataf:formdata
					}
					MainSer.update(form).then(function(rel){
						if(rel.data.state=="ok"){
							$(".table-data-load").hide();
							$("#state-modal").find('.modal-body').html('保存成功！');
							$("#state-modal").modal('show');
						}else{
							$(".table-data-load").hide();
							$("#state-modal").find('.modal-body').html('保存失败！');
							$("#state-modal").modal('show');
						}
					})	
				}
			}
	}])

	.controller('no5Ctrl', ['$scope', '$stateParams', '$state','MainSer', function ($scope,$stateParams,$state,MainSer) {
		$scope.goback = function(){
			if($stateParams.action == "edit"){
				$state.go('filelist');
			}else{
				$state.go('printRecord');
			}
		}
		$scope.no5 = [];
		$scope.id = $stateParams.id || 0;

		if($scope.id!=0){
			MainSer.GetTableData('no5',$scope.id).then(function(rel){
				$scope.no5 = rel.data;
			})
		}

		if($stateParams.action=="show"){
			$(".print-wrapper").find('.show-table-prev').hide();
			$(".print-wrapper").find('.show-table-next').hide();
			$(".print-wrapper").find('input').hide();
			$(".print-wrapper").find('textarea').hide();
			$(".print-wrapper").find('span').show();
			$("#savedatabtn").hide();
		}

		$scope.slide_prev = function(){
			$state.go('no4',{action:$stateParams.action,id:$scope.id});
		}
		$scope.slide_next = function(){
			$state.go('no6',{action:$stateParams.action,id:$scope.id});
		}
		$scope.Print = function(){
				
				var _page = "NO.5";
				var tweizhi = 'transform: rotate(180deg);left:0;bottom:0;';
				if($scope.id!=0){
					$(".table-data-load").show();
					MainSer.addPrint($scope.id,_page);
					ppp();
				}else{
					var falg =  confirm("NO.2页信息未填写，此次打印信息不保存到打印记录，是否打印？");
					if(falg){
						$(".table-data-load").show();
						ppp();
					}
				}
				
				function ppp(){


					var divToPrint = $(".print-wrapper").find('#no5');
					var tablewall = '<div style="position: absolute;'+tweizhi+'width: 628px;height: 900px;">'+divToPrint.html()+'</div>';
					var newWin=window.open('','Print-Window');
					newWin.document.open();
					newWin.document.write('<html><body onload="window.print()">'+tablewall+'</body></html>');
					newWin.document.close();
					setTimeout(function(){
						newWin.close();
						$(".table-data-load").hide();
					},10);
				}
			}
		$scope.Save = function(){
			if($scope.id==0){
				$("#state-modal").find('.modal-body').html('请先填写证件关键信息<br>(表NO.2表头信息不完整)');
				$("#state-modal").modal('show');
			}else{

				$(".table-data-load").show();

				for (var i = $scope.no5.length - 1; i >= 0; i--) {
					if($scope.no5[i]===undefined){
						$scope.no5.splice(i,1);
						continue;
					}
					if($.trim($scope.no5[i].address)==""&&$.trim($scope.no5[i].landNumber)==""){
						$scope.no5.splice(i,1);
					}
				}
				var formdata = "";

				formdata = angular.toJson($scope.no5, true);

				var form = {
					action:"no4",
					id:$scope.id,
					page:'5',
					dataf:formdata
				}
				MainSer.update(form).then(function(rel){
					if(rel.data.state=="ok"){
						$(".table-data-load").hide();
						$("#state-modal").find('.modal-body').html('保存成功！');
						$("#state-modal").modal('show');
					}else{
						$(".table-data-load").hide();
						$("#state-modal").find('.modal-body').html('保存失败！');
						$("#state-modal").modal('show');
					}
				})	
			}
		}
	}])

	.controller('no6Ctrl', ['$scope', '$stateParams', '$state','MainSer', function ($scope,$stateParams,$state,MainSer) {
		$scope.goback = function(){
			if($stateParams.action == "edit"){
				$state.go('filelist');
			}else{
				$state.go('printRecord');
			}
		}
		$scope.no6 = [];
		$scope.id = $stateParams.id || 0;

		if($scope.id!=0){
			MainSer.GetTableData('no6',$scope.id).then(function(rel){
				$scope.no6 = rel.data;
			})
		}


		if($stateParams.action=="show"){
			$(".print-wrapper").find('.show-table-prev').hide();
			$(".print-wrapper").find('.show-table-next').hide();
			$(".print-wrapper").find('input').hide();
			$(".print-wrapper").find('textarea').hide();
			$(".print-wrapper").find('span').show();
			$("#savedatabtn").hide();
		}

		$scope.slide_prev = function(){
			$state.go('no5',{action:$stateParams.action,id:$scope.id});
		}
		$scope.slide_next = function(){
			$state.go('no7',{action:$stateParams.action,id:$scope.id});
		}
		$scope.Print = function(){
				
				var _page = "NO.6";
				var tweizhi = 'transform: rotate(0deg);left:0;bottom:0;';
				
				// $(".print-wrapper").find('.table-data').find('.dibianhao')
				// 	.css({
				// 		'display': '-webkit-box',
				// 		'-webkit-box-align': 'center',
				// 		'-webkit-box-pack': 'center',
				// 		'width': '300px',
				// 		'height': '60px'
				// 	}).find('span').css({
				// 		'display': 'block',
				// 		'width' : '100%',
				// 		'word-wrap' : 'break-word'
				// 	});
				
				if($scope.id!=0){
					$(".table-data-load").show();
					MainSer.addPrint($scope.id,_page);
					ppp();
				}else{
					var falg =  confirm("NO.2页信息未填写，此次打印信息不保存到打印记录，是否打印？");
					if(falg){
						$(".table-data-load").show();
						ppp();
					}
				}
				
				function ppp(){
					// var divToPrint = $(".print-wrapper").find('.table-data');
					// divToPrint.find('input').hide();
					// divToPrint.find('textarea').hide();
					// divToPrint.find('span').show();

					var divToPrint = $(".print-wrapper").find('#no6');

					//var tablewall = '<div style="position: absolute;'+tweizhi+'width: 664px;height: 952px;">'+divToPrint.html()+'</div>';
					var tablewall = '<div style="position: absolute;'+tweizhi+'width: 628px;height: 900px;">'+divToPrint.html()+'</div>';

					var newWin=window.open('','Print-Window');
					newWin.document.open();
					newWin.document.write('<html><body onload="window.print()">'+tablewall+'</body></html>');
					newWin.document.close();
					setTimeout(function(){
						newWin.close();
						//divToPrint.find('input').show();
						//divToPrint.find('textarea').show();
						//divToPrint.find('span').hide();
						$(".table-data-load").hide();
					},10);
				}
			}
		$scope.Save = function(){
			if($scope.id==0){
				$("#state-modal").find('.modal-body').html('请先填写证件关键信息<br>(表NO.2表头信息不完整)');
				$("#state-modal").modal('show');
			}else{

				$(".table-data-load").show();

				for (var i = $scope.no6.length - 1; i >= 0; i--) {
					if($scope.no6[i]===undefined){
						$scope.no6.splice(i,1);
						continue;
					}
					if($.trim($scope.no6[i].address)==""&&$.trim($scope.no6[i].landNumber)==""){
						$scope.no6.splice(i,1);
					}
				}
				var formdata = "";

				formdata = angular.toJson($scope.no6, true);

				var form = {
					action:"no4",
					id:$scope.id,
					page:'6',
					dataf:formdata
				}
				MainSer.update(form).then(function(rel){
					if(rel.data.state=="ok"){
						$(".table-data-load").hide();
						$("#state-modal").find('.modal-body').html('保存成功！');
						$("#state-modal").modal('show');
					}else{
						$(".table-data-load").hide();
						$("#state-modal").find('.modal-body').html('保存失败！');
						$("#state-modal").modal('show');
					}
				})	
			}
		}
	}])

	.controller('no7Ctrl', ['$scope', '$stateParams', '$state','MainSer', function ($scope,$stateParams,$state,MainSer) {
		$scope.goback = function(){
			if($stateParams.action == "edit"){
				$state.go('filelist');
			}else{
				$state.go('printRecord');
			}
		}
		$scope.no7 = [];
		$scope.no7_date_year = "";
		$scope.no7_date_month = "";
		$scope.no7_date_date = "";

		$scope.id = $stateParams.id || 0;

		if($scope.id!=0){
			MainSer.GetTableData('no7',$scope.id).then(function(rel){
				$scope.no7 = rel.data.no4;

				var datees = rel.data.no7[0].date;
				if(datees != null){
					$scope.no7_date_year = datees.split('年')[0];
					$scope.no7_date_month = datees.split('年')[1].split('月')[0];
					$scope.no7_date_date = datees.split('月')[1].split('日')[0];
				}
			})
		}

		if($stateParams.action=="show"){
			$(".print-wrapper").find('.show-table-prev').hide();
			$(".print-wrapper").find('.show-table-next').hide();
			$(".print-wrapper").find('input').hide();
			$(".print-wrapper").find('textarea').hide();
			$(".print-wrapper").find('span').show();
			$("#savedatabtn").hide();
		}

		$scope.slide_prev = function(){
			$state.go('no6',{action:$stateParams.action,id:$scope.id});
		}
		$scope.slide_next = function(){
			$state.go('no8',{action:$stateParams.action,id:$scope.id});
		}
		$scope.Print = function(){
				
				var _page = "NO.7";
				var tweizhi = 'transform: rotate(180deg);left:0;bottom:0;';
				
				if($scope.id!=0){
					$(".table-data-load").show();
					MainSer.addPrint($scope.id,_page);
					ppp();
				}else{
					var falg =  confirm("NO.2页信息未填写，此次打印信息不保存到打印记录，是否打印？");
					if(falg){
						$(".table-data-load").show();
						ppp();
					}
				}
				
				function ppp(){

					var divToPrint = $(".print-wrapper").find('#no7');

					var tablewall = '<div style="position: absolute;'+tweizhi+'width: 568px;height: 818px;">'+divToPrint.html()+'</div>';
					var newWin=window.open('','Print-Window');
					newWin.document.open();
					newWin.document.write('<html><body onload="window.print()">'+tablewall+'</body></html>');
					newWin.document.close();
					setTimeout(function(){
						newWin.close();
						$(".table-data-load").hide();
					},10);
				}
			}
		$scope.Save = function(){
			if($scope.id==0){
				$("#state-modal").find('.modal-body').html('请先填写证件关键信息<br>(表NO.2表头信息不完整)');
				$("#state-modal").modal('show');
			}else{

				$(".table-data-load").show();

				for (var i = $scope.no7.length - 1; i >= 0; i--) {
					if($scope.no7[i]===undefined){
						$scope.no7.splice(i,1);
						continue;
					}
					if($.trim($scope.no7[i].address)==""&&$.trim($scope.no7[i].landNumber)==""){
						$scope.no7.splice(i,1);
					}
				}
				var formdata = "";

				formdata = angular.toJson($scope.no7, true);

				var no7date = $scope.no7_date_year +"年"+ $scope.no7_date_month +"月"+ $scope.no7_date_date +"日";


				var form = {
					action:"no4-no7",
					id:$scope.id,
					page:'7',
					dataf:formdata,
					date:no7date
				}
				MainSer.update(form).then(function(rel){
					if(rel.data.state=="ok"){

						$(".table-data-load").hide();
						$("#state-modal").find('.modal-body').html('保存成功！');
						$("#state-modal").modal('show');
						//var no7date = $scope.no7_date_year +"年"+ $scope.no7_date_month +"月"+ $scope.no7_date_date +"日";
						//var d = {
						//	action:"no7",
						//	id:$scope.id,
						//	date:no7date,

						//}
						// MainSer.update(d).then(function(rel){
						// 	if(rel.data.state == "ok"){
						// 		$(".table-data-load").hide();
						// 		$("#state-modal").find('.modal-body').html('保存成功！');
						// 		$("#state-modal").modal('show');
						// 	}else{
						// 		$(".table-data-load").hide();
						// 		$("#state-modal").find('.modal-body').html('保存失败！');
						// 		$("#state-modal").modal('show');
						// 	}
						// })
					}else{
						$(".table-data-load").hide();
						$("#state-modal").find('.modal-body').html('保存失败！');
						$("#state-modal").modal('show');
					}
				})
			}
		}
	}])

	.controller('no8Ctrl', ['$scope', '$stateParams', '$state','MainSer', function ($scope,$stateParams,$state,MainSer) {
		$scope.goback = function(){
			if($stateParams.action == "edit"){
				$state.go('filelist');
			}else{
				$state.go('printRecord');
			}
		}
		$scope.no8 = [];
		$scope.id = $stateParams.id || 0;

		if($scope.id!=0){
			MainSer.GetTableData('no8',$scope.id).then(function(rel){
				$scope.no8 = rel.data;
			})
		}

		if($stateParams.action=="show"){
			$(".print-wrapper").find('.show-table-prev').hide();
			$(".print-wrapper").find('.show-table-next').hide();
			$(".print-wrapper").find('input').hide();
			$(".print-wrapper").find('textarea').hide();
			$(".print-wrapper").find('span').show();
			$("#savedatabtn").hide();
		}

		$scope.slide_prev = function(){
			$state.go('no7',{action:$stateParams.action,id:$scope.id});
		}
		$scope.Print = function(){
				
				var _page = "NO.8";
				var tweizhi = 'transform: rotate(0deg);left:0;bottom:0;';
				
				
				if($scope.id!=0){
					$(".table-data-load").show();
					MainSer.addPrint($scope.id,_page);
					ppp();
				}else{
					var falg =  confirm("NO.2页信息未填写，此次打印信息不保存到打印记录，是否打印？");
					if(falg){
						$(".table-data-load").show();
						ppp();
					}
				}
				
				function ppp(){

					var divToPrint = $(".print-wrapper").find('#no8');

					var tablewall = '<div style="position: absolute;'+tweizhi+'width: 628px;height: 900px;">'+divToPrint.html()+'</div>';
					var newWin=window.open('','Print-Window');
					newWin.document.open();
					newWin.document.write('<html><body onload="window.print()">'+tablewall+'</body></html>');
					newWin.document.close();
					setTimeout(function(){
						newWin.close();
						$(".table-data-load").hide();
					},10);
				}
			}
		$scope.Save = function(){
			if($scope.id==0){
				$("#state-modal").find('.modal-body').html('请先填写证件关键信息<br>(表NO.2表头信息不完整)');
				$("#state-modal").modal('show');
			}else{

				$(".table-data-load").show();

				for (var i = $scope.no8.length - 1; i >= 0; i--) {
					if($scope.no8[i]===undefined){
						$scope.no8.splice(i,1);
						continue;
					}
					if($.trim($scope.no8[i].changeMode)==""&&$.trim($scope.no8[i].area)==""&&$.trim($scope.no8[i].hetongID)==""&&$.trim($scope.no8[i].landID)==""&&$.trim($scope.no8[i].info)==""){
						$scope.no8.splice(i,1);
					}
				}
				if($scope.no8.length < 1){
					$("#state-modal").find('.modal-body').html('至少包含一行完整数据');
					$("#state-modal").modal('show');
				}else{
					var formdata = "";
					formdata = angular.toJson($scope.no8, true);
					var form = {
						action:"no8",
						id:$scope.id,
						dataf:formdata
					}
					MainSer.update(form).then(function(rel){
						if(rel.data.state == "ok"){
							$(".table-data-load").hide();
							$("#state-modal").find('.modal-body').html('保存成功！');
							$("#state-modal").modal('show');
						}else{
							$(".table-data-load").hide();
							$("#state-modal").find('.modal-body').html('保存失败！');
							$("#state-modal").modal('show');
						}
					});
				}
			}
		}
	}])
