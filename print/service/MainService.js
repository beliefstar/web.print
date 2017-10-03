angular.module('MainService', [])
	.service('MainSer', ['$http', function ($http) {
		this.changepwd = function(_old,_new){
			return $http({
				method: 'POST',
				url: 'models/changepwd.php',
				data:$.param({
					oldpwd : _old,
					newpwd : _new
				}),
				headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
			})
		}
		this.addNewPrint = function(info1,info2,info3,company,date){
			return $http({
				method: 'POST',
				url: 'models/addNewPrint.php',
				data:$.param({
					info1 : info1,
					info2 : info2,
					info3 : info3,
					company : company,
					date : date
				}),
				headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
			})
		};
		this.GetFileList = function(_page, _time, _txt){
			return $http({
				method: 'POST',
				url: 'models/editlist.php',
				data:$.param({
					page:_page,
					time:_time,
					txt:_txt
				}),
				headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
			})
		};
		this.GetTableData = function(_table, _id){
			return $http({
				method: 'POST',
				url: 'models/getdata.php',
				data:$.param({
					action : _table,
					id : _id
				}),
				headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
			})
		};
		this.update = function(option){
			return $http({
				method: 'POST',
				url: 'models/update.php',
				data:$.param(option),
				headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
			})
		};
		this.addPrint = function(_id,_page){
			return $http({
				method: 'POST',
				url: 'models/print.php',
				data:$.param({
					id : _id,
					page:_page
				}),
				headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
			})
		};
		this.getprintlist = function(_page, _time, _txt){
			return $http({
				method: 'POST',
				url: 'models/printlist.php',
				data:$.param({
					page:_page,
					time:_time,
					txt:_txt
				}),
				headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
			})
		}
	}])
