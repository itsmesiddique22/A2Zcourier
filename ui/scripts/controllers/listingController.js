courierApp.controller("listingController", ['$scope', '$location', '$rootScope', 'intermediateService', '$timeout','logCheck',
	function ($scope, $location, $rootScope, intermediateService, $timeout,logCheck) {

		$scope.listofBoys;
		$rootScope.loginPage = true;
		$scope.totalPages = 0;
		$scope.listit = function () {
			$scope.loader = true;
			intermediateService.listBoys(function (response) {
				if (response.statusCode == 1) {
					$scope.listofBoys = response.data;
					$scope.retrivalerr = false;
					$scope.currentPage = 0;
					$scope.pageSize = 6;
					$scope.selectedPage = 0;

					$scope.totalPages = Math.ceil(response.data.length / $scope.pageSize);
					$scope.getNumber = function (num) {
						return new Array(num);
					}
					$scope.setPage = function () {
						$scope.selectedPage = this.$index;
						$scope.listofBoyss = ($scope.selectedPage * $scope.pageSize);
					};
					$scope.pageButtonDisabled = function (dir) {
						if (dir == -1) {
							return $scope.currentPage == 0;
						}
						return $scope.currentPage >= response.data.length / $scope.pageSize - 1;
					}
					$scope.paginate = function (nextPrevMultiplier) {
						$scope.currentPage += (nextPrevMultiplier * 1);
						$scope.listofBoyss = ($scope.currentPage * $scope.pageSize);
					}
					$scope.loader = false;

				} else if (response.statusCode == 0) {
					$scope.retrivalerr = true;
					$scope.loader = false;

				}
			});
		}
		$scope.sortColumn = 'name';
		$scope.reverseSort = false;
		$scope.sortData = function (column) {
			$scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
			$scope.sortColumn = column;
		}

		$scope.arrowStyle = function (column) {
			if ($scope.sortColumn == column) {
				return $scope.reverseSort ? 'arrow-down' : 'arrow-up'
			}
			return '';
		}

		$scope.checkIndex = function (data) {
			console.log(data);
			$scope.courierBoy = data;
			$scope.rtDownload = $rootScope.urlBase + "courierboy/download/rt/" + data.id;
			$scope.rcDownload = $rootScope.urlBase + "courierboy/download/rc/" + data.id;
			$scope.insuranceDownload = $rootScope.urlBase + "courierboy/download/insurance/" + data.id;
			$scope.dlDownload = $rootScope.urlBase + "courierboy/download/dl/" + data.id;
			$scope.photoDownload = $rootScope.urlBase + "courierboy/download/photo/" + data.id;
		}
		$scope.checkingit = function (data) {
			$scope.delId = data;
		}
		$scope.delete = function () {
			intermediateService.deleteBoys($scope.delId, function (response) {
				console.log('success');
				intermediateService.listBoys(function (response) {
					if (response.statusCode == 1) {
						$scope.listofBoys = response.data;
					}
					console.log('refreshed');
				});
			});
		}
		$scope.update = function () {
			var fd = new FormData();
			fd.append('dl', $scope.drivingLicense);
			fd.append('rc', $scope.rcdoc);
			fd.append('insurance', $scope.insurance);
			fd.append('rt', $scope.roadTax);
			fd.append('photo', $scope.photo);
			fd.append('user', angular.toJson($scope.courierBoy, true));
			intermediateService.updateBoys(fd, function (response) {
				if (response.statusCode == 1) {
					$scope.regSuccess = true;
					$scope.loader = true;
					intermediateService.listBoys(function (response) {
						if (response.statusCode == 1) {
							$scope.listofBoys = response.data;
							$scope.loader = false;
						}
					});
					$timeout(function () {
						$scope.regSuccess = false;
					}, 2000);
				} else if (response.statusCode == 0) {
					console.log('failed');
					$scope.regError = true;
					$timeout(function () {
						$scope.regError = false;
					}, 2000);
				}


			});
		}
		$scope.setimage = function () {
			var file = $scope.photo;
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function (e) {
				$scope.$apply(function () {
					$scope.ImageSrc = e.target.result;
				});
			}
		}
		$scope.cancelEdit = function () {
			$scope.photoDownload = '';
			$scope.ImageSrc = '';
		}		
	}
]);